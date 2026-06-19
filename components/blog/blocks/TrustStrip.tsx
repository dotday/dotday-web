import type { TrustStripBlock } from "@/lib/blog/types";

/**
 * TrustStrip - a credibility panel ("Why trust DOTDAY on ...") with a heading
 * and a row of checkmarked points. Soft-neon panel, neon check chips. Used on
 * decision-stage posts (Buying Guides, Comparisons) to establish expertise.
 *
 * Maps from a `trustStrip` block: { heading, items: string[] }.
 */
export function TrustStrip({ block }: { block: TrustStripBlock }) {
  return (
    <div className="trust-strip">
      {block.heading && <h3 className="trust-strip-h">{block.heading}</h3>}
      <div className="trust-strip-grid">
        {block.items.map((item, i) => (
          <div className="trust-strip-item" key={i}>
            <span className="trust-strip-check" aria-hidden="true">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span className="trust-strip-text">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
