/* AUTO-GENERATED from the sibling *.schema.json by scripts/gen-types.mjs.
 * Do NOT edit by hand - edit the schema and run `npm run content:types`. */

/**
 * Schema for the applicationGallery section (component ApplicationGallery). Derived from its home/types.ts data shape so this section can be used and validated on landing pages. SINGLE SOURCE OF TRUTH for landing usage of applicationGallery.
 */
export interface ApplicationGallerySection {
  _type: "applicationGallery";
  eyebrow?: string;
  heading: string;
  sub?: string;
  /**
   * @minItems 1
   */
  apps: [
    {
      icon: string;
      title: string;
      product: string;
      body: string;
      image: string;
      alt: string;
      href: string;
    },
    ...{
      icon: string;
      title: string;
      product: string;
      body: string;
      image: string;
      alt: string;
      href: string;
    }[]
  ];
}
