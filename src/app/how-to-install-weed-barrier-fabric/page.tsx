import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLandingBySlug, isPublic } from "@/lib/landing/loader";
import { buildLandingJsonLd } from "@/lib/landing/jsonld";
import { SectionRenderer } from "@/components/landing/SectionRenderer";
import { SITE_URL } from "@/lib/site";

/**
 * /how-to-install-weed-barrier-fabric - the install guide.
 *
 * Migrated from a hand-coded route to the data-as-code landing engine. The page
 * keeps its ROOT-level URL (and the SEO equity that carries) the same way
 * /my-qrzone does: this thin file binds the URL, while the CONTENT lives in
 * content/landing/custom/how-to-install-weed-barrier-fabric.json and renders
 * through the shared loader, SectionRenderer, and JSON-LD. The HowTo + FAQPage +
 * BreadcrumbList structured data is emitted by buildLandingJsonLd from the same
 * steps/faq sections the page renders, so markup and schema never disagree. To
 * edit the guide, edit the JSON - not this file. (The /l/<slug> twin that the
 * landing engine would otherwise expose 301-redirects here via next.config.js
 * so there is one canonical URL.)
 */

const SLUG = "how-to-install-weed-barrier-fabric";

export function generateMetadata(): Metadata {
  const page = getLandingBySlug(SLUG);
  if (!page) return {};
  const canonical = page.seo.canonical || `${SITE_URL}/${SLUG}`;
  const ogImg = page.seo.ogImage?.ref || `${SITE_URL}/brand/logo-neon.png`;
  const noindex = !isPublic(page) || page.seo.noindex === true;
  return {
    title: page.seo.metaTitle,
    description: page.seo.metaDescription,
    alternates: { canonical },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      title: page.seo.metaTitle,
      description: page.seo.metaDescription,
      url: canonical,
      images: [
        {
          url: ogImg,
          width: 1200,
          height: 630,
          alt: page.seo.ogImage?.alt || page.title,
        },
      ],
    },
    twitter: { card: "summary_large_image", images: [ogImg] },
  };
}

export default function HowToInstallRoute() {
  const page = getLandingBySlug(SLUG);
  if (!page) notFound();
  const jsonLd = buildLandingJsonLd(page);
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <SectionRenderer sections={page.sections} page={page} />
    </>
  );
}
