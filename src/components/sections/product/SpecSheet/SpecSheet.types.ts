/* AUTO-GENERATED from the sibling *.schema.json by scripts/gen-types.mjs.
 * Do NOT edit by hand - edit the schema and run `npm run content:types`. */

/**
 * Spec sheet section: a heading + intro and a list of value/label spec rows, optional image and footnote. This file is the SINGLE SOURCE OF TRUTH for the section's shape - the TS type is generated from it (SpecSheet.types.ts) and the landing-page doc schema $refs it.
 */
export interface SpecSheetSection {
  _type: "specSheet";
  tag?: string;
  heading: string;
  intro?: string;
  /**
   * @minItems 1
   */
  rows: [
    {
      value: string;
      label: string;
      standard?: string;
      emphasis?: "neon" | "plain";
    },
    ...{
      value: string;
      label: string;
      standard?: string;
      emphasis?: "neon" | "plain";
    }[]
  ];
  image?: ImageRef;
  footnote?: string;
}
export interface ImageRef {
  ref: string;
  alt: string;
  caption?: string;
}
