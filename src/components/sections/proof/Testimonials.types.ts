/* AUTO-GENERATED from the sibling *.schema.json by scripts/gen-types.mjs.
 * Do NOT edit by hand - edit the schema and run `npm run content:types`. */

/**
 * Schema for the testimonials section (component Testimonials). Derived from its home/types.ts data shape so this section can be used and validated on landing pages. SINGLE SOURCE OF TRUTH for landing usage of testimonials.
 */
export interface TestimonialsSection {
  _type: "testimonials";
  badge?: string;
  heading: string;
  /**
   * @minItems 1
   */
  quotes: [
    {
      body: string;
      name: string;
      role?: string;
      product?: string;
      avatar?: string;
    },
    ...{
      body: string;
      name: string;
      role?: string;
      product?: string;
      avatar?: string;
    }[]
  ];
}
