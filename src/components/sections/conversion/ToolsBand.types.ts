/* AUTO-GENERATED from the sibling *.schema.json by scripts/gen-types.mjs.
 * Do NOT edit by hand - edit the schema and run `npm run content:types`. */

/**
 * Schema for the toolsBand section (component ToolsBand). Derived from its home/types.ts data shape so this section can be used and validated on landing pages. SINGLE SOURCE OF TRUTH for landing usage of toolsBand.
 */
export interface ToolsBandSection {
  _type: "toolsBand";
  /**
   * @minItems 1
   */
  tools: [
    {
      icon: string;
      kicker?: string;
      title: string;
      body: string;
      cta: string;
      href: string;
    },
    ...{
      icon: string;
      kicker?: string;
      title: string;
      body: string;
      cta: string;
      href: string;
    }[]
  ];
}
