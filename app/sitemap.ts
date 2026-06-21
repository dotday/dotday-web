import type { MetadataRoute } from "next";
import { getPublicPosts } from "@/lib/blog/loader";
import { PRODUCTS } from "@/lib/content/products";
import { SITE_URL } from "@/lib/site";

/**
 * Dynamic sitemap. Pulls public posts from the content loader + products from
 * the catalog + the static pages. New posts appear automatically once they are
 * published (drafts are excluded by getPublicPosts).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    "",
    "/blog",
    "/landscape-fabric-calculator",
    "/fabric-finder",
    "/how-to-install-weed-barrier-fabric",
    "/contact-us",
    "/bulk-pricing",
    "/shipping-policy",
    "/returns-policy",
    "/terms-of-service",
    "/privacy-policy",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const productPages = PRODUCTS.map((p) => ({
    url: `${SITE_URL}/product-page/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const postPages = getPublicPosts().map((p) => ({
    url: p.seo.canonical || `${SITE_URL}/post/${p.slug}`,
    lastModified: new Date(p.dateModified || p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...productPages, ...postPages];
}
