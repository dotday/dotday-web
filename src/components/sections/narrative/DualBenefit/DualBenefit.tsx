import { Fragment } from "react";
import { Img } from "@/components/primitives/Img";
import { CTAButton } from "@/components/primitives/Badge";
import type { DualBenefitSection } from "./DualBenefit.types";

/**
 * DualBenefit - a centered feature block that shows one product doing two jobs.
 * A charcoal + neon-glow eyebrow, a heading (with an optional neon `highlight`
 * word), and an intro sit above two image cards; each card carries a short
 * neon-soft tag, a titled benefit, and a paragraph. Optional closing CTA.
 *
 * Brand-locked: Wix Madefor Text only (var(--text)), palette CSS variables, the
 * .feat-* classes live in globals.css. Registry-path section ({ data } prop).
 */
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

export function DualBenefit({ data }: { data: DualBenefitSection }) {
  return (
    <section className="wrap feat">
      <div className="feat-head">
        {data.eyebrow && <span className="feat-ey">{data.eyebrow}</span>}
        <h2 className="feat-h2">{renderHeading(data.heading, data.highlight)}</h2>
        {data.intro && <p className="feat-sub">{data.intro}</p>}
      </div>

      <div className="feat-grid">
        {data.cards.map((c, i) => (
          <div className="feat-card" key={i}>
            <div className="feat-ar">
              <Img
                src={c.image?.ref}
                alt={c.image?.alt || c.title}
                ratio="r-43"
                placeholderLabel={c.tag || c.title}
                sizes="(max-width: 900px) 100vw, 560px"
              />
            </div>
            <div className="feat-cardbody">
              {c.tag && <span className="feat-tag">{c.tag}</span>}
              <h3 className="feat-cardtitle">{c.title}</h3>
              <p className="feat-cardtext">{c.body}</p>
            </div>
          </div>
        ))}
      </div>

      {data.cta && (
        <div className="feat-cta">
          <CTAButton href={data.cta.href} variant="ghost">
            {data.cta.label}
          </CTAButton>
        </div>
      )}
    </section>
  );
}
