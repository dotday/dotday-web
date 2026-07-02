#!/usr/bin/env node
/**
 * gen-catalog.mjs - THE MASTER SECTION CATALOG, generated, never hand-written.
 *
 *   node scripts/gen-catalog.mjs            # (re)generate SECTIONS.md
 *   node scripts/gen-catalog.mjs --check    # CI: fail if SECTIONS.md is stale
 *
 * Everything in SECTIONS.md is DERIVED from the code that actually governs
 * sections, so the catalog cannot drift from reality:
 *
 *   - registry seed (src/components/renderers/registry/seed.ts)
 *       -> type, component, family, surfaces, isAction  [registry render path]
 *   - SectionRenderer switch cases                       [adapted render path]
 *   - validate-landing.mjs APPROVED set                  [landing-approved]
 *   - src/lib/landing/types.ts union                     [typed in union]
 *   - schema/landingPage.schema.json $defs               [doc schema wired]
 *   - co-located <Name>.schema.json next to component    [schema-first]
 *   - schema/blogPost.schema.json blocks.items           [blog block table]
 *
 * The only hand-curated input is scripts/catalog-meta.json ("use when" notes);
 * a type missing there is flagged in the catalog instead of silently absent.
 *
 * The DRIFT REPORT at the bottom of SECTIONS.md lists every disagreement
 * between the sources above. An empty drift report is the goal state.
 */
import { readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const CHECK = process.argv.includes("--check");
const OUT = join(ROOT, "SECTIONS.md");

const read = (p) => readFileSync(join(ROOT, p), "utf8");

// ---------- 1. Registry seed: type -> { component, importPath, surfaces, isAction }
const seedSrc = read("src/components/renderers/registry/seed.ts");

const importPathById = new Map(); // local identifier -> "@/..." path
for (const m of seedSrc.matchAll(
  /import\s*\{\s*(\w+)(?:\s+as\s+(\w+))?\s*\}\s*from\s*"(@\/[^"]+)"/g
)) {
  const [, orig, alias, path] = m;
  importPathById.set(alias || orig, path);
}

const registry = new Map(); // type -> record
for (const m of seedSrc.matchAll(
  /registerSection\(\{\s*type:\s*"([^"]+)",\s*component:\s*(\w+),\s*surfaces:\s*\[([^\]]*)\](?:,\s*isAction:\s*(true))?\s*\}\)/g
)) {
  const [, type, componentId, surfacesRaw, isAction] = m;
  const surfaces = [...surfacesRaw.matchAll(/"([^"]+)"/g)].map((s) => s[1]);
  registry.set(type, {
    type,
    componentId,
    importPath: importPathById.get(componentId) || null,
    surfaces,
    isAction: Boolean(isAction),
  });
}

// ---------- 2. Renderer switch: adapted section types
const rendererSrc = read("src/components/renderers/SectionRenderer.tsx");
const switchTypes = new Set(
  [...rendererSrc.matchAll(/case\s+"([^"]+)":/g)].map((m) => m[1])
);
const adapted = new Set([...switchTypes].filter((t) => !registry.has(t)));

// ---------- 3. APPROVED set (validate-landing.mjs)
const vlSrc = read("scripts/validate-landing.mjs");
const approvedBlock = vlSrc.match(/const APPROVED = new Set\(\[([\s\S]*?)\]\)/);
if (!approvedBlock) throw new Error("Could not locate APPROVED set in validate-landing.mjs");
const approved = new Set([...approvedBlock[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]));

// ---------- 4. Types union (_type discriminators in lib/landing/types.ts)
const typesSrc = read("src/lib/landing/types.ts");
const unionBlock = typesSrc.match(/export type LandingSection =([\s\S]*?);/);
if (!unionBlock) throw new Error("Could not locate LandingSection union in types.ts");
const unionMembers = new Set(
  [...unionBlock[1].matchAll(/\|\s*(\w+)/g)].map((m) => m[1])
);

// Map each union member identifier to its _type discriminator:
//  a) interfaces declared locally in types.ts
//  b) schema-first slice types imported from co-located *.types.ts
const unionTypes = new Set();
for (const chunk of typesSrc.split(/export interface /).slice(1)) {
  const name = chunk.match(/^(\w+)/)?.[1];
  const disc = chunk.slice(0, chunk.indexOf("}") + 1).match(/_type:\s*"([^"]+)"/);
  if (name && disc && unionMembers.has(name)) unionTypes.add(disc[1]);
}
for (const m of typesSrc.matchAll(
  /import type \{\s*(\w+)\s*\} from "(@\/[^"]+)"/g
)) {
  const [, ident, path] = m;
  if (!unionMembers.has(ident)) continue;
  const rel = path.replace(/^@\//, "src/") + ".ts";
  if (!existsSync(join(ROOT, rel))) continue;
  const t = read(rel).match(/_type:\s*"([^"]+)"/);
  if (t) unionTypes.add(t[1]);
}

// ---------- 5. Doc schema $defs whose shape is a section (has properties._type)
const docSchema = JSON.parse(read("schema/landingPage.schema.json"));
const docDefs = new Map(); // _type -> def name
for (const [defName, def] of Object.entries(docSchema.$defs || {})) {
  // Inline section def: has properties._type
  const t = def?.properties?._type;
  if (t) {
    const val = t.const || (Array.isArray(t.enum) ? t.enum[0] : null);
    if (val) docDefs.set(val, defName);
    continue;
  }
  // Schema-first def: $ref by $id to the co-located section schema
  const ref = def?.$ref;
  const m = ref && ref.match(/\/schema\/sections\/([\w-]+)\.json$/);
  if (m) docDefs.set(m[1], defName);
}

// ---------- 6. Schema-first status: co-located <Name>.schema.json
function hasCoLocatedSchema(importPath) {
  if (!importPath) return false;
  const rel = importPath.replace(/^@\//, "src/");
  const abs = join(ROOT, rel);
  // folder slice: src/.../Name/  -> Name/Name.schema.json (import resolves to index.ts)
  if (existsSync(abs) && statSync(abs).isDirectory()) {
    const base = rel.split("/").pop();
    return existsSync(join(abs, `${base}.schema.json`));
  }
  // single-file section: src/.../Name.tsx -> sibling Name.schema.json
  return existsSync(`${abs}.schema.json`);
}

// ---------- 7. Blog block variants (schema/blogPost.schema.json)
const blogSchema = JSON.parse(read("schema/blogPost.schema.json"));
const blogItems =
  blogSchema.properties?.blocks?.items?.oneOf ||
  blogSchema.properties?.blocks?.items?.anyOf ||
  [];
const blogBlocks = [];
for (const v of blogItems) {
  const t = v?.properties?._type;
  if (!t) continue;
  if (t.const) blogBlocks.push(t.const);
  else if (Array.isArray(t.enum)) blogBlocks.push(...t.enum);
}

// ---------- 8. Curated meta
const meta = JSON.parse(read("scripts/catalog-meta.json"));

// ---------- Assemble rows
const allTypes = new Set([
  ...registry.keys(),
  ...adapted,
  ...approved,
  ...unionTypes,
  ...docDefs.keys(),
]);

const rows = [...allTypes].sort().map((type) => {
  const reg = registry.get(type);
  const family = reg?.importPath
    ? (reg.importPath.match(/sections\/([^/]+)\//)?.[1] ?? "-")
    : adapted.has(type)
      ? "_core (adapted)"
      : "-";
  return {
    type,
    component: reg ? reg.componentId : adapted.has(type) ? "(renderer switch)" : "-",
    family,
    path: reg ? "registry" : adapted.has(type) ? "adapted" : "MISSING",
    surfaces: reg ? reg.surfaces.join(", ") : adapted.has(type) ? "landing" : "-",
    isAction: reg?.isAction || false,
    approved: approved.has(type),
    union: unionTypes.has(type),
    doc: docDefs.has(type),
    schemaFirst: reg ? hasCoLocatedSchema(reg.importPath) : false,
    useWhen: meta.sections[type] || "(meta missing - add to scripts/catalog-meta.json)",
  };
});

// ---------- Drift report
const drift = [];
for (const r of rows) {
  if (r.path === "MISSING")
    drift.push(`\`${r.type}\` is referenced by a validator/type/schema but has NO render path (not in registry seed, not in the renderer switch).`);
  if (r.path === "registry" && r.surfaces.includes("landing") && !r.approved)
    drift.push(`\`${r.type}\` is registered for the landing surface but missing from the APPROVED set (validate-landing.mjs) - landing pages using it fail validation.`);
  if (r.approved && !r.doc)
    drift.push(`\`${r.type}\` is in the APPROVED set but has no def in schema/landingPage.schema.json - it passes the rule gate but fails the Ajv shape gate.`);
  if (r.approved && !r.union)
    drift.push(`\`${r.type}\` is landing-approved but absent from the LandingSection union (src/lib/landing/types.ts) - content using it is untyped at the renderer boundary.`);
  if (r.doc && docDefs.get(r.type) !== r.type)
    drift.push(`\`${r.type}\` doc-schema def is named \`${docDefs.get(r.type)}\` - def name must equal the _type.`);
  if (r.path === "registry" && !r.schemaFirst)
    drift.push(`\`${r.type}\` (${r.component}) has no co-located *.schema.json - pending schema-first migration.`);
}

// ---------- Render markdown
const y = (b) => (b ? "yes" : "no");
const lines = [];
lines.push("# DOTDAY Section Catalog");
lines.push("");
lines.push("**GENERATED FILE - do not edit.** Regenerate with `npm run content:catalog`.");
lines.push("Derived from the registry seed, SectionRenderer, validate-landing APPROVED set,");
lines.push("the LandingSection union, the landing doc schema, and co-located section schemas.");
lines.push('"Use when" notes come from `scripts/catalog-meta.json`.');
lines.push("");
lines.push(`Sections: **${rows.length}** (${[...registry.keys()].length} registry, ${adapted.size} adapted) | Landing-approved: **${[...approved].length}** | Blog blocks: **${blogBlocks.length}**`);
lines.push("");
lines.push("## Page sections (landing / home / profile)");
lines.push("");
lines.push("| Type | Component | Family | Render path | Surfaces | Landing OK | Union | Doc schema | Schema-first | Use when |");
lines.push("|---|---|---|---|---|---|---|---|---|---|");
for (const r of rows) {
  const flags = r.isAction ? " (isAction)" : "";
  lines.push(
    `| \`${r.type}\` | ${r.component}${flags} | ${r.family} | ${r.path} | ${r.surfaces} | ${y(r.approved)} | ${y(r.union)} | ${y(r.doc)} | ${y(r.schemaFirst)} | ${r.useWhen} |`
  );
}
lines.push("");
lines.push("## Blog body blocks");
lines.push("");
lines.push("| Type | Use when |");
lines.push("|---|---|");
for (const b of [...new Set(blogBlocks)].sort()) {
  lines.push(`| \`${b}\` | ${meta.blogBlocks[b] || "(meta missing - add to scripts/catalog-meta.json)"} |`);
}
lines.push("");
lines.push("The blog envelope (hero, quickAnswer, faq, relatedPosts, internalLinks,");
lines.push("closingHashtags) is enforced by `schema/blogPost.schema.json` + `validate-post.mjs`;");
lines.push("only the body block sequence varies per post.");
lines.push("");
lines.push("## Drift report");
lines.push("");
if (drift.length === 0) {
  lines.push("No drift. Every section agrees across registry, renderer, APPROVED set, union, and schemas.");
} else {
  lines.push(`**${drift.length} finding(s):**`);
  lines.push("");
  for (const d of drift) lines.push(`- ${d}`);
}
lines.push("");

const md = lines.join("\n");

if (CHECK) {
  const current = existsSync(OUT) ? readFileSync(OUT, "utf8") : "";
  if (current !== md) {
    console.error("\u2717 SECTIONS.md is stale - run `npm run content:catalog` and commit the result.");
    process.exit(1);
  }
  console.log(`\u2713 SECTIONS.md is current (${rows.length} sections, ${drift.length} drift finding(s)).`);
} else {
  writeFileSync(OUT, md);
  console.log(`\u2713 SECTIONS.md written: ${rows.length} sections, ${blogBlocks.length} blog blocks, ${drift.length} drift finding(s).`);
}
