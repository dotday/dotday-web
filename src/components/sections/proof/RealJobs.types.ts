/* AUTO-GENERATED from the sibling *.schema.json by scripts/gen-types.mjs.
 * Do NOT edit by hand - edit the schema and run `npm run content:types`. */

/**
 * Schema for the realJobs section (component RealJobs). Derived from its home/types.ts data shape so this section can be used and validated on landing pages. SINGLE SOURCE OF TRUTH for landing usage of realJobs.
 */
export interface RealJobsSection {
  _type: "realJobs";
  heading?: string;
  sub?: string;
  /**
   * @minItems 1
   */
  tiles: [
    (
      | {
          kind: "image";
          src: string;
          alt: string;
          span?: "wide" | "tall";
          caption?: string;
          tag?: string;
        }
      | {
          kind: "video";
          src: string;
          poster: string;
          alt: string;
          span?: "wide" | "tall";
          caption?: string;
          tag?: string;
        }
    ),
    ...(
      | {
          kind: "image";
          src: string;
          alt: string;
          span?: "wide" | "tall";
          caption?: string;
          tag?: string;
        }
      | {
          kind: "video";
          src: string;
          poster: string;
          alt: string;
          span?: "wide" | "tall";
          caption?: string;
          tag?: string;
        }
    )[]
  ];
}
