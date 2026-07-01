import type { Metadata } from "next";
import Link from "next/link";
import { getPublicPosts } from "@/lib/blog/loader";
import { resolveImage } from "@/lib/blog/images";
import { getHubModel } from "@/lib/blog/hub";
import { resolveAuthor } from "@/lib/blog/authors";
import { Img } from "@/components/primitives/Img";
import { FAQ } from "@/components/sections/editorial/FAQ";
import { SITE_URL, site } from "@/lib/site";
import {
  HubHero,
  TrendingRail,
  FeaturedArticles,
  ExpertQuote,
  EditorsPicks,
  DidYouKnow,
  LatestArticles,
  HubVideo,
  DifferenceBand,
  SustainableGardening,
  FieldQuote,
  ExpertReviews,
  MissionTeam,
} from "@/components/sections/editorial/HubSections";
import { BlogExplorer } from "@/components/sections/editorial/BlogExplorer";
import { HubNewsletter } from "@/components/sections/editorial/HubNewsletter";

export const metadata: Metadata = {
  title: "The Groundwork: Landscape Fabric Guides, Comparisons & How-Tos",
  description:
    "Expert landscape fabric guides from DOTDAY: SHIELD 3.2oz weed barrier for garden beds, XBAR 5oz dual-layer for gravel and hardscape, and TERRA non-woven geotextile for drainage. Comparisons, installation how-tos, and field-tested advice. Use the right fabric for the right ground condition.",
  keywords: [
    "landscape fabric",
    "weed barrier fabric",
    "woven vs non-woven landscape fabric",
    "landscape fabric under pavers",
    "geotextile fabric",
    "weed barrier under gravel",
    "garden weed control fabric",
    "DOTDAY SHIELD",
    "DOTDAY XBAR",
    "DOTDAY TERRA",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "The Groundwork: Landscape Fabric Guides by DOTDAY",
    description:
      "Choosing and installing the right landscape fabric, explained by the people who make it. Weed barrier, hardscape fabric, and geotextile, matched to the job.",
    url: `${SITE_URL}/blog`,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "The Groundwork: Landscape Fabric Guides by DOTDAY",
    description:
      "Weed barrier, hardscape fabric, and geotextile, matched to the job. Field-tested guides from DOTDAY.",
  },
};

// Archive view (?category= / ?page=) cards per page. Keeps the crawlable,
// paginated browse path that scales to hundreds of posts without bloating a
// single page's payload.
const PER_PAGE = 12;

const ARCHIVE_CATEGORIES = [
  "All Posts",
  "Buying Guides",
  "Comparisons",
  "How-To & Installation",
  "Product Focused",
  "Landscape Fabric",
] as const;

/** Hub FAQ - powers the on-page accordion and FAQPage schema. */
const HUB_FAQ = {
  heading: "Frequently asked questions",
  items: [
    {
      q: "How long does landscape fabric really last?",
      a: "It depends on the fabric weight and whether it is covered. A light 3.2oz woven like SHIELD lasts for years under mulch in a garden bed; a heavier 5oz dual-layer like XBAR is built for the load and abrasion of gravel and hardscape. Keeping fabric covered from UV is the single biggest factor in lifespan.",
    },
    {
      q: "Will landscape fabric kill my plants?",
      a: "No. DOTDAY fabrics are permeable, so water, air, and nutrients reach the soil. They block weeds from below while letting your intended plants thrive. For beds you cut an X where each plant goes and fold the flaps back.",
    },
    {
      q: "Can I use landscape fabric under gravel?",
      a: "Yes, but use the right one. Under gravel and hardscape you want a heavier woven or dual-layer fabric like XBAR that resists punching and pumping, not a light garden cloth. For pure drainage and separation, a non-woven geotextile like TERRA is the right call.",
    },
    {
      q: "What's the difference between woven and non-woven fabric?",
      a: "Woven fabric is best for weed suppression and ground cover. Non-woven geotextile is engineered for drainage and filtration. XBAR uses a dual-layer build, a woven top with a non-woven backing, for strength and separation under hardscape. Our woven vs non-woven guide breaks down when to use each.",
    },
    {
      q: "How do I install landscape fabric correctly?",
      a: "Clear the site, unroll with 6-inch overlaps, secure with staples every 12 to 18 inches, and cover with mulch or gravel for UV protection. Our step-by-step install guide walks through each stage.",
    },
    {
      q: "Is landscape fabric safe for vegetable gardens?",
      a: "Yes. DOTDAY fabrics are chemically inert and safe around edible plants, herbs, and food crops. They help retain soil moisture and reduce the need for herbicides.",
    },
  ],
};

function buildHubJsonLd(posts: ReturnType<typeof getPublicPosts>) {
  const blog = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "The Groundwork by DOTDAY",
    description:
      "Expert guides on choosing and installing the right landscape fabric.",
    url: `${SITE_URL}/blog`,
    publisher: { "@type": "Organization", name: site.name, url: SITE_URL },
    blogPost: posts.slice(0, 10).map((p) => {
      const a = resolveAuthor(p.authorRef, p.author);
      return {
        "@type": "BlogPosting",
        headline: p.title,
        url: `${SITE_URL}/post/${p.slug}`,
        datePublished: p.publishedAt,
        author: { "@type": a.type, name: a.name },
      };
    }),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
    ],
  };
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HUB_FAQ.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  // Organization with the three real products, so the brand + product line are
  // machine-readable from the hub.
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-neon.png`,
    description: site.description,
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "DOTDAY SHIELD 3.2oz Woven Weed Barrier",
          category: "Landscape fabric / weed barrier",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "DOTDAY XBAR 5oz Dual-Layer Woven Fabric",
          category: "Landscape fabric / hardscape",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "DOTDAY TERRA Non-Woven Geotextile (4/6/8oz)",
          category: "Geotextile / drainage",
        },
      },
    ],
  };
  // Real, verified customer review (Briana Talmage). Attached to the brand so
  // it can surface as a review snippet. Only real reviews go here.
  const review = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "Brand", name: site.shortName },
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    author: { "@type": "Person", name: "Briana Talmage" },
    reviewBody:
      "Absolutely love this weed barrier. It's durable, thicker, and a game changer for having to pull weeds. It doesn't shred like its competitors. Dot Day has gained a customer for life.",
  };
  return [blog, breadcrumb, faqPage, organization, review];
}

export default function BlogIndex({
  searchParams,
}: {
  searchParams: { category?: string; page?: string };
}) {
  const posts = getPublicPosts();
  const isArchive = Boolean(searchParams.category || searchParams.page);

  // ----- ARCHIVE MODE: ?category= / ?page= -> crawlable paginated grid -----
  if (isArchive) {
    const active = searchParams.category || "All Posts";
    const filtered =
      active === "All Posts" ? posts : posts.filter((p) => p.category === active);
    const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    const rawPage = parseInt(searchParams.page || "1", 10);
    const page = Math.min(Math.max(1, isNaN(rawPage) ? 1 : rawPage), totalPages);
    const pagePosts = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    const pageHref = (p: number) => {
      const params = new URLSearchParams();
      if (active !== "All Posts") params.set("category", active);
      if (p > 1) params.set("page", String(p));
      const qs = params.toString();
      return qs ? `/blog?${qs}` : "/blog";
    };

    return (
      <div className="wrap page">
        <nav className="crumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / {active}
        </nav>
        <h1 style={{ marginTop: 14 }}>{active === "All Posts" ? "All articles" : active}</h1>
        <p className="lead">
          Pick the right fabric for the job, then install it so it lasts. Buying
          guides, head-to-head comparisons, and field-tested how-tos.
        </p>

        <div className="section" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {ARCHIVE_CATEGORIES.map((c) => {
            const isActive = c === active;
            const href = c === "All Posts" ? "/blog" : `/blog?category=${encodeURIComponent(c)}`;
            return (
              <Link
                key={c}
                href={href}
                className="btn"
                style={{
                  background: isActive ? "var(--neon)" : "transparent",
                  borderColor: isActive ? "var(--neon)" : "var(--grey2)",
                  color: "var(--ink)",
                  padding: "9px 16px",
                }}
              >
                {c}
              </Link>
            );
          })}
        </div>

        {pagePosts.length === 0 ? (
          <p className="form-note">No posts in this category yet.</p>
        ) : (
          <>
            <div className="rgrid" style={{ marginTop: 8, marginBottom: 40 }}>
              {pagePosts.map((p) => (
                <Link className="rcard" href={`/post/${p.slug}`} key={p.slug}>
                  <Img
                    src={resolveImage(p, p.hero.image.ref)}
                    alt={p.hero.image.alt}
                    ratio="r-169"
                    placeholderLabel={p.category}
                  />
                  <div className="pad">
                    <span className="badge">{p.category}</span>
                    <h3>{p.title}</h3>
                    <span className="rtime">
                      {p.readTimeMinutes ? `${p.readTimeMinutes} min read` : "Read article"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <nav
                className="pager"
                aria-label="Blog pagination"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, margin: "8px 0 48px", flexWrap: "wrap" }}
              >
                {page > 1 && (
                  <Link className="btn" href={pageHref(page - 1)} style={{ padding: "9px 16px" }}>
                    Previous
                  </Link>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={pageHref(p)}
                    className="btn"
                    aria-current={p === page ? "page" : undefined}
                    style={{
                      padding: "9px 14px",
                      background: p === page ? "var(--neon)" : "transparent",
                      borderColor: p === page ? "var(--neon)" : "var(--grey2)",
                      color: "var(--ink)",
                      minWidth: 40,
                      textAlign: "center",
                    }}
                  >
                    {p}
                  </Link>
                ))}
                {page < totalPages && (
                  <Link className="btn" href={pageHref(page + 1)} style={{ padding: "9px 16px" }}>
                    Next
                  </Link>
                )}
              </nav>
            )}
          </>
        )}
      </div>
    );
  }

  // ----------------------- HUB MODE: the rich landing ----------------------
  const model = getHubModel();
  const jsonLd = buildHubJsonLd(posts);

  return (
    <>
      {jsonLd.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}

      <HubHero hero={model.hero} />
      <TrendingRail cards={model.trending} />
      <BlogExplorer cards={model.all} />
      <FieldQuote />
      <FeaturedArticles cards={model.featured} />
      <ExpertQuote />
      <EditorsPicks cards={model.editorsPicks} />
      <MissionTeam />
      <DidYouKnow />
      <SustainableGardening />
      <HubVideo />
      <LatestArticles cards={model.latest} />
      <ExpertReviews />
      <DifferenceBand />

      <section className="wrap hub-section">
        <FAQ
          faq={HUB_FAQ}
          lead="Expert answers on landscape fabric selection, installation, and performance."
        />
      </section>

      <HubNewsletter />
    </>
  );
}
