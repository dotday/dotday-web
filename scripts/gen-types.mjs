#!/usr/bin/env node
/**
 * gen-types.mjs - SCHEMA-FIRST type generation.
 *
 *   node scripts/gen-types.mjs            # generate
 *   node scripts/gen-types.mjs --check    # CI: fail if any generated file is stale
 *
 * For every co-located section schema named <Name>.schema.json under
 * src/components/sections/, this writes <Name>.types.ts next to it, with the
 * TS interface generated FROM
 * the schema. The schema is the single source of truth; the type can no longer
 * drift from it because it is derived, not hand-written. This is what removes the
 * type-drift gap between schema/*.schema.json and the old hand-written
 * lib/<collection>/types.ts.
 *
 * `--check` regenerates into memory and diffs against what's on disk, exiting 1
 * if they differ - so `content:validate` (and CI) catches a schema edited without
 * regenerating its type.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { compileFromFile } from "json-schema-to-typescript";

const ROOT = process.cwd();
const SECTIONS_DIR = join(ROOT, "src", "components", "sections");
const CHECK = process.argv.includes("--check");

const BANNER =
  "/* AUTO-GENERATED from the sibling *.schema.json by scripts/gen-types.mjs.\n" +
  " * Do NOT edit by hand - edit the schema and run `npm run content:types`. */\n\n";

/** Recursively find every *.schema.json under the sections tree. */
function findSchemas(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...findSchemas(full));
    else if (entry.isFile() && entry.name.endsWith(".schema.json")) out.push(full);
  }
  return out;
}

const opts = {
  bannerComment: "",
  additionalProperties: false,
  style: { singleQuote: false },
};

let stale = 0;
const schemas = findSchemas(SECTIONS_DIR);
for (const schemaPath of schemas) {
  const outPath = join(
    dirname(schemaPath),
    basename(schemaPath).replace(/\.schema\.json$/, ".types.ts")
  );
  const ts = BANNER + (await compileFromFile(schemaPath, opts));
  let current = "";
  try {
    current = readFileSync(outPath, "utf8");
  } catch {
    /* not yet generated */
  }
  if (current === ts) continue;
  if (CHECK) {
    console.error(`✗ stale generated type: ${outPath.replace(ROOT + "/", "")} (run npm run content:types)`);
    stale++;
  } else {
    writeFileSync(outPath, ts);
    console.log(`✓ ${outPath.replace(ROOT + "/", "")}`);
  }
}

if (CHECK && stale) {
  console.error(`\n${stale} generated type(s) out of date.`);
  process.exit(1);
}
console.log(CHECK ? "✓ generated types up to date" : `\nGenerated ${schemas.length} section type(s).`);
