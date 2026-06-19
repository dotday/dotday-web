import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { BlogPost } from "@/lib/blog/types";

/**
 * The content loader. This is what makes the system "drop-in":
 *
 *   content/blog/<slug>.json  ->  rendered at /post/<slug>
 *
 * Adding a post is literally adding one file here. Nothing else in the repo
 * changes - no index to edit, no import to register, no re-deploy of other
 * pages. generateStaticParams() reads this directory at build time, so a new
 * file becomes a new static route automatically.
 *
 * Posts with status 'draft' / 'in-review' are visible in `dev` (so you can
 * preview before committing) but are excluded from listings + sitemap in
 * production and rendered noindex.
 */

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const isDev = process.env.NODE_ENV !== "production";

function readJson(file: string): BlogPost | null {
  try {
    const raw = fs.readFileSync(file, "utf8");
    return JSON.parse(raw) as BlogPost;
  } catch (err) {
    // A malformed file should fail loudly in the build (validator catches it),
    // but never crash the whole listing at request time.
    console.error(`[content] failed to read ${file}:`, err);
    return null;
  }
}

/** True if a post should be publicly visible (listings, sitemap, no noindex). */
export function isPublic(post: BlogPost): boolean {
  if (post.status === "published" || post.status === "needs-update") return true;
  // draft / in-review / planned are dev-only previews
  return isDev;
}

/** All posts on disk (unfiltered). */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => readJson(path.join(BLOG_DIR, f)))
    .filter((p): p is BlogPost => p !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

/** Posts that should appear in public listings, newest first. */
export function getPublicPosts(): BlogPost[] {
  return getAllPosts().filter(isPublic);
}

/** Slugs for generateStaticParams. Includes drafts in dev so you can preview. */
export function getAllSlugs(): string[] {
  return getAllPosts()
    .filter((p) => (isDev ? true : isPublic(p)))
    .map((p) => p.slug);
}

/** A single post by slug, or null. */
export function getPostBySlug(slug: string): BlogPost | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}

/** Posts in a given category (public only). */
export function getPostsByCategory(category: string): BlogPost[] {
  return getPublicPosts().filter((p) => p.category === category);
}
