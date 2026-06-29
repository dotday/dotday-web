import Link from "next/link";
import type {
  InternalLinksSection,
} from "@/lib/landing/types";

/**
 * InternalLinks - "keep exploring" navigation grid. Each link is a card with a
 * prominent label, a muted note subtitle, and a nudging arrow. One card design,
 * two tones (mirrors SharedCTA's tone switch):
 *   - "default" (omitted): white surface + hairline border, charcoal on hover.
 *   - "neon": neon-soft tiles (the ToolsBand look) for warmer / hardscape pages.
 * The data shape is unchanged (label / href / note?), so existing pages render
 * with no content edits.
 */
export function InternalLinks({ data }: { data: InternalLinksSection }) {
  const gridCls =
    data.tone === "neon" ? "ilink-grid ilink-grid--neon" : "ilink-grid";
  return (
    <div className="wrap sec">
      <h2>{data.heading || "Keep exploring"}</h2>
      <div className={gridCls}>
        {data.links.map((l, i) => (
          <Link className="ilink-card" key={i} href={l.href}>
            <span className="ilink-label">
              {l.label}
              <span className="ilink-arrow" aria-hidden="true">→</span>
            </span>
            {l.note ? <span className="ilink-note">{l.note}</span> : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
