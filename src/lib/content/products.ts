import type { PrimaryProduct } from "@/lib/blog/types";

/**
 * Product catalog data. Like blog posts, products are data-driven so the page
 * template is fixed and content is editable in one place. Specs here are the
 * ONLY real specs - never invent weights or standards elsewhere.
 *
 * Commerce still lives on Wix; the "Shop" / buy buttons point at the store.
 */

export interface ProductData {
  slug: string;
  name: string;
  product: PrimaryProduct;
  weight: string;
  construction: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  bestFor: string[];
  features: { title: string; body: string }[];
  shopHref: string; // Wix store
  image: string; // /public/brand/products/<slug>.webp
  faq: { q: string; a: string }[];
}

export const PRODUCTS: ProductData[] = [
  {
    slug: "shield-landscape-fabric",
    name: "SHIELD",
    product: "SHIELD",
    weight: "3.2 oz",
    construction: "Woven polypropylene",
    tagline: "Woven weed barrier built for garden beds, mulch, and farm rows.",
    metaTitle: "SHIELD Weed Barrier Fabric (3.2 oz Woven)",
    metaDescription:
      "SHIELD is a 3.2 oz woven polypropylene weed barrier fabric built to suppress weeds while letting water and air through. For gardens, mulch, farms, and nurseries.",
    description:
      "SHIELD is a 3.2 oz woven polypropylene weed barrier. The flat-tape weave is strong in-plane and suppresses weeds while letting water and air reach the soil. Built for garden beds, mulch and soil applications, planting rows, farms, and nurseries.",
    bestFor: ["Garden beds", "Under mulch & soil", "Farm rows", "Nurseries", "Raised beds"],
    features: [
      { title: "Weed suppression", body: "Woven structure helps block weeds while staying permeable to water and air." },
      { title: "Built for cover", body: "Designed to sit under mulch, soil, or straw - cover promptly to protect from UV." },
      { title: "Strong in-plane", body: "Flat-tape weave resists tearing during install across beds and rows." },
    ],
    shopHref: "https://store.thedotday.com",
    image: "/brand/products/shield.webp",
    faq: [
      {
        q: "Can I use SHIELD under gravel?",
        a: "SHIELD is built for weed control under mulch and soil, not sustained load. Under gravel, pavers, or high-traffic surfaces use XBAR, a 5 oz woven dual-layer fabric that resists puncture and pumping. Keep SHIELD for garden beds, mulch, and planting rows.",
      },
      {
        q: "Does SHIELD let water through?",
        a: "Yes. The woven structure is permeable, so water and air reach the soil while the fabric helps suppress weeds. That permeability is why woven weed barrier is the right call for beds and rows rather than a solid sheet.",
      },
    ],
  },
  {
    slug: "xbar-landscape-fabric",
    name: "XBAR",
    product: "XBAR",
    weight: "5 oz",
    construction: "Woven dual-layer (woven top + non-woven backing)",
    tagline: "Heavy-duty woven hybrid for gravel, pavers, and hardscape.",
    metaTitle: "XBAR Heavy-Duty Hardscape Fabric (5 oz)",
    metaDescription:
      "XBAR is a 5 oz woven-hybrid landscape fabric engineered for load and separation under gravel, pavers, and hardscape. Resists pumping and aggregate mixing.",
    description:
      "XBAR is a 5 oz woven-hybrid fabric: a woven polypropylene top over a non-woven backing. It is engineered for load and separation under hard surfaces - gravel, rock, pavers, and hardscape - where a lightweight weed barrier would pump and tear.",
    bestFor: ["Under gravel & rock", "Pavers", "Hardscape", "High-traffic areas", "Driveways"],
    features: [
      { title: "Load + separation", body: "Woven-hybrid build holds up under aggregate and traffic, keeping stone out of the soil." },
      { title: "Resists pumping", body: "Engineered to prevent the pumping and tearing that ruins lightweight fabric under gravel." },
      { title: "Most popular", body: "The go-to for hardscape crews where the surface above carries weight." },
    ],
    shopHref: "https://store.thedotday.com",
    image: "/brand/products/xbar.webp",
    faq: [
      {
        q: "Is XBAR the same as a weed barrier?",
        a: "Not quite. XBAR is a 5 oz woven-hybrid built for load and separation under hard surfaces, while a weed barrier like SHIELD is built for weed control under mulch. Use XBAR where gravel, pavers, or traffic sit on top; use SHIELD in garden beds.",
      },
      {
        q: "What is the backing on XBAR for?",
        a: "XBAR pairs a woven polypropylene top with a non-woven backing. The combination adds separation and stability under aggregate, helping prevent stone from mixing into the soil below while the woven face takes the load.",
      },
    ],
  },
  {
    slug: "terra-geotextile-fabric",
    name: "TERRA",
    product: "TERRA",
    weight: "4 / 6 / 8 oz",
    construction: "Non-woven needle-punched geotextile",
    tagline: "Non-woven geotextile for drainage, filtration, and separation.",
    metaTitle: "TERRA Non-Woven Geotextile Fabric (4/6/8 oz)",
    metaDescription:
      "TERRA is a non-woven needle-punched geotextile in 4, 6, and 8 oz weights. Built for drainage, filtration, soil separation, French drains, and retaining walls.",
    description:
      "TERRA is a non-woven, needle-punched geotextile available in 4, 6, and 8 oz weights. The felt-like mat is built to filter and let water flow through its thickness - exactly what French drains, retaining wall backfill, driveways, and erosion control need.",
    bestFor: ["French drains", "Retaining walls", "Driveways & road base", "Soil separation", "Erosion control"],
    features: [
      { title: "Filtration + flow", body: "Needle-punched mat lets water pass through its thickness while holding back fines." },
      { title: "Three weights", body: "Choose 4, 6, or 8 oz to match the demands of the drainage or separation job." },
      { title: "Built for water", body: "The right structure for French drains and wall backfill where water needs to move." },
    ],
    shopHref: "https://store.thedotday.com",
    image: "/brand/products/terra.webp",
    faq: [
      {
        q: "What weight of TERRA do I need?",
        a: "Lighter 4 oz suits simple drainage and separation; 6 oz is a versatile middle ground for French drains and walls; 8 oz handles heavier separation and road base. Match the weight to the load and how much filtration the job demands.",
      },
      {
        q: "Is geotextile the same as landscape fabric?",
        a: "They are different tools. TERRA geotextile is non-woven and engineered for drainage, filtration, and soil separation, while a woven landscape fabric like SHIELD is built for weed control. Choose by the job: water movement versus weed suppression.",
      },
    ],
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
