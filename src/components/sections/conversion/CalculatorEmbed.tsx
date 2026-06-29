/**
 * Auto-extracted from the former components/landing/sections.tsx monolith.
 * One section per file; registered via the SectionRegistry.
 */
import { FabricCalculator } from "@/components/widgets/FabricCalculator";
import type {
  CalculatorEmbedSection,
} from "@/lib/landing/types";

export function CalculatorEmbed({ data }: { data: CalculatorEmbedSection }) {
  return (
    <div className="wrap sec">
      {data.heading && <h2>{data.heading}</h2>}
      {data.intro && <p className="lead">{data.intro}</p>}
      <div style={{ marginTop: 12 }}>
        <FabricCalculator />
      </div>
    </div>
  );
}
