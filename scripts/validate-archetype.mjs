#!/usr/bin/env node
/**
 * validate-archetype.mjs - GATE 7: page archetype enforcement.
 *
 *   node scripts/validate-archetype.mjs
 *
 * An archetype is a frozen, versioned page recipe living in
 * content/archetypes/<id>.json (shape: schema/archetype.schema.json).
 * A content file opts in with a top-level  "archetype": "<id>@<version>".
 *
 * This gate:
 *   1. Validates every manifest against schema/archetype.schema.json (Ajv),
 *      and checks that every _type a manifest references actually exists in
 *      the section system (landing: validate-landing APPROVED set; blog: the
 *      block variants in schema/blogPost.schema.json).
 *   2. For every content file that DECLARES an archetype, enforces the
 *      manifest: 'sequence' slot matching and/or 'rules' constraints against
 *      page.sections (landing) or post.blocks (blog).
 *   3. Content files that declare no archetype WARN (adoption is rolling,
 *      not forced); an unknown archetype id/version is an ERROR.
 *
 * Sequence matching: slots are consumed in order; each slot takes between
 * min (default 1) and max (default 1) consecutive sections whose _type is in
 * slot.types. min: 0 makes a slot skippable. Sections left over after the
 * last slot, or a required slot left unfilled, fail the page.
 *
 * Exit 0 = pass, 1 = fail.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import Ajv from "ajv";

const ROOT = process.cwd();
const MANIFEST_DIR = join(ROOT, "content", "archetypes");

const ajv = new Ajv({ allErrors: true, useDefaults: true });
const manifestSchema = JSON.parse(
  readFileSync(join(ROOT, "schema", "archetype.schema.json"), "utf8")
);
const validateManifest = ajv.compile(manifestSchema);

// ---------- Known _types per surface (to catch manifests referencing ghosts)
const vlSrc = readFileSync(join(ROOT, "scripts", "validate-landing.mjs"), "utf8");
const landingTypes = new Set(
  [...vlSrc.match(/const APPROVED = new Set\(\[([\s\S]*?)\]\)/)[1].matchAll(/"([^"]+)"/g)].map((m) => m[1])
);
const blogSchema = JSON.parse(readFileSync(join(ROOT, "schema", "blogPost.schema.json"), "utf8"));
const blogTypes = new Set();
for (const v of blogSchema.properties?.blocks?.items?.oneOf || []) {
  const t = v?.properties?._type;
  if (t?.const) blogTypes.add(t.const);
  else if (Array.isArray(t?.enum)) t.enum.forEach((x) => blogTypes.add(x));
}
const knownTypes = { landing: landingTypes, blog: blogTypes };

// ---------- Load manifests
let anyFail = false;
const manifests = new Map(); // "id@version" -> manifest

if (existsSync(MANIFEST_DIR)) {
  for (const f of readdirSync(MANIFEST_DIR).filter((f) => f.endsWith(".json"))) {
    const file = join(MANIFEST_DIR, f);
    let m;
    try {
      m = JSON.parse(readFileSync(file, "utf8"));
    } catch (e) {
      console.error(`\u2717 content/archetypes/${f}: invalid JSON - ${e.message}`);
      anyFail = true;
      continue;
    }
    if (!validateManifest(m)) {
      console.error(`\u2717 content/archetypes/${f}: does not match schema/archetype.schema.json`);
      for (const e of validateManifest.errors) console.error(`    ${e.instancePath || "/"} ${e.message}`);
      anyFail = true;
      continue;
    }
    const referenced = new Set();
    for (const s of m.sequence || []) s.types.forEach((t) => referenced.add(t));
    for (const t of m.rules?.allowedTypes || []) referenced.add(t);
    if (m.rules?.startsWith) referenced.add(m.rules.startsWith);
    if (m.rules?.endsWith) referenced.add(m.rules.endsWith);
    for (const t of Object.keys(m.rules?.minCount || {})) referenced.add(t);
    for (const t of Object.keys(m.rules?.maxCount || {})) referenced.add(t);
    const ghosts = [...referenced].filter((t) => !knownTypes[m.surface].has(t));
    if (ghosts.length) {
      console.error(`\u2717 content/archetypes/${f}: references unknown ${m.surface} _type(s): ${ghosts.join(", ")}`);
      anyFail = true;
      continue;
    }
    const key = `${m.id}@${m.version}`;
    if (manifests.has(key)) {
      console.error(`\u2717 content/archetypes/${f}: duplicate archetype ${key}`);
      anyFail = true;
      continue;
    }
    manifests.set(key, m);
    console.log(`\u2713 archetype ${key} (${m.surface}) - manifest valid`);
  }
}

// ---------- Enforce against content
function collectJson(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...collectJson(p));
    else if (e.name.endsWith(".json")) out.push(p);
  }
  return out;
}

function checkSequence(list, sequence, errors) {
  let i = 0;
  for (const slot of sequence) {
    const min = slot.min ?? 1;
    const max = slot.max ?? 1;
    let taken = 0;
    while (taken < max && i < list.length && slot.types.includes(list[i]._type)) {
      i++;
      taken++;
    }
    if (taken < min) {
      const at = list[i] ? `found '${list[i]._type}' at position ${i}` : "reached end of page";
      errors.push(
        `slot '${slot.slot}' needs ${min}\u00d7 of [${slot.types.join(", ")}] but ${at}`
      );
      return; // sequence is broken; further slot errors would be noise
    }
  }
  if (i < list.length) {
    errors.push(
      `${list.length - i} section(s) after the last slot, starting with '${list[i]._type}' at position ${i} - not part of the recipe`
    );
  }
}

function checkRules(list, rules, errors) {
  const types = list.map((s) => s._type);
  if (rules.allowedTypes) {
    const allowed = new Set(rules.allowedTypes);
    for (const t of new Set(types)) {
      if (!allowed.has(t)) errors.push(`_type '${t}' is not allowed by this archetype`);
    }
  }
  if (rules.startsWith && types[0] !== rules.startsWith)
    errors.push(`must start with '${rules.startsWith}' (starts with '${types[0]}')`);
  if (rules.endsWith && types[types.length - 1] !== rules.endsWith)
    errors.push(`must end with '${rules.endsWith}' (ends with '${types[types.length - 1]}')`);
  for (const [t, n] of Object.entries(rules.minCount || {})) {
    const c = types.filter((x) => x === t).length;
    if (c < n) errors.push(`needs >=${n}\u00d7 '${t}' (has ${c})`);
  }
  for (const [t, n] of Object.entries(rules.maxCount || {})) {
    const c = types.filter((x) => x === t).length;
    if (c > n) errors.push(`allows <=${n}\u00d7 '${t}' (has ${c})`);
  }
}

const targets = [
  { surface: "landing", files: collectJson(join(ROOT, "content", "landing")), listKey: "sections" },
  { surface: "blog", files: collectJson(join(ROOT, "content", "blog")), listKey: "blocks" },
];

let undeclared = 0;
for (const { surface, files, listKey } of targets) {
  for (const file of files) {
    const rel = file.slice(ROOT.length + 1);
    let doc;
    try {
      doc = JSON.parse(readFileSync(file, "utf8"));
    } catch {
      continue; // malformed JSON is gate 2's problem, not ours
    }
    if (!doc.archetype) {
      undeclared++;
      continue;
    }
    const m = manifests.get(doc.archetype);
    if (!m) {
      console.error(`\u2717 ${rel}: declares unknown archetype '${doc.archetype}'`);
      anyFail = true;
      continue;
    }
    if (m.surface !== surface) {
      console.error(`\u2717 ${rel}: archetype '${doc.archetype}' is a ${m.surface} archetype, used on ${surface}`);
      anyFail = true;
      continue;
    }
    const list = doc[listKey] || [];
    const errors = [];
    if (m.sequence) checkSequence(list, m.sequence, errors);
    if (m.rules) checkRules(list, m.rules, errors);
    if (errors.length) {
      console.error(`\u2717 ${rel} (${doc.archetype}):`);
      for (const e of errors) console.error(`    ${e}`);
      anyFail = true;
    } else {
      console.log(`\u2713 ${rel} - conforms to ${doc.archetype}`);
    }
  }
}

if (undeclared > 0) {
  console.log(`\u26a0 ${undeclared} content file(s) declare no archetype yet (rolling adoption - not an error).`);
}

if (anyFail) {
  console.error("\nArchetype validation FAILED.");
  process.exit(1);
}
console.log("\nArchetype validation passed.");
