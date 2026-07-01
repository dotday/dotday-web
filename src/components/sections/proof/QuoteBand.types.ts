/* AUTO-GENERATED from the sibling *.schema.json by scripts/gen-types.mjs.
 * Do NOT edit by hand - edit the schema and run `npm run content:types`. */

/**
 * Schema for the quoteBand section (component QuoteBand). Derived from its home/types.ts data shape so this section can be used and validated on landing pages. SINGLE SOURCE OF TRUTH for landing usage of quoteBand.
 */
export interface QuoteBandSection {
  _type: "quoteBand";
  heading: string;
  sub?: string;
  ctaLabel: string;
  ctaHref: string;
  marqueeWord?: string;
}
