import type { ProseBlock } from "@/lib/blog/types";
import { Prose as SharedProse } from "@/components/sections/Prose";

/** Blog Prose wrapper - implementation lives in @/components/sections/Prose. */
export function Prose({ block }: { block: ProseBlock }) {
  return <SharedProse data={block} />;
}
