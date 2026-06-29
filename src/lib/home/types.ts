/**
 * Home section types - data shapes for the home-page sections as they are lifted
 * from hardcoded JSX into data-driven, registry-rendered sections.
 *
 * Migration approach (Option A): each section is refactored to take `{ data }`
 * and ships with a DEFAULT export holding today's exact content, so the homepage
 * renders pixel-identically while still in code. Once every section is lifted,
 * the homepage flips to reading content/home.json in one reviewed step. Until
 * then these DEFAULTs are the source of the live homepage.
 *
 * These types will also seed the home schema defs when content/home.json lands.
 */

export interface HomeCtaLink {
  label: string;
  href: string;
  variant?: "primary" | "ghost";
}

/**
 * A headline expressed as ordered lines, with an optional index marking the line
 * that gets the neon `<mark>` block-highlight. This preserves the exact
 * "Right fabric. / [Right ground.] / Every time." treatment as data rather than
 * hardcoded JSX.
 */
export interface HighlightHeadline {
  lines: string[];
  highlightLine?: number;
}

/** A trust bullet: a bold lead phrase + the rest of the line. */
export interface TrustItem {
  lead: string;
  rest?: string;
}

export interface HeroStat {
  value: string;
  label: string;
  star?: boolean;
}

export interface SplitHeroData {
  _type: "splitHero";
  eyebrow?: string;
  headline: HighlightHeadline;
  subheading?: string;
  ctas?: HomeCtaLink[];
  trust?: TrustItem[];
  card: {
    tag?: string;
    image: string;
    imageAlt: string;
    /** Optional looping video; falls back to `image` as poster + still. */
    videoMp4?: string;
    videoWebm?: string;
    stats?: HeroStat[];
  };
}

// --- groundConditionCards (from UseCases) ---
export interface GroundConditionCard {
  eyebrow?: string;
  title: string;
  body: string;
  pick: string;
  href: string;
  image: string;
  alt: string;
  ctaLabel?: string;
}
export interface GroundConditionCardsData {
  _type: "groundConditionCards";
  badge?: string;
  heading: string;
  intro?: string;
  cards: GroundConditionCard[];
}

// --- testimonials ---
export interface TestimonialQuote {
  body: string;
  name: string;
  role?: string;
  product?: string;
  avatar?: string;
}
export interface TestimonialsData {
  _type: "testimonials";
  badge?: string;
  heading: string;
  quotes: TestimonialQuote[];
}

// --- toolsBand ---
export interface ToolCard {
  icon: string;
  kicker?: string;
  title: string;
  body: string;
  cta: string;
  href: string;
}
export interface ToolsBandData {
  _type: "toolsBand";
  tools: ToolCard[];
}

// --- installShowcase ---
export interface ShowcaseCard {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  image: string;
  alt: string;
}
export interface ShowcaseStat {
  value?: string;
  icon?: boolean;
  label: string;
  sub: string;
}
export interface InstallShowcaseData {
  _type: "installShowcase";
  badge?: string;
  heading: string;
  intro?: string;
  feature: ShowcaseCard;
  side: ShowcaseCard[];
  stats: ShowcaseStat[];
}

// --- quoteBand ---
export interface QuoteBandData {
  _type: "quoteBand";
  heading: string;
  sub?: string;
  ctaLabel: string;
  ctaHref: string;
  marqueeWord?: string;
}

// --- jobGallery ---
export interface JobShot {
  src: string;
  alt: string;
  cap?: string;
}
export interface JobGalleryData {
  _type: "jobGallery";
  badge?: string;
  heading: string;
  intro?: string;
  shots: JobShot[];
  ctaLabel?: string;
  ctaHref?: string;
}

// --- homeStatStrip (the home credibility band; distinct from the shared blog statStrip) ---
export interface HomeStat {
  value: string;
  label: string;
  sub?: string;
  star?: boolean;
}
export interface HomeStatStripData {
  _type: "homeStatStrip";
  stats: HomeStat[];
}

// --- fabricMatrix (from CompareTable) ---
export interface FabricMatrixRow {
  label: string;
  shield: string;
  xbar: string;
  terra: string;
}
export interface FabricMatrixHead {
  key: "shield" | "xbar" | "terra";
  name: string;
  sub: string;
  href: string;
  feat?: boolean;
}
export interface FabricMatrixData {
  _type: "fabricMatrix";
  badge?: string;
  heading: string;
  intro?: string;
  heads?: FabricMatrixHead[];
  rows: FabricMatrixRow[];
  footNote?: string;
  footCtaLabel?: string;
  footCtaHref?: string;
}

// --- videoFeature (home) ---
export type HomeVideoConfig =
  | { kind: "youtube"; id: string; title: string }
  | { kind: "mp4"; src: string; poster?: string; title: string };
export interface HomeVideoFeatureData {
  _type: "homeVideoFeature";
  badge?: string;
  heading: string;
  body?: string;
  bullets?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  video: HomeVideoConfig;
}

// --- applicationGallery ---
export interface AppTile {
  icon: string;
  title: string;
  product: string;
  body: string;
  image: string;
  alt: string;
  href: string;
}
export interface ApplicationGalleryData {
  _type: "applicationGallery";
  eyebrow?: string;
  heading: string;
  sub?: string;
  apps: AppTile[];
}

// --- realJobs ---
export type RealJobsTile =
  | { kind: "image"; src: string; alt: string; span?: "wide" | "tall"; caption?: string; tag?: string }
  | { kind: "video"; src: string; poster: string; alt: string; span?: "wide" | "tall"; caption?: string; tag?: string };
export interface RealJobsData {
  _type: "realJobs";
  heading?: string;
  sub?: string;
  tiles: RealJobsTile[];
}

// --- instagramFeed ---
export interface InstagramFeedData {
  _type: "instagramFeed";
  eyebrow?: string;
  heading: string;
  sub?: string;
  profileUrl: string;
  posts: string[];
}

// --- The home page document (read from content/home.json) ---

/** A zero-config section that renders a fixed shared component (no authored data). */
export interface ProductBlockSection {
  _type: "productBlock";
}

/** The discriminated union of everything that can appear in the home sections[]. */
export type HomeSection =
  | SplitHeroData
  | ProductBlockSection
  | GroundConditionCardsData
  | ApplicationGalleryData
  | RealJobsData
  | HomeVideoFeatureData
  | InstallShowcaseData
  | ToolsBandData
  | TestimonialsData
  | InstagramFeedData
  | QuoteBandData
  | JobGalleryData
  | HomeStatStripData
  | FabricMatrixData;

export interface HomeDoc {
  schemaVersion: "1.0.0";
  sections: HomeSection[];
}
