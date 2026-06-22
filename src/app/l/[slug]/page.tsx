import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllLandingSlugs,
  getLandingBySlug,
  isPublic,
} from "@/lib/landing/loader";
import { buildLandingJsonLd } from "@/lib/landing/jsonld";
import { SectionRenderer } from "@/components/landing/SectionRenderer";
import { SITE_URL } from "@/lib/site";

/**
 * /l/[slug] - the landing-page route. Same engine as /post/[slug]:
 * generateStaticParams reads content/landing/*.json so a new file ships as a
 * new static page; generateMetadata builds the SEO head from the JSON; JSON-LD
 * (WebPage + FAQPage + BreadcrumbList) is injected here. The body is assembled
 * by SectionRenderer from the approved section list.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllLandingSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = getLandingBySlug(params.slug);
  if (!page) return {};
  const canonical = page.seo.canonical || `${SITE_URL}/l/${page.slug}`;
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

export default function LandingPageRoute({
  params,
}: {
  params: { slug: string };
}) {
  const page = getLandingBySlug(params.slug);
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
      <SectionRenderer sections={page.sections} />
    </>
  );
}
