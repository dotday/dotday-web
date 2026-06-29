import type { CalloutBlock } from "@/lib/blog/types";
import { Callout as SharedCallout } from "@/components/sections/Callout";

/**
 * Blog Callout wrapper - keeps the blog `{ block }` call site working while the
 * implementation lives in the shared core (@/components/sections/Callout).
 */
export function Callout({ block }: { block: CalloutBlock }) {
  return <SharedCallout data={block} />;
}
