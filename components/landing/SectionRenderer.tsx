import type { LandingSection } from "@/lib/landing/types";
import {
  LandingHero,
  Problem,
  Solution,
  UseCaseGrid,
  ProductComparison,
  CalculatorEmbed,
  Reviews,
  InternalLinks,
} from "@/components/landing/sections";
import { Badge, CTAButton } from "@/components/blog/ui/Badge";

/**
 * SectionRenderer - the landing-page dispatcher, mirroring the blog
 * BlockRenderer. Maps each section's `_type` to its component. The page hands
 * it page.sections; this is the only place that knows the mapping.
 *
 * FAQ and CTA are rendered inline here (landing-local) for now; the later global
 * refactor will swap these for shared components used by blogs too.
 */

function LandingFaq({
  heading,
  items,
}: {
  heading?: string;
  items: Array<{ q: string; a: string }>;
}) {
  return (
    <div className="wrap sec">
      <h2 id="faq">{heading || "Frequently asked questions"}</h2>
      <div style={{ marginTop: 8 }}>
        {items.map((it, i) => (
          <details key={i} className="faq-item" style={{ padding: "14px 0", borderBottom: "1px solid var(--grey2)" }}>
            <summary style={{ cursor: "pointer", fontWeight: 600 }}>{it.q}</summary>
            <p style={{ marginTop: 8 }}>{it.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

function LandingCta({
  eyebrow = "Find your fabric",
  heading = "Need help choosing the right fabric?",
  body = "Match your ground condition to the fabric built for it.",
  primaryCta,
  secondaryCta,
}: {
  eyebrow?: string;
  heading?: string;
  body?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}) {
  return (
    <section className="final">
      <div className="final-inner">
        <div className="final-glow" />
        <div className="final-c">
          <Badge white>{eyebrow}</Badge>
          <h2>{heading}</h2>
          <p>{body}</p>
          <div className="final-btns" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <CTAButton
              href={primaryCta?.href || "/landscape-fabric-calculator"}
              variant="onneon"
            >
              {primaryCta?.label || "Use the Fabric Calculator"}
            </CTAButton>
            <CTAButton
              href={secondaryCta?.href || "/fabric-finder"}
              variant="onneon-ghost"
            >
              {secondaryCta?.label || "Find Your Fabric"}
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionRenderer({ sections }: { sections: LandingSection[] }) {
  return (
    <>
      {sections.map((section, i) => {
        switch (section._type) {
          case "hero":
            return <LandingHero key={i} data={section} />;
          case "problem":
            return <Problem key={i} data={section} />;
          case "solution":
            return <Solution key={i} data={section} />;
          case "useCaseGrid":
            return <UseCaseGrid key={i} data={section} />;
          case "productComparison":
            return <ProductComparison key={i} data={section} />;
          case "calculatorEmbed":
            return <CalculatorEmbed key={i} data={section} />;
          case "faq":
            return <LandingFaq key={i} heading={section.heading} items={section.items} />;
          case "reviews":
            return <Reviews key={i} data={section} />;
          case "cta":
            return (
              <LandingCta
                key={i}
                eyebrow={section.eyebrow}
                heading={section.heading}
                body={section.body}
                primaryCta={section.primaryCta}
                secondaryCta={section.secondaryCta}
              />
            );
          case "internalLinks":
            return <InternalLinks key={i} data={section} />;
          default:
            return null;
        }
      })}
    </>
  );
}
