import type { TrustStripBlock } from "@/lib/blog/types";
import { TrustStrip as SharedTrustStrip } from "@/components/sections/TrustStrip";

/** Blog TrustStrip wrapper - implementation lives in @/components/sections/TrustStrip. */
export function TrustStrip({ block }: { block: TrustStripBlock }) {
  return <SharedTrustStrip data={block} />;
}
