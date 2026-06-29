/**
 * Auto-extracted from the former components/landing/sections.tsx monolith.
 * One section per file; registered via the SectionRegistry.
 */
import type {
  ReviewSection,
} from "@/lib/landing/types";

export function Reviews({ data }: { data: ReviewSection }) {
  return (
    <div className="wrap sec">
      <h2>{data.heading || "What pros say"}</h2>
      <div className="rgrid" style={{ marginTop: 8 }}>
        {data.items.map((r, i) => (
          <div className="rcard" key={i}>
            <div className="pad">
              {typeof r.rating === "number" && (
                <div aria-label={`${r.rating} out of 5`} style={{ color: "var(--neon)", marginBottom: 6 }}>
                  {"\u2605".repeat(Math.round(r.rating))}
                </div>
              )}
              <p>{r.quote}</p>
              <span className="rtime">
                {r.author}
                {r.role ? `, ${r.role}` : ""}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
