"use client";
import { useState } from "react";
import { Img } from "@/components/primitives/Img";
import type { VideoPlaylistSection } from "./VideoPlaylist.types";

/**
 * VideoPlaylist - featured player + "Watch more" selector rail with in-box
 * playback. Ported from the approved my-qr-zone V3 proof. Schema-first: shape
 * lives in VideoPlaylist.schema.json (VideoPlaylist.types.ts is generated).
 *
 * Playback is click-to-load (a poster button), so no third-party script or
 * iframe loads until the user plays - same facade pattern as VideoFacade.
 * mp4 takes precedence over youtubeId; YouTube goes through youtube-nocookie.
 * Classes are vpl-* in globals.css (namespaced; the older bvid-* belongs to
 * homeVideoFeature and is untouched).
 */
export function VideoPlaylist({ data }: { data: VideoPlaylistSection }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const v = data.videos[Math.min(active, data.videos.length - 1)];

  const select = (i: number) => { setActive(i); setPlaying(false); };

  return (
    <section className="vpl-wrap sec" aria-label={data.eyebrow || "Video playlist"}>
      <div className="wrap">
        {data.eyebrow && <span className="vpl-eyebrow">{data.eyebrow}</span>}
        <div className="vpl-grid">
          <div className="vpl-copy">
            <h2>{v.title.endsWith(".") ? v.title : `${v.title}.`}</h2>
            {v.blurb && <p>{v.blurb}</p>}
            {data.link && (
              <a className="vpl-link" href={data.link.href}>
                {data.link.label}{" "}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            )}
          </div>
          <div className="vpl-media">
            {playing ? (
              <div className="vpl-frame">
                {v.mp4 ? (
                  <video src={v.mp4} controls autoPlay playsInline title={v.title} aria-label={v.title} />
                ) : (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?rel=0&modestbranding=1&autoplay=1`}
                    title={v.title}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                )}
              </div>
            ) : (
              <button type="button" className="vpl-frame vpl-facade" onClick={() => setPlaying(true)} aria-label={`Play: ${v.title}`}>
                <Img src={v.poster?.ref} alt={v.poster?.alt || v.title} ratio="r-169" placeholderLabel={v.title} />
                <span className="vpl-play" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </button>
            )}
          </div>
        </div>
        {data.videos.length > 1 && (
          <div className="vpl-more">
            <span className="vpl-label">{data.railLabel || "Watch more"}</span>
            <div className="vpl-rail" role="tablist" aria-label="More videos">
              {data.videos.map((item, i) => (
                <button
                  type="button"
                  key={i}
                  role="tab"
                  aria-selected={i === active}
                  className={`vpl-card${i === active ? " is-active" : ""}`}
                  onClick={() => select(i)}
                >
                  <span className="vpl-card-media">
                    <Img src={item.poster?.ref} alt={item.poster?.alt || item.title} ratio="r-169" placeholderLabel={item.title} />
                    <span className="vpl-card-play" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                    </span>
                  </span>
                  <span className="vpl-card-title">{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
