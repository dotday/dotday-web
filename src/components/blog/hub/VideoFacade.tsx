"use client";

import { useState } from "react";
import { Img } from "@/components/blog/ui/Img";

/**
 * VideoFacade - lazy YouTube embed. Shows a branded poster + play button; only
 * injects the iframe on click. This keeps the section from ever rendering as an
 * empty black box, and avoids loading YouTube (and its cookies/JS) until the
 * visitor actually wants the video.
 */
export function VideoFacade({
  id,
  poster,
  posterAlt,
  title,
}: {
  id: string;
  poster: string;
  posterAlt: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="bvid-frame">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className="bvid-frame bvid-facade"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
    >
      <Img src={poster} alt={posterAlt} ratio="r-169" />
      <span className="bvid-play" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}
