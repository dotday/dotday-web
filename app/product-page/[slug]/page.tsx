import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct } from "@/lib/content/products";
import { Badge, CTAButton } from "@/components/blog/ui/Badge";
import { Img } from "@/components/blog/ui/Img";
import { FAQ } from "@/components/blog/blocks/FAQ";
import { FinalCTA } from "@/components/blog/cta/FinalCTA";
import { ProductBlock } from "@/components/blog/blocks/ProductBlock";
import { SITE_URL, site } from "@/lib/site";

/**
 * /product-page/[slug] - product pages driven by lib/content/products data.
 * Fixed template, content per product. Emits Product + FAQPage JSON-LD. Buy
 * actions point at the Wix store (commerce stays on Wix).
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = getProduct(params.slug);
  if (!p) return {};
  return {
    title: p.metaTitle,
    description: p.metaDescription,
    alternates: { canonical: `/product-page/${p.slug}` },
    openGraph: {
      title: p.metaTitle,
      description: p.metaDescription,
      url: `${SITE_URL}/product-page/${p.slug}`,
    },
  };
}

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const p = getProduct(params.slug);
  if (!p) notFound();

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${p.name} ${p.construction}`,
    description: p.metaDescription,
    brand: { "@type": "Brand", name: site.shortName },
    category: "Landscape Fabric",
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <header className="hero">
        <div className="wrap">
          <div className="crumb">Fabrics &nbsp;/&nbsp; {p.name}</div>
          <div className="hero-grid">
            <div>
              <Badge>{p.construction.split(" ")[0]}</Badge>
              <h1>{p.name}</h1>
              <p className="excerpt">{p.tagline}</p>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "baseline",
                  margin: "0 0 20px",
                }}
              >
                <span style={{ fontWeight: 600, color: "var(--charcoal)" }}>
                  {p.weight}
                </span>
                <span style={{ color: "var(--muted)" }}>{p.construction}</span>
              </div>
              <div className="final-btns" style={{ justifyContent: "flex-start" }}>
                <CTAButton href={p.shopHref} variant="primary">
                  Shop {p.name}
                </CTAButton>
                <CTAButton href="/landscape-fabric-calculator" variant="ghost">
                  Use the Fabric Calculator
                </CTAButton>
              </div>
            </div>
            <Img
              src={p.image}
              alt={`${p.name} ${p.construction} roll`}
              ratio="r-54"
              priority
              placeholderLabel={`${p.name} roll`}
            />
          </div>
        </div>
      </header>

      <div className="wrap">
        <div className="body-single">
          <article>
            <div className="sec">
              <div className="eyebrow">
                <b>Overview</b>
              </div>
              <h2>What {p.name} is built for</h2>
              <p>{p.description}</p>
              <div className="puses" style={{ marginTop: 8 }}>
                {p.bestFor.map((u) => (
                  <span className="puse" key={u}>
                    {u}
                  </span>
                ))}
              </div>
            </div>

            <div className="sec">
              <div className="eyebrow">
                <b>Why it works</b>
              </div>
              <h2>Features</h2>
              <div className="feature-grid">
                {p.features.map((f) => (
                  <div className="feature" key={f.title}>
                    <h3>{f.title}</h3>
                    <p>{f.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bulk">
              <div>
                <h3>Buying for a job site?</h3>
                <p>Volume pricing for contractors, farms, and nurseries.</p>
              </div>
              <CTAButton href="/bulk-pricing" variant="ghost">
                Request Bulk Pricing
              </CTAButton>
            </div>

            <FAQ faq={{ items: p.faq }} />
          </article>
        </div>

        <ProductBlock />
      </div>

      <FinalCTA />
    </>
  );
}
