/* AUTO-GENERATED from the sibling *.schema.json by scripts/gen-types.mjs.
 * Do NOT edit by hand - edit the schema and run `npm run content:types`. */

/**
 * Schema for the installShowcase section (component InstallShowcase). Derived from its home/types.ts data shape so this section can be used and validated on landing pages. SINGLE SOURCE OF TRUTH for landing usage of installShowcase.
 */
export interface InstallShowcaseSection {
  _type: "installShowcase";
  badge?: string;
  heading: string;
  intro?: string;
  feature: {
    eyebrow: string;
    title: string;
    body: string;
    href: string;
    image: string;
    alt: string;
  };
  /**
   * @minItems 1
   */
  side: [
    {
      eyebrow: string;
      title: string;
      body: string;
      href: string;
      image: string;
      alt: string;
    },
    ...{
      eyebrow: string;
      title: string;
      body: string;
      href: string;
      image: string;
      alt: string;
    }[]
  ];
  /**
   * @minItems 0
   */
  stats: {
    value?: string;
    icon?: boolean;
    label: string;
    sub: string;
  }[];
}
