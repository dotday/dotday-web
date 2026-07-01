/* AUTO-GENERATED from the sibling *.schema.json by scripts/gen-types.mjs.
 * Do NOT edit by hand - edit the schema and run `npm run content:types`. */

/**
 * Dual-benefit feature block: a centered eyebrow + heading + intro, then two image cards, each with a short tag, a titled benefit, and a paragraph. Built to show one product doing two jobs (e.g. weed control and drainage). This file is the SINGLE SOURCE OF TRUTH for the section's shape - the TS type is generated from it (DualBenefit.types.ts) and the landing-page doc schema $refs it.
 */
export interface DualBenefitSection {
  _type: "dualBenefit";
  eyebrow?: string;
  heading: string;
  highlight?: string;
  intro?: string;
  /**
   * @minItems 2
   * @maxItems 2
   */
  cards: [
    {
      tag?: string;
      title: string;
      body: string;
      image?: ImageRef;
    },
    {
      tag?: string;
      title: string;
      body: string;
      image?: ImageRef;
    }
  ];
  cta?: Cta;
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
