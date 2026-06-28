import "server-only";
import fs from "node:fs";
import path from "node:path";
import { getPublicPosts } from "@/lib/blog/loader";
import { resolveImage } from "@/lib/blog/images";
import { resolveAuthor } from "@/lib/blog/authors";
import type { BlogPost, Category } from "@/lib/blog/types";

/**
 * Blog hub model.
 *
 * The /blog master page is a rich, multi-section editorial hub. Every section
 * is derived HERE from the real posts on disk, so the page never hardcodes a
 * title, author, or image. Add a post -> it flows into the hub automatically.
 *
 * IMAGE CURATION (important): several blog hero refs point at Amazon-style
 * product-PACKAGING crops with baked-in marketing text ("DUAL LAYER 5oz",
 * tomato BEFORE/AFTER, "Thicker. Tougher."). Those look like ad creative when
 * dropped into editorial cards. The hub instead shows clean, text-free install
 * photography from public/home/* (real DOTDAY jobs), and assigns each
 * post a UNIQUE image so no two cards repeat. We never invent content - these
 * are existing brand photos already in the repo.
 */

const PUBLIC_DIR = path.join(process.cwd(), "public");
function exists(p: string): boolean {
  try {
    return fs.existsSync(path.join(PUBLIC_DIR, p.replace(/^\//, "")));
  } catch {
    return false;
  }
}

// Ranked editorial-photo pool (clean, text-free, real installs). Earlier =
// preferred. Each post claims the first unclaimed image whose "theme" matches
// its product/topic; this guarantees uniqueness across the visible set.
const PHOTO_POOL: { src: string; themes: string[] }[] = [
  { src: "/home/hero-panel.webp", themes: ["multiple", "hero", "any"] },
  { src: "/home/installs/shield-beds.webp", themes: ["shield", "beds", "any"] },
  { src: "/home/installs/xbar-walkway.webp", themes: ["xbar", "pavers", "hardscape", "any"] },
  { src: "/home/installs/terra-separation.webp", themes: ["terra", "drainage", "any"] },
  { src: "/home/gal-rollout.webp", themes: ["multiple", "comparison", "any"] },
  { src: "/home/gal-cutting.webp", themes: ["howto", "install", "any"] },
  { src: "/home/gal-planting.webp", themes: ["shield", "beds", "any"] },
  { src: "/home/gal-guideline.webp", themes: ["buying", "thickness", "any"] },
  { src: "/home/realjobs/tile-gravel.webp", themes: ["xbar", "gravel", "any"] },
  { src: "/home/realjobs/poster-1.webp", themes: ["any"] },
  { src: "/home/realjobs/poster-2.webp", themes: ["buying", "any"] },
  { src: "/home/apps/driveways.webp", themes: ["xbar", "driveway", "any"] },
  { src: "/home/apps/drainage.webp", themes: ["terra", "drainage", "any"] },
  { src: "/home/apps/raised-beds.webp", themes: ["shield", "beds", "any"] },
  { src: "/home/apps/garden-beds.webp", themes: ["shield", "beds", "any"] },
].filter((p) => exists(p.src));

/** Themes a post cares about, most specific first. */
function themesFor(post: BlogPost): string[] {
  const t: string[] = [];
  const prod = (post.primaryProduct || "").toLowerCase();
  const slug = post.slug.toLowerCase();
  if (slug.includes("paver") || slug.includes("hardscape")) t.push("pavers", "hardscape");
  if (slug.includes("gravel") || slug.includes("driveway")) t.push("gravel", "driveway");
  if (slug.includes("thickness")) t.push("thickness", "buying");
  if (slug.includes("woven")) t.push("comparison");
  if (slug.includes("longest") || slug.includes("last")) t.push("install", "howto");
  if (post.postType === "how-to") t.push("howto", "install");
  if (post.category === "Buying Guides") t.push("buying");
  if (prod === "shield") t.push("shield", "beds");
  if (prod === "xbar") t.push("xbar", "hardscape");
  if (prod === "terra") t.push("terra", "drainage");
  if (prod === "multiple") t.push("multiple", "comparison");
  t.push("any");
  return t;
}

/**
 * Assign every post a UNIQUE clean image. Greedy: walk posts (newest first is
 * fine, order is stable per build), and for each claim the best-matching
 * unclaimed photo. Falls back to the post's own resolved image only if the pool
 * is exhausted; the component shows a branded gradient if even that is missing.
 */
function assignImages(posts: BlogPost[]): Map<string, string | undefined> {
  const used = new Set<string>();
  const map = new Map<string, string | undefined>();
  for (const post of posts) {
    const themes = themesFor(post);
    let chosen: string | undefined;
    // try theme-matched, in theme-priority then pool-priority order
    outer: for (const theme of themes) {
      for (const photo of PHOTO_POOL) {
        if (!used.has(photo.src) && photo.themes.includes(theme)) {
          chosen = photo.src;
          break outer;
        }
      }
    }
    // any unused photo
    if (!chosen) {
      const free = PHOTO_POOL.find((p) => !used.has(p.src));
      if (free) chosen = free.src;
    }
    if (chosen) used.add(chosen);
    else chosen = resolveImage(post, post.hero.image.ref); // last resort
    map.set(post.slug, chosen);
  }
  return map;
}

export interface HubCard {
  slug: string;
  href: string;
  title: string;
  excerpt: string;
  category: Category;
  kicker: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  author: string;
  authorTitle: string;
  authorMonogram: string;
  readTime: string;
  /** numeric read time in minutes, for the "Quickest" sort */
  readMinutes: number;
  /** higher = more trending; for the "Trending" sort in the explorer */
  trendRank: number;
  img?: string;
  imgAlt: string;
  primaryProduct?: string;
}

export interface HubModel {
  hero: HubCard | null;
  trending: HubCard[];
  featured: HubCard[];
  editorsPicks: HubCard[];
  latest: HubCard[];
  all: HubCard[];
  categories: { label: string; href: string; count: number }[];
  total: number;
}

function kickerFor(category: Category): string {
  switch (category) {
    case "Buying Guides": return "Buying Guide";
    case "Comparisons": return "Comparison";
    case "How-To & Installation": return "Installation";
    case "Product Focused": return "Product Guide";
    case "Landscape Fabric": return "Fabric 101";
    default: return category;
  }
}

function levelFor(post: BlogPost): HubCard["level"] {
  const t = (post.postType || "").toLowerCase();
  const rt = post.readTimeMinutes || 0;
  if (t === "contractor" || rt >= 11) return "Advanced";
  if (t === "how-to" || t === "explainer" || t === "use-case") return "Beginner";
  if (t === "comparison" || t === "buying-guide") return "Intermediate";
  if (rt >= 9) return "Advanced";
  if (rt <= 6) return "Beginner";
  return "Intermediate";
}

function trendScore(post: BlogPost): number {
  const ageDays = (Date.now() - new Date(post.publishedAt).getTime()) / 86_400_000;
  const recency = Math.max(0, 120 - ageDays);
  const depth = (post.readTimeMinutes || 5) * 4;
  const commercial =
    post.category === "Comparisons" || post.category === "Buying Guides" ? 30 : 0;
  return recency + depth + commercial;
}

export function getHubModel(): HubModel {
  const posts = getPublicPosts();
  const imageMap = assignImages(posts);

  const toCard = (post: BlogPost): HubCard => {
    const a = resolveAuthor(post.authorRef, post.author);
    return {
      slug: post.slug,
      href: `/post/${post.slug}`,
      title: post.title,
      excerpt: post.hero.excerpt,
      category: post.category,
      kicker: kickerFor(post.category),
      level: levelFor(post),
      author: a.name,
      authorTitle: a.title,
      authorMonogram: a.monogram || "DD",
      readTime: post.readTimeMinutes ? `${post.readTimeMinutes} min` : "Read",
      readMinutes: post.readTimeMinutes || 99,
      trendRank: trendScore(post),
      img: imageMap.get(post.slug),
      imgAlt: post.hero.image.alt,
      primaryProduct: post.primaryProduct,
    };
  };

  const cards = posts.map(toCard);
  const byTrend = [...posts].sort((a, b) => trendScore(b) - trendScore(a));
  const trending = byTrend.slice(0, 5).map(toCard);
  const hero = trending[0] ?? null;
  const featured = byTrend.filter((p) => p.slug !== hero?.slug).slice(0, 3).map(toCard);

  const seen = new Set<string>();
  const spread: BlogPost[] = [];
  for (const p of byTrend) if (!seen.has(p.category)) { seen.add(p.category); spread.push(p); }
  for (const p of byTrend) { if (spread.length >= 3) break; if (!spread.includes(p)) spread.push(p); }
  const editorsPicks = spread.slice(0, 3).map(toCard);

  const latest = cards.slice(0, 6);

  const order: Category[] = [
    "Buying Guides", "Comparisons", "How-To & Installation", "Product Focused", "Landscape Fabric",
  ];
  const counts = new Map<string, number>();
  for (const p of posts) counts.set(p.category, (counts.get(p.category) || 0) + 1);
  const categories = [
    { label: "All Posts", href: "/blog", count: posts.length },
    ...order.filter((c) => counts.get(c)).map((c) => ({
      label: c, href: `/blog?category=${encodeURIComponent(c)}`, count: counts.get(c) || 0,
    })),
  ];

  return { hero, trending, featured, editorsPicks, latest, all: cards, categories, total: posts.length };
}
