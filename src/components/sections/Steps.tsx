import type { StepsData } from "@/components/sections/types";

/**
 * Steps - shared numbered step list. Renders identically on any surface. Uses
 * the `.sec` + `.steps` classes from globals.css. Canonical home for the
 * component; blog re-exports a `{ block }` wrapper for its existing call sites.
 */
export function Steps({ data }: { data: StepsData }) {
  return (
    <div className="sec">
      {data.heading && <h2>{data.heading}</h2>}
      <ol className="steps">
        {data.steps.map((s, i) => (
          <li key={i}>
            <span className="step-n">{i + 1}</span>
            <div>
              <div className="step-t">{s.title}</div>
              <div className="step-d">{s.body}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
