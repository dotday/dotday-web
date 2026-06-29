import type { HomeVideoFeatureData } from "@/lib/home/types";

/**
 * VideoFeature (home) - "See the difference" text + video split. A short brief on
 * the left, an embedded video on the right. The video box supports youtube
 * (privacy-friendly nocookie embed) or self-hosted mp4. Now data-driven; markup
 * byte-identical (vfeat-* classes). DEFAULT_HOME_VIDEO_FEATURE holds today's
 * content (the provided YouTube video).
 */

export const DEFAULT_HOME_VIDEO_FEATURE: HomeVideoFeatureData = {
  _type: "homeVideoFeature",
  badge: "See it in action",
  heading: "Watch DOTDAY fabric on a real install.",
  body: "From roll-out to the finished surface, see how the right fabric goes down fast and lays flat. The same build pros rely on for beds, hardscape, and drainage, doing its job on site.",
  bullets: [
    "Cuts clean without fraying at the seams.",
    "Permeable build lets water and air reach the soil.",
    "UV-stabilized to hold up under mulch, gravel, and sun.",
  ],
  ctaLabel: "Find Your Fabric",
  ctaHref: "/fabric-finder",
  video: {
    kind: "youtube",
    id: "sIYhfyyYJaA",
    title: "DOTDAY landscape fabric in action",
  },
};

export function VideoFeature({
  data = DEFAULT_HOME_VIDEO_FEATURE,
}: {
  data?: HomeVideoFeatureData;
}) {
  const { badge, heading, body, bullets, ctaLabel, ctaHref, video } = data;
  return (
    <section className="vfeat wrap section" aria-label="DOTDAY in action">
      <div className="vfeat-grid">
        <div className="vfeat-copy">
          {badge && <span className="badge">{badge}</span>}
          <h2>{heading}</h2>
          {body && <p>{body}</p>}
          {bullets && bullets.length > 0 && (
            <ul className="vfeat-list">
              {bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
          {ctaLabel && ctaHref && (
            <a className="vfeat-cta" href={ctaHref}>
              {ctaLabel}
            </a>
          )}
        </div>

        <div className="vfeat-media">
          <div className="vfeat-frame">
            {video.kind === "youtube" ? (
              <iframe
                className="vfeat-embed"
                src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1`}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <video
                className="vfeat-embed"
                controls
                playsInline
                preload="metadata"
                poster={video.poster}
                aria-label={video.title}
              >
                <source src={video.src} type="video/mp4" />
              </video>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
