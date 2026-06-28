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

function readBlogPosts() {
  return collectJson(join(ROOT, "content", "blog")).map((file) => {
    try {
      const p = JSON.parse(readFileSync(file, "utf8"));
      return {
        type: "blog",
        slug: p.slug,
        url: `/post/${p.slug}`,
        title: p.title,
        focusKeyword: p.focusKeyword,
        category: p.category,
        status: p.status,
        primaryProduct: p.primaryProduct,
        publishedAt: p.publishedAt,
      };
    } catch (e) {
      return { type: "blog", file, error: String(e) };
    }
  });
}

function readLandingPages() {
  return collectJson(join(ROOT, "content", "landing")).map((file) => {
    try {
      const p = JSON.parse(readFileSync(file, "utf8"));
      // custom-folder pages are bound to a root URL; application pages live at /l/<slug>.
      const isCustom = file.includes(`${join("landing", "custom")}`);
      return {
        type: "landing",
        slug: p.slug,
        url: isCustom ? `/${p.slug}` : `/l/${p.slug}`,
        kind: isCustom ? "custom (root-bound)" : "application (/l)",
        title: p.title,
        focusKeyword: p.focusKeyword,
        status: p.status,
        publishedAt: p.publishedAt,
      };
    } catch (e) {
      return { type: "landing", file, error: String(e) };
    }
  });
}

function readProducts() {
  // products are data in src/lib/content/products.ts - parse the slugs/names out
  const f = join(ROOT, "src", "lib", "content", "products.ts");
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
  { type: "page", url: "/contact-us", title: "Contact" },
  { type: "page", url: "/bulk-pricing", title: "Bulk Pricing" },
  { type: "page", url: "/privacy-policy", title: "Privacy Policy" },
  { type: "page", url: "/terms-of-service", title: "Terms of Service" },
];

const inventory = {
  generatedAt: new Date().toISOString(),
  blogPosts: readBlogPosts(),
  landingPages: readLandingPages(),
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
  console.log("\nLANDING PAGES");
  if (inventory.landingPages.length === 0) console.log("  (none yet)");
  for (const p of inventory.landingPages) {
    console.log(`  [${p.status}] ${p.url}   (${p.kind})`);
    console.log(`      title:   ${p.title}`);
    console.log(`      keyword: ${p.focusKeyword}`);
  }
  console.log("\nPRODUCTS");
  for (const p of inventory.products) console.log(`  ${p.url}  (${p.title})`);
  console.log("\nSTATIC ROUTES / TOOLS");
  for (const p of inventory.staticRoutes) console.log(`  ${p.url}  (${p.title})`);
  console.log("\nUse these URLs for internal links + relatedPosts. Never reuse an existing slug.\n");
}
