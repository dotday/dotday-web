import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLandingBySlug, isPublic } from "@/lib/landing/loader";
import { buildLandingJsonLd } from "@/lib/landing/jsonld";
import { SectionRenderer } from "@/components/landing/SectionRenderer";
import { SITE_URL } from "@/lib/site";

/**
 * /my-qrzone - the post-purchase owner's hub.
 *
 * This is a landing page that needs a ROOT-level URL to preserve the original
 * Wix path (thedotday.com/my-qrzone) and its SEO equity - same philosophy as
 * /post/<slug> for the migrated blog. App Router can't serve a data-driven page
 * at the root without a dedicated route or a risky top-level [slug] catch-all,
 * so this file binds the URL while the CONTENT stays data-as-code in
 * content/landing/my-qrzone.json and renders through the same loader,
 * SectionRenderer, and JSON-LD as /l/[slug]. To repoint or restructure the
 * page, edit the JSON - not this file. (The /l/my-qrzone twin 301-redirects
 * here via next.config.js so there is one canonical URL.)
 */

const SLUG = "my-qrzone";

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

export default function MyQrZoneRoute() {
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
