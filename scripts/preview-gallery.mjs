#!/usr/bin/env node
/**
 * preview-gallery.mjs - one self-contained HTML catalog of EVERY landing
 * section that has a real, live example in content, rendered through the REAL
 * components + globals.css + fonts via scripts/preview-page.mjs.
 *
 *   npm run preview:gallery
 *   -> preview/section-gallery-PREVIEW.html   (open in any browser)
 *
 * WHY: when designing a new landing page, open this file and pick sections by
 * sight instead of re-assembling ad-hoc previews every session. Because each
 * example is HARVESTED from live content (content/landing/pages, /custom,
 * content/home.json) and rendered through the repo's own components, the
 * gallery can never drift from production - regenerate it any time a section
 * is redesigned or a new one ships.
 *
 * Each section is preceded by a neon `callout` divider naming its `_type`,
 * component family, and the content file the example came from. Registered
 * types with no live usage yet are listed at the end of the console output.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, unlinkSync, renameSync, mkdirSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUTDIR = join(ROOT, "preview");

/* ---------- 1. what is allowed on a landing page (validator = truth) ---------- */

const validatorSrc = readFileSync(join(ROOT, "scripts", "validate-landing.mjs"), "utf8");
const approvedMatch = validatorSrc.match(/APPROVED\s*=\s*new Set\(\[([\s\S]*?)\]\)/);
if (!approvedMatch) {
  console.error("could not locate the APPROVED Set in scripts/validate-landing.mjs");
  process.exit(1);
}
const APPROVED = new Set([...approvedMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]));

/* ---------- 2. harvest one live example per _type ---------- */

// Priority order: curated landing pages first, then custom pages, then home.
const sources = [];
for (const dir of ["pages", "custom"]) {
  const abs = join(ROOT, "content", "landing", dir);
  if (!existsSync(abs)) continue;
  for (const f of readdirSync(abs).filter((f) => f.endsWith(".json"))) {
    sources.push({ file: `content/landing/${dir}/${f}`, abs: join(abs, f), surface: "landing" });
  }
}
sources.push({ file: "content/home.json", abs: join(ROOT, "content", "home.json"), surface: "home" });

// _type -> component family (for the divider label), from the section folders.
const FAMILY = {};
const sectionsRoot = join(ROOT, "src", "components", "sections");
if (existsSync(sectionsRoot)) {
  for (const fam of readdirSync(sectionsRoot, { withFileTypes: true }).filter((d) => d.isDirectory())) {
    for (const entry of readdirSync(join(sectionsRoot, fam.name))) {
      const base = entry.replace(/\.(tsx|ts)$/, "");
      FAMILY[base.charAt(0).toLowerCase() + base.slice(1)] = fam.name;
    }
  }
}

const picked = new Map(); // _type -> { section, source, images }
for (const src of sources) {
  let page;
  try { page = JSON.parse(readFileSync(src.abs, "utf8")); } catch { continue; }
  const imgs = page.images || {};
  const slug = page.slug || "";
  for (const section of page.sections || []) {
    const t = section && section._type;
    if (!t || picked.has(t)) continue;
    if (!APPROVED.has(t)) continue; // only what a landing page may actually use
    picked.set(t, { section, source: src, pageImages: imgs, pageSlug: slug, surface: src.surface });
  }
}

/* ---------- 3. rebase image refs so every example shows its real photos ---------- */
// Landing content uses { ref, alt } + a page-level images map. The gallery page
// gets its own merged images map with collision-proof keys; sections are deep-
// cloned with refs rewritten to those keys. Home sections use direct /public
// paths (no ref/alt), which the harness inlines automatically - left untouched.

const galleryImages = {};
let refSeq = 0;
function rebaseRefs(node, ctx) {
  if (Array.isArray(node)) return node.map((n) => rebaseRefs(n, ctx));
  if (node && typeof node === "object") {
    if (typeof node.ref === "string" && typeof node.alt === "string") {
      const key = `g${refSeq++}-${node.ref.replace(/[^a-zA-Z0-9_-]/g, "")}`;
      const mapped = ctx.pageImages[node.ref];
      galleryImages[key] = typeof mapped === "string" && mapped.startsWith("/")
        ? mapped
        : `/${ctx.surface}/${ctx.pageSlug}/${node.ref.replace(/\.(webp|png|jpe?g|gif|avif)$/i, "")}.webp`;
      return { ...node, ref: key };
    }
    const o = {};
    for (const [k, v] of Object.entries(node)) o[k] = rebaseRefs(v, ctx);
    return o;
  }
  return node;
}

/* ---------- 4. assemble the gallery page (divider callout + example, repeated) ---------- */

// Stable, design-review-friendly order: hero first, then by family.
const ORDER = ["heroes", "narrative", "product", "media", "proof", "editorial", "conversion", "_core"];
const entries = [...picked.entries()].sort((a, b) => {
  const fa = ORDER.indexOf(FAMILY[a[0]] || "_core");
  const fb = ORDER.indexOf(FAMILY[b[0]] || "_core");
  return fa === fb ? a[0].localeCompare(b[0]) : fa - fb;
});

const gallerySections = [];
for (const [t, e] of entries) {
  gallerySections.push({
    _type: "callout",
    variant: "note",
    heading: `Section: ${t}`,
    body: `Family: ${FAMILY[t] || "adapter"} - live example from ${e.source.file}`,
  });
  gallerySections.push(rebaseRefs(e.section, e));
}

const galleryPage = {
  schemaVersion: 1,
  slug: ".section-gallery",
  title: "DOTDAY Section Gallery",
  status: "draft",
  images: galleryImages,
  sections: gallerySections,
};

/* ---------- 5. render through the real harness, then clean up ---------- */

const tmpJson = join(ROOT, "content", "landing", ".section-gallery.json");
writeFileSync(tmpJson, JSON.stringify(galleryPage, null, 2));
mkdirSync(OUTDIR, { recursive: true });
try {
  const r = spawnSync("node", [join(__dirname, "preview-page.mjs"), "landing", ".section-gallery"], {
    stdio: "inherit",
    cwd: ROOT,
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
} finally {
  try { unlinkSync(tmpJson); } catch {}
}

const from = join(OUTDIR, ".section-gallery-PREVIEW.html");
const to = join(OUTDIR, "section-gallery-PREVIEW.html");
if (existsSync(from)) renameSync(from, to);

const unused = [...APPROVED].filter((t) => !picked.has(t)).sort();
console.log(`gallery: ${picked.size} section types with live examples -> preview/section-gallery-PREVIEW.html`);
if (unused.length) {
  console.log(`approved but no live example yet (not in gallery): ${unused.join(", ")}`);
}
