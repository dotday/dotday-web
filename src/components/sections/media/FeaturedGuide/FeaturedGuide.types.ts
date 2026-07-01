/* AUTO-GENERATED from the sibling *.schema.json by scripts/gen-types.mjs.
 * Do NOT edit by hand - edit the schema and run `npm run content:types`. */

/**
 * Featured guide teaser: a split section with a neon copy panel (eyebrow, headline, byline, excerpt, read link) beside a full-bleed photo. Promotes a single article or field guide. This file is the SINGLE SOURCE OF TRUTH for the section's shape - the TS type is generated from it (FeaturedGuide.types.ts) and the landing-page doc schema $refs it.
 */
export interface FeaturedGuideSection {
  _type: "featuredGuide";
  eyebrow?: string;
  heading: string;
  byline?: string;
  excerpt?: string;
  image?: ImageRef;
  cta: Cta;
}
export interface ImageRef {
  ref: string;
  alt: string;
  caption?: string;
}
export interface Cta {
  label: string;
  href: string;
}
