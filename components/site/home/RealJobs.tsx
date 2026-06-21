"use client";

import { useRef } from "react";
import { Icon } from "@/components/site/Icon";

/**
 * RealJobs - "Real Jobs. Real Ground. Real DOTDAY."
 *
 * Horizontal-scroll media wall of field content: install photos, social posts,
 * and short looping clips. Tiles are portrait and varying widths, scrolled with
 * a neon arrow control (and native touch/trackpad scroll).
 *
 * Each tile is a discriminated union on `kind`: "image" | "video". Videos
 * autoplay muted + loop + playsInline (so they play inline on mobile and never
 * block) with a poster as the permanent fallback. Swap the MEDIA entries for
 * the real assets later - the layout is content-driven and needs no code edits.
 *
 * Placeholder assets live in public/brand/home/realjobs/.
 */

type Tile =
  | {
      kind: "image";
      src: string;
      alt: string;
      span?: "wide" | "tall";
      caption?: string;
      tag?: string;
    }
  | {
      kind: "video";
      src: string;
      poster: string;
      alt: string;
      span?: "wide" | "tall";
      caption?: string;
      tag?: string;
    };

const MEDIA: Tile[] = [
  {
    kind: "image",
    src: "/brand/home/realjobs/tile-gravel.webp",
    alt: "DOTDAY XBAR fabric laid under gravel along a side-yard path",
    tag: "XBAR",
    caption: "Gravel path, AZ",
  },
  {
    kind: "video",
    src: "/brand/home/realjobs/clip-1.mp4",
    poster: "/brand/home/realjobs/poster-1.webp",
    alt: "Watering seedlings planted through DOTDAY SHIELD weed barrier",
    span: "tall",
    tag: "SHIELD",
    caption: "Market garden",
  },
  {
    kind: "image",
    src: "/brand/home/realjobs/tile-beds.webp",
    alt: "Seedlings planted in even rows through DOTDAY SHIELD fabric",
    tag: "SHIELD",
    caption: "Farm rows, OR",
  },
  {
    kind: "image",
    src: "/brand/home/realjobs/tile-water.webp",
    alt: "Water draining through permeable DOTDAY SHIELD woven fabric",
    span: "wide",
    tag: "SHIELD",
    caption: "Permeability test",
  },
  {
    kind: "video",
    src: "/brand/home/realjobs/clip-2.mp4",
    poster: "/brand/home/realjobs/poster-2.webp",
    alt: "Rolling out DOTDAY woven fabric across a planting plot",
    span: "tall",
    tag: "XBAR",
    caption: "Roll out",
  },
  {
    kind: "image",
    src: "/brand/home/realjobs/tile-terra.webp",
    alt: "Worker unrolling DOTDAY TERRA non-woven geotextile on a slope",
    tag: "TERRA",
    caption: "Slope separation",
  },
];

export function RealJobs() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="rjobs" aria-label="DOTDAY in the field">
      <div className="wrap rjobs-head">
        <h2 className="rjobs-title">
          Real <mark>Jobs</mark>. Real <mark>Ground</mark>. Real{" "}
          <mark>DOTDAY</mark>.
        </h2>
        <p className="rjobs-sub">
          From gravel paths to farms to market gardens, here is DOTDAY fabric on
          the job across the US.
        </p>
      </div>

      <div className="rjobs-rail">
        <div className="rjobs-track" ref={trackRef}>
          {MEDIA.map((m, i) => (
            <figure
              className={`rjobs-tile${m.span ? ` is-${m.span}` : ""}`}
              key={`${m.src}-${i}`}
            >
              {m.kind === "video" ? (
                <video
                  className="rjobs-media"
                  poster={m.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={m.alt}
                >
                  <source src={m.src} type="video/mp4" />
                </video>
              ) : (
                <img
                  className="rjobs-media"
                  src={m.src}
                  alt={m.alt}
                  loading="lazy"
                  width={800}
                  height={1100}
                />
              )}

              {m.kind === "video" && (
                <span className="rjobs-playbadge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              )}

              {(m.tag || m.caption) && (
                <figcaption className="rjobs-cap">
                  {m.tag && <span className="rjobs-tag">{m.tag}</span>}
                  {m.caption && <span className="rjobs-captext">{m.caption}</span>}
                </figcaption>
              )}
            </figure>
          ))}
        </div>

        <button
          type="button"
          className="rjobs-arrow rjobs-arrow--prev"
          aria-label="Scroll left"
          onClick={() => scrollBy(-1)}
        >
          <Icon name="arrowRight" size={20} />
        </button>
        <button
          type="button"
          className="rjobs-arrow rjobs-arrow--next"
          aria-label="Scroll right"
          onClick={() => scrollBy(1)}
        >
          <Icon name="arrowRight" size={20} />
        </button>
      </div>
    </section>
  );
}
