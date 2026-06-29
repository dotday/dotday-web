import type { StepsBlock } from "@/lib/blog/types";
import { Steps as SharedSteps } from "@/components/sections/Steps";

/**
 * Blog Steps wrapper - keeps the blog `{ block }` call site working while the
 * implementation lives in the shared core (@/components/sections/Steps). The
 * shared component is the single source of truth; this just adapts the prop name.
 */
export function Steps({ block }: { block: StepsBlock }) {
  return <SharedSteps data={block} />;
}
