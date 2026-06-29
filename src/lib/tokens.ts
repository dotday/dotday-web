/**
 * DOTDAY design tokens - the single source of truth for brand color + type.
 * Mirrors reference/design-spec.md and the brand kit. These values are also
 * emitted as CSS variables in styles/globals.css; keep the two in sync.
 *
 * Rule of thumb: components read CSS variables (var(--neon)) for styling so the
 * palette can change in one place. This file exists for any TS that needs the
 * raw values (e.g. inline SVG, OG image generation, theme-color meta).
 */
export const tokens = {
  color: {
    neon: "#D8FF00", // primary accent, CTA, badges, featured card
    neonSoft: "#DFFF6A", // subtle accent panels (quick-answer, quiz CTA)
    olive: "#5B6E00", // labels on neon-soft
    charcoal: "#101010", // minimal black - featured chips, small accents, key headers
    black: "#000000", // hero only, very limited
    ink: "#1A1A1A", // body text
    ink2: "#333333", // subheadings
    muted: "#6B6B6B", // captions, metadata, footnotes
    white: "#FFFFFF", // dominant background
    grey1: "#FFFFFF", // set to white to match the blog template (was #F4F4F4)
    grey2: "#EFEFEF", // hairline dividers / borders
  },
  font: {
    // Wix Madefor Text for everything. Self-hosted WOFF2 via FontFace.tsx,
    // exposed as --font-madefor (falls back to system fonts if files absent).
    family: "var(--font-madefor), 'Wix Madefor Text', system-ui, sans-serif",
  },
  layout: {
    maxPage: 1200, // px - full page width
    article: 860, // px - single centered article column
    radius: 6, // px - square / near-square corners
  },
} as const;

export type Tokens = typeof tokens;
