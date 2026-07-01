import { CTAButton } from "@/components/primitives/Badge";
import { FeatureGlyph } from "@/components/sections/_core/glyphs";
import type { BigTypeFeaturesSection } from "@/lib/landing/types";

/**
 * BigTypeFeatures - oversized statement headline on the left, up to four
 * glyph-led feature cards on the right. The headline keeps its 800-weight
 * uppercase "big type" identity but uses Wix Madefor Text (the only brand
 * font). Styling lives in .bigfeat-* classes on tokens (card radius follows
 * the two-tier --card-radius; neon glyph tiles; #333 body).
 */
export function BigTypeFeatures({ data }: { data: BigTypeFeaturesSection }) {
  return (
    <section className="wrap sec" aria-label={data.heading}>
      <div className="bigfeat-grid">
        <div className="bigfeat-lede">
          <h2 className="bigfeat-title">{data.heading}</h2>
          {data.cta && (
            <div className="bigfeat-cta">
              <CTAButton href={data.cta.href}>{data.cta.label}</CTAButton>
            </div>
          )}
        </div>
        <div className="bigfeat-cards">
          {data.cards.slice(0, 4).map((c, i) => (
            <div className="bigfeat-card" key={i}>
              <span className="bigfeat-ico">
                <FeatureGlyph name={c.icon || "check"} />
              </span>
              <div>
                <h3 className="bigfeat-card-title">{c.title}</h3>
                <p className="bigfeat-card-body">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
