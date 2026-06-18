import type { Metadata } from "next";
import { Badge } from "@/components/blog/ui/Badge";
import { Steps } from "@/components/blog/blocks/Steps";
import { Callout } from "@/components/blog/blocks/Callout";
import { FinalCTA } from "@/components/blog/cta/FinalCTA";

export const metadata: Metadata = {
  title: "How to Install Weed Barrier Fabric",
  description:
    "Step-by-step guide to installing weed barrier and landscape fabric the right way: clear, grade, overlap seams, pin down, and cover promptly so it lasts.",
  alternates: { canonical: "/how-to-install-weed-barrier-fabric" },
};

export default function InstallGuidePage() {
  return (
    <>
      <div className="wrap page">
        <Badge>How-To & Installation</Badge>
        <h1 style={{ marginTop: 14 }}>How to install weed barrier fabric</h1>
        <p className="lead">
          The product matters, but a clean install is what makes it last. This
          sequence works across all three fabrics - only the surface on top
          changes.
        </p>
        <div className="body-single">
          <article>
            <Steps
              block={{
                _type: "steps",
                heading: "Installation, step by step",
                steps: [
                  { title: "Clear and grade", body: "Remove existing weeds and debris, then grade so water runs where you want it." },
                  { title: "Roll out with overlap", body: "Lay the fabric and overlap adjacent runs 6 to 12 inches so nothing migrates through the seam." },
                  { title: "Pin it down", body: "Anchor with landscape staples every few feet and at every seam so wind and traffic cannot shift it." },
                  { title: "Cover promptly", body: "Add mulch, gravel, or your finish layer right away - exposed fabric degrades in UV." },
                ],
              }}
            />
            <Callout
              block={{
                _type: "warning",
                heading: "⚠ Watch out",
                body: "Do not put a lightweight woven weed barrier under gravel or pavers and expect it to hold. Use a 5 oz dual-layer fabric like XBAR for load-bearing surfaces.",
              }}
            />
          </article>
        </div>
      </div>
      <FinalCTA
        heading="Need help choosing the right fabric?"
        primaryHref="/fabric-finder"
        primaryLabel="Find Your Fabric"
      />
    </>
  );
}
