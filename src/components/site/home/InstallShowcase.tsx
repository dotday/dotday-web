import Link from "next/link";
import { Icon } from "@/components/site/Icon";
import type { InstallShowcaseData } from "@/components/site/home/types";

/**
 * InstallShowcase - "Professional Installations That Perform." A large feature
 * card beside two stacked cards (each -> product), plus a three-up stat row. Now
 * data-driven; markup byte-identical (ishow-* classes). Honest fit preserved:
 * gravel/hardscape -> XBAR, beds -> SHIELD, drainage -> TERRA.
 * DEFAULT_INSTALL_SHOWCASE holds today's content.
 */

export const DEFAULT_INSTALL_SHOWCASE: InstallShowcaseData = {
  _type: "installShowcase",
  badge: "Real results",
  heading: "Professional installations that perform.",
  intro:
    "SHIELD, XBAR, and TERRA deliver engineered performance across hardscapes, gardens, and drainage. The right fabric for the ground, so the install holds up.",
  feature: {
    eyebrow: "Hardscape \u00b7 XBAR",
    title: "Pristine Walkways",
    body: "XBAR 5oz dual-layer fabric keeps gravel and hardscape weed-free and stable. The woven face with a non-woven backing resists punctures and handles high-traffic installs.",
    href: "/product-page/xbar-landscape-fabric",
    image: "/home/installs/xbar-walkway.webp",
    alt: "Finished gravel pathway stabilized with DOTDAY XBAR hardscape fabric",
  },
  side: [
    {
      eyebrow: "Gardens \u00b7 SHIELD",
      title: "Organized Beds",
      body: "SHIELD woven fabric blocks weeds while water, air, and nutrients reach the soil. Built for beds, raised planters, and farm rows.",
      href: "/product-page/shield-landscape-fabric",
      image: "/home/installs/shield-beds.webp",
      alt: "Seedlings planted in even rows through DOTDAY SHIELD woven weed barrier",
    },
    {
      eyebrow: "Drainage \u00b7 TERRA",
      title: "Soil Separation",
      body: "TERRA non-woven geotextile separates soil from aggregate and lets water through. Engineered for French drains, retaining walls, and base stabilization.",
      href: "/product-page/terra-geotextile-fabric",
      image: "/home/installs/terra-separation.webp",
      alt: "Worker rolling out DOTDAY TERRA non-woven geotextile fabric on a graded slope",
    },
  ],
  stats: [
    { value: "62%", label: "Faster installs", sub: "Clean-cutting fabric and high-visibility guide lines speed up every layout." },
    { icon: true, label: "Healthier plants", sub: "Permeable construction keeps moisture and nutrients moving to the root zone." },
    { value: "15-25 yr", label: "Built to last", sub: "UV-stabilized fibers hold up under mulch, gravel, and full-sun exposure." },
  ],
};

export function InstallShowcase({
  data = DEFAULT_INSTALL_SHOWCASE,
}: {
  data?: InstallShowcaseData;
}) {
  return (
    <section className="wrap section ishow">
      <div className="ishow-head">
        {data.badge && <span className="badge">{data.badge}</span>}
        <h2>{data.heading}</h2>
        {data.intro && <p>{data.intro}</p>}
      </div>

      <div className="ishow-grid">
        <Link className="ishow-feature" href={data.feature.href}>
          <span
            className="ishow-media"
            style={{ backgroundImage: `url(${data.feature.image})` }}
            role="img"
            aria-label={data.feature.alt}
          />
          <span className="ishow-feature-body">
            <span className="ishow-pill">{data.feature.eyebrow}</span>
            <h3>{data.feature.title}</h3>
            <p>{data.feature.body}</p>
            <span className="ishow-link">
              View XBAR
              <Icon name="arrowRight" size={15} className="ishow-arrow" />
            </span>
          </span>
        </Link>

        <div className="ishow-side">
          {data.side.map((c) => (
            <Link className="ishow-card" href={c.href} key={c.title}>
              <span
                className="ishow-card-media"
                style={{ backgroundImage: `url(${c.image})` }}
                role="img"
                aria-label={c.alt}
              />
              <span className="ishow-card-body">
                <span className="ishow-pill">{c.eyebrow}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <span className="ishow-link">
                  View fabric
                  <Icon name="arrowRight" size={14} className="ishow-arrow" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="ishow-stats">
        {data.stats.map((s) => (
          <div className="ishow-stat" key={s.label}>
            <div className="ishow-stat-n">
              {s.icon ? (
                <span className="ishow-stat-ico">
                  <Icon name="check" size={26} />
                </span>
              ) : (
                s.value
              )}
            </div>
            <div className="ishow-stat-l">{s.label}</div>
            <div className="ishow-stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
