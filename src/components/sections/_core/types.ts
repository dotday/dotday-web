/**
 * Shared section types - the neutral, surface-agnostic shapes for blocks that
 * render identically on blogs, landing pages, profiles, and the home page.
 *
 * WHY THIS FILE: shapes like Steps and Callout were defined TWICE - once in
 * lib/blog/types (StepsBlock) and once in lib/landing/types (StepsSection) - with
 * byte-identical bodies. That duplication is how the two systems silently drift.
 * These canonical definitions live here; blog and landing re-export them so there
 * is one source of truth. A shared component imports the type from here, never
 * from a specific surface.
 *
 * Convention: shared section data is passed as `{ data }` (matching landing).
 * The blog block components keep their `{ block }` call sites working via thin
 * re-export wrappers, so no existing blog code changes.
 */

export interface StepsData {
  _type: "steps";
  heading?: string;
  steps: Array<{ title: string; body: string }>;
  /** Layout. "list" (default) is the classic numbered ol; "cards" renders the
   *  my-qr-zone white step-card grid (own full-width band, eyebrow + lead,
   *  optional wide image under the grid). All fields below are cards-only and
   *  optional, so every existing blog/landing steps block stays byte-valid. */
  variant?: "list" | "cards";
  /** cards only: neon-outline pill above the heading, e.g. "Start here". */
  eyebrow?: string;
  /** cards only: intro copy under the heading; [label](href) renders as inlinks. */
  lead?: string;
  /** cards only: wide image under the step grid. */
  image?: { ref?: string; alt: string };
}

export interface CalloutData {
  _type: "proTip" | "warning";
  heading?: string;
  body: string;
}

export interface ProseData {
  _type: "prose";
  eyebrow?: string;
  heading?: string;
  body: string;
}

export interface StatStripData {
  _type: "statStrip";
  items: Array<{ value: string; label: string }>;
}

export interface TrustStripData {
  _type: "trustStrip";
  heading?: string;
  items: string[];
}
