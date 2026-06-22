import type { LandingSection } from "@/lib/landing/types";
import {
  LandingHero,
  Problem,
  Solution,
  UseCaseGrid,
  CalculatorEmbed,
  Reviews,
  InternalLinks,
} from "@/components/landing/sections";
// Shared, cross-surface sections come from the GLOBAL layer so blogs and
// landing pages render the identical FAQ / comparison / CTA implementation.
import { SharedFAQ } from "@/components/global/sections/SharedFAQ";
import { SharedComparisonTable } from "@/components/global/sections/SharedComparisonTable";
import { SharedCTA } from "@/components/global/sections/SharedCTA";

/**
 * SectionRenderer - the landing-page dispatcher, mirroring the blog
 * BlockRenderer. Maps each section's `_type` to its component. The page hands it
 * page.sections; this is the only place that knows the mapping.
 *
 * FAQ, productComparison, and cta delegate to the GLOBAL shared components, so
 * they are byte-identical to what blog posts render. Improve a shared component
 * once and every blog AND landing page updates.
 */
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
            return (
              <div className="wrap" key={i}>
                <SharedComparisonTable
                  data={{
                    heading: section.heading,
                    columns: section.columns,
                    featuredColumn: section.featuredColumn,
                    rows: section.rows,
                  }}
                />
              </div>
            );
          case "calculatorEmbed":
            return <CalculatorEmbed key={i} data={section} />;
          case "faq":
            return (
              <div className="wrap" key={i}>
                <SharedFAQ heading={section.heading} items={section.items} />
              </div>
            );
          case "reviews":
            return <Reviews key={i} data={section} />;
          case "cta":
            return (
              <SharedCTA
                key={i}
                eyebrow={section.eyebrow}
                heading={section.heading}
                body={section.body}
                primaryHref={section.primaryCta?.href}
                primaryLabel={section.primaryCta?.label}
                secondaryHref={section.secondaryCta?.href}
                secondaryLabel={section.secondaryCta?.label}
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
