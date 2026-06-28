import type {
  LandingPage,
  FaqSection,
  StepsSection,
} from "@/lib/landing/types";
import { SITE_URL, site } from "@/lib/site";

/**
 * Landing-page JSON-LD, mirroring the blog jsonld helper. Emits WebPage +
 * (if a faq section exists) FAQPage + BreadcrumbList, built from the same
 * content file that renders the page so schema can never drift from the visible
 * FAQ.
 */
function absolute(url: string): string {
  if (url.startsWith("http")) return url;
  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

export function buildLandingJsonLd(page: LandingPage): object[] {
  const url = page.seo.canonical || absolute(`/l/${page.slug}`);
  const out: object[] = [];

  out.push({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.seo.metaTitle,
    description: page.seo.metaDescription,
    url,
    publisher: { "@type": "Organization", name: site.name },
  });

  const faq = page.sections.find((s): s is FaqSection => s._type === "faq");
  if (faq && faq.items.length > 0) {
    out.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.items.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
    });
  }

  // If the page has a step sequence, emit HowTo so install/how-to pages keep
  // their rich-result eligibility after migrating from a hand-coded route.
  const steps = page.sections.find(
    (s): s is StepsSection => s._type === "steps"
  );
  if (steps && steps.steps.length > 0) {
    out.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: steps.heading || page.title,
      description: page.seo.metaDescription,
      step: steps.steps.map((st, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: st.title,
        text: st.body,
        url: `${url}#step-${i + 1}`,
      })),
    });
  }

  out.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: page.title, item: url },
    ],
  });

  return out;
}
