import type { Metadata } from "next";
import { Badge } from "@/components/blog/ui/Badge";
import { FabricCalculator } from "@/components/tools/FabricCalculator";
import { FinalCTA } from "@/components/blog/cta/FinalCTA";

export const metadata: Metadata = {
  title: "Landscape Fabric Calculator",
  description:
    "Free landscape fabric calculator. Enter your area, seam overlap, and roll size to get square footage and how many rolls you need.",
  alternates: { canonical: "/landscape-fabric-calculator" },
};

export default function CalculatorPage() {
  return (
    <>
      <div className="wrap page">
        <Badge>Tool</Badge>
        <h1 style={{ marginTop: 14 }}>Landscape fabric calculator</h1>
        <p className="lead">
          Enter your area, seam overlap, and roll size to get exact square
          footage and the number of rolls you need - including a waste factor for
          seams and trimming.
        </p>
        <div className="section">
          <FabricCalculator />
        </div>
      </div>
      <FinalCTA
        heading="Not sure which fabric fits your job?"
        primaryHref="/fabric-finder"
        primaryLabel="Find Your Fabric"
      />
    </>
  );
}
