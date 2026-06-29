import "server-only";
import type { LandingSection, LandingPage, ImageRef } from "@/lib/landing/types";
import { resolveLandingImage } from "@/lib/landing/images";

/**
 * resolveSectionImages - the server-side pass that turns every image `ref` in a
 * section into a real /public URL before the section is rendered.
 *
 * WHY HERE (not in each section): section components are server components that
 * render <Img src={image.ref}>. Resolution needs `fs` (server-only) plus the
 * page slug + images map. Doing it once, centrally, over the whole section means:
 *   - section components stay unchanged (they still read image.ref; it's now a
 *     resolved URL, and <Img> treats a URL and a bare ref identically - a real
 *     file renders, a missing one falls back to the branded placeholder),
 *   - a NEW section that follows the {image|images|cards[].image} shape is
 *     covered automatically - no per-section wiring,
 *   - all the fs access lives on the server, never shipped to the client.
 *
 * The function is a pure, shallow-immutable rewrite: it returns a new section
 * object with image refs replaced, leaving the input untouched. It walks the
 * known image-bearing shapes across the section union (top-level `image`/`ogImage`
 * and one level of `cards[]`), which covers every section in the library today.
 */

type AnyRecord = Record<string, unknown>;

function isImageRef(v: unknown): v is ImageRef {
  return (
    typeof v === "object" &&
    v !== null &&
    typeof (v as AnyRecord).ref === "string" &&
    typeof (v as AnyRecord).alt === "string"
  );
}

/** Resolve a single ImageRef's `ref` to a URL (or leave undefined for placeholder). */
function resolveOne(
  page: Pick<LandingPage, "slug" | "images">,
  img: ImageRef
): ImageRef {
  const url = resolveLandingImage(page, img.ref);
  // Keep alt/caption; replace ref with the resolved URL when we have one. When
  // unresolved, pass the original ref through so <Img> shows the placeholder
  // (its `src` existence check handles a non-URL ref by rendering the hatch).
  return { ...img, ref: url ?? img.ref };
}

/** Deep-ish clone that rewrites any ImageRef found at the top level or inside arrays. */
function rewrite(
  page: Pick<LandingPage, "slug" | "images">,
  node: unknown
): unknown {
  if (isImageRef(node)) return resolveOne(page, node);
  if (Array.isArray(node)) return node.map((n) => rewrite(page, n));
  if (node && typeof node === "object") {
    const out: AnyRecord = {};
    for (const [k, v] of Object.entries(node as AnyRecord)) {
      out[k] = rewrite(page, v);
    }
    return out;
  }
  return node;
}

/** Resolve every image ref inside one section against the page context. */
export function resolveSectionImages(
  page: Pick<LandingPage, "slug" | "images">,
  section: LandingSection
): LandingSection {
  return rewrite(page, section) as LandingSection;
}
