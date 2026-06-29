import type { StatStripBlock } from "@/lib/blog/types";
import { StatStrip as SharedStatStrip } from "@/components/sections/StatStrip";

/** Blog StatStrip wrapper - implementation lives in @/components/sections/StatStrip. */
export function StatStrip({ block }: { block: StatStripBlock }) {
  return <SharedStatStrip data={block} />;
}
