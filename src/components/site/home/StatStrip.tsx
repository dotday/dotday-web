import { Icon } from "@/components/site/Icon";
import type { HomeStatStripData } from "@/components/site/home/types";

/**
 * StatStrip (home) - the credibility band under the hero. Brand-confirmed
 * marketing figures. Now data-driven; markup byte-identical (hstats-* / hstat
 * classes). Registered as `homeStatStrip` to distinguish from the shared blog
 * `statStrip` block. DEFAULT_HOME_STAT_STRIP holds today's content.
 */

export const DEFAULT_HOME_STAT_STRIP: HomeStatStripData = {
  _type: "homeStatStrip",
  stats: [
    { value: "500K+", label: "Sq Ft Sold", sub: "Beds, farms, driveways, and drains nationwide" },
    { value: "48", label: "States Shipped", sub: "Multiple US warehouses for fast delivery" },
    { value: "5.0", label: "Rated on Amazon", sub: "Trusted by pros and serious DIYers", star: true },
    { value: "3", label: "Fabric Systems", sub: "One built for each ground condition" },
  ],
};

export function StatStrip({
  data = DEFAULT_HOME_STAT_STRIP,
}: {
  data?: HomeStatStripData;
}) {
  return (
    <section className="hstats" aria-label="DOTDAY by the numbers">
      <div className="wrap hstats-grid">
        {data.stats.map((s) => (
          <div className="hstat" key={s.label}>
            <div className="hstat-n">
              {s.value}
              {s.star && <Icon name="star" size={18} className="hstat-star" />}
            </div>
            <div className="hstat-l">{s.label}</div>
            {s.sub && <div className="hstat-sub">{s.sub}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}
