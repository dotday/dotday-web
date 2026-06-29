"use client";
import { useState } from "react";
import { CTAButton } from "@/components/primitives/Badge";

/**
 * FabricFinder - the product-quiz tool (toolId: product-quiz). A short guided
 * selector that recommends SHIELD, XBAR, or TERRA by use case. Honest fit:
 * recommends the right fabric for the job, never just the pricier one.
 *
 * Pure client logic. On the live site this and the Calculator are the same
 * /landscape-fabric-calculator destination conceptually, but a dedicated
 * /fabric-finder route is wired so the quiz CTAs have a real home.
 */

type Product = "SHIELD" | "XBAR" | "TERRA";

const RESULTS: Record<
  Product,
  { weight: string; blurb: string; href: string }
> = {
  SHIELD: {
    weight: "3.2 oz woven",
    blurb:
      "Built for weed control. Use it under mulch, soil, or straw in garden beds, farm rows, and nurseries.",
    href: "/product-page/shield-landscape-fabric",
  },
  XBAR: {
    weight: "5 oz woven dual-layer",
    blurb:
      "Engineered for load and separation under gravel, pavers, and hardscape, or any high-traffic surface.",
    href: "/product-page/xbar-landscape-fabric",
  },
  TERRA: {
    weight: "4 / 6 / 8 oz non-woven",
    blurb:
      "Designed for drainage and filtration: French drains, retaining wall backfill, driveways, and erosion control.",
    href: "/product-page/terra-geotextile-fabric",
  },
};

const QUESTION = {
  q: "What is going on top of the fabric?",
  options: [
    { label: "Mulch, soil, or straw (garden / farm)", product: "SHIELD" as Product },
    { label: "Gravel, rock, or pavers (hardscape)", product: "XBAR" as Product },
    { label: "Drainage rock / behind a wall / French drain", product: "TERRA" as Product },
    { label: "Driveway or road base", product: "TERRA" as Product },
  ],
};

export function FabricFinder() {
  const [picked, setPicked] = useState<Product | null>(null);

  if (picked) {
    const r = RESULTS[picked];
    return (
      <div style={{ maxWidth: 680 }}>
        <div className="quick" style={{ margin: "0 0 18px" }}>
          <h2>Your match</h2>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span
              style={{
                fontFamily: "var(--display)",
                fontWeight: 500,
                fontSize: 32,
                color: "var(--charcoal)",
              }}
            >
              {picked}
            </span>
            <span style={{ color: "var(--olive)", fontWeight: 600 }}>
              {r.weight}
            </span>
          </div>
          <p style={{ margin: "10px 0 0", color: "var(--ink)" }}>{r.blurb}</p>
        </div>
        <div className="final-btns" style={{ justifyContent: "flex-start" }}>
          <CTAButton href={r.href} variant="primary">
            View {picked}
          </CTAButton>
          <CTAButton href="/landscape-fabric-calculator" variant="ghost">
            Use the Fabric Calculator
          </CTAButton>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setPicked(null)}
          >
            Start over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 680 }}>
      <div className="eyebrow" style={{ marginBottom: 12 }}>
        <b>{QUESTION.q}</b>
      </div>
      <div className="feature-grid" style={{ marginTop: 0 }}>
        {QUESTION.options.map((o, i) => (
          <button
            key={i}
            type="button"
            className="feature"
            style={{ textAlign: "left", cursor: "pointer" }}
            onClick={() => setPicked(o.product)}
          >
            <h3 style={{ marginBottom: 0 }}>{o.label}</h3>
          </button>
        ))}
      </div>
    </div>
  );
}
