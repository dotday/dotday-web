import type { Metadata } from "next";
import Link from "next/link";
import { getPublicPosts } from "@/lib/blog/loader";
import { resolveImage } from "@/lib/blog/images";
import { Img } from "@/components/blog/ui/Img";
import { ProductBlock } from "@/components/blog/blocks/ProductBlock";
import { FinalCTA } from "@/components/blog/cta/FinalCTA";
import { FAQ } from "@/components/blog/blocks/FAQ";
import { SITE_URL, site } from "@/lib/site";
import { HomeHero } from "@/components/site/home/HomeHero";
import { CompareTable } from "@/components/site/home/CompareTable";
import { UseCases } from "@/components/site/home/UseCases";
import { JobGallery } from "@/components/site/home/JobGallery";
import { ToolsBand } from "@/components/site/home/ToolsBand";
import { Testimonials } from "@/components/site/home/Testimonials";

export const metadata: Metadata = {
  title: "Landscape Fabric Built for the Job",
  description:
    "Professional landscape fabric for contractors and growers. SHIELD for garden beds, XBAR for gravel and hardscape, TERRA for drainage. Use the right fabric for the right ground condition. Ships from the USA.",
  alternates: { canonical: "/" },
};

/** Homepage FAQ. Mirrors the live site; powers the on-page accordion + FAQPage schema. */
const HOME_FAQ = {
  heading: "Frequently asked questions",
  items: [
    {
      q: "Which landscape fabric is best for my project?",
      a: "Choose SHIELD 3.2oz for garden beds, farm rows, and under mulch. Use XBAR 5oz for gravel driveways, pathways, and high-traffic hardscape. Choose TERRA 4 to 8oz for French drains, retaining walls, and drainage.",
    },
    {
      q: "Woven vs non-woven landscape fabric, which is better?",
      a: "Woven fabric like SHIELD is best for weed suppression and ground cover. Non-woven geotextile like TERRA is engineered for drainage and filtration. XBAR uses a dual-layer build (woven top with a non-woven backing) for strength and separation under hardscape.",
    },
    {
      q: "Can water and nutrients pass through DOTDAY fabric?",
      a: "Yes. All DOTDAY fabrics are permeable, so water, air, and nutrients reach the soil below. SHIELD and XBAR allow moderate flow for beds and hardscape. TERRA offers high permeability designed for drainage and filtration.",
    },
    {
      q: "How do I install landscape fabric properly?",
      a: "Clear the site, unroll with 6-inch overlaps, secure with staples every 12 to 18 inches, and cover with mulch or gravel for UV protection. Every roll ships with a step-by-step install guide.",
    },
    {
      q: "Will weeds grow through the fabric?",
      a: "DOTDAY fabrics block weeds from below. Any surface weeds that appear grow in the mulch on top and pull out easily, since roots cannot penetrate the barrier.",
    },
    {
      q: "Is DOTDAY fabric safe for vegetable gardens?",
      a: "Yes. All DOTDAY fabrics are chemically inert and safe around edible plants, herbs, and food crops. They help retain soil moisture and reduce the need for herbicides.",
    },
  ],
};

function buildHomeJsonLd() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-neon.png`,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Miami Gardens",
      addressRegion: "FL",
      addressCountry: "US",
    },
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: SITE_URL,
  };
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQ.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return [org, website, faqPage];
}

export default function HomePage() {
  const latest = getPublicPosts().slice(0, 3);
  const jsonLd = buildHomeJsonLd();

  return (
    <>
      {jsonLd.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}

      <HomeHero />

      {/* Three-fabric system */}
      <div className="wrap">
        <ProductBlock />
      </div>

      <CompareTable />
      <UseCases />
      <JobGallery />
      <ToolsBand />

      <Testimonials />

      {/* FAQ */}
      <section className="wrap section">
        <FAQ faq={HOME_FAQ} />
      </section>

      {/* Latest from the blog */}
      {latest.length > 0 && (
        <section className="wrap section">
          <div className="related-head">
            <h2>From the blog</h2>
            <p>Guides on picking and installing the right fabric.</p>
          </div>
          <div className="rgrid">
            {latest.map((p) => (
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
        </section>
      )}

      <FinalCTA />
    </>
  );
}
