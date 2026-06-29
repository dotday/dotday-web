import Link from "next/link";
import type { QuoteBandData } from "@/components/site/home/types";

/**
 * QuoteBand - solid-neon CTA band + a moving marquee strip beneath it. Now
 * data-driven; markup byte-identical (qband-* / marq-* classes). The marquee is
 * pure-CSS infinite scroll (track duplicated for a seamless loop), respecting
 * prefers-reduced-motion. DEFAULT_QUOTE_BAND holds today's content.
 */

const MARQUEE_REPEAT = 8;

export const DEFAULT_QUOTE_BAND: QuoteBandData = {
  _type: "quoteBand",
  heading: "Plan the right fabric for your project",
  sub: "Answer a few questions about your ground condition and get matched to SHIELD, XBAR, or TERRA, with the roll math done for you.",
  ctaLabel: "Fabric Calculator",
  ctaHref: "/fabric-finder",
  marqueeWord: "Build for success",
};

export function QuoteBand({ data = DEFAULT_QUOTE_BAND }: { data?: QuoteBandData }) {
  const word = data.marqueeWord || "Build for success";
  const items = Array.from({ length: MARQUEE_REPEAT });

  return (
    <>
      <section className="qband" aria-label="Plan your project">
        <div className="wrap qband-inner">
          <h2 className="qband-title">{data.heading}</h2>
          {data.sub && <p className="qband-sub">{data.sub}</p>}
          <Link className="qband-btn" href={data.ctaHref}>
            {data.ctaLabel}
          </Link>
        </div>
      </section>

      <div className="marq" aria-hidden="true">
        <div className="marq-track">
          {items.map((_, i) => (
            <span className="marq-item" key={`a-${i}`}>
              <span className="marq-diamond">&#9670;</span>
              {word}
            </span>
          ))}
          {items.map((_, i) => (
            <span className="marq-item" key={`b-${i}`}>
              <span className="marq-diamond">&#9670;</span>
              {word}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
