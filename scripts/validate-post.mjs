#!/usr/bin/env node
/**
 * DOTDAY blog post validator.
 *
 *   node scripts/validate-post.mjs content/blog/<slug>.json
 *   node scripts/validate-post.mjs content/blog/        (validate all)
 *
 * Checks the SEO/content rules that a JSON Schema can't express on its own
 * (keyword placement, dash bans, link requirements, etc.). For full JSON
 * Schema structural validation, also run ajv against schema/blogPost.schema.json
 * in CI — this script is the human-readable, rule-aware gate.
 *
 * Exit code 0 = pass, 1 = fail. No deps required.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const arg = process.argv[2];
if (!arg) {
  console.error("Usage: node scripts/validate-post.mjs <file.json | dir>");
  process.exit(1);
}

/** Recursively collect *.json under a directory (blog posts may be foldered). */
function collectJson(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectJson(full));
    else if (entry.isFile() && entry.name.endsWith(".json")) out.push(full);
  }
  return out;
}

const files = statSync(arg).isDirectory() ? collectJson(arg) : [arg];

let anyFail = false;

for (const file of files) {
  const errors = [];
  const warn = [];
  let post;
  try {
    post = JSON.parse(readFileSync(file, "utf8"));
  } catch (e) {
    console.error(`✗ ${file}: invalid JSON — ${e.message}`);
    anyFail = true;
    continue;
  }

  const fk = (post.focusKeyword || "").toLowerCase();
  const allText = collectText(post).toLowerCase();
  const proseBodies = (post.blocks || []).filter((b) => b._type === "prose").map((b) => b.body || "");
  const first100 = proseBodies.join(" ").split(/\s+/).slice(0, 100).join(" ").toLowerCase();
  const headings = (post.blocks || []).filter((b) => b.heading).map((b) => b.heading.toLowerCase());
  const alts = [post.hero?.image?.alt, ...(post.blocks || []).filter((b) => b._type === "image").map((b) => b.alt)].filter(Boolean);

  // ---- schemaVersion ----
  must(post.schemaVersion === "1.0.0", "schemaVersion must be '1.0.0'");

  // ---- focus keyword placement ----
  must(fk.length > 0, "focusKeyword is required");
  must((post.title || "").toLowerCase().includes(fk), "focus keyword must be in the title (H1)");
  // slug must contain the focus keyword — EXCEPT for migrated posts, where the original
  // Wix URL must be preserved exactly for SEO (the slug is fixed and cannot be changed).
  if (post.migrated === true) {
    warn.push("migrated post: slug-keyword check skipped (original URL preserved by design)");
  } else {
    must((post.slug || "").includes(fk.replace(/\s+/g, "-")), "focus keyword must be in the slug");
  }
  must(headings.some((h) => h.includes(fk)), "focus keyword must appear in >=1 H2 heading");
  must(first100.includes(fk), "focus keyword must appear in the first 100 words");
  must(alts.some((a) => a.toLowerCase().includes(fk)), "focus keyword must appear in >=1 image alt");
  must((post.seo?.metaTitle || "").toLowerCase().includes(fk), "focus keyword must be in metaTitle");
  must((post.seo?.metaDescription || "").toLowerCase().includes(fk), "focus keyword must be in metaDescription");

  // ---- meta limits ----
  lenRange(post.seo?.metaTitle, 20, 60, "metaTitle");
  lenRange(post.seo?.metaDescription, 50, 160, "metaDescription");

  // ---- one H1 / category ----
  must(["Buying Guides", "Comparisons", "How-To & Installation", "Product Focused", "Landscape Fabric"].includes(post.category),
    "category must be one of the 5 valid categories (never 'All Posts')");

  // ---- images & alt ----
  must(post.hero?.image?.alt?.length >= 8, "hero image needs descriptive alt text");
  (post.blocks || []).filter((b) => b._type === "image").forEach((b, i) => {
    must(b.alt && b.alt.length >= 8, `image block #${i} needs descriptive alt text`);
  });

  // ---- hashtags in two places ----
  const soc = post.seo?.social?.hashtags || [];
  must(soc.length >= 3 && soc.length <= 6, "social hashtags must be 3–6");
  must(soc.some((h) => /dotday/i.test(h)), "social hashtags must include #DOTDAY");
  must(Array.isArray(post.closingHashtags) && post.closingHashtags.length >= 3,
    "closingHashtags (end of body) required — hashtags must appear in BOTH social and body");

  // ---- FAQ ----
  const faq = post.faq?.items || [];
  must(faq.length >= 2 && faq.length <= 6, "FAQ must have 2–6 items");
  faq.forEach((it, i) => {
    const w = (it.a || "").split(/\s+/).length;
    inRange(w, 30, 70, `FAQ answer #${i} word count (~40-55 ideal)`);
  });

  // ---- internal links ----
  const links = post.internalLinks || [];
  must(links.length >= 3 && links.length <= 6, "internalLinks must be 3–6");
  must(links.some((l) => /\/product-page\//.test(l.url)), "need >=1 product-page internal link");
  must(links.some((l) => /landscape-fabric-calculator/.test(l.url)), "need a Calculator (tool) internal link");
  must(links.every((l) => /^https:\/\/www\.thedotday\.com\//.test(l.url)), "internal links must be absolute https://www.thedotday.com URLs");

  // ---- related posts (real, 2-3) ----
  must((post.relatedPosts || []).length >= 2 && (post.relatedPosts || []).length <= 3, "relatedPosts must be 2–3 real posts");

  // ---- CTAs ----
  const ctas = (post.blocks || []).filter((b) => b._type === "cta");
  must(ctas.some((c) => ["contractor", "calculator", "quiz"].includes(c.variant)), "need a mid-article CTA");
  must(ctas.some((c) => c.variant === "enquiry"), "need a closing enquiry CTA");

  // ---- comparison posts need a table ----
  if (post.postType === "comparison") {
    must((post.blocks || []).some((b) => b._type === "comparisonTable"), "comparison posts must include a comparisonTable block");
  }

  // ---- DOTDAY mentions ----
  inRange((allText.match(/dotday/g) || []).length, 3, 99, "DOTDAY mentions (>=3)");

  // ---- banned: em/en dashes ----
  must(!/[\u2014\u2013]/.test(collectText(post)), "NO em/en dashes (—, –) allowed anywhere — use a hyphen or rewrite");

  // ---- banned phrases ----
  const banned = ["amazing", "incredible", "the best", "ultimate", "game-changer", "revolutionary", "guaranteed", "100% weed-free", "lasts forever", "buy now", "cheap", "bargain", "discount", "it's important to note", "moreover", "furthermore"];
  const hit = banned.filter((b) => allText.includes(b));
  must(hit.length === 0, `banned phrases found: ${hit.join(", ")}`);

  // ---- US spelling ----
  must(!/\b(fibre|colour|optimise|neighbour|metre|litre)\b/.test(allText), "use US spelling (fiber/color/optimize/etc.)");

  // ---- pinterest image (warn only) ----
  if (!post.seo?.social?.pinterestImage) warn.push("no pinterestImage set — add a vertical 2:3 pin image (falling back to hero)");

  // ---- report ----
  if (errors.length) {
    anyFail = true;
    console.log(`\n✗ ${file} — ${errors.length} error(s):`);
    errors.forEach((e) => console.log(`   • ${e}`));
  } else {
    console.log(`\n✓ ${file} — PASS`);
  }
  warn.forEach((w) => console.log(`   ⚠ ${w}`));

  // helpers — declared here but hoisted, so the checks above can call them.
  // They close over this iteration's `errors`/`warn`, so they stay in the loop.
  function must(cond, msg) { if (!cond) errors.push(msg); }
  function lenRange(s, min, max, name) { const n = (s || "").length; if (n < min || n > max) errors.push(`${name} length ${n} not in ${min}-${max}`); }
  function inRange(n, min, max, name) { if (n < min || n > max) errors.push(`${name}: ${n} not in ${min}-${max}`); }
}

function collectText(post) {
  const parts = [post.title, post.hero?.excerpt, post.seo?.metaTitle, post.seo?.metaDescription, post.seo?.social?.excerpt];
  (post.blocks || []).forEach((b) => parts.push(b.heading, b.body, b.eyebrow, ...(b.items || []).map((i) => typeof i === "string" ? i : `${i.value} ${i.label} ${i.title || ""}`), ...(b.steps || []).map((s) => `${s.title} ${s.body}`), ...(b.rows || []).flat()));
  (post.quickAnswer?.items || []).forEach((i) => parts.push(i));
  (post.faq?.items || []).forEach((i) => parts.push(i.q, i.a));
  return parts.filter(Boolean).join(" ");
}

process.exit(anyFail ? 1 : 0);
