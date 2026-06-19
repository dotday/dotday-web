#!/usr/bin/env node
/**
 * list-content.mjs - inventory of every page that exists in the repo.
 *
 *   node scripts/list-content.mjs            # human-readable table
 *   node scripts/list-content.mjs --json     # machine-readable JSON
 *
 * Why this exists: when generating a NEW page, the author (a person or Claude
 * via the dotday-page-builder skill) must know what already exists so that:
 *   - slugs never collide,
 *   - "relatedPosts" point at real, live posts,
 *   - internal links use real URLs,
 *   - the same topic isn't written twice (keyword cannibalization).
 *
 * The skill fetches this file's OUTPUT (or reads the raw file from GitHub and
 * runs it) before writing anything. It is the live index of the site.
 *
 * No dependencies. Reads content/blog/*.json + the products catalog + the known
 * static routes.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const asJson = process.argv.includes("--json");

function readBlogPosts() {
  const dir = join(ROOT, "content", "blog");
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      try {
        const p = JSON.parse(readFileSync(join(dir, f), "utf8"));
        return {
          type: "blog",
          slug: p.slug,
          url: `/blog/${p.slug}`,
          title: p.title,
          focusKeyword: p.focusKeyword,
          category: p.category,
          status: p.status,
          primaryProduct: p.primaryProduct,
          publishedAt: p.publishedAt,
        };
      } catch (e) {
        return { type: "blog", file: f, error: String(e) };
      }
    });
}

function readProducts() {
  // products are data in lib/content/products.ts - parse the slugs/names out
  const f = join(ROOT, "lib", "content", "products.ts");
  if (!existsSync(f)) return [];
  const src = readFileSync(f, "utf8");
  const slugs = [...src.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  const names = [...src.matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1]);
  return slugs.map((slug, i) => ({
    type: "product",
    slug,
    url: `/product-page/${slug}`,
    title: names[i] || slug,
  }));
}

const staticRoutes = [
  { type: "page", url: "/", title: "Home" },
  { type: "page", url: "/blog", title: "Blog hub" },
  { type: "tool", url: "/landscape-fabric-calculator", title: "Fabric Calculator" },
  { type: "tool", url: "/fabric-finder", title: "Fabric Finder" },
  { type: "page", url: "/how-to-install-weed-barrier-fabric", title: "Install Guide" },
  { type: "page", url: "/contact-us", title: "Contact" },
  { type: "page", url: "/bulk-pricing", title: "Bulk Pricing" },
];

const inventory = {
  generatedAt: new Date().toISOString(),
  blogPosts: readBlogPosts(),
  products: readProducts(),
  staticRoutes,
};

if (asJson) {
  console.log(JSON.stringify(inventory, null, 2));
} else {
  console.log(`\nDOTDAY content inventory  (${inventory.generatedAt})\n`);
  console.log("BLOG POSTS");
  if (inventory.blogPosts.length === 0) console.log("  (none yet)");
  for (const p of inventory.blogPosts) {
    console.log(`  [${p.status}] ${p.url}`);
    console.log(`      title:   ${p.title}`);
    console.log(`      keyword: ${p.focusKeyword}   category: ${p.category}`);
  }
  console.log("\nPRODUCTS");
  for (const p of inventory.products) console.log(`  ${p.url}  (${p.title})`);
  console.log("\nSTATIC ROUTES / TOOLS");
  for (const p of inventory.staticRoutes) console.log(`  ${p.url}  (${p.title})`);
  console.log("\nUse these URLs for internal links + relatedPosts. Never reuse an existing slug.\n");
}
