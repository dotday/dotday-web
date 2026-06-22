import type { StatStripBlock } from "@/lib/blog/types";

export function StatStrip({ block }: { block: StatStripBlock }) {
  return (
    <div className="stats">
      {block.items.map((s, i) => (
        <div className="stat" key={i}>
          <div className="n">{s.value}</div>
          <div className="l">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
