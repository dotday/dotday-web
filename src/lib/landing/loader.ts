import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { LandingPage } from "@/lib/landing/types";

/**
 * Landing-page loader. Same drop-in model as the blog loader:
 * content/landing/**<slug>.json renders at /l/<slug>. Adding a page = adding one
 * file; generateStaticParams reads this directory tree at build time.
 *
 * Files are organised into subfolders by KIND, but the URL is always /l/<slug>
 * (or a root binding) regardless of which folder a file sits in - routing keys
 * off the `slug` field, never the path:
 *   content/landing/application/  - blog-like, application-specific pages
 *                                   (drainage, farms, driveways, ...) -> /l/<slug>
 *   content/landing/custom/       - bespoke-layout pages bound to a root URL
 *                                   (my-qrzone, how-to-install, pr, press-*)
 * Flat files left directly in content/landing/ are still picked up, so the
 * reorg is backward-compatible.
 *
 * Memoized for the build's lifetime (SSG calls it many times; without the cache
 * that is O(n^2) file reads). A fresh `next build` re-reads.
 */

const LANDING_DIR = path.join(process.cwd(), "content", "landing");
const isDev = process.env.NODE_ENV !== "production";

let _cache: LandingPage[] | null = null;

function readJson(file: string): LandingPage | null {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as LandingPage;
  } catch (err) {
    console.error(`[landing] failed to read ${file}:`, err);
    return null;
  }
}

/** Recursively collect every *.json path under content/landing (any depth). */
function collectJsonFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...collectJsonFiles(full));
    } else if (entry.isFile() && entry.name.endsWith(".json")) {
      out.push(full);
    }
  }
  return out;
}

/** Publicly visible (listings, sitemap, indexable). */
export function isPublic(page: LandingPage): boolean {
  if (page.status === "published" || page.status === "needs-update") return true;
  return isDev; // draft / in-review / planned: dev-only previews
}

/** All landing pages on disk (unfiltered), memoized. */
export function getAllLandingPages(): LandingPage[] {
  if (_cache) return _cache;
  if (!fs.existsSync(LANDING_DIR)) return (_cache = []);
  _cache = collectJsonFiles(LANDING_DIR)
    .map((f) => readJson(f))
    .filter((p): p is LandingPage => p !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  return _cache;
}

/** Public landing pages only. */
export function getPublicLandingPages(): LandingPage[] {
  return getAllLandingPages().filter(isPublic);
}

/** Slugs for generateStaticParams (drafts included in dev for preview). */
export function getAllLandingSlugs(): string[] {
  return getAllLandingPages()
    .filter((p) => (isDev ? true : isPublic(p)))
    .map((p) => p.slug);
}

/** One landing page by slug, or null. */
export function getLandingBySlug(slug: string): LandingPage | null {
  return getAllLandingPages().find((p) => p.slug === slug) ?? null;
}
