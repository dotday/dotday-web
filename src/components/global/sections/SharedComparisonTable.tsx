/**
 * SharedComparisonTable - the ONE comparison table used everywhere.
 *
 * Blog comparisonTable blocks and landing productComparison sections both
 * delegate here. Restyle once, every blog + landing page updates. Markup is
 * identical to the original blog ComparisonTable (sec / table-wrap / th.feat),
 * so existing posts render unchanged. Pure presentational.
 */
export interface ComparisonTableData {
  heading?: string;
  columns: string[];
  featuredColumn?: number;
  rows: string[][];
}

export function SharedComparisonTable({ data }: { data: ComparisonTableData }) {
  return (
    <div className="sec">
      {data.heading && <h2>{data.heading}</h2>}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {data.columns.map((c, i) => (
                <th key={i} className={data.featuredColumn === i ? "feat" : undefined}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, ri) => (
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
