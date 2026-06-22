import Link from "next/link";
import { Icon } from "@/components/site/Icon";

/**
 * InstallShowcase - "Professional Installations That Perform."
 *
 * Premium light-surface version of the results section: a large feature card
 * (XBAR hardscape) beside two stacked cards (SHIELD beds, TERRA separation),
 * each linking to its product page. A three-up stat row sits below.
 *
 * Imagery is real install photography from the brand Drive (committed under
 * public/brand/home/installs/). Honest product fit is preserved: gravel/
 * hardscape -> XBAR, beds -> SHIELD, drainage/separation -> TERRA.
 */

const FEATURE = {
  eyebrow: "Hardscape \u00b7 XBAR",
  title: "Pristine Walkways",
  body: "XBAR 5oz dual-layer fabric keeps gravel and hardscape weed-free and stable. The woven face with a non-woven backing resists punctures and handles high-traffic installs.",
  href: "/product-page/xbar-landscape-fabric",
  image: "/brand/home/installs/xbar-walkway.webp",
  alt: "Finished gravel pathway stabilized with DOTDAY XBAR hardscape fabric",
};

const SIDE = [
  {
    eyebrow: "Gardens \u00b7 SHIELD",
    title: "Organized Beds",
    body: "SHIELD woven fabric blocks weeds while water, air, and nutrients reach the soil. Built for beds, raised planters, and farm rows.",
    href: "/product-page/shield-landscape-fabric",
    image: "/brand/home/installs/shield-beds.webp",
    alt: "Seedlings planted in even rows through DOTDAY SHIELD woven weed barrier",
  },
  {
    eyebrow: "Drainage \u00b7 TERRA",
    title: "Soil Separation",
    body: "TERRA non-woven geotextile separates soil from aggregate and lets water through. Engineered for French drains, retaining walls, and base stabilization.",
    href: "/product-page/terra-geotextile-fabric",
    image: "/brand/home/installs/terra-separation.webp",
    alt: "Worker rolling out DOTDAY TERRA non-woven geotextile fabric on a graded slope",
  },
];

const STATS = [
  {
    n: "62%",
    l: "Faster installs",
    sub: "Clean-cutting fabric and high-visibility guide lines speed up every layout.",
  },
  {
    n: null as string | null,
    icon: true,
    l: "Healthier plants",
    sub: "Permeable construction keeps moisture and nutrients moving to the root zone.",
  },
  {
    n: "15-25 yr",
    l: "Built to last",
    sub: "UV-stabilized fibers hold up under mulch, gravel, and full-sun exposure.",
  },
];

export function InstallShowcase() {
  return (
    <section className="wrap section ishow">
      <div className="ishow-head">
        <span className="badge">Real results</span>
        <h2>Professional installations that perform.</h2>
        <p>
          SHIELD, XBAR, and TERRA deliver engineered performance across
          hardscapes, gardens, and drainage. The right fabric for the ground,
          so the install holds up.
        </p>
      </div>

      <div className="ishow-grid">
        <Link className="ishow-feature" href={FEATURE.href}>
          <span
            className="ishow-media"
            style={{ backgroundImage: `url(${FEATURE.image})` }}
            role="img"
            aria-label={FEATURE.alt}
          />
          <span className="ishow-feature-body">
            <span className="ishow-pill">{FEATURE.eyebrow}</span>
            <h3>{FEATURE.title}</h3>
            <p>{FEATURE.body}</p>
            <span className="ishow-link">
              View XBAR
              <Icon name="arrowRight" size={15} className="ishow-arrow" />
            </span>
          </span>
        </Link>

        <div className="ishow-side">
          {SIDE.map((c) => (
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
        {STATS.map((s) => (
          <div className="ishow-stat" key={s.l}>
            <div className="ishow-stat-n">
              {s.icon ? (
                <span className="ishow-stat-ico">
                  <Icon name="check" size={26} />
                </span>
              ) : (
                s.n
              )}
            </div>
            <div className="ishow-stat-l">{s.l}</div>
            <div className="ishow-stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
