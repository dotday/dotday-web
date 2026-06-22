import { CTAButton } from "@/components/blog/ui/Badge";
import { Img } from "@/components/blog/ui/Img";

/**
 * ProductBlock - the "Three fabrics, one rule" section. Product facts are
 * static brand data (never invented per post): SHIELD 3.2oz woven, XBAR 5oz
 * woven dual-layer (featured), TERRA 4/6/8oz non-woven. XBAR is the featured
 * neon card with charcoal use-case chips and "Most popular".
 *
 * Images resolve from /public/brand if present; otherwise show the placeholder.
 */

const PRODUCTS = [
  {
    name: "SHIELD",
    tag: "Weed control",
    weight: "3.2 oz Woven",
    desc:
      "Woven polypropylene weed barrier built to suppress weeds while letting water and air through.",
    uses: ["Garden beds", "Mulch & soil", "Farm rows", "Nurseries"],
    href: "/product-page/shield-landscape-fabric",
    image: "/brand/products/shield.webp",
    featured: false,
  },
  {
    name: "XBAR",
    tag: "Hardscape",
    weight: "5 oz Dual-Layer",
    desc:
      "Heavy-duty woven hybrid engineered for load and separation under hard surfaces.",
    uses: ["Gravel & rock", "Pavers", "Hardscape", "High traffic"],
    href: "/product-page/xbar-landscape-fabric",
    image: "/brand/products/xbar.webp",
    featured: true,
  },
  {
    name: "TERRA",
    tag: "Drainage",
    weight: "4 / 6 / 8 oz Non-Woven",
    desc:
      "Non-woven geotextile designed for drainage, filtration, and soil separation.",
    uses: ["French drains", "Retaining walls", "Driveways", "Erosion control"],
    href: "/product-page/terra-geotextile-fabric",
    image: "/brand/products/terra.webp",
    featured: false,
  },
];

export function ProductBlock() {
  return (
    <section className="products">
      <div className="head">
        <span className="badge">The DOTDAY System</span>
        <h2>Three fabrics. One simple rule.</h2>
        <p>Use the right fabric for the right ground condition.</p>
      </div>
      <div className="pgrid">
        {PRODUCTS.map((p) => (
          <article className={`pcard${p.featured ? " feat" : ""}`} key={p.name}>
            <Img src={p.image} alt={`${p.name} roll`} ratio="r-43" placeholderLabel={`${p.name} roll`} />
            <div className="ptag">
              {p.tag}
              {p.featured && <span className="pop">Most popular</span>}
            </div>
            <h3>{p.name}</h3>
            <div className="pweight">{p.weight}</div>
            <p className="pdesc">{p.desc}</p>
            <div className="puses">
              {p.uses.map((u) => (
                <span className="puse" key={u}>
                  {u}
                </span>
              ))}
            </div>
            <CTAButton href={p.href} variant={p.featured ? "onneon" : "ghost"} full>
              View {p.name}
            </CTAButton>
          </article>
        ))}
      </div>
    </section>
  );
}
