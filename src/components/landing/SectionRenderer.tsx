import type { LandingSection, LandingPage } from "@/lib/landing/types";
import { resolveSectionImages } from "@/lib/landing/resolveSectionImages";
import { getSection } from "@/components/landing/registry";
import "@/components/landing/registry.seed"; // registers direct sections (side effect)
import {
  LandingHero,
  Problem,
  Solution,
  UseCaseGrid,
  CalculatorEmbed,
  Reviews,
  InternalLinks,
  StatementBand,
  BigTypeFeatures,
  SpecSheet,
  ProjectSpotlight,
  EditorialCards,
  VideoFeature,
} from "@/components/landing/sections";
// Shared, cross-surface sections come from the GLOBAL layer so blogs and
// landing pages render the identical FAQ / comparison / CTA implementation.
import { SharedFAQ } from "@/components/global/sections/SharedFAQ";
import { SharedComparisonTable } from "@/components/global/sections/SharedComparisonTable";
import { SharedCTA } from "@/components/global/sections/SharedCTA";
// Step lists and callouts come from the SHARED section core, so a how-to renders
// the identical numbered steps / neon-bordered callout on a landing page as in a
// blog post. (Previously imported from blog/blocks; now both surfaces share one
// implementation under components/sections.)
import { Steps } from "@/components/sections/Steps";
import { Callout } from "@/components/sections/Callout";

/**
 * SectionRenderer - the landing-page dispatcher, mirroring the blog
 * BlockRenderer. Maps each section's `_type` to its component. The page hands it
 * page.sections; this is the only place that knows the mapping.
 *
 * FAQ, productComparison, and cta delegate to the GLOBAL shared components, so
 * they are byte-identical to what blog posts render. Improve a shared component
 * once and every blog AND landing page updates.
 *
 * IMAGE RESOLUTION: the renderer takes the page (for slug + images map) and runs
 * resolveSectionImages on each section first, so every image `ref` is turned
 * into a real /public URL before the section renders. This is what makes landing
 * imagery resolve the same way blog imagery does. Callers that don't need
 * resolution (or have no images) can omit `page`.
 */
export function SectionRenderer({
  sections,
  page,
}: {
  sections: LandingSection[];
  page?: Pick<LandingPage, "slug" | "images">;
}) {
  const ctx = page ?? { slug: "", images: {} };
  return (
    <>
      {sections.map((raw, i) => {
        const section = resolveSectionImages(ctx, raw);

        // Registry first: sections that render directly from their data with a
        // uniform { data } prop are looked up here. Adding such a section needs
        // no edit to this switch - just a registry entry. Sections needing
        // bespoke wrappers/prop-adaptation fall through to the switch below.
        const def = getSection(section._type);
        if (def) {
          const C = def.component;
          return <C key={i} data={section} />;
        }

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
                tone={section.tone}
              />
            );
          case "internalLinks":
            return <InternalLinks key={i} data={section} />;
          case "steps":
            return (
              <div className="wrap page" key={i}>
                <div className="body-single">
                  <article>
                    <Steps
                      data={{
                        _type: "steps",
                        heading: section.heading,
                        steps: section.steps,
                      }}
                    />
                  </article>
                </div>
              </div>
            );
          case "callout":
            return (
              <div className="wrap page" key={i}>
                <div className="body-single">
                  <article>
                    <Callout
                      data={{
                        _type: section.variant,
                        heading: section.heading,
                        body: section.body,
                      }}
                    />
                  </article>
                </div>
              </div>
            );
          case "statementBand":
            return <StatementBand key={i} data={section} />;
          case "bigTypeFeatures":
            return <BigTypeFeatures key={i} data={section} />;
          case "specSheet":
            return <SpecSheet key={i} data={section} />;
          case "projectSpotlight":
            return <ProjectSpotlight key={i} data={section} />;
          case "editorialCards":
            return <EditorialCards key={i} data={section} />;
          case "videoFeature":
            return <VideoFeature key={i} data={section} />;
          default:
            return null;
        }
      })}
    </>
  );
}
