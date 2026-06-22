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
  sizes = "(max-width: 980px) 100vw, 860px",
}: {
  src?: string;
  alt: string;
  ratio?: "r-54" | "r-43" | "r-169" | "r-11";
  priority?: boolean;
  placeholderLabel?: string;
  sizes?: string;
}) {
  if (!src) {
    return (
      <div className={`imgph ${ratio}`} role="img" aria-label={alt}>
        <span>{placeholderLabel || alt}</span>
      </div>
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
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
