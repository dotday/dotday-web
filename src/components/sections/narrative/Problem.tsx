/**
 * Auto-extracted from the former components/landing/sections.tsx monolith.
 * One section per file; registered via the SectionRegistry.
 */
import type {
  ProblemSection,
} from "@/lib/landing/types";

export function Problem({ data }: { data: ProblemSection }) {
  return (
    <div className="wrap sec">
      {data.eyebrow && (
        <div className="eyebrow">
          <b>{data.eyebrow}</b>
        </div>
      )}
      <h2>{data.heading}</h2>
      <p>{data.body}</p>
      {data.bullets && data.bullets.length > 0 && (
        <ul style={{ marginTop: 12, paddingLeft: 20, lineHeight: 1.7 }}>
          {data.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
