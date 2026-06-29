import type { StatStripData } from "@/components/sections/types";

/**
 * StatStrip - shared row of big stat numbers + labels. Identical on any surface.
 * Canonical home; blog re-exports a `{ block }` wrapper.
 */
export function StatStrip({ data }: { data: StatStripData }) {
  return (
    <div className="stats">
      {data.items.map((s, i) => (
        <div className="stat" key={i}>
          <div className="n">{s.value}</div>
          <div className="l">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
