/**
 * VideoFeature - "See the difference" text + video split.
 *
 * Two-column section: a short brief on the left, an embedded video on the
 * right. The video box supports two modes via VIDEO below:
 *   - kind: "youtube"  -> privacy-friendly youtube-nocookie embed by id
 *   - kind: "mp4"      -> self-hosted <video> (poster + controls), file under
 *                          public/home/video/
 * Swap the VIDEO block to switch sources later; no other change needed.
 *
 * Light surface to match the rest of the page. The frame keeps a 16:9 ratio
 * with rounded corners and a soft shadow.
 */

type VideoConfig =
  | { kind: "youtube"; id: string; title: string }
  | { kind: "mp4"; src: string; poster?: string; title: string };

// Default: the provided YouTube video. To self-host instead, replace with:
// { kind: "mp4", src: "/home/video/dotday-install.mp4",
//   poster: "/home/video/dotday-install-poster.webp", title: "..." }
const VIDEO: VideoConfig = {
  kind: "youtube",
  id: "sIYhfyyYJaA",
  title: "DOTDAY landscape fabric in action",
};

const BULLETS = [
  "Cuts clean without fraying at the seams.",
  "Permeable build lets water and air reach the soil.",
  "UV-stabilized to hold up under mulch, gravel, and sun.",
];

export function VideoFeature() {
  return (
    <section className="vfeat wrap section" aria-label="DOTDAY in action">
      <div className="vfeat-grid">
        <div className="vfeat-copy">
          <span className="badge">See it in action</span>
          <h2>Watch DOTDAY fabric on a real install.</h2>
          <p>
            From roll-out to the finished surface, see how the right fabric goes
            down fast and lays flat. The same build pros rely on for beds,
            hardscape, and drainage, doing its job on site.
          </p>
          <ul className="vfeat-list">
            {BULLETS.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <a className="vfeat-cta" href="/fabric-finder">
            Find Your Fabric
          </a>
        </div>

        <div className="vfeat-media">
          <div className="vfeat-frame">
            {VIDEO.kind === "youtube" ? (
              <iframe
                className="vfeat-embed"
                src={`https://www.youtube-nocookie.com/embed/${VIDEO.id}?rel=0&modestbranding=1`}
                title={VIDEO.title}
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
                poster={VIDEO.poster}
                aria-label={VIDEO.title}
              >
                <source src={VIDEO.src} type="video/mp4" />
              </video>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
