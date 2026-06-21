#!/usr/bin/env node
/**
 * DOTDAY landing-page validator.
 *
 *   node scripts/validate-landing.mjs content/landing/<slug>.json
 *   node scripts/validate-landing.mjs content/landing/       (validate all)
 *
 * Human-readable, rule-aware gate mirroring validate-post.mjs. Enforces the
 * rules a JSON Schema can't easily express: dash ban, SEO length, approved
 * sections, internal-link presence. Also warns when a landing page and a blog
 * post share the same focusKeyword (cannibalization risk).
 *
 * Exit 0 = pass, 1 = fail. No deps. A missing content/landing dir is not a
 * failure (it may not exist yet).
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const arg = process.argv[2] || "content/landing";
if (!existsSync(arg)) {
  console.log(`(landing) nothing to validate at ${arg}`);
  process.exit(0);
}

const files = statSync(arg).isDirectory()
  ? readdirSync(arg).filter((f) => f.endsWith(".json")).map((f) => join(arg, f))
  : [arg];

const APPROVED = new Set([
  "hero", "problem", "solution", "useCaseGrid", "productComparison",
  "calculatorEmbed", "faq", "reviews", "cta", "internalLinks",
]);

// Gather blog focus keywords to detect overlap.
const blogKeywords = new Map();
if (existsSync("content/blog")) {
  for (const f of readdirSync("content/blog").filter((f) => f.endsWith(".json"))) {
    try {
      const p = JSON.parse(readFileSync(join("content/blog", f), "utf8"));
      if (p.focusKeyword) blogKeywords.set(p.focusKeyword.toLowerCase(), f);
    } catch {}
  }
}

let anyFail = false;

for (const file of files) {
  const errors = [];
  const warn = [];
  let page;
  try {
    page = JSON.parse(readFileSync(file, "utf8"));
  } catch (e) {
    console.error(`\u2717 ${file}: invalid JSON \u2014 ${e.message}`);
    anyFail = true;
    continue;
  }

  const must = (c, m) => { if (!c) errors.push(m); };
  const should = (c, m) => { if (!c) warn.push(m); };
  const blob = JSON.stringify(page);

  must(page.schemaVersion === "1.0.0", "schemaVersion must be '1.0.0'");
  must(typeof page.slug === "string" && /^[a-z0-9-]+$/.test(page.slug), "slug must be kebab-case");
  must(typeof page.title === "string" && page.title.length > 0, "title is required");
  must(typeof page.focusKeyword === "string" && page.focusKeyword.length > 0, "focusKeyword is required");
  must(Array.isArray(page.sections) && page.sections.length > 0, "sections[] must be non-empty");

  (page.sections || []).forEach((s, i) => {
    must(APPROVED.has(s._type), `section[${i}] uses unapproved _type "${s._type}"`);
  });
  should(page.sections?.[0]?._type === "hero", "first section should be a hero");
  should(page.sections?.some((s) => s._type === "cta"), "page should include a cta section");
  should(page.sections?.some((s) => s._type === "internalLinks"), "page should include an internalLinks section (SEO)");

  const mt = page.seo?.metaTitle || "";
  const md = page.seo?.metaDescription || "";
  must(page.seo?.canonical?.startsWith("http"), "seo.canonical must be an absolute URL");
  must(page.seo?.ogImage?.alt, "seo.ogImage.alt is required");
  should(mt.length > 0 && mt.length <= 60, `metaTitle should be 1-60 chars (is ${mt.length})`);
  should(md.length >= 50 && md.length <= 160, `metaDescription should be 50-160 chars (is ${md.length})`);
  should(mt.toLowerCase().includes((page.focusKeyword || "").toLowerCase()), "focusKeyword should appear in metaTitle");

  if (/[\u2013\u2014]/.test(blob)) {
    errors.push("contains em/en dash (\u2013 or \u2014) \u2014 banned in DOTDAY copy");
  }

  // Cannibalization warning: same focusKeyword as a blog post.
  const overlap = blogKeywords.get((page.focusKeyword || "").toLowerCase());
  if (overlap) {
    warn.push(`focusKeyword "${page.focusKeyword}" also targeted by blog/${overlap} \u2014 confirm internal links point to the intended winner`);
  }

  const faq = (page.sections || []).find((s) => s._type === "faq");
  if (faq) {
    must(Array.isArray(faq.items) && faq.items.length > 0, "faq section has no items");
    (faq.items || []).forEach((it, i) => must(it.q && it.a, `faq.items[${i}] needs both q and a`));
  }

  if (errors.length) {
    anyFail = true;
    console.error(`\u2717 ${file}`);
    errors.forEach((e) => console.error(`   \u2717 ${e}`));
    warn.forEach((w) => console.error(`   \u26a0 ${w}`));
  } else {
    console.log(`\u2713 ${file}${warn.length ? `  (${warn.length} warning(s))` : ""}`);
    warn.forEach((w) => console.log(`   \u26a0 ${w}`));
  }
}

process.exit(anyFail ? 1 : 0);
