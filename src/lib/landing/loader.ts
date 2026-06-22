import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { LandingPage } from "@/lib/landing/types";

/**
 * Landing-page loader. Same drop-in model as the blog loader:
 * content/landing/<slug>.json renders at /l/<slug>. Adding a page = adding one
 * file; generateStaticParams reads this directory at build time.
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

/** Publicly visible (listings, sitemap, indexable). */
export function isPublic(page: LandingPage): boolean {
  if (page.status === "published" || page.status === "needs-update") return true;
  return isDev; // draft / in-review / planned: dev-only previews
}

/** All landing pages on disk (unfiltered), memoized. */
export function getAllLandingPages(): LandingPage[] {
  if (_cache) return _cache;
  if (!fs.existsSync(LANDING_DIR)) return (_cache = []);
  _cache = fs
    .readdirSync(LANDING_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => readJson(path.join(LANDING_DIR, f)))
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
