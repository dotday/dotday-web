/* AUTO-GENERATED from the sibling *.schema.json by scripts/gen-types.mjs.
 * Do NOT edit by hand - edit the schema and run `npm run content:types`. */

/**
 * Roll-size selector: a product pack image plus a grid of size tiles (dimensions + per-roll price + use-case note), a helper line, and CTAs. Lets a buyer match roll width to the job. This file is the SINGLE SOURCE OF TRUTH for the section's shape - the TS type is generated from it (SizeSelector.types.ts) and the landing-page doc schema $refs it.
 */
export interface SizeSelectorSection {
  _type: "sizeSelector";
  badge?: string;
  heading: string;
  intro?: string;
  image?: ImageRef;
  /**
   * @minItems 1
   */
  sizes: [
    {
      dimensions: string;
      price: string;
      useCase: string;
      featured?: boolean;
    },
    ...{
      dimensions: string;
      price: string;
      useCase: string;
      featured?: boolean;
    }[]
  ];
  helper?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  tertiaryCta?: Cta;
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
