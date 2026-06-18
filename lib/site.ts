/**
 * Site-wide config. One place for the canonical origin, nav, marquee, and
 * footer links. Components import from here so a link change happens once.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.thedotday.com";

export const STORE_URL =
  process.env.NEXT_PUBLIC_STORE_URL?.replace(/\/$/, "") ||
  "https://store.thedotday.com";

export const site = {
  name: "DOTDAY Landscape Fabrics",
  shortName: "DOTDAY",
  tagline: "Use the right fabric for the right ground condition.",
  description:
    "Professional-grade landscape fabrics engineered for contractors, landscapers, and serious DIYers.",
  location: "Miami Gardens, FL",
  url: SITE_URL,
};

/** Scrolling promo marquee messages (neon strip at the very top). */
export const marquee = [
  { icon: "check", text: "Free Shipping on Orders" },
  { icon: null, text: "Woven & Non-Woven Available" },
  { icon: "user", text: "Pro Contractors: Request Bulk Pricing" },
  { icon: "star", text: "Spring Sale: Buy yours today!" },
] as { icon: string | null; text: string }[];

/**
 * Header navigation.
 * - centerLinks: text links beside the search bar
 * - shopAll: the "Shop All" dropdown in the secondary row
 * - secondary: the secondary nav row links
 * - utility: USD / QRZone / account / cart cluster
 */
export const nav = {
  centerLinks: [
    { label: "FabricFinder\u2122", href: "/fabric-finder" },
    { label: "Install Guide", href: "/how-to-install-weed-barrier-fabric" },
    { label: "Garden Blogs", href: "/blog" },
  ],
  shopAll: {
    label: "Shop All",
    products: [
      { label: "XBAR", tag: "Hardscape", href: "/product-page/xbar-landscape-fabric" },
      { label: "SHIELD", tag: "Weed barrier", href: "/product-page/shield-landscape-fabric" },
      { label: "TERRA", tag: "Drainage", href: "/product-page/terra-geotextile-fabric" },
    ],
    extra: [
      { label: "Bulk & Pro", icon: "briefcase", href: "/bulk-pricing" },
      { label: "Deals", icon: "discount", href: STORE_URL },
    ],
  },
  secondary: [
    { label: "XBAR", href: "/product-page/xbar-landscape-fabric" },
    { label: "SHIELD", href: "/product-page/shield-landscape-fabric" },
    { label: "TERRA", href: "/product-page/terra-geotextile-fabric" },
    { label: "BULK & PRO", href: "/bulk-pricing" },
    { label: "DEALS", href: STORE_URL },
    { label: "CONTACT", href: "/contact-us" },
  ],
  utility: {
    currency: "USD",
    qrzone: { label: "My QRZone", href: STORE_URL },
    account: { href: STORE_URL },
    cart: { href: STORE_URL, count: 0 },
  },
  shop: { label: "Shop", href: STORE_URL },
};

/** Footer: Pro List signup band + five link columns + trust/legal rows. */
export const footer = {
  proList: {
    heading: "Join the DOTDAY Pro List",
    sub: "Get 10% off your first order, pro tips, and early access to new products.",
    placeholder: "Enter your email",
    cta: "Subscribe",
  },
  social: [
    { label: "Instagram", icon: "brand-instagram", href: "#" },
    { label: "Facebook", icon: "brand-facebook", href: "#" },
    { label: "YouTube", icon: "brand-youtube", href: "#" },
    { label: "Pinterest", icon: "brand-pinterest", href: "#" },
  ],
  columns: [
    {
      heading: "Products",
      links: [
        { label: "Shop All", href: STORE_URL },
        { label: "SHIELD 3.2oz", href: "/product-page/shield-landscape-fabric" },
        { label: "XBAR 5oz", href: "/product-page/xbar-landscape-fabric" },
        { label: "TERRA 4oz", href: "/product-page/terra-geotextile-fabric" },
        { label: "TERRA 6oz", href: "/product-page/terra-geotextile-fabric" },
        { label: "TERRA 8oz", href: "/product-page/terra-geotextile-fabric" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "FabricFinder\u2122", href: "/fabric-finder" },
        { label: "Install Guide", href: "/how-to-install-weed-barrier-fabric" },
        { label: "The Groundwork (Blog)", href: "/blog" },
        { label: "Product Comparison", href: "/blog/woven-vs-non-woven-landscape-fabric" },
        { label: "Technical Data Sheets", href: "/contact-us" },
        { label: "FAQs", href: "/contact-us" },
      ],
    },
    {
      heading: "Account",
      links: [
        { label: "My Account", href: STORE_URL },
        { label: "My QRZone", href: STORE_URL },
        { label: "Order History", href: STORE_URL },
        { label: "Track Your Order", href: STORE_URL },
        { label: "Made for Pros", href: "/bulk-pricing" },
      ],
    },
    {
      heading: "Customer Service",
      links: [
        { label: "Contact Us", href: "/contact-us" },
        { label: "Shipping Policy", href: "/contact-us" },
        { label: "Returns & Refunds", href: "/contact-us" },
        { label: "Terms of Service", href: "/contact-us" },
        { label: "Track Your Order", href: STORE_URL },
      ],
    },
    {
      heading: "Pro Zone",
      links: [
        { label: "Contractor Program", href: "/bulk-pricing" },
        { label: "Wholesale Inquiries", href: "/bulk-pricing" },
        { label: "Request a Quote", href: "/contact-us" },
        { label: "Become a Partner", href: "/contact-us" },
      ],
    },
  ],
  payments: ["VISA", "MC", "AMEX", "PayPal", "Pay", "GPay"],
  trust: [
    { icon: "shield-check", label: "SSL Secure" },
    { icon: "flag", label: "Ships from USA" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/contact-us" },
    { label: "Terms of Service", href: "/contact-us" },
    { label: "Sitemap", href: "/sitemap.xml" },
  ],
};
