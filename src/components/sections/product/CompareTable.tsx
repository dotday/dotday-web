import { CTAButton } from "@/components/primitives/Badge";
import { Icon } from "@/components/site/Icon";
import type { FabricMatrixData, FabricMatrixHead } from "@/lib/home/types";

/**
 * CompareTable / fabricMatrix - at-a-glance spec comparison of the three fabrics.
 * The on-brand "right fabric for the right ground" payload: a scannable matrix.
 * Product accuracy is load-bearing (XBAR = dual-layer woven hybrid, NOT
 * needle-punched; TERRA = non-woven; SHIELD = woven). Now data-driven; markup
 * byte-identical (cmp-* classes). DEFAULT_FABRIC_MATRIX holds today's content.
 */

const DEFAULT_HEADS: FabricMatrixHead[] = [
  { key: "shield", name: "SHIELD", sub: "3.2oz Woven", href: "/product-page/shield-landscape-fabric" },
  { key: "xbar", name: "XBAR", sub: "5oz Dual-Layer", href: "/product-page/xbar-landscape-fabric", feat: true },
  { key: "terra", name: "TERRA", sub: "Non-Woven", href: "/product-page/terra-geotextile-fabric" },
];

export const DEFAULT_FABRIC_MATRIX: FabricMatrixData = {
  _type: "fabricMatrix",
  badge: "Compare fabric types",
  heading: "Three fabrics, side by side.",
  intro:
    "Pick by the ground condition, not the price tag. Here is how SHIELD, XBAR, and TERRA line up across the specs that matter on the job.",
  heads: DEFAULT_HEADS,
  rows: [
    { label: "Best for", shield: "Weed control", xbar: "Hardscape", terra: "Drainage" },
    { label: "Construction", shield: "Woven PP", xbar: "Dual-layer woven hybrid", terra: "Non-woven geotextile" },
    { label: "Weight", shield: "3.2 oz", xbar: "5 oz", terra: "4 / 6 / 8 oz" },
    { label: "Where it goes", shield: "Beds, farms, under mulch", xbar: "Gravel, pavers, driveways", terra: "French drains, walls, road base" },
    { label: "Water flow", shield: "Moderate", xbar: "Moderate", terra: "High" },
    { label: "Foot / load traffic", shield: "Light", xbar: "Heavy", terra: "Heavy (sub-surface)" },
  ],
  footNote: "Still deciding? The 60-second quiz picks for you.",
  footCtaLabel: "Find Your Fabric",
  footCtaHref: "/fabric-finder",
};

export function CompareTable({
  data = DEFAULT_FABRIC_MATRIX,
}: {
  data?: FabricMatrixData;
}) {
  const heads = data.heads || DEFAULT_HEADS;
  return (
    <section className="cmp">
      <div className="wrap">
        <div className="cmp-head">
          {data.badge && <span className="badge">{data.badge}</span>}
          <h2>{data.heading}</h2>
          {data.intro && <p>{data.intro}</p>}
        </div>

        <div className="cmp-scroll">
          <table className="cmp-table">
            <thead>
              <tr>
                <th className="cmp-corner" aria-hidden="true"></th>
                {heads.map((h) => (
                  <th key={h.key} className={h.feat ? "cmp-col-feat" : ""}>
                    <span className="cmp-pname">{h.name}</span>
                    <span className="cmp-psub">{h.sub}</span>
                    {h.feat && <span className="cmp-pop">Most popular</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  <td>{r.shield}</td>
                  <td className="cmp-col-feat">{r.xbar}</td>
                  <td>{r.terra}</td>
                </tr>
              ))}
              <tr className="cmp-cta-row">
                <th scope="row" aria-hidden="true"></th>
                {heads.map((h) => (
                  <td key={h.key} className={h.feat ? "cmp-col-feat" : ""}>
                    <CTAButton href={h.href} variant={h.feat ? "primary" : "ghost"}>
                      View {h.name}
                    </CTAButton>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {data.footNote && (
          <div className="cmp-foot">
            <Icon name="search" size={17} />
            <span>{data.footNote}</span>
            {data.footCtaLabel && data.footCtaHref && (
              <CTAButton href={data.footCtaHref} variant="ghost">
                {data.footCtaLabel}
              </CTAButton>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
