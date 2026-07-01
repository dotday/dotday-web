import { Img } from "@/components/primitives/Img";
import type { FeaturedGuideSection } from "./FeaturedGuide.types";

/**
 * FeaturedGuide - a split teaser that promotes a single article/field guide. A
 * neon copy panel (charcoal eyebrow, headline, byline, excerpt, and a read link)
 * sits beside a full-bleed photo. On the neon panel, text and the link are solid
 * charcoal for contrast (no glow - charcoal on neon reads on its own).
 *
 * Brand-locked: Wix Madefor Text only (var(--text)), palette CSS variables, the
 * .fg-* classes live in globals.css. Registry-path section ({ data } prop).
 */
export function FeaturedGuide({ data }: { data: FeaturedGuideSection }) {
  return (
    <section className="fg" aria-label={data.heading}>
      <div className="fg-panel">
        <div className="fg-inner">
          {data.eyebrow && <span className="fg-ey">{data.eyebrow}</span>}
          <h2 className="fg-h2">{data.heading}</h2>
          {data.byline && <p className="fg-by">{data.byline}</p>}
          {data.excerpt && <p className="fg-ex">{data.excerpt}</p>}
          <a className="fg-link" href={data.cta.href}>
            {data.cta.label}
          </a>
        </div>
      </div>
      <div className="fg-media">
        <Img
          src={data.image?.ref}
          alt={data.image?.alt || data.heading}
          ratio="r-43"
          placeholderLabel={data.eyebrow || data.heading}
          sizes="(max-width: 900px) 100vw, 640px"
        />
      </div>
    </section>
  );
}
