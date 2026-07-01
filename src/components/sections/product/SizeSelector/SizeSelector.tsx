import { Img } from "@/components/primitives/Img";
import { CTAButton } from "@/components/primitives/Badge";
import type { SizeSelectorSection } from "./SizeSelector.types";

/**
 * SizeSelector - a roll-size picker for a product. Left: the product pack image
 * with an optional badge. Right: a heading + intro, a grid of size tiles (each
 * showing dimensions, per-roll price, and a short use-case), a helper line, and
 * up to three CTAs. One tile can be `featured` to guide the default choice.
 *
 * Brand-locked: Wix Madefor Text only (var(--text)), palette CSS variables, and
 * the .sz-* classes live in globals.css alongside the other product sections.
 * Registry-path section: takes a uniform { data } prop, no renderer switch.
 */
export function SizeSelector({ data }: { data: SizeSelectorSection }) {
  return (
    <section className="wrap sz">
      <div className="sz-card">
        <div className="sz-media">
          <Img
            src={data.image?.ref}
            alt={data.image?.alt || data.heading}
            ratio="r-43"
            placeholderLabel={data.badge || data.heading}
            sizes="(max-width: 900px) 100vw, 380px"
          />
          {data.badge && <span className="sz-badge">{data.badge}</span>}
        </div>

        <div className="sz-body">
          <h2 className="sz-h2">{data.heading}</h2>
          {data.intro && <p className="sz-sub">{data.intro}</p>}

          <div className="sz-grid">
            {data.sizes.map((s, i) => (
              <div
                className={`sz-tile${s.featured ? " sz-tile--active" : ""}`}
                key={i}
              >
                <div className="sz-tr">
                  <span className="sz-dim">{s.dimensions}</span>
                  <span className="sz-price">{s.price}</span>
                </div>
                <span className="sz-use">{s.useCase}</span>
              </div>
            ))}
          </div>

          {data.helper && <p className="sz-help">{data.helper}</p>}

          {(data.primaryCta || data.secondaryCta || data.tertiaryCta) && (
            <div className="sz-cta">
              {data.primaryCta && (
                <CTAButton href={data.primaryCta.href}>
                  {data.primaryCta.label}
                </CTAButton>
              )}
              {data.secondaryCta && (
                <CTAButton href={data.secondaryCta.href} variant="ghost">
                  {data.secondaryCta.label}
                </CTAButton>
              )}
              {data.tertiaryCta && (
                <a className="sz-link" href={data.tertiaryCta.href}>
                  {data.tertiaryCta.label}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
