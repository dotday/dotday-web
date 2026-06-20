import type { Metadata } from "next";
import Link from "next/link";
import { Badge, CTAButton } from "@/components/blog/ui/Badge";
import { Img } from "@/components/blog/ui/Img";
import { Steps } from "@/components/blog/blocks/Steps";
import { Callout } from "@/components/blog/blocks/Callout";
import { FAQ } from "@/components/blog/blocks/FAQ";
import { FinalCTA } from "@/components/blog/cta/FinalCTA";
import { SITE_URL, site } from "@/lib/site";

/**
 * Install Guide - /how-to-install-weed-barrier-fabric
 *
 * Rebuilt to match the live Wix page in design + content while rendering through
 * the repo's real components and brand CSS (no new global styles, no invented
 * specs). Sections, in order:
 *   hero -> positioning band -> per-fabric Quick Tips cards -> full step-by-step
 *   -> warning -> Resources -> FAQ -> FinalCTA.
 * Schema: HowTo + FAQPage + BreadcrumbList, built from the same copy the page
 * renders so markup and structured data never disagree.
 */

const FOCUS = "how to install weed barrier fabric";

export const metadata: Metadata = {
  title: "How to Install Weed Barrier Fabric | DOTDAY Step-by-Step Guide",
  description:
    "Step-by-step guide to installing weed barrier fabric correctly. Laying, overlap, anchoring, cutting, and mulching best practices from DOTDAY.",
  alternates: { canonical: "/how-to-install-weed-barrier-fabric" },
  openGraph: {
    title: "How to Install Weed Barrier Fabric | DOTDAY Step-by-Step Guide",
    description:
      "Step-by-step guide to installing weed barrier fabric correctly. Laying, overlap, anchoring, cutting, and mulching best practices from DOTDAY.",
    url: "/how-to-install-weed-barrier-fabric",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Install Weed Barrier Fabric | DOTDAY Step-by-Step Guide",
    description:
      "Step-by-step guide to installing weed barrier fabric correctly. Laying, overlap, anchoring, cutting, and mulching best practices from DOTDAY.",
  },
};

/** Per-fabric install tips - mirrors the Wix "Quick Tips for your Installs" cards. */
const TIPS = [
  {
    eyebrow: "SHIELD 3.2oz - Weed Control",
    body: "Overlap seams 6 inches. Pin every 12 to 18 inches along edges and seams. Cover with mulch or soil right away to protect from UV.",
    href: "/product-page/shield-landscape-fabric",
    image: "/brand/products/shield.webp",
    alt: "How to install weed barrier fabric: DOTDAY SHIELD 3.2oz woven fabric for garden beds",
  },
  {
    eyebrow: "XBAR 5oz - Gravel & Hardscape",
    body: "Lay the non-woven side down. Overlap seams 12 inches. Pin on 12-inch spacing with heavy-gauge staples. Cover with gravel or rock to lock it in place.",
    href: "/product-page/xbar-landscape-fabric",
    image: "/brand/products/xbar.webp",
    alt: "Installing DOTDAY XBAR 5oz dual-layer fabric under gravel and hardscape",
  },
  {
    eyebrow: "TERRA 4 to 8oz - Drainage & Filtration",
    body: "Orient with the water flow direction. Overlap seams a minimum of 12 inches. Backfill with drain rock, then fold the fabric over the top.",
    href: "/product-page/terra-geotextile-fabric",
    image: "/brand/products/terra.webp",
    alt: "Installing DOTDAY TERRA non-woven geotextile for French drains and drainage",
  },
];

/** Full step sequence - mirrors the Wix step list (clear -> plant). */
const INSTALL_STEPS = {
  _type: "steps" as const,
  heading: "Installation, step by step",
  steps: [
    {
      title: "Clear and prepare the area",
      body: "Remove weeds, grass, and debris from the install area. You do not have to dig out every root, the fabric suppresses regrowth from below.",
    },
    {
      title: "Roll out the fabric",
      body: "Unroll across the prepared ground, keeping it as straight as possible. Work from one end to the other and smooth out wrinkles or bunching as you go.",
    },
    {
      title: "Cut to length",
      body: "Cut each run to length at the edge of the bed or path. Leave a little extra at the ends so you can square it up and tuck the edges.",
    },
    {
      title: "Make planting holes on the guidelines",
      body: "Cut X-shaped holes on the printed guidelines, just large enough for the plant stem. Start smaller than you think you need, then open them up gradually.",
    },
    {
      title: "Overlap to avoid gaps",
      body: "Overlap fabric edges by at least 6 inches so weeds cannot push through the seams. Use 12-inch overlaps for hardscape and drainage runs.",
    },
    {
      title: "Pin it down with staples",
      body: "Place landscape pins every 12 inches along edges and seams, and every 36 inches across open field areas. Push each pin flush with the fabric surface.",
    },
    {
      title: "Cover promptly",
      body: "Add your finish layer right away: mulch or soil over SHIELD, gravel or rock over XBAR, drain rock over TERRA. Exposed fabric degrades in UV, so do not leave it bare.",
    },
    {
      title: "Plant and grow, weed-free",
      body: "Set your plants into each hole and water them in. The barrier blocks weeds around the plant while water, air, and nutrients still reach the soil.",
    },
  ],
};

const WARNING = {
  _type: "warning" as const,
  heading: "⚠ Watch out",
  body: "Do not put a lightweight woven weed barrier under gravel or pavers and expect it to hold. Use a 5 oz dual-layer fabric like XBAR for load-bearing surfaces, and a non-woven geotextile like TERRA where the job is drainage.",
};

const INSTALL_FAQ = {
  heading: "Frequently asked questions",
  items: [
    {
      q: "How much overlap should I leave when installing landscape fabric?",
      a: "Overlap fabric strips by at least 6 inches to keep weeds from pushing through the seams. For high weed pressure beds use 8 to 12 inches, and for gravel or drainage runs use a minimum of 12 inches. The DOTDAY Fabric Calculator adds a buffer to your roll count to account for overlaps automatically.",
    },
    {
      q: "Which side of the fabric goes down?",
      a: "For SHIELD and TERRA, either face can go down, just keep the printed guidelines up if your roll has them. For XBAR, lay the non-woven (fuzzy) side down against the soil and the woven face up, so the backing separates the ground while the woven top takes the load.",
    },
    {
      q: "How far apart should landscape staples go?",
      a: "Pin every 12 to 18 inches along edges and seams, and every 36 inches across open field areas. On hardscape and high-traffic ground, tighten edge spacing to 12 inches with heavy-gauge staples so wind and traffic cannot shift the fabric.",
    },
    {
      q: "Do I need to cover the fabric after installing it?",
      a: "Yes. Cover promptly with mulch or soil over SHIELD, gravel or rock over XBAR, and drain rock over TERRA. The finish layer protects the fabric from UV and is what lets it last for years rather than breaking down exposed.",
    },
    {
      q: "Which landscape fabric weight should I use, 3oz, 5oz, or 8oz?",
      a: "Match it to the job. Use SHIELD 3.2oz for garden beds, farm rows, and under mulch. Use XBAR 5oz for gravel driveways, paths, and hardscape. Use TERRA 4, 6, or 8oz for drainage, French drains, and retaining walls. The Fabric Finder recommends the right weight from your ground condition.",
    },
    {
      q: "How long does landscape fabric last once installed?",
      a: "DOTDAY fabrics are UV-stabilized for long-term outdoor use, and covering them with mulch or gravel significantly extends their life. A clean install (clear, overlap, pin, cover promptly) is what keeps any fabric performing for years instead of failing early at the seams.",
    },
  ],
};

/** Resources - real migrated posts in this repo (not the un-migrated Wix slugs). */
const RESOURCES = [
  {
    title: "Woven vs Non-Woven Landscape Fabric: Which to Use",
    href: "/post/woven-vs-non-woven-landscape-fabric",
    cat: "Comparisons",
  },
  {
    title: "Weed Barrier Under Pavers: How to Do It Right",
    href: "/post/weed-barrier-under-pavers",
    cat: "How-To & Installation",
  },
  {
    title: "Landscape Fabric Thickness Chart (oz by Use Case)",
    href: "/post/landscape-fabric-thickness-chart",
    cat: "Buying Guides",
  },
];

function buildJsonLd() {
  const url = `${SITE_URL}/how-to-install-weed-barrier-fabric`;

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to install weed barrier fabric",
    description:
      "Step-by-step guide to installing weed barrier and landscape fabric correctly: clear, roll out, cut, make holes, overlap, pin, cover, and plant.",
    image: `${SITE_URL}/brand/logo-neon.png`,
    totalTime: "PT1H",
    supply: [
      { "@type": "HowToSupply", name: "DOTDAY landscape fabric (SHIELD, XBAR, or TERRA)" },
      { "@type": "HowToSupply", name: "Landscape staples / pins" },
      { "@type": "HowToSupply", name: "Mulch, gravel, or drain rock (finish layer)" },
    ],
    tool: [
      { "@type": "HowToTool", name: "Utility knife or scissors" },
      { "@type": "HowToTool", name: "Rubber mallet" },
    ],
    step: INSTALL_STEPS.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body,
      url: `${url}#step-${i + 1}`,
    })),
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: INSTALL_FAQ.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Install Guide", item: url },
    ],
  };

  return [howTo, faqPage, breadcrumb];
}

export default function InstallGuidePage() {
  const jsonLd = buildJsonLd();

  return (
    <>
      {jsonLd.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}

      {/* Hero */}
      <div className="wrap page">
        <Badge>How-To & Installation</Badge>
        <h1 style={{ marginTop: 14 }}>How to install weed barrier fabric</h1>
        <p className="lead">
          The product matters, but a clean install is what makes it last. This
          sequence works across all three DOTDAY fabrics, SHIELD, XBAR, and
          TERRA, only the surface on top changes. Follow it and get results that
          hold.
        </p>
        <div className="chero-cta" style={{ marginTop: 18 }}>
          <CTAButton href="/fabric-finder" variant="primary">
            Find Your Fabric
          </CTAButton>
          <CTAButton href="/landscape-fabric-calculator" variant="ghost">
            Use the Fabric Calculator
          </CTAButton>
        </div>
      </div>

      {/* Positioning band - oversized watermark + neon-highlighted statement.
          Self-contained inline styles so it renders regardless of global CSS. */}
      <section
        aria-label="DOTDAY install positioning"
        style={{
          position: "relative",
          background: "#f4f4f4",
          overflow: "hidden",
          padding: "clamp(72px, 9vw, 120px) 20px",
          textAlign: "center",
        }}
      >
        {/* faint oversized watermark words */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "#1a1a1a",
            opacity: 0.06,
            userSelect: "none",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "clamp(8px, 4vw, 40px)",
              left: "clamp(8px, 3vw, 64px)",
              fontSize: "clamp(56px, 12vw, 168px)",
              whiteSpace: "nowrap",
            }}
          >
            install
          </span>
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "clamp(56px, 12vw, 168px)",
              whiteSpace: "nowrap",
            }}
          >
            dotday
          </span>
          <span
            style={{
              position: "absolute",
              bottom: "clamp(8px, 4vw, 36px)",
              right: "clamp(8px, 3vw, 64px)",
              fontSize: "clamp(56px, 12vw, 168px)",
              whiteSpace: "nowrap",
            }}
          >
            green
          </span>
        </div>

        {/* centered content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 760,
            margin: "0 auto",
          }}
        >
          <svg
            viewBox="0 0 64 64"
            fill="none"
            stroke="#5b6e00"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            role="img"
            aria-label="DOTDAY leaf mark"
            style={{
              display: "block",
              width: "clamp(64px, 7vw, 88px)",
              height: "auto",
              margin: "0 auto clamp(18px, 2.4vw, 28px)",
            }}
          >
            <path d="M31 41C20 41 9 33 7 13c20 1 26 12 26 26" />
            <path d="M33 41c11 0 22-8 24-28-20 1-26 12-26 26" />
            <path d="M32 39v15" />
            <path d="M32 54c-1.5 2.5-4 4.5-7 5.5" />
            <path d="M32 54c1.5 2.5 4 4.5 7 5.5" />
            <path d="M31 41C26 39 22 35 19 30" />
            <path d="M33 41c5-2 9-6 12-11" />
          </svg>
          <p
            style={{
              fontWeight: 700,
              fontSize: "clamp(22px, 3.2vw, 38px)",
              lineHeight: 1.22,
              letterSpacing: "-0.02em",
              color: "#101010",
              margin: 0,
            }}
          >
            The right fabric, installed correctly, lasts years. DOTDAY makes it
            simple, so you can get back to growing your plants with ease.{" "}
            <span
              style={{
                background: "#d8ff00",
                color: "#101010",
                padding: "0.02em 0.16em",
                borderRadius: 3,
                WebkitBoxDecorationBreak: "clone",
                boxDecorationBreak: "clone",
              }}
            >
              Easy installs. Better growth.
            </span>
          </p>
        </div>
      </section>

      {/* Per-fabric Quick Tips */}
      <section className="wrap section ucase">
        <div className="ucase-head">
          <span className="badge">Quick tips for your installs</span>
          <h2>The right fabric, installed correctly, lasts years.</h2>
          <p>
            Each fabric has its own overlap, pinning, and cover routine. Match
            the tips below to the fabric you are laying, then follow the full
            steps underneath.
          </p>
        </div>

        <div className="ucase-grid">
          {TIPS.map((t) => (
            <article className="ucard" key={t.eyebrow}>
              <Img
                src={t.image}
                alt={t.alt}
                ratio="r-43"
                placeholderLabel={t.eyebrow}
              />
              <div className="ucard-body">
                <span className="ucard-eyebrow">{t.eyebrow}</span>
                <p>{t.body}</p>
                <div className="ucard-foot">
                  <CTAButton href={t.href} variant="ghost">
                    View Fabric
                  </CTAButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Full step-by-step + warning */}
      <div className="wrap page">
        <div className="body-single">
          <article>
            <Steps block={INSTALL_STEPS} />
            <Callout block={WARNING} />
          </article>
        </div>
      </div>

      {/* Resources */}
      <section className="wrap section">
        <div className="related-head">
          <h2>Resources</h2>
          <p>Pick the right fabric and weight before you install.</p>
        </div>
        <div className="rgrid">
          {RESOURCES.map((r) => (
            <Link className="rcard" href={r.href} key={r.href}>
              <Img alt={r.title} ratio="r-169" placeholderLabel={r.cat} />
              <div className="pad">
                <span className="badge">{r.cat}</span>
                <h3>{r.title}</h3>
                <span className="rtime">Read article</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="wrap section">
        <FAQ faq={INSTALL_FAQ} />
      </section>

      <FinalCTA
        heading="Need help choosing the right fabric?"
        primaryHref="/fabric-finder"
        primaryLabel="Find Your Fabric"
        secondaryHref="/landscape-fabric-calculator"
        secondaryLabel="Use the Fabric Calculator"
      />
    </>
  );
}
