import type { BlogPost } from "@/lib/blog/types";
import { SITE_URL, site } from "@/lib/site";
import { resolveImage } from "@/lib/blog/images";

/**
 * Structured data for a post. The SEO standard requires three blocks on every
 * post: BlogPosting + FAQPage + BreadcrumbList. We build them from the same
 * JSON the page renders, so the markup and the schema never disagree.
 */

function absolute(url: string): string {
  if (url.startsWith("http")) return url;
  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

export function buildJsonLd(post: BlogPost) {
  const canonical = post.seo.canonical || absolute(`/blog/${post.slug}`);
  const heroImg = absolute(
    resolveImage(post, post.hero.image.ref) || "/brand/logo-neon.png"
  );

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo.metaDescription,
    image: [heroImg],
    datePublished: post.publishedAt,
    dateModified: post.dateModified || post.publishedAt,
    author: { "@type": "Organization", name: site.name },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: absolute("/brand/logo-neon.png"),
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    articleSection: post.category,
    keywords: post.focusKeyword,
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Blog", item: absolute("/blog") },
      {
        "@type": "ListItem",
        position: 2,
        name: post.category,
        item: absolute(`/blog?category=${encodeURIComponent(post.category)}`),
      },
      { "@type": "ListItem", position: 3, name: post.title, item: canonical },
    ],
  };

  return [blogPosting, faqPage, breadcrumb];
}
