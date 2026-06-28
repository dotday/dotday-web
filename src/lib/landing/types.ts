/**
 * DOTDAY landing-page types - the TS mirror of schema/landingPage.schema.json
 * (schemaVersion 1.0.0). Mirrors the blog system: a JSON file in
 * content/landing/<slug>.json renders at /l/<slug>.
 *
 * Where blogs are ~80% uniform, landing pages are ASSEMBLED from an approved set
 * of sections in any order. `sections` is a discriminated union on `_type`; each
 * member is one approved component. SectionRenderer maps _type -> component.
 * Adding an approved section = add a type here + a case in SectionRenderer + the
 * schema. Nothing else.
 *
 * Keep this in sync with schema/landingPage.schema.json.
 */

export type LandingStatus =
  | "planned"
  | "draft"
  | "in-review"
  | "published"
  | "needs-update";

export type ProductKey = "SHIELD" | "XBAR" | "TERRA";

export interface ImageRef {
  ref: string;
  alt: string;
  caption?: string;
}

export interface LandingSeo {
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  noindex?: boolean;
  ogImage: ImageRef;
  ogType?: "website";
  twitterCard?: "summary_large_image";
}

export interface CtaLink {
  label: string;
  href: string;
}

// --- Approved sections ---

export interface LandingHeroSection {
  _type: "hero";
  eyebrow?: string;
  heading: string;
  subheading?: string;
  image?: ImageRef;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
}

export interface ProblemSection {
  _type: "problem";
  eyebrow?: string;
  heading: string;
  body: string;
  bullets?: string[];
}

export interface SolutionSection {
  _type: "solution";
  eyebrow?: string;
  heading: string;
  body: string;
  product: ProductKey;
  productHref: string;
  image?: ImageRef;
  cta?: CtaLink;
}

export interface UseCaseGridSection {
  _type: "useCaseGrid";
  heading?: string;
  eyebrow?: string;
  intro?: string;
  cards: Array<{
    title: string;
    body: string;
    href?: string;
    eyebrow?: string;
    image?: ImageRef;
    ctaLabel?: string;
  }>;
}

export interface ProductComparisonSection {
  _type: "productComparison";
  heading?: string;
  columns: string[];
  featuredColumn?: number;
  rows: string[][];
}

export interface CalculatorEmbedSection {
  _type: "calculatorEmbed";
  heading?: string;
  intro?: string;
}

export interface FaqSection {
  _type: "faq";
  heading?: string;
  items: Array<{ q: string; a: string }>;
}

export interface ReviewSection {
  _type: "reviews";
  heading?: string;
  items: Array<{ quote: string; author: string; role?: string; rating?: number }>;
}

export interface CtaSection {
  _type: "cta";
  eyebrow?: string;
  heading?: string;
  body?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
}

export interface InternalLinksSection {
  _type: "internalLinks";
  heading?: string;
  links: Array<{ label: string; href: string; note?: string }>;
}

// --- Custom-page sections (used by bespoke-layout pages in content/landing/custom) ---

/**
 * Step-by-step list. Reuses the blog Steps component so a how-to renders the
 * identical numbered sequence on a landing page as it would in a post.
 */
export interface StepsSection {
  _type: "steps";
  heading?: string;
  steps: Array<{ title: string; body: string }>;
}

/**
 * Callout box - a warning or a pro tip. Reuses the blog Callout component, so
 * the neon-bordered "Watch out" / "Pro Tip" treatment is byte-identical to blog.
 */
export interface CalloutSection {
  _type: "callout";
  variant: "warning" | "proTip";
  heading?: string;
  body: string;
}

/**
 * statementBand - the oversized-watermark positioning band: three faint
 * background words, an optional olive leaf mark, a charcoal statement, and a
 * neon-highlighted tail phrase. Bespoke brand moment, reusable across custom
 * pages (install, press, PR).
 */
export interface StatementBandSection {
  _type: "statementBand";
  watermark: [string, string, string];
  statement: string;
  highlight?: string;
  leafMark?: boolean;
}

export type LandingSection =
  | LandingHeroSection
  | ProblemSection
  | SolutionSection
  | UseCaseGridSection
  | ProductComparisonSection
  | CalculatorEmbedSection
  | FaqSection
  | ReviewSection
  | CtaSection
  | InternalLinksSection
  | StepsSection
  | CalloutSection
  | StatementBandSection;

export interface LandingPage {
  schemaVersion: "1.0.0";
  slug: string;
  title: string;
  focusKeyword: string;
  status: LandingStatus;
  author?: string;
  publishedAt: string;
  dateModified?: string;
  seo: LandingSeo;
  sections: LandingSection[];
  images?: Record<string, string>;
}
