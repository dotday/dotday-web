import type { CalloutBlock } from "@/lib/blog/types";

export function Callout({ block }: { block: CalloutBlock }) {
  if (block._type === "warning") {
    return (
      <div className="warn">
        <div className="lbl">{block.heading || "⚠ Watch out"}</div>
        <div className="txt">{block.body}</div>
      </div>
    );
  }
  return (
    <div className="protip">
      <div className="lbl">{block.heading || "◆ Pro Tip"}</div>
      <div className="txt">{block.body}</div>
    </div>
  );
}
