import { CTAButton } from "@/components/blog/ui/Badge";
import { Icon } from "@/components/site/Icon";

/**
 * HomeHero - "Option C, white" marketing hero.
 *
 * Light-ground hero: charcoal headline with a neon block-highlight on
 * "Right ground.", paired with a tall photo card carrying a stat overlay.
 *
 * VIDEO SLOT: the card shows a still by default. To make the card loop a
 * video, set CARD_VIDEO_MP4 to a real path (e.g. "/home/hero.mp4").
 * The still (CARD_IMAGE) stays as the poster + permanent fallback, so the
 * hero is never blank before the MP4 exists.
 */

const CARD_IMAGE = "/home/gal-rollout.webp";
const CARD_VIDEO_MP4 = ""; // e.g. "/home/hero.mp4" to activate video
const CARD_VIDEO_WEBM = "";

const STATS: { n: string; star?: boolean; l: string }[] = [
  { n: "500K+", l: "Sq ft sold" },
  { n: "48", l: "States" },
  { n: "5.0", star: true, l: "On Amazon" },
];

export function HomeHero() {
  const hasVideo = Boolean(CARD_VIDEO_MP4 || CARD_VIDEO_WEBM);

  return (
    <section className="chero">
      <div className="wrap chero-grid">
        <div className="chero-copy">
          <span className="chero-ey">Professional landscape fabric</span>
          <h1 className="chero-h1">
            Right fabric.
            <br />
            <mark>Right ground.</mark>
            <br />
            Every time.
          </h1>
          <p className="chero-sub">
            Weed barrier, hardscape fabric, and geotextile are not
            interchangeable. DOTDAY makes three fabrics built for three jobs,
            shipped from the USA so your install holds up.
          </p>
          <div className="chero-cta">
            <CTAButton href="/fabric-finder" variant="primary">
              Find Your Fabric
            </CTAButton>
            <CTAButton href="/landscape-fabric-calculator" variant="ghost">
              Use the Fabric Calculator
            </CTAButton>
          </div>
          <ul className="chero-trust">
            <li>
              <strong>500K+ sq ft</strong> sold
            </li>
            <li>
              <strong>48 states</strong> shipped
            </li>
            <li>
              <strong>UV-stabilized</strong> construction
            </li>
          </ul>
        </div>

        <div className="chero-card">
          <span className="chero-tag">XBAR on the job</span>
          {hasVideo ? (
            <video
              className="chero-media"
              poster={CARD_IMAGE}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            >
              {CARD_VIDEO_WEBM && <source src={CARD_VIDEO_WEBM} type="video/webm" />}
              {CARD_VIDEO_MP4 && <source src={CARD_VIDEO_MP4} type="video/mp4" />}
            </video>
          ) : (
            <img
              className="chero-media"
              src={CARD_IMAGE}
              alt="DOTDAY landscape fabric being installed on site"
              width={1000}
              height={1250}
            />
          )}
          <div className="chero-stat">
            {STATS.map((s) => (
              <div className="chero-statbox" key={s.l}>
                <div className="chero-statn">
                  {s.n}
                  {s.star && <Icon name="star" size={16} className="chero-star" />}
                </div>
                <div className="chero-statl">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
