import { Fragment } from "react";
import { Img } from "@/components/primitives/Img";
import { CTAButton } from "@/components/primitives/Badge";
import type { LandingHeroSection } from "@/lib/landing/types";

/**
 * LandingHero - the split landing hero: copy on the left (eyebrow, headline with
 * an optional neon highlight, subheading, two CTAs, optional trust line) and a
 * wide 16:11 photo on the right carrying an optional caption chip. Mirrors the
 * homepage hero's split feel in its own .lhs-* namespace. Headline uses Wix
 * Madefor Text (the only brand font). All right-side pieces are optional, so a
 * bare hero (heading + image) still renders cleanly.
 */

/** Split `heading` around the first occurrence of `highlight`, wrapping that
 *  run in <mark>. Falls back to the plain heading when highlight is absent. */
function renderHeading(heading: string, highlight?: string) {
  if (!highlight) return heading;
  const idx = heading.indexOf(highlight);
  if (idx === -1) return heading;
  return (
    <Fragment>
      {heading.slice(0, idx)}
      <mark>{highlight}</mark>
      {heading.slice(idx + highlight.length)}
    </Fragment>
  );
}

export function LandingHero({ data }: { data: LandingHeroSection }) {
  return (
    <section className="lhs">
      <div className="wrap lhs-grid">
        <div className="lhs-copy">
          {data.eyebrow && <span className="lhs-ey">{data.eyebrow}</span>}
          <h1 className="lhs-h1">{renderHeading(data.heading, data.highlight)}</h1>
          {data.subheading && <p className="lhs-sub">{data.subheading}</p>}
          {(data.primaryCta || data.secondaryCta) && (
            <div className="lhs-cta">
              {data.primaryCta && (
                <CTAButton href={data.primaryCta.href}>{data.primaryCta.label}</CTAButton>
              )}
              {data.secondaryCta && (
                <CTAButton href={data.secondaryCta.href} variant="ghost">
                  {data.secondaryCta.label}
                </CTAButton>
              )}
            </div>
          )}
          {data.trust && data.trust.length > 0 && (
            <p className="lhs-trust">
              {data.trust.map((t, i) => (
                <Fragment key={i}>
                  {i > 0 && <span className="lhs-trust-dot"> · </span>}
                  {t}
                </Fragment>
              ))}
            </p>
          )}
        </div>

        <div className="lhs-media">
          <Img
            src={data.image?.ref}
            alt={data.image?.alt || data.heading}
            ratio="r-1611"
            priority
            placeholderLabel={data.caption?.label || data.image?.alt}
          />
          {data.caption && (
            <span className="lhs-cap">
              <b>{data.caption.label}</b>
              {data.caption.context ? ` ${data.caption.context}` : ""}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
