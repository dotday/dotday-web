/* AUTO-GENERATED from the sibling *.schema.json by scripts/gen-types.mjs.
 * Do NOT edit by hand - edit the schema and run `npm run content:types`. */

/**
 * QR activation hero: dark scan-themed hero with animated grid, neon scan beam, corner reticles, a pulsing status tag, a two-line uppercase H1 (line 2 in neon), lead copy, and up to two CTAs. Built for post-purchase QR landing pages (/l/my-qr-zone). This file is the SINGLE SOURCE OF TRUTH for the section's shape - the TS type is generated from it (QrHero.types.ts) and the landing-page doc schema $refs it.
 */
export interface QrHeroSection {
  _type: "qrHero";
  /**
   * Pulsing status pill above the H1, e.g. 'Post-Purchase Activation Hub'.
   */
  tag?: string;
  /**
   * H1 line one, e.g. 'You scanned it.'
   */
  headline: string;
  /**
   * H1 line two, rendered in neon on its own line, e.g. "Let's grow."
   */
  headlineAccent?: string;
  /**
   * Supporting copy under the H1.
   */
  lead?: string;
  /**
   * Neon button. Label from the approved CTA library, ALL-CAPS applied by CSS.
   */
  primaryCta?: {
    label: string;
    href: string;
  };
  /**
   * Ghost (light outline) button.
   */
  secondaryCta?: {
    label: string;
    href: string;
  };
}
