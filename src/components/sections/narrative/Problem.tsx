import { Twemoji } from "@/components/primitives/Twemoji";
import type { ProblemSection } from "@/lib/landing/types";

/**
 * Problem - names the customer's ground-condition pain before the fix. Optional
 * emoji sits in a neon-soft tile beside the eyebrow; bullets use neon markers.
 */
export function Problem({ data }: { data: ProblemSection }) {
  return (
    <div className="wrap sec nar">
      <div className="nar-row">
        {data.emoji && (
          <span className="nar-ico nar-ico--soft" aria-hidden="true">
            <Twemoji emoji={data.emoji} size={28} />
          </span>
        )}
        <div className="nar-copy">
          {data.eyebrow && (
            <div className="eyebrow">
              <b>{data.eyebrow}</b>
            </div>
          )}
          <h2>{data.heading}</h2>
          <p>{data.body}</p>
          {data.bullets && data.bullets.length > 0 && (
            <ul className="nar-bullets">
              {data.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
