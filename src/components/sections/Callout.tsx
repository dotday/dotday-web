import type { CalloutData } from "@/components/sections/types";

/**
 * Callout - shared neon-bordered Pro Tip / Watch out box. Renders identically on
 * any surface. Canonical home; blog re-exports a `{ block }` wrapper.
 */
export function Callout({ data }: { data: CalloutData }) {
  if (data._type === "warning") {
    return (
      <div className="warn">
        <div className="lbl">{data.heading || "\u26A0 Watch out"}</div>
        <div className="txt">{data.body}</div>
      </div>
    );
  }
  return (
    <div className="protip">
      <div className="lbl">{data.heading || "\u25C6 Pro Tip"}</div>
      <div className="txt">{data.body}</div>
    </div>
  );
}
