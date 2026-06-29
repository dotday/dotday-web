"use client";

import { useRef } from "react";
import { Icon } from "@/components/site/Icon";
import type { RealJobsData } from "@/components/site/home/types";

/**
 * RealJobs - "Real Jobs. Real Ground. Real DOTDAY." Horizontal-scroll media wall
 * of field content: install photos and short looping clips. Portrait tiles of
 * varying widths, scrolled with a neon arrow control + native scroll. Videos
 * autoplay muted + loop + playsInline with a poster fallback.
 *
 * CLIENT BEHAVIOR PRESERVED: still a client component; the useRef + scrollBy
 * rail logic and the video autoplay markup are unchanged. Only the media tiles
 * moved into `data`.
 *
 * HEADLINE: the branded "Real [Jobs]. Real [Ground]. Real [DOTDAY]." headline
 * with inline neon marks is a fixed brand moment, kept as the default rendering.
 * Passing `data.heading` overrides it with plain text; omitting it (the default)
 * keeps the marked-up version exactly as before.
 */

export const DEFAULT_REAL_JOBS: RealJobsData = {
  _type: "realJobs",
  sub: "From gravel paths to farms to market gardens, here is DOTDAY fabric on the job across the US.",
  tiles: [
    { kind: "image", src: "/home/realjobs/tile-gravel.webp", alt: "DOTDAY XBAR fabric laid under gravel along a side-yard path", tag: "XBAR", caption: "Gravel path, AZ" },
    { kind: "video", src: "/home/realjobs/clip-1.mp4", poster: "/home/realjobs/poster-1.webp", alt: "Watering seedlings planted through DOTDAY SHIELD weed barrier", span: "tall", tag: "SHIELD", caption: "Market garden" },
    { kind: "image", src: "/home/realjobs/tile-beds.webp", alt: "Seedlings planted in even rows through DOTDAY SHIELD fabric", tag: "SHIELD", caption: "Farm rows, OR" },
    { kind: "image", src: "/home/realjobs/tile-water.webp", alt: "Water draining through permeable DOTDAY SHIELD woven fabric", span: "wide", tag: "SHIELD", caption: "Permeability test" },
    { kind: "video", src: "/home/realjobs/clip-2.mp4", poster: "/home/realjobs/poster-2.webp", alt: "Rolling out DOTDAY woven fabric across a planting plot", span: "tall", tag: "XBAR", caption: "Roll out" },
    { kind: "image", src: "/home/realjobs/tile-terra.webp", alt: "Worker unrolling DOTDAY TERRA non-woven geotextile on a slope", tag: "TERRA", caption: "Slope separation" },
  ],
};

export function RealJobs({ data = DEFAULT_REAL_JOBS }: { data?: RealJobsData }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="rjobs" aria-label="DOTDAY in the field">
      <div className="wrap rjobs-head">
        {data.heading ? (
          <h2 className="rjobs-title">{data.heading}</h2>
        ) : (
          <h2 className="rjobs-title">
            Real <mark>Jobs</mark>. Real <mark>Ground</mark>. Real{" "}
            <mark>DOTDAY</mark>.
          </h2>
        )}
        {data.sub && <p className="rjobs-sub">{data.sub}</p>}
      </div>

      <div className="rjobs-rail">
        <div className="rjobs-track" ref={trackRef}>
          {data.tiles.map((m, i) => (
            <figure className={`rjobs-tile${m.span ? ` is-${m.span}` : ""}`} key={`${m.src}-${i}`}>
              {m.kind === "video" ? (
                <video className="rjobs-media" poster={m.poster} autoPlay muted loop playsInline preload="metadata" aria-label={m.alt}>
                  <source src={m.src} type="video/mp4" />
                </video>
              ) : (
                <img className="rjobs-media" src={m.src} alt={m.alt} loading="lazy" width={800} height={1100} />
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

        <button type="button" className="rjobs-arrow rjobs-arrow--prev" aria-label="Scroll left" onClick={() => scrollBy(-1)}>
          <Icon name="arrowRight" size={20} />
        </button>
        <button type="button" className="rjobs-arrow rjobs-arrow--next" aria-label="Scroll right" onClick={() => scrollBy(1)}>
          <Icon name="arrowRight" size={20} />
        </button>
      </div>
    </section>
  );
}
