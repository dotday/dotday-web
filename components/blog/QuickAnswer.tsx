import type { QuickAnswer as QA } from "@/lib/blog/types";

export function QuickAnswer({ data }: { data: QA }) {
  return (
    <div className="wrap">
      <div className="quick">
        <h2>{data.heading || "What you'll learn"}</h2>
        <div className="quick-grid">
          {data.items.map((item, i) => (
            <div className="quick-item" key={i}>
              <span className="check">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
