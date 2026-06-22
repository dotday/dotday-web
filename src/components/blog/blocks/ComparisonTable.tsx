import type { ComparisonTableBlock } from "@/lib/blog/types";
import { SharedComparisonTable } from "@/components/global/sections/SharedComparisonTable";

/**
 * ComparisonTable (blog block) - thin adapter over the GLOBAL
 * SharedComparisonTable so blogs and landing pages render one identical table.
 * Restyle the shared component, every surface updates.
 */
export function ComparisonTable({ block }: { block: ComparisonTableBlock }) {
  return (
    <SharedComparisonTable
      data={{
        heading: block.heading,
        columns: block.columns,
        featuredColumn: block.featuredColumn,
        rows: block.rows,
      }}
    />
  );
}
