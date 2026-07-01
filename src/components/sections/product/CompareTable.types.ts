/* AUTO-GENERATED from the sibling *.schema.json by scripts/gen-types.mjs.
 * Do NOT edit by hand - edit the schema and run `npm run content:types`. */

/**
 * Schema for the fabricMatrix section (component CompareTable). Derived from its home/types.ts data shape so this section can be used and validated on landing pages. SINGLE SOURCE OF TRUTH for landing usage of fabricMatrix.
 */
export interface CompareTableSection {
  _type: "fabricMatrix";
  badge?: string;
  heading: string;
  intro?: string;
  /**
   * @minItems 0
   */
  heads?: {
    key: "shield" | "xbar" | "terra";
    name: string;
    sub: string;
    href: string;
    feat?: boolean;
  }[];
  /**
   * @minItems 1
   */
  rows: [
    {
      label: string;
      shield: string;
      xbar: string;
      terra: string;
    },
    ...{
      label: string;
      shield: string;
      xbar: string;
      terra: string;
    }[]
  ];
  footNote?: string;
  footCtaLabel?: string;
  footCtaHref?: string;
}
