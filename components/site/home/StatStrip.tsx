import { Icon } from "@/components/site/Icon";

/**
 * StatStrip - the credibility band directly under the hero. Mirrors the Wix
 * homepage's stat row but tightened. Numbers are brand-confirmed marketing
 * figures; update copy here if the claims change.
 */

const STATS: { n: string; l: string; sub: string }[] = [
  { n: "500K+", l: "Sq Ft Sold", sub: "Beds, farms, driveways, and drains nationwide" },
  { n: "48", l: "States Shipped", sub: "Multiple US warehouses for fast delivery" },
  { n: "5.0", l: "Rated on Amazon", sub: "Trusted by pros and serious DIYers" },
  { n: "3", l: "Fabric Systems", sub: "One built for each ground condition" },
];

export function StatStrip() {
  return (
    <section className="hstats" aria-label="DOTDAY by the numbers">
      <div className="wrap hstats-grid">
        {STATS.map((s) => (
          <div className="hstat" key={s.l}>
            <div className="hstat-n">
              {s.n}
              {s.l === "Rated on Amazon" && (
                <Icon name="star" size={18} className="hstat-star" />
              )}
            </div>
            <div className="hstat-l">{s.l}</div>
            <div className="hstat-sub">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
