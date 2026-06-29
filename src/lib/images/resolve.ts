import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Shared image resolution - the ONE resolver used by every surface (blog,
 * landing, profile, custom, home).
 *
 * WHY THIS EXISTS
 * Before this module, blog and landing resolved image refs DIFFERENTLY:
 *   - blog:    images[ref] (Drive ID or path) -> /blog/<slug>/<ref>.webp
 *   - landing: no resolver at all; the ref had to already be a literal /public path
 * That meant the same section could not be reused across surfaces - an image ref
 * that worked on a blog post rendered a placeholder on a landing page. This
 * module unifies the contract so a section is truly portable: it resolves the
 * same way no matter which surface renders it.
 *
 * THE CONTRACT (identical on every surface)
 * A page carries an optional `images` map of ref -> (path | URL | Drive ID), and
 * each image is referenced by a short `ref`. Resolution order:
 *   1. images[ref] when it's an absolute URL (http...)        -> used as-is
 *   2. images[ref] when it's an absolute /public path         -> used IF the file exists
 *   3. /<base>/<slug>/<ref>.webp  (the per-surface convention) -> used IF the file exists
 *   4. otherwise undefined  -> <Img> renders the branded placeholder (never a broken 404)
 *
 * The only per-surface difference is the BASE directory under /public:
 *   blog -> "blog", landing -> "landing", profile -> "profile".
 * Everything else is shared, so improving resolution improves it everywhere.
 *
 * Drive IDs (case 3 fallback when no file exists yet) intentionally resolve to a
 * placeholder until the image pipeline has materialized the optimized WebP into
 * /public/<base>/<slug>/<ref>.webp. This keeps not-yet-sourced pages rendering
 * cleanly during authoring.
 */

const PUBLIC_DIR = path.join(process.cwd(), "public");

function fileExists(publicPath: string): boolean {
  try {
    return fs.existsSync(path.join(PUBLIC_DIR, publicPath.replace(/^\//, "")));
  } catch {
    return false;
  }
}

export interface ResolvableImageSource {
  /** URL slug; together with `base` forms /<base>/<slug>/<ref>.webp. */
  slug: string;
  /** Optional ref -> (path | URL | Drive ID) overrides. */
  images?: Record<string, string>;
}

/**
 * Resolve one image ref to a real /public URL (or undefined for a placeholder).
 * `base` is the /public subdirectory for the surface ("blog" | "landing" | ...).
 */
export function resolveImageRef(
  source: ResolvableImageSource,
  ref: string,
  base: string
): string | undefined {
  const mapped = source.images?.[ref];
  if (mapped && mapped.startsWith("http")) return mapped;
  if (mapped && mapped.startsWith("/")) {
    return fileExists(mapped) ? mapped : undefined;
  }

  // strip any extension the author may have included in the ref
  const clean = ref.replace(/\.(webp|png|jpe?g|gif|avif)$/i, "");
  const candidate = `/${base}/${source.slug}/${clean}.webp`;
  return fileExists(candidate) ? candidate : undefined;
}
