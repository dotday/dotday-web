#!/usr/bin/env node
/**
 * validate-schema.mjs - STRUCTURAL validation via JSON Schema (Ajv).
 *
 *   node scripts/validate-schema.mjs
 *
 * This is the first gate in `content:validate`. Where validate-post.mjs and
 * validate-landing.mjs check human/SEO RULES (keyword placement, link counts,
 * banned phrases), THIS enforces the SHAPE of every content file against the
 * committed JSON Schemas:
 *   content/blog/**.json      -> schema/blogPost.schema.json
 *   content/landing/**.json   -> schema/landingPage.schema.json
 *
 * It catches structural drift the rule validators don't: an unknown _type, a
 * missing required field, a wrong type, an extra property (schemas are
 * additionalProperties:false). Running this first means a malformed file fails
 * with a precise "/blocks/3/_type must be equal to one of the allowed values"
 * instead of a vague downstream error.
 *
 * Exit 0 = pass, 1 = fail.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const ROOT = process.cwd();

/** Recursively collect *.json under a directory. */
function collectJson(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectJson(full));
    else if (entry.isFile() && entry.name.endsWith(".json")) out.push(full);
  }
  return out;
}

function loadSchema(rel) {
  const p = join(ROOT, rel);
  if (!existsSync(p)) {
    console.error(`✗ schema not found: ${rel}`);
    process.exit(1);
  }
  return JSON.parse(readFileSync(p, "utf8"));
}

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const validators = [
  {
    label: "blog",
    dir: join(ROOT, "content", "blog"),
    validate: ajv.compile(loadSchema("schema/blogPost.schema.json")),
  },
  {
    label: "landing",
    dir: join(ROOT, "content", "landing"),
    validate: ajv.compile(loadSchema("schema/landingPage.schema.json")),
  },
];

let anyFail = false;
let totalOk = 0;

for (const { label, dir, validate } of validators) {
  const files = collectJson(dir);
  for (const file of files) {
    const rel = relative(ROOT, file);
    let data;
    try {
      data = JSON.parse(readFileSync(file, "utf8"));
    } catch (e) {
      console.log(`✗ ${rel} - invalid JSON: ${e.message}`);
      anyFail = true;
      continue;
    }
    if (validate(data)) {
      totalOk++;
    } else {
      anyFail = true;
      console.log(`\n✗ ${rel} - ${validate.errors.length} schema error(s):`);
      for (const err of validate.errors) {
        const where = err.instancePath || "(root)";
        let msg = `   • ${where} ${err.message}`;
        if (err.params?.allowedValues) {
          msg += ` [${err.params.allowedValues.join(", ")}]`;
        }
        if (err.params?.additionalProperty) {
          msg += `: "${err.params.additionalProperty}"`;
        }
        if (err.params?.missingProperty) {
          msg += `: "${err.params.missingProperty}"`;
        }
        console.log(msg);
      }
    }
  }
  console.log(`${anyFail ? "" : "✓ "}${label}: ${files.length} file(s) checked against schema`);
}

if (anyFail) {
  console.error("\nSchema validation failed.");
  process.exit(1);
}
console.log(`\n✓ Schema validation passed (${totalOk} file(s) valid).`);
