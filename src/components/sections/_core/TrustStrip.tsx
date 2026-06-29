import type { TrustStripData } from "@/components/sections/_core/types";

/**
 * TrustStrip - shared credibility panel: heading + a row of checkmarked points.
 * Soft-neon panel, neon check chips. Used on decision-stage content to establish
 * expertise. Identical on any surface. Canonical home; blog re-exports a wrapper.
 */
export function TrustStrip({ data }: { data: TrustStripData }) {
  return (
    <div className="trust-strip">
      {data.heading && <h3 className="trust-strip-h">{data.heading}</h3>}
      <div className="trust-strip-grid">
        {data.items.map((item, i) => (
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
