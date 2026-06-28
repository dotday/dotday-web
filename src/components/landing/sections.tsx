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
