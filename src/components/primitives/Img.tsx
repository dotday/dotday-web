import Image from "next/image";

/**
 * Img - the single image primitive for the site.
 *
 * Wraps next/image (width/height -> CLS ~ 0, lazy by default, hero gets
 * priority). If a real /public image isn't there yet, it renders the branded
 * hatch placeholder from the reference design so layouts never look broken
 * during the image-sourcing step.
 *
 * Ratio classes (r-54 / r-43 / r-169) come from globals.css.
 */
export function Img({
  src,
  alt,
  ratio = "r-43",
  priority = false,
  placeholderLabel,
  focalPoint,
  intrinsic = false,
  sizes = "(max-width: 980px) 100vw, 860px",
}: {
  src?: string;
  alt: string;
  ratio?: "r-54" | "r-43" | "r-169" | "r-11" | "r-1611";
  priority?: boolean;
  placeholderLabel?: string;
  focalPoint?: string;
  /**
   * intrinsic: render the image at its own natural aspect ratio instead of
   * cropping it into a fixed `ratio` frame. Used by the blog hero so a tall or
   * odd-shaped photo fits fully (no crop, no letterbox) - the container simply
   * takes the image's height. Falls back to the ratio placeholder when there's
   * no src yet.
   */
  intrinsic?: boolean;
  sizes?: string;
}) {
  if (!src) {
    return (
      <div
        className={intrinsic ? "imgph imgph-intrinsic" : `imgph ${ratio}`}
        role="img"
        aria-label={alt}
      >
        <span>{placeholderLabel || alt}</span>
      </div>
    );
  }
  if (intrinsic) {
    // Natural-aspect render: a plain img with height:auto so the frame fits the
    // image exactly. next/image's fill/ratio path is for fixed-ratio crops; a
    // fit-to-image hero needs the intrinsic dimensions the browser derives here.
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        className="img-intrinsic"
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        style={{ objectPosition: focalPoint || "center" }}
      />
    );
  }
  return (
    <div className={`img-frame ${ratio}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        style={{ objectFit: "cover", objectPosition: focalPoint || "center" }}
      />
    </div>
  );
}
