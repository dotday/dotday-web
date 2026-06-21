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
