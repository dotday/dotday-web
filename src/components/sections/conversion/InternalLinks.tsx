/**
 * Auto-extracted from the former components/landing/sections.tsx monolith.
 * One section per file; registered via the SectionRegistry.
 */
import Link from "next/link";
import { FeatureGlyph } from "@/components/sections/_core/glyphs";
import type {
  InternalLinksSection,
} from "@/lib/landing/types";

export function InternalLinks({ data }: { data: InternalLinksSection }) {
  return (
    <div className="wrap sec">
      <h2>{data.heading || "Keep exploring"}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
        {data.links.map((l, i) => (
          <Link key={i} href={l.href} style={{ color: "var(--ink)" }}>
            <b>{l.label}</b>
            {l.note ? <span className="rtime"> {l.note}</span> : null}
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * FeatureGlyph - the fixed inline-SVG set used by bigTypeFeatures. Content picks
 * an icon by name; no arbitrary SVG markup ever lives in a content file. Stroke
 * inherits currentColor so the neon-on-charcoal chip styling applies for free.
 */
