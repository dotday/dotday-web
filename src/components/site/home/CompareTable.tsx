import { CTAButton } from "@/components/blog/ui/Badge";
import { Icon } from "@/components/site/Icon";

/**
 * CompareTable - at-a-glance spec comparison of the three fabrics. This is the
 * on-brand "right fabric for the right ground" payload: a scannable matrix that
 * helps a contractor or grower self-select. Product accuracy is load-bearing
 * here (XBAR = woven + non-woven backing / dual-layer, NOT needle-punched;
 * TERRA = non-woven; SHIELD = woven).
 */

type Row = { label: string; shield: string; xbar: string; terra: string };

const ROWS: Row[] = [
  { label: "Best for", shield: "Weed control", xbar: "Hardscape", terra: "Drainage" },
  { label: "Construction", shield: "Woven PP", xbar: "Dual-layer woven hybrid", terra: "Non-woven geotextile" },
  { label: "Weight", shield: "3.2 oz", xbar: "5 oz", terra: "4 / 6 / 8 oz" },
  { label: "Where it goes", shield: "Beds, farms, under mulch", xbar: "Gravel, pavers, driveways", terra: "French drains, walls, road base" },
  { label: "Water flow", shield: "Moderate", xbar: "Moderate", terra: "High" },
  { label: "Foot / load traffic", shield: "Light", xbar: "Heavy", terra: "Heavy (sub-surface)" },
];

const HEADS: { key: string; name: string; sub: string; href: string; feat?: boolean }[] = [
  { key: "shield", name: "SHIELD", sub: "3.2oz Woven", href: "/product-page/shield-landscape-fabric" },
  { key: "xbar", name: "XBAR", sub: "5oz Dual-Layer", href: "/product-page/xbar-landscape-fabric", feat: true },
  { key: "terra", name: "TERRA", sub: "Non-Woven", href: "/product-page/terra-geotextile-fabric" },
];

export function CompareTable() {
  return (
    <section className="cmp">
      <div className="wrap">
        <div className="cmp-head">
          <span className="badge">Compare fabric types</span>
          <h2>Three fabrics, side by side.</h2>
          <p>
            Pick by the ground condition, not the price tag. Here is how SHIELD,
            XBAR, and TERRA line up across the specs that matter on the job.
          </p>
        </div>

        <div className="cmp-scroll">
          <table className="cmp-table">
            <thead>
              <tr>
                <th className="cmp-corner" aria-hidden="true"></th>
                {HEADS.map((h) => (
                  <th key={h.key} className={h.feat ? "cmp-col-feat" : ""}>
                    <span className="cmp-pname">{h.name}</span>
                    <span className="cmp-psub">{h.sub}</span>
                    {h.feat && <span className="cmp-pop">Most popular</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  <td>{r.shield}</td>
                  <td className="cmp-col-feat">{r.xbar}</td>
                  <td>{r.terra}</td>
                </tr>
              ))}
              <tr className="cmp-cta-row">
                <th scope="row" aria-hidden="true"></th>
                {HEADS.map((h) => (
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

        <div className="cmp-foot">
          <Icon name="search" size={17} />
          <span>Still deciding? The 60-second quiz picks for you.</span>
          <CTAButton href="/fabric-finder" variant="ghost">
            Find Your Fabric
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
