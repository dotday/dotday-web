import type { Metadata } from "next";
import { Badge } from "@/components/primitives/Badge";
import { FabricFinder } from "@/components/widgets/FabricFinder";
import { FinalCTA } from "@/components/sections/conversion/FinalCTA";

export const metadata: Metadata = {
  title: "Fabric Finder - Choose SHIELD, XBAR, or TERRA",
  description:
    "Answer one question and get matched to the right DOTDAY landscape fabric for your ground condition: weed control, hardscape, or drainage.",
  alternates: { canonical: "/fabric-finder" },
};

export default function FabricFinderPage() {
  return (
    <>
      <div className="wrap page">
        <Badge>Find your fabric</Badge>
        <h1 style={{ marginTop: 14 }}>Which fabric do you need?</h1>
        <p className="lead">
          The right fabric depends on the ground, not the price. Tell us what is
          going on top and we will point you to SHIELD, XBAR, or TERRA.
        </p>
        <div className="section">
          <FabricFinder />
        </div>
      </div>
      <FinalCTA
        heading="Want to run the numbers too?"
        primaryHref="/landscape-fabric-calculator"
        primaryLabel="Use the Fabric Calculator"
      />
    </>
  );
}
