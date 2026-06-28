"use client";

import { useState } from "react";
import Link from "next/link";
import { Img } from "@/components/blog/ui/Img";
import { Icon } from "@/components/site/Icon";

/**
 * VideoSection - "What to watch now" + a "Watch More" rail.
 *
 * One main player at the top. The rail below holds 4-5 videos; clicking one
 * swaps it into the main player (click-to-load facade, so YouTube only loads on
 * an explicit play). This mirrors the reference layout where choosing another
 * thumbnail transfers that video into the hero player.
 *
 * VIDEOS: each item has a YouTube `id` + a poster image already in the repo and
 * a topical title/blurb. Replace the `id`s with real DOTDAY uploads as they go
 * live; posters fall back to a branded placeholder if a file is missing.
 */

interface VideoItem {
  id: string; // YouTube video id
  title: string;
  blurb: string;
  poster: string;
  posterAlt: string;
  /** optional link to the matching article */
  href?: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: "sIYhfyyYJaA",
    title: "Professional installation, start to finish",
    blurb:
      "The prep, the overlap, the staple spacing, and the finish that makes a landscape fabric install last. The same build pros rely on for beds, hardscape, and drainage.",
    poster: "/home/installs/xbar-walkway.webp",
    posterAlt: "DOTDAY landscape fabric professional installation",
    href: "/how-to-install-weed-barrier-fabric",
  },
  {
    id: "sIYhfyyYJaA",
    title: "Weed barrier under pavers and gravel",
    blurb:
      "Why a light garden cloth pumps and tears under a paver base, and the dual-layer build that holds up under load.",
    poster: "/home/realjobs/tile-gravel.webp",
    posterAlt: "XBAR weed barrier under gravel and pavers",
    href: "/post/weed-barrier-under-pavers",
  },
  {
    id: "sIYhfyyYJaA",
    title: "SHIELD in garden beds and rows",
    blurb:
      "Laying 3.2oz woven SHIELD across beds and farm rows: clean cuts, plant openings, and weed control that lets water through.",
    poster: "/home/installs/shield-beds.webp",
    posterAlt: "DOTDAY SHIELD woven fabric in garden beds",
    href: "/post/woven-vs-non-woven-landscape-fabric",
  },
  {
    id: "sIYhfyyYJaA",
    title: "TERRA for drainage and separation",
    blurb:
      "Where a non-woven geotextile belongs: French drains, retaining walls, and keeping soil and aggregate from mixing.",
    poster: "/home/installs/terra-separation.webp",
    posterAlt: "DOTDAY TERRA geotextile for drainage and separation",
    href: "/post/landscape-fabric-thickness-chart",
  },
  {
    id: "sIYhfyyYJaA",
    title: "Cutting and seaming fabric the right way",
    blurb:
      "Overlap seams, secure spacing, and how to cut around obstacles so the barrier stays put and weeds stay out.",
    poster: "/home/gal-cutting.webp",
    posterAlt: "Cutting and seaming DOTDAY landscape fabric",
    href: "/how-to-install-weed-barrier-fabric",
  },
];

export function VideoSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const active = VIDEOS[activeIndex];

  const select = (i: number) => {
    setActiveIndex(i);
    setPlayingId(null); // show the poster of the newly selected video first
  };

  return (
    <section className="bvid-wrap" aria-label="Watch: landscape fabric videos">
      <div className="wrap">
        <span className="bvid-eyebrow">What to watch now</span>

        <div className="bvid-grid">
          <div className="bvid-copy">
            <h2>{active.title}.</h2>
            <p>{active.blurb}</p>
            {active.href && (
              <Link href={active.href} className="link-arrow link-arrow--strong">
                Read the related guide
                <Icon name="arrowRight" size={15} />
              </Link>
            )}
          </div>

          <div className="bvid-media">
            {playingId ? (
              <div className="bvid-frame">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${playingId}?rel=0&modestbranding=1&autoplay=1`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <button
                type="button"
                className="bvid-frame bvid-facade"
                onClick={() => setPlayingId(active.id)}
                aria-label={`Play video: ${active.title}`}
              >
                <Img src={active.poster} alt={active.posterAlt} ratio="r-169" />
                <span className="bvid-play" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>

        <div className="bwatch">
          <span className="bwatch-label">Watch more</span>
          <div className="bwatch-rail">
            {VIDEOS.map((v, i) => (
              <button
                type="button"
                key={`${v.id}-${i}`}
                className={`bwatch-card${i === activeIndex ? " is-active" : ""}`}
                onClick={() => select(i)}
                aria-pressed={i === activeIndex}
                aria-label={`Load video: ${v.title}`}
              >
                <span className="bwatch-media">
                  <Img src={v.poster} alt={v.posterAlt} ratio="r-169" />
                  <span className="bwatch-play" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
                <span className="bwatch-title">{v.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
