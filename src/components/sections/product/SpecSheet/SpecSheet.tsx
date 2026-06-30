/**
 * SpecSheet - schema-first reference section. Its shape is defined ONCE in
 * SpecSheet.schema.json; SpecSheetSection is generated from that schema
 * (SpecSheet.types.ts) - never hand-written, so it cannot drift.
 */
import { Img } from "@/components/primitives/Img";
import type { SpecSheetSection } from "./SpecSheet.types";

export function SpecSheet({ data }: { data: SpecSheetSection }) {
  return (
    <section className="wrap sec" aria-label={data.heading}>
      <div
        style={{
          border: "1px solid var(--grey2)",
          borderRadius: 18,
          padding: "clamp(28px, 4vw, 52px)",
          background: "var(--white)",
        }}
      >
        {data.tag && (
          <span
            style={{
              display: "inline-block",
              background: "var(--neon)",
              color: "var(--charcoal)",
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              padding: "7px 14px",
              borderRadius: 100,
              marginBottom: 20,
            }}
          >
            {data.tag}
          </span>
        )}
        <h2 style={{ marginBottom: 12 }}>{data.heading}</h2>
        {data.intro && (
          <p style={{ color: "var(--muted)", maxWidth: 520, marginBottom: 34, lineHeight: 1.55 }}>
            {data.intro}
          </p>
        )}
        <div
          className="spec-grid"
          style={{
            display: "grid",
            gridTemplateColumns: data.image ? "1fr 1fr" : "1fr",
            gap: "clamp(28px, 4vw, 48px)",
            alignItems: "start",
          }}
        >
          <div style={{ display: "grid", gap: 14 }}>
            {data.rows.map((r, i) => {
              const neon = r.emphasis !== "plain";
              return (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: 14,
                    alignItems: "stretch",
                  }}
                >
                  <div
                    style={{
                      minWidth: 120,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 600,
                      fontSize: "clamp(20px, 2.4vw, 26px)",
                      letterSpacing: "-0.02em",
                      borderRadius: 12,
                      padding: "0 18px",
                      color: "var(--charcoal)",
                      background: neon ? "var(--neon)" : "transparent",
                    }}
                  >
                    {r.value}
                  </div>
                  <div
                    style={{
                      borderRadius: 12,
                      padding: "14px 18px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      background: neon ? "var(--white)" : "var(--grey2)",
                      border: neon ? "1px solid var(--neon)" : "1px solid transparent",
                      boxShadow: neon
                        ? "0 0 0 3px rgba(216,255,0,0.28), 0 0 14px rgba(216,255,0,0.22)"
                        : "none",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13.5,
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        lineHeight: 1.25,
                        color: "var(--charcoal)",
                      }}
                    >
                      {r.label}
                    </span>
                    {r.standard && (
                      <span
                        style={{
                          fontSize: 12.5,
                          fontWeight: 600,
                          marginTop: 3,
                          letterSpacing: "0.02em",
                          color: "var(--muted)",
                        }}
                      >
                        {r.standard}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {data.image && (
            <div
              style={{
                border: "1px solid var(--grey2)",
                borderRadius: 14,
                overflow: "hidden",
              }}
            >
              <Img src={data.image.ref} alt={data.image.alt} ratio="r-169" />
            </div>
          )}
        </div>
        {data.footnote && (
          <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, marginTop: 34, maxWidth: 760 }}>
            {data.footnote}
          </p>
        )}
      </div>
    </section>
  );
}

