"use client";
import { useMemo, useState } from "react";
import { CTAButton } from "@/components/blog/ui/Badge";

/**
 * FabricCalculator - combines the two real calculator toolIds (fabric-coverage
 * + roll-quantity) into one tool: enter area + overlap + roll size, get square
 * footage and rolls needed. Pure client math, no backend. The "Get a quote"
 * CTA routes to /contact-us (lead capture), per the brand workflow.
 *
 * Roll presets reflect DOTDAY's real product line; widths are configurable.
 */

type Units = "ft" | "m";

const ROLL_PRESETS = [
  { label: "SHIELD / XBAR 3ft x 250ft", w: 3, l: 250 },
  { label: "SHIELD / XBAR 4ft x 250ft", w: 4, l: 250 },
  { label: "SHIELD / XBAR 6ft x 300ft", w: 6, l: 300 },
  { label: "TERRA 6ft x 300ft", w: 6, l: 300 },
  { label: "TERRA 12.5ft x 360ft", w: 12.5, l: 360 },
  { label: "Custom", w: 0, l: 0 },
];

export function FabricCalculator() {
  const [units, setUnits] = useState<Units>("ft");
  const [length, setLength] = useState("20");
  const [width, setWidth] = useState("10");
  const [overlapIn, setOverlapIn] = useState("6");
  const [wastePct, setWastePct] = useState("10");
  const [preset, setPreset] = useState(0);
  const [rollW, setRollW] = useState("3");
  const [rollL, setRollL] = useState("250");

  const isCustom = ROLL_PRESETS[preset].w === 0;
  const unitLabel = units === "ft" ? "ft" : "m";

  const result = useMemo(() => {
    const L = parseFloat(length) || 0;
    const W = parseFloat(width) || 0;
    const overlapFt = (parseFloat(overlapIn) || 0) / 12; // inches -> feet
    const waste = (parseFloat(wastePct) || 0) / 100;

    // Convert to feet for the math if metric (1m = 3.28084ft)
    const toFt = units === "ft" ? 1 : 3.28084;
    const Lf = L * toFt;
    const Wf = W * toFt;

    const baseArea = Lf * Wf;
    if (baseArea <= 0) return null;

    // Number of runs across the width, each run adds an overlap seam.
    const rW = isCustom ? parseFloat(rollW) || 0 : ROLL_PRESETS[preset].w;
    const rL = isCustom ? parseFloat(rollL) || 0 : ROLL_PRESETS[preset].l;
    const effectiveRunWidth = Math.max(rW - overlapFt, 0.1);
    const runs = rW > 0 ? Math.ceil(Wf / effectiveRunWidth) : 0;

    const areaWithWaste = baseArea * (1 + waste);
    const rollArea = rW > 0 && rL > 0 ? rW * rL : 0;
    const rollsByArea = rollArea > 0 ? Math.ceil(areaWithWaste / rollArea) : 0;

    // Linear feet needed if you lay full-width runs the length of the area.
    const linearFtNeeded = runs * Lf * (1 + waste);
    const rollsByRuns = rL > 0 ? Math.ceil(linearFtNeeded / rL) : 0;

    const rolls = Math.max(rollsByArea, rollsByRuns);

    return {
      baseArea: Math.round(baseArea),
      areaWithWaste: Math.round(areaWithWaste),
      runs,
      rolls,
      linearFt: Math.round(linearFtNeeded),
      rollLabel: isCustom ? `${rW}ft x ${rL}ft` : ROLL_PRESETS[preset].label,
    };
  }, [length, width, overlapIn, wastePct, preset, rollW, rollL, isCustom, units]);

  return (
    <div>
      <div className="form" style={{ maxWidth: 680 }}>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            className="btn"
            onClick={() => setUnits("ft")}
            style={{
              background: units === "ft" ? "var(--neon)" : "transparent",
              borderColor: units === "ft" ? "var(--neon)" : "var(--grey2)",
              color: "var(--ink)",
              padding: "9px 16px",
            }}
          >
            Feet
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => setUnits("m")}
            style={{
              background: units === "m" ? "var(--neon)" : "transparent",
              borderColor: units === "m" ? "var(--neon)" : "var(--grey2)",
              color: "var(--ink)",
              padding: "9px 16px",
            }}
          >
            Meters
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div className="field">
            <label>Area length ({unitLabel})</label>
            <input
              inputMode="decimal"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Area width ({unitLabel})</label>
            <input
              inputMode="decimal"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div className="field">
            <label>Seam overlap (inches)</label>
            <input
              inputMode="decimal"
              value={overlapIn}
              onChange={(e) => setOverlapIn(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Waste factor (%)</label>
            <input
              inputMode="decimal"
              value={wastePct}
              onChange={(e) => setWastePct(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label>Roll size</label>
          <select
            value={preset}
            onChange={(e) => setPreset(parseInt(e.target.value, 10))}
          >
            {ROLL_PRESETS.map((r, i) => (
              <option key={i} value={i}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        {isCustom && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div className="field">
              <label>Roll width (ft)</label>
              <input
                inputMode="decimal"
                value={rollW}
                onChange={(e) => setRollW(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Roll length (ft)</label>
              <input
                inputMode="decimal"
                value={rollL}
                onChange={(e) => setRollL(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {result && (
        <div className="stats" style={{ maxWidth: 680 }}>
          <div className="stat">
            <div className="n">{result.areaWithWaste.toLocaleString()}</div>
            <div className="l">sq ft to cover (incl. waste)</div>
          </div>
          <div className="stat">
            <div className="n">{result.runs}</div>
            <div className="l">fabric runs across width</div>
          </div>
          <div className="stat">
            <div className="n">{result.rolls}</div>
            <div className="l">rolls of {result.rollLabel}</div>
          </div>
          <div className="stat">
            <div className="n">{result.linearFt.toLocaleString()}</div>
            <div className="l">linear ft of fabric</div>
          </div>
        </div>
      )}

      <div className="cta-calc" style={{ maxWidth: 680 }}>
        <div className="body">
          <div className="cta-lbl">▣ Buying for a job?</div>
          <h3>Get a project quote</h3>
          <p>Send your numbers and we will put together volume pricing.</p>
        </div>
        <CTAButton href="/contact-us" variant="primary">
          Request a Quote
        </CTAButton>
      </div>

      <p className="form-note" style={{ maxWidth: 680 }}>
        Estimates only. Overlap, terrain, and cut waste vary by site - order a
        little extra for seams and trimming.
      </p>
    </div>
  );
}
