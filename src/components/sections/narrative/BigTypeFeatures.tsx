/**
 * Auto-extracted from the former components/landing/sections.tsx monolith.
 * One section per file; registered via the SectionRegistry.
 */
import { CTAButton } from "@/components/primitives/Badge";
import { FeatureGlyph } from "@/components/sections/_core/glyphs";
import type {
  BigTypeFeaturesSection,
} from "@/lib/landing/types";

export function BigTypeFeatures({ data }: { data: BigTypeFeaturesSection }) {
  return (
    <section className="wrap sec" aria-label={data.heading}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.92fr) minmax(0, 1.08fr)",
          gap: "clamp(28px, 4vw, 54px)",
          alignItems: "center",
        }}
        className="bigfeat-grid"
      >
        <div>
          <h2
            style={{
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 0.96,
              fontSize: "clamp(36px, 6.4vw, 82px)",
              color: "var(--charcoal)",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            {data.heading}
          </h2>
          {data.cta && (
            <div style={{ marginTop: 28 }}>
              <CTAButton href={data.cta.href}>{data.cta.label}</CTAButton>
            </div>
          )}
        </div>
        <div style={{ display: "grid", gap: 20 }}>
          {data.cards.slice(0, 4).map((c, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 18,
                alignItems: "flex-start",
                background: "var(--white)",
                border: "1px solid var(--grey2)",
                borderRadius: 14,
                padding: "22px 24px",
              }}
            >
              <span
                style={{
                  flex: "none",
                  width: 44,
                  height: 44,
                  borderRadius: 11,
                  background: "var(--neon)",
                  color: "var(--charcoal)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FeatureGlyph name={c.icon || "check"} />
              </span>
              <div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    margin: "0 0 5px",
                    color: "var(--charcoal)",
                  }}
                >
                  {c.title}
                </h3>
                <p style={{ fontSize: 14.5, color: "var(--ink2)", lineHeight: 1.5, margin: 0 }}>
                  {c.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * SpecSheet - a published technical data sheet. Value chips paired to a label +
 * optional standard, plus an optional figure image. Every value is content;
 * nothing is invented here.
 */
