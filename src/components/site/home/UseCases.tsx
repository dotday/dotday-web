import { Img } from "@/components/blog/ui/Img";
import { CTAButton } from "@/components/blog/ui/Badge";

/**
 * UseCases - "Built for every ground condition." Three cards, each pairing a
 * real ground condition to the correct DOTDAY fabric. Honest product fit is a
 * brand rule: gravel -> XBAR, beds -> SHIELD, drainage -> TERRA. Imagery uses
 * the A+ application composites from the brand Drive.
 */

const CASES = [
  {
    eyebrow: "Gravel & Hardscape",
    title: "Stronger gravel installs",
    body: "Stabilize gravel and stop sinking, shifting, and weed growth under driveways, paths, and high-traffic hardscape.",
    pick: "Use XBAR 5oz",
    href: "/product-page/xbar-landscape-fabric",
    image: "/brand/home/xbar-card.webp",
    alt: "DOTDAY XBAR 5oz dual-layer fabric for gravel driveways and hardscape",
  },
  {
    eyebrow: "Garden Beds & Farms",
    title: "Cleaner garden beds",
    body: "Control weeds while water, air, and nutrients reach the soil. Built for beds, raised planters, farm rows, and nurseries.",
    pick: "Use SHIELD 3.2oz",
    href: "/product-page/shield-landscape-fabric",
    image: "/brand/home/shield-card.webp",
    alt: "DOTDAY SHIELD 3.2oz woven weed barrier fabric for garden beds and farm rows",
  },
  {
    eyebrow: "Drainage & Filtration",
    title: "Better water management",
    body: "Improve drainage and limit soil erosion with high-permeability geotextile for French drains, retaining walls, and wet ground.",
    pick: "Use TERRA 4 / 6 / 8oz",
    href: "/product-page/terra-geotextile-fabric",
    image: "/brand/home/terra-card.webp",
    alt: "DOTDAY TERRA non-woven geotextile fabric for drainage and erosion control",
  },
];

export function UseCases() {
  return (
    <section className="wrap section ucase">
      <div className="ucase-head">
        <span className="badge">Built for every ground condition</span>
        <h2>Match the fabric to the ground, not the price tag.</h2>
        <p>
          The wrong weight fails months later as weed pressure, shifting gravel,
          or drainage problems. Here is the right call for each job.
        </p>
      </div>

      <div className="ucase-grid">
        {CASES.map((c) => (
          <article className="ucard" key={c.title}>
            <Img src={c.image} alt={c.alt} ratio="r-43" placeholderLabel={c.eyebrow} />
            <div className="ucard-body">
              <span className="ucard-eyebrow">{c.eyebrow}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <div className="ucard-foot">
                <span className="ucard-pick">{c.pick}</span>
                <CTAButton href={c.href} variant="ghost">
                  View Fabric
                </CTAButton>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
