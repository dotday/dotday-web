import { Img } from "@/components/primitives/Img";
import { renderInlineLinks } from "@/components/primitives/InlineLinks";
import type { StepsData } from "@/components/sections/_core/types";

/**
 * Steps - shared numbered step list. Renders identically on any surface. Uses
 * the `.sec` + `.steps` classes from globals.css. Canonical home for the
 * component; blog re-exports a `{ block }` wrapper for its existing call sites.
 *
 * variant "cards" (my-qr-zone V3): a full-width band with eyebrow + heading +
 * lead over white numbered step cards (stepcards-* classes) and an optional
 * wide image. The default "list" path below is byte-identical to before, so
 * every existing blog post and landing page renders unchanged.
 */
export function Steps({ data }: { data: StepsData }) {
  if (data.variant === "cards") {
    return (
      <section className="sec" aria-label={data.heading || "Steps"}>
        <div className="wrap">
          {data.eyebrow && (
            <div className="badgewrap"><span className="pch-eyebrow">{data.eyebrow}</span></div>
          )}
          {data.heading && <h2>{data.heading}</h2>}
          {data.lead && <p className="pch-lead">{renderInlineLinks(data.lead)}</p>}
          <div className="stepcards">
            {data.steps.map((s, i) => (
              <div className="stepcard" key={i}>
                <span className="stepcard-n" aria-hidden="true">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
          {data.image && (
            <div className="stepcards-img">
              <Img src={data.image.ref} alt={data.image.alt} ratio="r-1611" placeholderLabel={data.heading} />
            </div>
          )}
        </div>
      </section>
    );
  }

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
