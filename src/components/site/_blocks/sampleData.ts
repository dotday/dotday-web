import "server-only";

// Home sections already ship DEFAULT_* content - reuse it verbatim as gallery
// samples so the gallery shows exactly what a real homepage section looks like.
import { DEFAULT_SPLIT_HERO } from "@/components/site/home/HomeHero";
import { DEFAULT_GROUND_CONDITION_CARDS } from "@/components/site/home/UseCases";
import { DEFAULT_TESTIMONIALS } from "@/components/site/home/Testimonials";
import { DEFAULT_TOOLS_BAND } from "@/components/site/home/ToolsBand";
import { DEFAULT_INSTALL_SHOWCASE } from "@/components/site/home/InstallShowcase";
import { DEFAULT_QUOTE_BAND } from "@/components/site/home/QuoteBand";
import { DEFAULT_JOB_GALLERY } from "@/components/site/home/JobGallery";
import { DEFAULT_HOME_STAT_STRIP } from "@/components/site/home/StatStrip";
import { DEFAULT_FABRIC_MATRIX } from "@/components/site/home/CompareTable";
import { DEFAULT_HOME_VIDEO_FEATURE } from "@/components/site/home/VideoFeature";
import { DEFAULT_APPLICATION_GALLERY } from "@/components/site/home/ApplicationGallery";
import { DEFAULT_REAL_JOBS } from "@/components/site/home/RealJobs";
import { DEFAULT_INSTAGRAM_FEED } from "@/components/site/home/InstagramFeed";

/**
 * SAMPLE_DATA - representative props for every registered section, keyed by
 * _type, used by the /_blocks gallery to render each section live.
 *
 * Home sections reuse their shipped DEFAULT_* exactly. Landing-only sections get
 * compact, on-brand samples here (lifted from / modeled on the real landing JSON
 * so they look authentic). Any section without a sample renders a "no sample"
 * note in the gallery rather than crashing.
 */
export const SAMPLE_DATA: Record<string, unknown> = {
  // --- Home sections (reuse shipped defaults) ---
  splitHero: DEFAULT_SPLIT_HERO,
  groundConditionCards: DEFAULT_GROUND_CONDITION_CARDS,
  testimonials: DEFAULT_TESTIMONIALS,
  toolsBand: DEFAULT_TOOLS_BAND,
  installShowcase: DEFAULT_INSTALL_SHOWCASE,
  quoteBand: DEFAULT_QUOTE_BAND,
  jobGallery: DEFAULT_JOB_GALLERY,
  homeStatStrip: DEFAULT_HOME_STAT_STRIP,
  fabricMatrix: DEFAULT_FABRIC_MATRIX,
  homeVideoFeature: DEFAULT_HOME_VIDEO_FEATURE,
  applicationGallery: DEFAULT_APPLICATION_GALLERY,
  realJobs: DEFAULT_REAL_JOBS,
  instagramFeed: DEFAULT_INSTAGRAM_FEED,

  // --- Landing sections (compact on-brand samples) ---
  hero: {
    _type: "hero",
    eyebrow: "For gravel and hardscape",
    heading: "The landscape fabric built for gravel",
    subheading:
      "Loose stone moves, ruts, and lets weeds push back when it sits on the wrong fabric. XBAR is engineered for gravel, rock, and high-traffic ground.",
    primaryCta: { label: "Shop XBAR", href: "/product-page/xbar-landscape-fabric" },
    secondaryCta: { label: "Use the Fabric Calculator", href: "/landscape-fabric-calculator" },
  },
  problem: {
    _type: "problem",
    eyebrow: "The problem",
    heading: "Why gravel fails on the wrong fabric",
    body: "Gravel puts constant point load and movement on whatever sits beneath it. Light garden fabric was never built for that. It tears at the stone edges, lets fines migrate up, and weeds find the gaps.",
    bullets: [
      "Rutting and pumping where tires and feet concentrate load",
      "Stone working down into soil, so you top up gravel every season",
      "Weeds pushing through thin or punctured fabric",
    ],
  },
  solution: {
    _type: "solution",
    eyebrow: "The fix",
    heading: "XBAR is built for ground that takes a beating",
    body: "XBAR is a 5oz woven-hybrid fabric: a woven face for tensile strength with a non-woven backing for separation. Designed for gravel, rock, pavers, and high-traffic areas where lighter fabric gives out.",
    product: "XBAR",
    productHref: "/product-page/xbar-landscape-fabric",
    cta: { label: "Compare Fabric Types", href: "/fabric-finder" },
  },
  useCaseGrid: {
    _type: "useCaseGrid",
    heading: "Where XBAR works best",
    cards: [
      { title: "Gravel driveways", body: "Holds stone and soil apart under vehicle load so the surface stays put." },
      { title: "Gravel paths and patios", body: "A stable base under foot traffic that resists rutting and weed pushback." },
      { title: "Under pavers", body: "Separation and stability beneath a paver or flagstone install." },
    ],
  },
  productComparison: {
    _type: "productComparison",
    heading: "SHIELD vs XBAR vs TERRA",
    columns: ["Spec", "SHIELD", "XBAR", "TERRA"],
    featuredColumn: 2,
    rows: [
      ["Best for", "Weed control", "Hardscape", "Drainage"],
      ["Construction", "Woven PP", "Dual-layer woven hybrid", "Non-woven geotextile"],
      ["Weight", "3.2 oz", "5 oz", "4 / 6 / 8 oz"],
    ],
  },
  reviews: {
    _type: "reviews",
    heading: "What pros say",
    items: [
      { quote: "Strong, installs clean, and the base hasn't shifted at all.", author: "Mike", role: "Contractor, TX", rating: 5 },
      { quote: "Held up through a full growing season with great water flow.", author: "Trevor M.", role: "Farm Owner, OR", rating: 5 },
    ],
  },
  calculatorEmbed: {
    _type: "calculatorEmbed",
    heading: "How much fabric do you need?",
    intro: "Enter your area and get the exact roll count, with a 10% overlap buffer added automatically.",
  },
  internalLinks: {
    _type: "internalLinks",
    heading: "Keep exploring",
    links: [
      { label: "Shop XBAR", href: "/product-page/xbar-landscape-fabric", note: "5oz dual-layer for hardscape" },
      { label: "Fabric Finder Quiz", href: "/fabric-finder", note: "60-second match" },
      { label: "Installation Guides", href: "/how-to-install-weed-barrier-fabric" },
    ],
  },
  statementBand: {
    _type: "statementBand",
    watermark: ["RIGHT", "GROUND", "EVERY TIME"],
    statement: "Use the right fabric for the right ground condition.",
    highlight: "Every time.",
    leafMark: true,
  },
  bigTypeFeatures: {
    _type: "bigTypeFeatures",
    heading: "Built for the job",
    cta: { label: "Find Your Fabric", href: "/fabric-finder" },
    cards: [
      { icon: "shield", title: "UV-stabilized", body: "Holds up under mulch, gravel, and full-sun exposure." },
      { icon: "drop", title: "Permeable", body: "Water, air, and nutrients reach the soil below." },
      { icon: "layers", title: "Dual-layer strength", body: "Woven face with a non-woven backing resists punctures." },
      { icon: "check", title: "Ships from the USA", body: "Multiple US warehouses for fast delivery." },
    ],
  },
  specSheet: {
    _type: "specSheet",
    tag: "Technical data",
    heading: "XBAR 5oz specification",
    intro: "Published specs for the dual-layer woven-hybrid hardscape fabric.",
    rows: [
      { value: "5 oz", label: "Weight", standard: "ASTM D5261", emphasis: "neon" },
      { value: "Dual-layer", label: "Construction", standard: "Woven face + non-woven backing" },
      { value: "High", label: "Puncture resistance", emphasis: "plain" },
    ],
  },
  projectSpotlight: {
    _type: "projectSpotlight",
    heading: "On the job",
    badge: "XBAR",
    location: "Phoenix, AZ",
    quote: "Used XBAR under a gravel driveway. Strong, installs clean, and the base hasn't shifted at all.",
    specs: [
      { label: "Application", value: "Gravel driveway" },
      { label: "Climate", value: "Arid" },
      { label: "Result", value: "No rutting" },
    ],
    benefits: ["Stable base", "No weed pushback"],
    author: { name: "Mike", role: "Contractor", initials: "MK" },
    primaryCta: { label: "Shop XBAR", href: "/product-page/xbar-landscape-fabric" },
  },
  editorialCards: {
    _type: "editorialCards",
    eyebrow: "Hand-picked",
    heading: "Editor's picks",
    cards: [
      {
        title: "Woven vs non-woven landscape fabric",
        href: "/post/woven-vs-non-woven-landscape-fabric",
        excerpt: "Which build suits weed control, hardscape, or drainage.",
        image: { ref: "/home/shield-card.webp", alt: "SHIELD woven fabric" },
        category: "Comparisons",
        level: "Beginner",
        author: "DOTDAY",
        authorMonogram: "DD",
        readTime: "6 min",
      },
    ],
  },
  videoFeature: { _type: "videoFeature" },
};
