/**
 * Auto-extracted from the former components/landing/sections.tsx monolith.
 * One section per file; registered via the SectionRegistry.
 */
import { Img } from "@/components/primitives/Img";
import { CTAButton } from "@/components/primitives/Badge";
import type {
  ProjectSpotlightSection,
} from "@/lib/landing/types";

export function ProjectSpotlight({ data }: { data: ProjectSpotlightSection }) {
  const badgeText = [data.location, data.badge].filter(Boolean).join("  \u00b7  ");
  return (
    <section className="wrap sec">
      {data.heading && <h2 style={{ marginBottom: 16 }}>{data.heading}</h2>}
      <div
        className="spotlight-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.1fr",
          border: "1px solid var(--grey2)",
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative", background: "#0c0c0c", minHeight: 240 }}>
          {badgeText && (
            <span
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                zIndex: 2,
                background: "var(--charcoal)",
                color: "var(--neon)",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.08em",
                padding: "5px 11px",
                borderRadius: 100,
                textTransform: "uppercase",
              }}
            >
              {badgeText}
            </span>
          )}
          {data.image ? (
            <Img src={data.image.ref} alt={data.image.alt} ratio="r-43" />
          ) : (
            <div style={{ aspectRatio: "4 / 3" }} />
          )}
        </div>
        <div style={{ padding: "30px 34px" }}>
          <p
            style={{
              fontSize: 15,
              color: "var(--ink2)",
              fontStyle: "italic",
              borderLeft: "3px solid var(--neon)",
              paddingLeft: 14,
              marginBottom: 18,
              lineHeight: 1.55,
            }}
          >
            {data.quote}
          </p>
          {data.specs && data.specs.length > 0 && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
              {data.specs.map((s, i) => (
                <span
                  key={i}
                  style={{
                    background: "var(--grey2)",
                    border: "1px solid var(--grey2)",
                    borderRadius: 100,
                    padding: "6px 13px",
                    fontSize: 12.5,
                    color: "var(--ink2)",
                  }}
                >
                  <b style={{ color: "var(--charcoal)" }}>{s.label}:</b> {s.value}
                </span>
              ))}
            </div>
          )}
          {data.benefits && data.benefits.length > 0 && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
              {data.benefits.map((b, i) => (
                <span
                  key={i}
                  style={{
                    background: "var(--grey2)",
                    borderRadius: 100,
                    padding: "6px 13px",
                    fontSize: 12.5,
                    color: "var(--ink2)",
                  }}
                >
                  {"\u2713"} {b}
                </span>
              ))}
            </div>
          )}
          {data.author && (
            <div style={{ display: "flex", alignItems: "center", gap: 11, margin: "16px 0 18px" }}>
              {data.author.initials && (
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "var(--charcoal)",
                    color: "var(--neon)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  {data.author.initials}
                </div>
              )}
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)" }}>
                  {data.author.name}
                </div>
                {data.author.role && (
                  <div style={{ fontSize: 12.5, color: "var(--muted)" }}>{data.author.role}</div>
                )}
              </div>
            </div>
          )}
          {(data.primaryCta || data.secondaryCta) && (
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
        </div>
      </div>
    </section>
  );
}

/**
 * EditorialCards - the blog hub "Editor's picks" row, authored from JSON. Markup
 * and classes are identical to EditorsPicks in HubSections.tsx (bsection /
 * bsec-head / bpick-grid / bpick), so it inherits the hub's exact look: neon
 * on-media category pill, charcoal level pill, neon author monogram, 2-line
 * clamped excerpt, and the neon-underlined "Read article" arrow.
 */
