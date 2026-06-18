import fs from "node:fs";
import path from "node:path";
import type { BlogPost, ImageRef } from "@/lib/blog/types";

/**
 * Resolve an image ref (from the schema) to a real /public URL for next/image.
 *
 * The schema stores image *refs* (e.g. "hero", "shield-roll", or a Drive file
 * ID) rather than hardcoded paths. The image pipeline downloads + optimizes the
 * real DOTDAY Drive photos into:
 *
 *   /public/blog/<slug>/<ref>.webp
 *
 * Resolution order:
 *   1. post.images[ref] if it's already an absolute path or full URL
 *   2. /blog/<slug>/<ref>.webp  (the convention) IF the file exists on disk
 *   3. undefined -> the <Img> component shows a branded placeholder
 *
 * Checking existence (at build time, server side) means a post with not-yet-
 * sourced images renders cleanly with placeholders instead of broken <img>
 * 404s, while a real dropped-in WebP "just works" with no code change.
 */

const PUBLIC_DIR = path.join(process.cwd(), "public");

function fileExists(publicPath: string): boolean {
  try {
    return fs.existsSync(path.join(PUBLIC_DIR, publicPath.replace(/^\//, "")));
  } catch {
    return false;
  }
}

export function resolveImage(
  post: Pick<BlogPost, "slug" | "images">,
  ref: string
): string | undefined {
  const mapped = post.images?.[ref];
  if (mapped && mapped.startsWith("http")) return mapped;
  if (mapped && mapped.startsWith("/")) {
    return fileExists(mapped) ? mapped : undefined;
  }

  // strip any extension the author may have included in the ref
  const clean = ref.replace(/\.(webp|png|jpe?g|gif|avif)$/i, "");
  const candidate = `/blog/${post.slug}/${clean}.webp`;
  return fileExists(candidate) ? candidate : undefined;
}

export function imageProps(
  post: Pick<BlogPost, "slug" | "images">,
  image: ImageRef
) {
  return {
    src: resolveImage(post, image.ref),
    alt: image.alt,
    caption: image.caption,
  };
}
