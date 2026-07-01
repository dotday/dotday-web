/* AUTO-GENERATED from the sibling *.schema.json by scripts/gen-types.mjs.
 * Do NOT edit by hand - edit the schema and run `npm run content:types`. */

/**
 * Schema for the splitHero section (component HomeHero). Derived from its home/types.ts data shape so this section can be used and validated on landing pages. SINGLE SOURCE OF TRUTH for landing usage of splitHero.
 */
export interface HomeHeroSection {
  _type: "splitHero";
  eyebrow?: string;
  headline: {
    /**
     * @minItems 1
     */
    lines: [string, ...string[]];
    highlightLine?: number;
  };
  subheading?: string;
  /**
   * @minItems 0
   */
  ctas?: {
    label: string;
    href: string;
    variant?: "primary" | "ghost";
  }[];
  /**
   * @minItems 0
   */
  trust?: {
    lead: string;
    rest?: string;
  }[];
  card: {
    tag?: string;
    image: string;
    imageAlt: string;
    videoMp4?: string;
    videoWebm?: string;
    /**
     * @minItems 0
     */
    stats?: {
      value: string;
      label: string;
      star?: boolean;
    }[];
  };
}
