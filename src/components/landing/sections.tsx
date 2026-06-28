import Link from "next/link";
import { Img } from "@/components/blog/ui/Img";
import { Badge, CTAButton } from "@/components/blog/ui/Badge";
import { FabricCalculator } from "@/components/tools/FabricCalculator";
import type {
  LandingHeroSection,
  ProblemSection,
  SolutionSection,
  UseCaseGridSection,
  ProductComparisonSection,
  CalculatorEmbedSection,
  FaqSection,
  ReviewSection,
  CtaSection,
  InternalLinksSection,
  StatementBandSection,
  BigTypeFeaturesSection,
  SpecSheetSection,
  ProjectSpotlightSection,
  FeatureIcon,
} from "@/lib/landing/types";

/**
 * Landing section components. These reuse the existing globals.css classes and
 * blog UI primitives so landing pages inherit brand styling for free. The FAQ,
 * comparison, and CTA here are landing-local for now; a later refactor lifts
 * them into a shared global layer that blogs also use.
 */

export function LandingHero({ data }: { data: LandingHeroSection }) {
  return (
    <section className="wrap page">
      {data.eyebrow && <Badge>{data.eyebrow}</Badge>}
      <h1 style={{ marginTop: 14 }}>{data.heading}</h1>
      {data.subheading && <p className="lead">{data.subheading}</p>}
      {(data.primaryCta || data.secondaryCta) && (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
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
      {data.image && (
        <div style={{ marginTop: 24 }}>
          <Img src={data.image.ref} alt={data.image.alt} ratio="r-169" />
        </div>
      )}
    </section>
  );
}

export function Problem({ data }: { data: ProblemSection }) {
  return (
    <div className="wrap sec">
      {data.eyebrow && (
        <div className="eyebrow">
          <b>{data.eyebrow}</b>
        </div>
      )}
      <h2>{data.heading}</h2>
      <p>{data.body}</p>
      {data.bullets && data.bullets.length > 0 && (
        <ul style={{ marginTop: 12, paddingLeft: 20, lineHeight: 1.7 }}>
          {data.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Solution({ data }: { data: SolutionSection }) {
  return (
    <div className="wrap sec">
      {data.eyebrow && (
        <div className="eyebrow">
          <b>{data.eyebrow}</b>
        </div>
      )}
      <h2>{data.heading}</h2>
      <p>{data.body}</p>
      {data.image && (
        <div style={{ margin: "18px 0" }}>
          <Img src={data.image.ref} alt={data.image.alt} ratio="r-169" />
        </div>
      )}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
        <CTAButton href={data.productHref}>View {data.product}</CTAButton>
        {data.cta && (
          <CTAButton href={data.cta.href} variant="ghost">
            {data.cta.label}
          </CTAButton>
        )}
      </div>
    </div>
  );
}

export function UseCaseGrid({ data }: { data: UseCaseGridSection }) {
  // Rich variant: any card carries an image/eyebrow/cta -> render the ucard
  // grid (the "Quick Tips for your installs" treatment). Otherwise fall back to
  // the simple rcard grid the application pages use.
  const isRich = data.cards.some((c) => c.image || c.eyebrow || c.ctaLabel);

  if (isRich) {
    return (
      <section className="wrap section ucase">
        {(data.eyebrow || data.heading || data.intro) && (
          <div className="ucase-head">
            {data.eyebrow && <span className="badge">{data.eyebrow}</span>}
            {data.heading && <h2>{data.heading}</h2>}
            {data.intro && <p>{data.intro}</p>}
          </div>
        )}
        <div className="ucase-grid">
          {data.cards.map((c, i) => (
            <article className="ucard" key={i}>
              {c.image && (
                <Img
                  src={c.image.ref}
                  alt={c.image.alt}
                  ratio="r-43"
                  placeholderLabel={c.eyebrow || c.title}
                />
              )}
              <div className="ucard-body">
                {c.eyebrow && <span className="ucard-eyebrow">{c.eyebrow}</span>}
                {!c.eyebrow && <h3>{c.title}</h3>}
                <p>{c.body}</p>
                {c.href && (
                  <div className="ucard-foot">
                    <CTAButton href={c.href} variant="ghost">
                      {c.ctaLabel || "Learn more"}
                    </CTAButton>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className="wrap sec">
      {data.heading && <h2>{data.heading}</h2>}
      <div className="rgrid" style={{ marginTop: 8 }}>
        {data.cards.map((c, i) => {
          const inner = (
            <div className="pad">
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          );
          return c.href ? (
            <Link className="rcard" href={c.href} key={i}>
              {inner}
            </Link>
          ) : (
            <div className="rcard" key={i}>
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * StatementBand - the oversized-watermark positioning band. Self-contained
 * inline styles (mirrors the original install-page section) so it renders
 * identically regardless of global CSS load order. Driven entirely by the JSON:
 * three watermark words, a charcoal statement, an optional neon-highlighted
 * tail, and an optional olive leaf mark.
 */
export function StatementBand({ data }: { data: StatementBandSection }) {
  const [w1, w2, w3] = data.watermark;
  const markBase: React.CSSProperties = {
    position: "absolute",
    fontSize: "clamp(56px, 12vw, 168px)",
    whiteSpace: "nowrap",
  };
  return (
    <section
      aria-label="DOTDAY positioning"
      style={{
        position: "relative",
        background: "#ffffff",
        overflow: "hidden",
        padding: "clamp(72px, 9vw, 120px) 20px",
        textAlign: "center",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "var(--ink)",
          opacity: 0.06,
          userSelect: "none",
        }}
      >
        <span style={{ ...markBase, top: "clamp(8px, 4vw, 40px)", left: "clamp(8px, 3vw, 64px)" }}>
          {w1}
        </span>
        <span
          style={{
            ...markBase,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {w2}
        </span>
        <span style={{ ...markBase, bottom: "clamp(8px, 4vw, 36px)", right: "clamp(8px, 3vw, 64px)" }}>
          {w3}
        </span>
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto" }}>
        {data.leafMark !== false && (
          <svg
            viewBox="0 0 64 64"
            fill="none"
            stroke="var(--olive)"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            role="img"
            aria-label="DOTDAY leaf mark"
            style={{
              display: "block",
              width: "clamp(64px, 7vw, 88px)",
              height: "auto",
              margin: "0 auto clamp(18px, 2.4vw, 28px)",
            }}
          >
            <path d="M31 41C20 41 9 33 7 13c20 1 26 12 26 26" />
            <path d="M33 41c11 0 22-8 24-28-20 1-26 12-26 26" />
            <path d="M32 39v15" />
            <path d="M32 54c-1.5 2.5-4 4.5-7 5.5" />
            <path d="M32 54c1.5 2.5 4 4.5 7 5.5" />
            <path d="M31 41C26 39 22 35 19 30" />
            <path d="M33 41c5-2 9-6 12-11" />
          </svg>
        )}
        <p
          style={{
            fontWeight: 700,
            fontSize: "clamp(22px, 3.2vw, 38px)",
            lineHeight: 1.22,
            letterSpacing: "-0.02em",
            color: "var(--charcoal)",
            margin: 0,
          }}
        >
          {data.statement}
          {data.highlight && (
            <>
              {" "}
              <span
                style={{
                  background: "var(--neon)",
                  color: "var(--charcoal)",
                  padding: "0.02em 0.16em",
                  borderRadius: 3,
                  WebkitBoxDecorationBreak: "clone",
                  boxDecorationBreak: "clone",
                }}
              >
                {data.highlight}
              </span>
            </>
          )}
        </p>
      </div>
    </section>
  );
}

export function ProductComparison({ data }: { data: ProductComparisonSection }) {
  return (
    <div className="wrap sec">
      {data.heading && <h2>{data.heading}</h2>}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {data.columns.map((c, i) => (
                <th key={i} className={data.featuredColumn === i ? "feat" : undefined}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function CalculatorEmbed({ data }: { data: CalculatorEmbedSection }) {
  return (
    <div className="wrap sec">
      {data.heading && <h2>{data.heading}</h2>}
      {data.intro && <p className="lead">{data.intro}</p>}
      <div style={{ marginTop: 12 }}>
        <FabricCalculator />
      </div>
    </div>
  );
}

export function Reviews({ data }: { data: ReviewSection }) {
  return (
    <div className="wrap sec">
      <h2>{data.heading || "What pros say"}</h2>
      <div className="rgrid" style={{ marginTop: 8 }}>
        {data.items.map((r, i) => (
          <div className="rcard" key={i}>
            <div className="pad">
              {typeof r.rating === "number" && (
                <div aria-label={`${r.rating} out of 5`} style={{ color: "var(--neon)", marginBottom: 6 }}>
                  {"\u2605".repeat(Math.round(r.rating))}
                </div>
              )}
              <p>{r.quote}</p>
              <span className="rtime">
                {r.author}
                {r.role ? `, ${r.role}` : ""}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function InternalLinks({ data }: { data: InternalLinksSection }) {
  return (
    <div className="wrap sec">
      <h2>{data.heading || "Keep exploring"}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
        {data.links.map((l, i) => (
          <Link key={i} href={l.href} style={{ color: "var(--ink)" }}>
            <b>{l.label}</b>
            {l.note ? <span className="rtime"> {l.note}</span> : null}
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * FeatureGlyph - the fixed inline-SVG set used by bigTypeFeatures. Content picks
 * an icon by name; no arbitrary SVG markup ever lives in a content file. Stroke
 * inherits currentColor so the neon-on-charcoal chip styling applies for free.
 */
function FeatureGlyph({ name }: { name: FeatureIcon }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "drop":
      return (
        <svg {...common}>
          <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 21s-7-5-7-11a7 7 0 0 1 14 0c0 6-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="M12 3 2 9l10 6 10-6-10-6z" />
          <path d="M2 15l10 6 10-6" />
        </svg>
      );
    case "sun":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
    case "shield":
    default:
      return (
        <svg {...common}>
          <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3z" />
        </svg>
      );
  }
}

/**
 * BigTypeFeatures - oversized uppercase statement + a stack of feature cards.
 * Self-contained inline styles using brand CSS vars (mirrors the StatementBand
 * approach) so it renders identically regardless of global CSS load order.
 */
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
export function SpecSheet({ data }: { data: SpecSheetSection }) {
  return (
    <section className="wrap sec" aria-label={data.heading}>
      <div
        style={{
          border: "1px solid var(--grey2)",
          borderRadius: 18,
          padding: "clamp(28px, 4vw, 52px)",
          background: "var(--white)",
        }}
      >
        {data.tag && (
          <span
            style={{
              display: "inline-block",
              background: "var(--neon)",
              color: "var(--charcoal)",
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              padding: "7px 14px",
              borderRadius: 100,
              marginBottom: 20,
            }}
          >
            {data.tag}
          </span>
        )}
        <h2 style={{ marginBottom: 12 }}>{data.heading}</h2>
        {data.intro && (
          <p style={{ color: "var(--muted)", maxWidth: 520, marginBottom: 34, lineHeight: 1.55 }}>
            {data.intro}
          </p>
        )}
        <div
          className="spec-grid"
          style={{
            display: "grid",
            gridTemplateColumns: data.image ? "1fr 1fr" : "1fr",
            gap: "clamp(28px, 4vw, 48px)",
            alignItems: "start",
          }}
        >
          <div style={{ display: "grid", gap: 14 }}>
            {data.rows.map((r, i) => {
              const neon = r.emphasis !== "plain";
              return (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: 14,
                    alignItems: "stretch",
                  }}
                >
                  <div
                    style={{
                      minWidth: 120,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "clamp(20px, 2.6vw, 28px)",
                      letterSpacing: "-0.02em",
                      borderRadius: 12,
                      padding: "0 18px",
                      color: "var(--charcoal)",
                      background: neon ? "var(--neon)" : "transparent",
                    }}
                  >
                    {r.value}
                  </div>
                  <div
                    style={{
                      borderRadius: 12,
                      padding: "14px 18px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      background: neon ? "var(--charcoal)" : "var(--grey2)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13.5,
                        fontWeight: 800,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        lineHeight: 1.25,
                        color: neon ? "var(--white)" : "var(--charcoal)",
                      }}
                    >
                      {r.label}
                    </span>
                    {r.standard && (
                      <span
                        style={{
                          fontSize: 12.5,
                          fontWeight: 600,
                          marginTop: 3,
                          letterSpacing: "0.02em",
                          color: neon ? "var(--neon)" : "var(--muted)",
                        }}
                      >
                        {r.standard}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {data.image && (
            <div
              style={{
                border: "1px solid var(--grey2)",
                borderRadius: 14,
                overflow: "hidden",
              }}
            >
              <Img src={data.image.ref} alt={data.image.alt} ratio="r-169" />
            </div>
          )}
        </div>
        {data.footnote && (
          <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, marginTop: 34, maxWidth: 760 }}>
            {data.footnote}
          </p>
        )}
      </div>
    </section>
  );
}

/**
 * ProjectSpotlight - a real UGC install card: media frame with a location badge,
 * a pull quote, spec chips, optional checkmark benefits, an author, and up to
 * two CTAs. Reuses the brand card look via CSS vars.
 */
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
