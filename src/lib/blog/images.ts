import type { BlogPost, ImageRef } from "@/lib/blog/types";
import { resolveImageRef } from "@/lib/images/resolve";

/**
 * Resolve a blog image ref to a real /public URL for next/image.
 *
 * This now delegates to the SHARED resolver (@/lib/images/resolve), which is the
 * single source of truth for image resolution across every surface. Blog's
 * convention is the "blog" base directory: /public/blog/<slug>/<ref>.webp.
 *
 * The public signature is unchanged, so every existing caller works as-is. See
 * @/lib/images/resolve for the full resolution order and rationale.
 */
export function resolveImage(
  post: Pick<BlogPost, "slug" | "images">,
  ref: string
): string | undefined {
  return resolveImageRef(post, ref, "blog");
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
