#!/usr/bin/env node
/**
 * new-blog.mjs - scaffold a new post.
 *
 *   npm run new:blog -- my-focus-keyword-slug
 *
 * Writes content/blog/<slug>.json pre-filled with the fixed section arc and
 * every required field stubbed (status: "draft", schemaVersion 1.0.0). You then
 * fill the copy (or have Claude generate it), drop images into
 * /public/blog/<slug>/, run `npm run content:validate`, preview at
 * localhost:3000/blog/<slug>, and ship via PR.
 *
 * It will not overwrite an existing file.
 */
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const slug = process.argv[2];
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error("Usage: npm run new:blog -- <kebab-case-slug-with-focus-keyword>");
  process.exit(1);
}

const dir = join(process.cwd(), "content", "blog");
mkdirSync(dir, { recursive: true });
const file = join(dir, `${slug}.json`);
if (existsSync(file)) {
  console.error(`Refusing to overwrite existing file: ${file}`);
  process.exit(1);
}

const focus = slug.replace(/-/g, " ");
const now = new Date().toISOString();

const skeleton = {
  schemaVersion: "1.0.0",
  slug,
  title: `TODO title containing ${focus}`,
  category: "Buying Guides",
  postType: "buying-guide",
  primaryProduct: "MULTIPLE",
  focusKeyword: focus,
  status: "draft",
  author: "DOTDAY Gardener",
  publishedAt: now,
  dateModified: now,
  readTimeMinutes: 7,
  wordCount: 1000,
  seo: {
    metaTitle: `TODO <=60 chars with ${focus}`,
    metaDescription: `TODO 50-160 chars including ${focus}, written as a click-earning summary.`,
    canonical: `https://www.thedotday.com/blog/${slug}`,
    noindex: true,
    social: {
      excerpt: `TODO share excerpt about ${focus} ending in hashtags.`,
      hashtags: ["#LandscapeFabric", "#WeedBarrier", "#DOTDAY"],
      ogImage: { ref: "og", alt: `TODO alt with ${focus}` },
      pinterestImage: { ref: "pin", alt: `TODO vertical pin alt with ${focus}` },
      shareButtons: ["pinterest", "facebook", "x", "copy"],
      ogType: "article",
      twitterCard: "summary_large_image",
    },
  },
  hero: {
    badge: "Buying Guide",
    excerpt: "TODO hero subhead under the H1.",
    image: { ref: "hero", alt: `TODO hero alt with ${focus}` },
  },
  quickAnswer: {
    heading: "What you'll learn",
    items: ["TODO 1", "TODO 2", "TODO 3", "TODO 4"],
  },
  blocks: [
    {
      _type: "prose",
      eyebrow: "Start here",
      heading: `TODO H2 containing ${focus}`,
      body: `TODO opening paragraph. Mention ${focus} in the first 100 words. Link a [product](https://www.thedotday.com/product-page/xbar-landscape-fabric) and the [calculator](https://www.thedotday.com/landscape-fabric-calculator).`,
    },
    {
      _type: "cta",
      variant: "calculator",
      heading: "Not sure how much you need?",
      body: "Enter your area and overlap - get exact square footage and rolls.",
      cta: "Use the Fabric Calculator",
      href: "https://www.thedotday.com/landscape-fabric-calculator",
    },
    {
      _type: "cta",
      variant: "enquiry",
      heading: "Buying for a job site?",
      body: "Volume pricing for contractors, farms, and nurseries.",
      cta: "Request Bulk Pricing",
      href: "https://www.thedotday.com/bulk-pricing",
    },
  ],
  faq: {
    heading: "Frequently asked questions",
    items: [
      { q: "TODO question 1?", a: "TODO answer of about 40 to 55 words that directly answers the question first, then adds a sentence of useful context for the reader." },
      { q: "TODO question 2?", a: "TODO answer of about 40 to 55 words that directly answers the question first, then adds a sentence of useful context for the reader." },
    ],
  },
  closingHashtags: ["#LandscapeFabric", "#WeedBarrier", "#DOTDAY"],
  relatedPosts: [
    {
      title: "32 oz vs 5 oz weed barrier fabric: which option suits your gardening needs best",
      url: "https://www.thedotday.com/post/32-oz-vs-5-oz-weed-barrier-fabric-which-option-suits-your-gardening-needs-best",
      category: "Comparisons",
    },
    {
      title: "How to install weed barrier fabric",
      url: "https://www.thedotday.com/how-to-install-weed-barrier-fabric",
      category: "How-To & Installation",
    },
  ],
  internalLinks: [
    { label: "XBAR", url: "https://www.thedotday.com/product-page/xbar-landscape-fabric" },
    { label: "Fabric Calculator", url: "https://www.thedotday.com/landscape-fabric-calculator" },
    { label: "Bulk Pricing", url: "https://www.thedotday.com/bulk-pricing" },
  ],
  images: {},
};

writeFileSync(file, JSON.stringify(skeleton, null, 2) + "\n");
console.log(`Created ${file}`);
console.log("Next: fill the TODOs (or have Claude generate them), add images to");
console.log(`  public/blog/${slug}/  (hero.webp, og.webp, pin.webp, ...)`);
console.log("then: npm run content:validate  ->  preview  ->  PR");
