import { Fragment } from "react";
import { CTAButton } from "@/components/primitives/Badge";
import { Icon } from "@/components/site/Icon";
import type { SplitHeroData } from "@/lib/home/types";

/**
 * HomeHero / splitHero - "Option C, white" marketing hero, now data-driven.
 *
 * Light-ground hero: charcoal headline with a neon block-highlight on one line,
 * paired with a tall photo/video card carrying a stat overlay. The markup is
 * byte-identical to the original hardcoded version (same chero-* classes), so
 * the homepage renders pixel-for-pixel the same; only the content now comes from
 * `data` instead of inline JSX + module constants.
 *
 * VIDEO SLOT: when card.videoMp4/webm is set, the card loops the video with the
 * still (card.image) as poster + permanent fallback; otherwise it shows the
 * still. (Unchanged behavior, now expressed in data.)
 *
 * DEFAULT_SPLIT_HERO holds today's exact content so the live homepage is
 * unchanged during the Option-A migration. When content/home.json lands, the
 * homepage passes JSON instead of this default.
 */

export const DEFAULT_SPLIT_HERO: SplitHeroData = {
  _type: "splitHero",
  eyebrow: "Professional landscape fabric",
  headline: {
    lines: ["Right fabric.", "Right ground.", "Every time."],
    highlightLine: 1,
  },
  subheading:
    "Weed barrier, hardscape fabric, and geotextile are not interchangeable. DOTDAY makes three fabrics built for three jobs, shipped from the USA so your install holds up.",
  ctas: [
    { label: "Find Your Fabric", href: "/fabric-finder", variant: "primary" },
    { label: "Use the Fabric Calculator", href: "/landscape-fabric-calculator", variant: "ghost" },
  ],
  trust: [
    { lead: "500K+ sq ft", rest: " sold" },
    { lead: "48 states", rest: " shipped" },
    { lead: "UV-stabilized", rest: " construction" },
  ],
  card: {
    tag: "XBAR on the job",
    image: "/home/gal-rollout.webp",
    imageAlt: "DOTDAY landscape fabric being installed on site",
    stats: [
      { value: "500K+", label: "Sq ft sold" },
      { value: "48", label: "States" },
      { value: "5.0", star: true, label: "On Amazon" },
    ],
  },
};

export function HomeHero({ data = DEFAULT_SPLIT_HERO }: { data?: SplitHeroData }) {
  const { eyebrow, headline, subheading, ctas, trust, card } = data;
  const hasVideo = Boolean(card.videoMp4 || card.videoWebm);

  return (
    <section className="chero">
      <div className="wrap chero-grid">
        <div className="chero-copy">
          {eyebrow && <span className="chero-ey">{eyebrow}</span>}
          <h1 className="chero-h1">
            {headline.lines.map((line, i) => (
              <Fragment key={i}>
                {i === headline.highlightLine ? <mark>{line}</mark> : line}
                {i < headline.lines.length - 1 && <br />}
              </Fragment>
            ))}
          </h1>
          {subheading && <p className="chero-sub">{subheading}</p>}
          {ctas && ctas.length > 0 && (
            <div className="chero-cta">
              {ctas.map((c, i) => (
                <CTAButton key={i} href={c.href} variant={c.variant || "primary"}>
                  {c.label}
                </CTAButton>
              ))}
            </div>
          )}
          {trust && trust.length > 0 && (
            <ul className="chero-trust">
              {trust.map((t, i) => (
                <li key={i}>
                  <strong>{t.lead}</strong>
                  {t.rest}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="chero-card">
          {card.tag && <span className="chero-tag">{card.tag}</span>}
          {hasVideo ? (
            <video
              className="chero-media"
              poster={card.image}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            >
              {card.videoWebm && <source src={card.videoWebm} type="video/webm" />}
              {card.videoMp4 && <source src={card.videoMp4} type="video/mp4" />}
            </video>
          ) : (
            <img
              className="chero-media"
              src={card.image}
              alt={card.imageAlt}
              width={1000}
              height={1250}
            />
          )}
          {card.stats && card.stats.length > 0 && (
            <div className="chero-stat">
              {card.stats.map((s) => (
                <div className="chero-statbox" key={s.label}>
                  <div className="chero-statn">
                    {s.value}
                    {s.star && <Icon name="star" size={16} className="chero-star" />}
                  </div>
                  <div className="chero-statl">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
