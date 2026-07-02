/**
 * QrHero - dark scan-themed hero for post-purchase QR activation pages.
 * Ported from the approved my-qr-zone V3 proof. Schema-first: shape lives in
 * QrHero.schema.json; QrHeroSection is generated from it (QrHero.types.ts).
 *
 * Brand-axis notes vs the pasted proof (per dotday-section-author):
 *  - solid hexes -> CSS vars (#d8ff00 -> var(--neon), #1a1a1a -> var(--ink));
 *    rgba(216,255,0,x) glow/scrim alphas kept as-is (alpha variants of --neon).
 *  - radii already <= 6px; font is var(--text) everywhere (no Display).
 *  - The dark gradient stops (#16180f / #101410 / #0c0e0c) are the hero's own
 *    surface treatment (like FinalCTA's dark band), not palette drift.
 * Animations are compositor-only (transform) and disabled under
 * prefers-reduced-motion (see .qrh-* rules in globals.css).
 */
import type { QrHeroSection } from "./QrHero.types";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function QrHero({ data }: { data: QrHeroSection }) {
  return (
    <header className="qrh" aria-label={data.headline}>
      <div className="qrh-grid" aria-hidden="true" />
      <div className="qrh-scanwrap" aria-hidden="true"><div className="qrh-scanline" /></div>
      <span className="qrh-reticle tl" aria-hidden="true" /><span className="qrh-reticle tr" aria-hidden="true" />
      <span className="qrh-reticle bl" aria-hidden="true" /><span className="qrh-reticle br" aria-hidden="true" />
      <div className="qrh-inner">
        {data.tag && (
          <span className="qrh-tag"><span className="qrh-dot" aria-hidden="true" />{data.tag}</span>
        )}
        <h1>
          {data.headline}
          {data.headlineAccent && <span className="qrh-accent">{data.headlineAccent}</span>}
        </h1>
        {data.lead && <p className="qrh-lead">{data.lead}</p>}
        {(data.primaryCta || data.secondaryCta) && (
          <div className="btnrow" style={{ justifyContent: "center" }}>
            {data.primaryCta && (
              <a className="qrh-btn neon" href={data.primaryCta.href}>
                {data.primaryCta.label} <ArrowIcon />
              </a>
            )}
            {data.secondaryCta && (
              <a className="qrh-btn ghost" href={data.secondaryCta.href}>
                {data.secondaryCta.label}
              </a>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
