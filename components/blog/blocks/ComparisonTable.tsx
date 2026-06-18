import type { ComparisonTableBlock } from "@/lib/blog/types";

export function ComparisonTable({ block }: { block: ComparisonTableBlock }) {
  return (
    <div className="sec">
      {block.heading && <h2>{block.heading}</h2>}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {block.columns.map((c, i) => (
                <th key={i} className={block.featuredColumn === i ? "feat" : undefined}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
