/* AUTO-GENERATED from the sibling *.schema.json by scripts/gen-types.mjs.
 * Do NOT edit by hand - edit the schema and run `npm run content:types`. */

/**
 * Schema for the groundConditionCards section (component UseCases). Derived from its home/types.ts data shape so this section can be used and validated on landing pages. SINGLE SOURCE OF TRUTH for landing usage of groundConditionCards.
 */
export interface UseCasesSection {
  _type: "groundConditionCards";
  badge?: string;
  heading: string;
  intro?: string;
  /**
   * @minItems 1
   */
  cards: [
    {
      eyebrow?: string;
      title: string;
      body: string;
      pick: string;
      href: string;
      image: string;
      alt: string;
      ctaLabel?: string;
    },
    ...{
      eyebrow?: string;
      title: string;
      body: string;
      pick: string;
      href: string;
      image: string;
      alt: string;
      ctaLabel?: string;
    }[]
  ];
}
