import Link from "next/link";

/**
 * QuoteBand - solid-neon call-to-action band plus a moving "Build for success"
 * marquee strip beneath it.
 *
 * The band drives to the FabricFinder tool (the strongest next step for a
 * visitor sizing up a project) using approved CTA copy. The marquee is a
 * pure-CSS infinite scroll (no JS), with the track duplicated so the loop is
 * seamless; it respects prefers-reduced-motion.
 */

const MARQUEE_WORD = "Build for success";
const MARQUEE_REPEAT = 8;

export function QuoteBand() {
  const items = Array.from({ length: MARQUEE_REPEAT });

  return (
    <>
      <section className="qband" aria-label="Plan your project">
        <div className="wrap qband-inner">
          <h2 className="qband-title">Plan the right fabric for your project</h2>
          <p className="qband-sub">
            Answer a few questions about your ground condition and get matched to
            SHIELD, XBAR, or TERRA, with the roll math done for you.
          </p>
          <Link className="qband-btn" href="/fabric-finder">
            Fabric Calculator
          </Link>
        </div>
      </section>

      <div className="marq" aria-hidden="true">
        <div className="marq-track">
          {items.map((_, i) => (
            <span className="marq-item" key={`a-${i}`}>
              <span className="marq-diamond">&#9670;</span>
              {MARQUEE_WORD}
            </span>
          ))}
          {items.map((_, i) => (
            <span className="marq-item" key={`b-${i}`}>
              <span className="marq-diamond">&#9670;</span>
              {MARQUEE_WORD}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
