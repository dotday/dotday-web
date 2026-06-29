import type { LandingPage, ImageRef } from "@/lib/landing/types";
import { resolveImageRef } from "@/lib/images/resolve";

/**
 * Resolve a landing-page image ref to a real /public URL for next/image.
 *
 * This is the fix for the cross-surface image-contract gap: landing pages now
 * resolve image refs through the SAME shared resolver blog uses, so a section
 * authored once renders its imagery correctly on a landing page, a blog post, or
 * a profile page. Landing's base directory is "landing":
 *   /public/landing/<slug>/<ref>.webp
 *
 * Authors may still pass a literal /public path or an absolute URL as a ref and
 * it is used directly (see @/lib/images/resolve for the full order). Existing
 * landing JSON that used literal paths keeps working.
 */
export function resolveLandingImage(
  page: Pick<LandingPage, "slug" | "images">,
  ref: string
): string | undefined {
  return resolveImageRef(page, ref, "landing");
}

/** Convenience: resolve an ImageRef to <Img>-ready props. */
export function landingImageProps(
  page: Pick<LandingPage, "slug" | "images">,
  image: ImageRef
) {
  return {
    src: resolveLandingImage(page, image.ref),
    alt: image.alt,
    caption: image.caption,
  };
}
