#!/usr/bin/env node
/**
 * validate-content.mjs - a light gate for non-blog content (products, landing
 * JSON). The blog validator (validate-post.mjs) is the strict one; this just
 * makes sure the things the build imports are well-formed so `npm run build`
 * fails early with a clear message instead of deep in Next's compiler.
 *
 * Currently it sanity-checks that every content/blog/*.json parses and that the
 * content/landing + content/product dirs (if used) contain valid JSON. Extend
 * as you add data-driven landing pages.
 *
 * Exit 0 = pass, 1 = fail.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

let failed = false;

function checkDir(dir, label) {
  if (!existsSync(dir)) return;
  const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
  for (const f of files) {
    const p = join(dir, f);
    try {
      JSON.parse(readFileSync(p, "utf8"));
    } catch (e) {
      console.error(`✗ ${label}: ${p} is invalid JSON - ${e.message}`);
      failed = true;
    }
  }
  console.log(`✓ ${label}: ${files.length} file(s) parsed`);
}

checkDir(join(process.cwd(), "content", "blog"), "blog");
checkDir(join(process.cwd(), "content", "landing"), "landing");
checkDir(join(process.cwd(), "content", "product"), "product");

if (failed) {
  console.error("\nContent validation failed.");
  process.exit(1);
}
console.log("\nContent validation passed.");
