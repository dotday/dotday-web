/* AUTO-GENERATED from the sibling *.schema.json by scripts/gen-types.mjs.
 * Do NOT edit by hand - edit the schema and run `npm run content:types`. */

/**
 * Post-purchase product identification grid ('Which DOTDAY fabric do you have?'): eyebrow + heading + lead (supports [label](href) inline links) over centered roll cards, each with a square product photo, neon tag, title, body, and a text link to its product page. Semantically distinct from groundConditionCards (pre-purchase condition -> fabric). This file is the SINGLE SOURCE OF TRUTH for the section's shape - the TS type is generated from it (ProductChooser.types.ts) and the landing-page doc schema $refs it.
 */
export interface ProductChooserSection {
  _type: "productChooser";
  /**
   * Neon-outline pill above the heading, e.g. 'Know your roll'.
   */
  eyebrow?: string;
  heading: string;
  /**
   * Intro copy. Inline links use [label](href) and render as neon-underline inlinks.
   */
  lead?: string;
  /**
   * @minItems 1
   */
  cards: [
    {
      /**
       * Neon product chip, e.g. 'SHIELD · 3.2oz'.
       */
      tag: string;
      title: string;
      body: string;
      link: {
        label: string;
        href: string;
      };
      image?: {
        /**
         * Square product photo under /public.
         */
        ref?: string;
        alt: string;
      };
    },
    ...{
      /**
       * Neon product chip, e.g. 'SHIELD · 3.2oz'.
       */
      tag: string;
      title: string;
      body: string;
      link: {
        label: string;
        href: string;
      };
      image?: {
        /**
         * Square product photo under /public.
         */
        ref?: string;
        alt: string;
      };
    }[]
  ];
}
