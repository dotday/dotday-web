/**
 * Auto-extracted from the former components/landing/sections.tsx monolith.
 * One section per file; registered via the SectionRegistry.
 */
import type {
  StatementBandSection,
} from "@/lib/landing/types";

export function StatementBand({ data }: { data: StatementBandSection }) {
  const [w1, w2, w3] = data.watermark;
  const markBase: React.CSSProperties = {
    position: "absolute",
    fontSize: "clamp(56px, 12vw, 168px)",
    whiteSpace: "nowrap",
  };

  // --- ghost: the my-qr-zone V3 "Love Growing Green" treatment. Light-grey
  // band, three oversized lowercase ghost words pinned to the corners/center,
  // an optional animated mark image (the neon heart GIF), and a lighter-weight
  // statement. Default variant below is byte-identical to before.
  if (data.variant === "ghost") {
    const ghostBase: React.CSSProperties = {
      position: "absolute",
      fontWeight: 400,
      color: "var(--dark-grey, #e9e9e9)",
      letterSpacing: "-0.045em",
      lineHeight: 0.78,
      userSelect: "none",
      pointerEvents: "none",
      textTransform: "lowercase",
      whiteSpace: "nowrap",
    };
    return (
      <section
        aria-label="DOTDAY positioning"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "var(--paper2)",
          padding: "clamp(90px, 12vw, 150px) 0",
          textAlign: "center",
        }}
      >
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          <span style={{ ...ghostBase, top: "7%", left: "-1.5%", fontSize: "clamp(96px, 18vw, 290px)" }}>{w1}</span>
          <span style={{ ...ghostBase, top: "31%", left: "50%", transform: "translateX(-50%)", fontSize: "clamp(110px, 20vw, 320px)" }}>{w2}</span>
          <span style={{ ...ghostBase, bottom: "1%", right: "-1.5%", fontSize: "clamp(96px, 18vw, 290px)" }}>{w3}</span>
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1040, margin: "0 auto", padding: "0 24px" }}>
          {data.markImage?.ref && (
            <img
              src={data.markImage.ref}
              alt={data.markImage.alt || ""}
              width={156}
              height={140}
              loading="lazy"
              style={{ width: "auto", height: 78, margin: "0 auto 26px", display: "block" }}
            />
          )}
          <p
            style={{
              fontWeight: 400,
              fontSize: "clamp(26px, 4.2vw, 52px)",
              lineHeight: 1.18,
              letterSpacing: "-0.02em",
              color: "var(--charcoal)",
              margin: 0,
            }}
          >
            {data.statement}
            {data.highlight && (
              <>
                {" "}
                <span
                  style={{
                    background: "var(--neon)",
                    color: "var(--ink)",
                    padding: "0.05em 0.28em",
                    borderRadius: 3,
                    WebkitBoxDecorationBreak: "clone",
                    boxDecorationBreak: "clone",
                    whiteSpace: "nowrap",
                  }}
                >
                  {data.highlight}
                </span>
              </>
            )}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label="DOTDAY positioning"
      style={{
        position: "relative",
        background: "#ffffff",
        overflow: "hidden",
        padding: "var(--sec-pad-lg) 20px",
        textAlign: "center",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "var(--ink)",
          opacity: 0.06,
          userSelect: "none",
        }}
      >
        <span style={{ ...markBase, top: "clamp(8px, 4vw, 40px)", left: "clamp(8px, 3vw, 64px)" }}>
          {w1}
        </span>
        <span
          style={{
            ...markBase,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {w2}
        </span>
        <span style={{ ...markBase, bottom: "clamp(8px, 4vw, 36px)", right: "clamp(8px, 3vw, 64px)" }}>
          {w3}
        </span>
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto" }}>
        {data.leafMark !== false && (
          <svg
            viewBox="0 0 64 64"
            fill="none"
            stroke="var(--olive)"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            role="img"
            aria-label="DOTDAY leaf mark"
            style={{
              display: "block",
              width: "clamp(64px, 7vw, 88px)",
              height: "auto",
              margin: "0 auto clamp(18px, 2.4vw, 28px)",
            }}
          >
            <path d="M31 41C20 41 9 33 7 13c20 1 26 12 26 26" />
            <path d="M33 41c11 0 22-8 24-28-20 1-26 12-26 26" />
            <path d="M32 39v15" />
            <path d="M32 54c-1.5 2.5-4 4.5-7 5.5" />
            <path d="M32 54c1.5 2.5 4 4.5 7 5.5" />
            <path d="M31 41C26 39 22 35 19 30" />
            <path d="M33 41c5-2 9-6 12-11" />
          </svg>
        )}
        <p
          style={{
            fontWeight: 700,
            fontSize: "clamp(22px, 3.2vw, 38px)",
            lineHeight: 1.22,
            letterSpacing: "-0.02em",
            color: "var(--charcoal)",
            margin: 0,
          }}
        >
          {data.statement}
          {data.highlight && (
            <>
              {" "}
              <span
                style={{
                  background: "var(--neon)",
                  color: "var(--charcoal)",
                  padding: "0.02em 0.16em",
                  borderRadius: 3,
                  WebkitBoxDecorationBreak: "clone",
                  boxDecorationBreak: "clone",
                }}
              >
                {data.highlight}
              </span>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
