import type { StepsBlock } from "@/lib/blog/types";

export function Steps({ block }: { block: StepsBlock }) {
  return (
    <div className="sec">
      {block.heading && <h2>{block.heading}</h2>}
      <ol className="steps">
        {block.steps.map((s, i) => (
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
