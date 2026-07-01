/* AUTO-GENERATED from the sibling *.schema.json by scripts/gen-types.mjs.
 * Do NOT edit by hand - edit the schema and run `npm run content:types`. */

/**
 * Schema for the homeStatStrip section (component HomeStatStrip). Derived from its home/types.ts data shape so this section can be used and validated on landing pages. SINGLE SOURCE OF TRUTH for landing usage of homeStatStrip.
 */
export interface HomeStatStripSection {
  _type: "homeStatStrip";
  /**
   * @minItems 1
   */
  stats: [
    {
      value: string;
      label: string;
      sub?: string;
      star?: boolean;
    },
    ...{
      value: string;
      label: string;
      sub?: string;
      star?: boolean;
    }[]
  ];
}
