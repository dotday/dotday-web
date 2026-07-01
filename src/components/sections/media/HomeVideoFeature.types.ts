/* AUTO-GENERATED from the sibling *.schema.json by scripts/gen-types.mjs.
 * Do NOT edit by hand - edit the schema and run `npm run content:types`. */

/**
 * Schema for the homeVideoFeature section (component HomeVideoFeature). Derived from its home/types.ts data shape so this section can be used and validated on landing pages. SINGLE SOURCE OF TRUTH for landing usage of homeVideoFeature.
 */
export interface HomeVideoFeatureSection {
  _type: "homeVideoFeature";
  badge?: string;
  heading: string;
  body?: string;
  bullets?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  video:
    | {
        kind: "youtube";
        id: string;
        title: string;
      }
    | {
        kind: "mp4";
        src: string;
        poster?: string;
        title: string;
      };
}
