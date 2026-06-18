import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug, isPublic } from "@/lib/blog/loader";
import { buildJsonLd } from "@/lib/blog/jsonld";
import { resolveImage } from "@/lib/blog/images";
import { BlogLayout } from "@/components/blog/BlogLayout";
import { SITE_URL } from "@/lib/site";

/**
 * /post/[slug] - legacy Wix URL preservation.
 *
 * The old thedotday.com blog served posts at /post/<slug>. To keep that SEO
 * equity, this route renders the SAME post by the SAME slug as /blog/[slug].
 *
 * Canonical still points at /post/<slug> for migrated posts whose seo.canonical
 * preserves the original URL (so we don't split signals). New posts canonical
 * to /blog/<slug>; this route still resolves them but defers canonical to the
 * post's own seo.canonical value.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  // Only build /post/* pages for migrated posts (original URL = /post/<slug>).
  // Non-migrated posts live at /blog/<slug>; building them here too would just
  // duplicate routes. We still allow resolution if someone hits the URL.
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  const canonical = post.seo.canonical || `${SITE_URL}/post/${post.slug}`;
  const ogImg =
    resolveImage(post, post.seo.social.ogImage.ref) ||
    `${SITE_URL}/brand/logo-neon.png`;
  const noindex = !isPublic(post) || post.seo.noindex === true;
  return {
    title: post.seo.metaTitle,
    description: post.seo.metaDescription,
    alternates: { canonical },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      title: post.seo.metaTitle,
      description: post.seo.social.excerpt || post.seo.metaDescription,
      url: canonical,
      images: [{ url: ogImg, width: 1200, height: 630, alt: post.seo.social.ogImage.alt }],
    },
    twitter: { card: "summary_large_image", images: [ogImg] },
  };
}

export default function LegacyPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();
  const jsonLd = buildJsonLd(post);
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <BlogLayout post={post} />
    </>
  );
}
