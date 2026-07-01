/* AUTO-GENERATED from the sibling *.schema.json by scripts/gen-types.mjs.
 * Do NOT edit by hand - edit the schema and run `npm run content:types`. */

/**
 * Schema for the jobGallery section (component JobGallery). Derived from its home/types.ts data shape so this section can be used and validated on landing pages. SINGLE SOURCE OF TRUTH for landing usage of jobGallery.
 */
export interface JobGallerySection {
  _type: "jobGallery";
  badge?: string;
  heading: string;
  intro?: string;
  /**
   * @minItems 1
   */
  shots: [
    {
      src: string;
      alt: string;
      cap?: string;
    },
    ...{
      src: string;
      alt: string;
      cap?: string;
    }[]
  ];
  ctaLabel?: string;
  ctaHref?: string;
}
