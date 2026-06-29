/**
 * Shared landing-section glyph + slug helpers, lifted out of the monolith so
 * the sections that use them (BigTypeFeatures, EditorialCards) can live in
 * their own family files.
 */
import type {
  FeatureIcon,
} from "@/lib/landing/types";

export function categorySlug(category: string): string {
  return category.replace(/[^a-z]/gi, "").toLowerCase();
}

/**
 * Landing section components. These reuse the existing globals.css classes and
 * blog UI primitives so landing pages inherit brand styling for free. The FAQ,
 * comparison, and CTA here are landing-local for now; a later refactor lifts
 * them into a shared global layer that blogs also use.
 */

export function FeatureGlyph({ name }: { name: FeatureIcon }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "drop":
      return (
        <svg {...common}>
          <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 21s-7-5-7-11a7 7 0 0 1 14 0c0 6-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="M12 3 2 9l10 6 10-6-10-6z" />
          <path d="M2 15l10 6 10-6" />
        </svg>
      );
    case "sun":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
    case "shield":
    default:
      return (
        <svg {...common}>
          <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3z" />
        </svg>
      );
  }
}

/**
 * BigTypeFeatures - oversized uppercase statement + a stack of feature cards.
 * Self-contained inline styles using brand CSS vars (mirrors the StatementBand
 * approach) so it renders identically regardless of global CSS load order.
 */
