import type { Metadata } from "next";
import { allSections } from "@/components/landing/registry";
import "@/components/landing/registry.seed"; // populate the registry (side effect)
import { SAMPLE_DATA } from "@/components/site/_blocks/sampleData";
import { ProductBlock } from "@/components/blog/blocks/ProductBlock";

/**
 * /_blocks - the section gallery (showroom).
 *
 * Renders EVERY registered section live, with sample data, grouped by surface,
 * with each section's `_type` and approved surfaces printed above it. Built
 * straight from the registry via allSections(), so a newly registered section
 * appears here automatically - the gallery can never drift from what exists.
 *
 * This is the shared catalog: skim it, point at a section by its _type, and that
 * name is exactly what goes in a page's JSON. noindexed so it never ranks.
 */

export const metadata: Metadata = {
  title: "Section Gallery (internal)",
  robots: { index: false, follow: false },
};

export default function BlocksGalleryPage() {
  const sections = allSections().sort((a, b) => a.type.localeCompare(b.type));

  return (
    <main style={{ paddingBottom: 80 }}>
      <header
        style={{
          background: "var(--charcoal)",
          color: "var(--white)",
          padding: "40px 20px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <span
            style={{
              display: "inline-block",
              background: "var(--neon)",
              color: "var(--charcoal)",
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "6px 12px",
              borderRadius: 100,
              marginBottom: 16,
            }}
          >
            Internal
          </span>
          <h1 style={{ color: "var(--white)", margin: "0 0 8px" }}>Section gallery</h1>
          <p style={{ color: "var(--grey2)", maxWidth: 640, margin: 0 }}>
            Every registered section, rendered live with sample data. Reference a
            section by the <code>_type</code> shown above it when asking for a new
            page. {sections.length} sections registered.
          </p>
        </div>
      </header>

      {sections.map((def) => {
        const sample = SAMPLE_DATA[def.type];
        const C = def.component;
        return (
          <section
            key={def.type}
            style={{ borderBottom: "1px solid var(--grey2)", padding: "0 0 8px" }}
          >
            <div
              style={{
                maxWidth: 1100,
                margin: "0 auto",
                padding: "28px 20px 12px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <code
                style={{
                  background: "var(--charcoal)",
                  color: "var(--neon)",
                  fontWeight: 700,
                  fontSize: 14,
                  padding: "5px 12px",
                  borderRadius: 6,
                }}
              >
                {def.type}
              </code>
              <span style={{ display: "flex", gap: 6 }}>
                {def.surfaces.map((s) => (
                  <span
                    key={s}
                    style={{
                      background: "var(--grey2)",
                      color: "var(--ink2)",
                      fontSize: 11.5,
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      padding: "4px 9px",
                      borderRadius: 100,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </span>
              {def.isAction && (
                <span
                  style={{
                    background: "var(--neon-soft)",
                    color: "var(--charcoal)",
                    fontSize: 11.5,
                    fontWeight: 700,
                    padding: "4px 9px",
                    borderRadius: 100,
                  }}
                >
                  loads third-party / action
                </span>
              )}
            </div>

            <div style={{ position: "relative" }}>
              {def.type === "productBlock" ? (
                <div className="wrap">
                  <ProductBlock />
                </div>
              ) : sample !== undefined ? (
                <C data={sample} />
              ) : (
                <div
                  style={{
                    maxWidth: 1100,
                    margin: "0 auto",
                    padding: "20px",
                    color: "var(--muted)",
                    fontStyle: "italic",
                  }}
                >
                  No sample data for <code>{def.type}</code> yet - add one in
                  components/site/_blocks/sampleData.ts to preview it here.
                </div>
              )}
            </div>
          </section>
        );
      })}
    </main>
  );
}
