import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug, isPublic } from "@/lib/blog/loader";
import { buildJsonLd } from "@/lib/blog/jsonld";
import { resolveImage } from "@/lib/blog/images";
import { BlogLayout } from "@/components/blog/BlogLayout";
import { SITE_URL } from "@/lib/site";

/**
 * /blog/[slug] - the canonical post route.
 *
 * generateStaticParams reads content/blog/*.json, so a new file ships as a new
 * static page with zero other edits. generateMetadata builds the full SEO head
 * (title, description, canonical, OG, Twitter, noindex for drafts) from the
 * same JSON. JSON-LD (BlogPosting + FAQPage + BreadcrumbList) is injected here.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const canonical = post.seo.canonical || `${SITE_URL}/blog/${post.slug}`;
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
      publishedTime: post.publishedAt,
      modifiedTime: post.dateModified || post.publishedAt,
      section: post.category,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.metaTitle,
      description: post.seo.social.excerpt || post.seo.metaDescription,
      images: [ogImg],
    },
    keywords: post.focusKeyword,
  };
}

export default function BlogPostPage({
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
