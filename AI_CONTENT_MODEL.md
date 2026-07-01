# AI_CONTENT_MODEL.md

**This file is the source of truth for generating content in this repo.** Any
tool, skill, or person (including Claude via the `dotday-page-builder` skill)
that creates a new blog post or page MUST read this file first and follow it
exactly. It is kept in the repo so it is always current - it changes in the same
PRs as the code it describes. If anything elsewhere (a skill, an old note,
training data) contradicts this file, **this file wins.**

Last verified against the codebase: 2026-06-29. (Components are organized by
role+family under `src/components/`; the newest sections are schema-first - shape
defined in a co-located `*.schema.json`, type generated from it.)

---

## 1. How content works here (the one-sentence model)

A blog post is **one JSON file** at `content/blog/<slug>.json`. It renders at
`/post/<slug>` automatically (the route reads the folder; `/blog/<slug>`
301-redirects to it). Adding a post = adding one file. No index to edit, no
import to register, no CMS.

> The earlier `ai-content/` folder and any "Zod/Sanity" description are
> **obsolete**. The real system is JSON Schema + a Node validator, described
> below.

---

## 2. Exact paths and commands

| What | Where / how |
|---|---|
| Blog content files | `content/blog/<slug>.json` (one per post) -> `/post/<slug>` |
| Landing content files | `content/landing/<slug>.json` (one per page) -> `/l/<slug>` |
| Per-post images | `public/blog/<slug>/<ref>.webp` |
| Blog schema (contract) | `schema/blogPost.schema.json` (schemaVersion **1.0.0**) |
| Landing schema (contract) | `schema/landingPage.schema.json` (schemaVersion **1.0.0**) |
| Blog validator (gate) | `node scripts/validate-post.mjs content/blog/<slug>.json` |
| Landing validator (gate) | `node scripts/validate-landing.mjs content/landing/<slug>.json` |
| Validate ALL content | `npm run content:validate` (posts + landing; runs in `npm run build` too) |
| Existing-content index | `node scripts/list-content.mjs` (or `--json`) |
| Scaffold a new post | `npm run new:blog -- <slug>` (writes a stub file) |
| Local preview | `npm run dev` -> `/post/<slug>` or `/l/<slug>` |
| Products (data) | `lib/products/products.ts` (SHIELD, XBAR, TERRA) |
| Tools (code, fixed) | `/landscape-fabric-calculator`, `/fabric-finder` |

**Before generating a new post, always run `scripts/list-content.mjs`** (or read
its output) to see existing slugs, titles, and focus keywords. Never reuse a
slug. Make internal links + `relatedPosts` point at URLs that appear in that
inventory.

---

## 3. The blog post schema (top-level fields)

Authoritative definition: `schema/blogPost.schema.json`. Always fetch and follow
that file. Summary of the **required** top-level fields:

```
schemaVersion  "1.0.0"            (constant)
slug           kebab-case, contains the focus keyword, unique
title          H1 text, contains the focus keyword
category       one of the allowed categories (see below)
focusKeyword   the single target query
status         "draft" | "in-review" | "published"
author         e.g. "DOTDAY Gardener"
publishedAt    ISO 8601
seo            { metaTitle, metaDescription, canonical, noindex, social {...} }
hero           { badge, excerpt, image { ref, alt } }
blocks         ordered array of typed blocks (see below)
faq            { heading, items: [ { q, a }, ... ] }   // >= 2 items
relatedPosts   2-3 items { title, url, category }
internalLinks  3-6 items { label, url }   // >= 1 product + the calculator
```

Optional but supported: `postType`, `primaryProduct`, `migrated`,
`dateModified`, `readTimeMinutes`, `wordCount`, `quickAnswer`,
`closingHashtags`, `images`, `audit`. (`generated` skeletons include the common
ones - use `npm run new:blog`.)

### Allowed `category` values
`Comparisons`, `Buying Guides`, `How-To & Installation`, `Gardening Tips`,
`Product Focused`, `Press`. (Match an existing one; do not invent.)

### `primaryProduct` values
`SHIELD` | `XBAR` | `TERRA` | `MULTIPLE` | `NONE`.

---

## 4. The ONLY block types that render

`blocks` is an ordered array. Each block has a `_type`. The renderer
(`components/renderers/BlockRenderer.tsx`) supports exactly these - anything else
is dropped:

| `_type` | Purpose | Key fields |
|---|---|---|
| `prose` | A titled section of body copy | `eyebrow?`, `heading`, `body` (markdown-ish: links `[text](url)`, `**bold**`) |
| `statStrip` | Row of stat numbers | `stats: [{ n, l }]` |
| `trustStrip` | Credibility panel, checkmarked columns | `heading`, `items: string[]` (2-4). **Buying Guides + Comparisons ONLY** |
| `comparisonTable` | Comparison grid | `heading?`, `columns: [...]`, `rows: [...]` |
| `proTip` | Green tip callout | `heading`, `body` |
| `warning` | Caution callout | `heading`, `body` |
| `steps` | Numbered steps | `heading?`, `steps: [{ title, body }]` |
| `image` | In-body image | `ref`, `alt`, `caption?` |
| `cta` | Call-to-action band | `variant: "calculator" \| "enquiry" \| "contractor"`, `heading`, `body`, `cta`, `href` |

> There is **no** `featureGrid`. Use `statStrip`, `comparisonTable`, or `steps`.
> The exact field shapes are in `src/lib/blog/types.ts` - fetch it if unsure.

### Default block arc for a blog post
`prose` (intro, focus keyword in first 100 words)
-> 1-3 of (`comparisonTable` | `statStrip` | `steps` | `prose`)
-> mid-article `cta` (variant `contractor` or `calculator`)
-> more `prose`/blocks as needed
-> closing `cta` (variant `enquiry`)
Then the top-level `faq` block (renders FAQPage schema automatically).

---

## 4b. Landing pages (the second content system)

Buy-intent, use-case pages ("best landscape fabric for gravel"). Same data-as-code
model as blogs, different shape: assembled from approved **sections** in any order.

- **File:** `content/landing/<slug>.json` -> `/l/<slug>`
- **Schema:** `schema/landingPage.schema.json` (schemaVersion **1.0.0**)
- **Renderer:** `components/renderers/SectionRenderer.tsx` (maps `section._type`)
- **Validate:** `node scripts/validate-landing.mjs content/landing/<slug>.json`
- **Status:** `"draft"` on generation; drafts excluded from sitemap + prerender.
- **Seed/example:** `content/landing/pages/landscape-fabric-for-gravel.json`
  (files live in `pages/` or `custom/`; routing is by `slug`, not folder)

Top-level: `schemaVersion, slug, title, focusKeyword, status, publishedAt, seo
{metaTitle, metaDescription, canonical (absolute), ogImage{ref,alt}}, sections[]`.

The ONLY sections that render (anything else is dropped). Authoritative list is
`schema/landingPage.schema.json`; always fetch it. Current set:

**Core flow:** `hero`, `problem`, `solution` (has `product` SHIELD|XBAR|TERRA +
`productHref`), `useCaseGrid`, `productComparison`, `calculatorEmbed`, `faq`,
`reviews`, `cta`, `internalLinks`.

**Custom / brand-moment sections:** `steps` (numbered how-to list), `callout`
(`variant` warning|proTip), `statementBand` (oversized-watermark positioning
band), `bigTypeFeatures` (big statement + feature cards), `specSheet`
(technical data sheet - never invent specs), `projectSpotlight` (real install /
UGC spotlight), `editorialCards` ("editor's picks" card row), `videoFeature`
(video player + rail).

Validator expects the first section to be `hero` and the page to include a `cta`
and an `internalLinks` section. JSON-LD emitted: WebPage + FAQPage +
BreadcrumbList. `specSheet` and `statementBand` are **schema-first** (shape lives
in their co-located `*.schema.json` under `components/sections/`).

Recommended arc: `hero` -> `problem` -> `solution` -> `useCaseGrid` ->
`productComparison` -> `calculatorEmbed`? -> `reviews`? -> `faq` -> `cta` ->
`internalLinks`.

**Cannibalization:** if a blog post already targets the same focusKeyword, pick
which page should rank and point the other's internal links at it. The landing
validator warns on keyword overlap (does not block).

---

## 5. Images come from Google Drive

Page images are pulled from the DOTDAY brand Google Drive, optimized to WebP,
and committed to `public/blog/<slug>/`. The folder/file IDs and the
download->WebP workflow are in `src/lib/products/drive-images.ts` and
`scripts/fetch-drive-images.md`.

- Reference images in JSON by **ref** (e.g. `"hero"`, `"og"`, `"pin"`, or a
  descriptive name). The resolver maps `ref -> /blog/<slug>/<ref>.webp`.
- A missing image file renders a branded placeholder (build never breaks), so
  JSON can be written before images are sourced.
- Every image needs descriptive `alt` text; the focus keyword must appear in at
  least one alt. Standard refs: `hero` (5:4), `og` (1200x630), `pin`
  (1000x1500 Pinterest).
- Match the product folder to the topic: SHIELD -> shield folders, XBAR -> xbar
  folders, TERRA -> terra folder.

---

## 6. Non-negotiable content rules (brand)

- **US spelling** everywhere (color, fiber, optimize, stabilization).
- **No em dashes or en dashes** anywhere in copy. Use commas, periods, or
  parentheses. (Hyphens in compound words are fine.)
- **Never invent specs** - no made-up ASTM numbers, weights, warranties,
  testimonials, or percentages. Use `[confirm: ...]` placeholders if a real
  figure is unknown.
- Real product weights only: SHIELD = 3.2 oz woven; XBAR = 5 oz woven dual-layer
  (woven top + non-woven backing, NOT needle-punched); TERRA = 4/6/8 oz
  non-woven needle-punched geotextile.
- **One H1 per page** (the hero `title`). Never add a second.
- **Focus keyword placement** (validator enforces): in `slug`, `title`,
  `seo.metaTitle`, `seo.metaDescription`, at least one block `heading`, the
  intro copy (first ~100 words), and >= 1 image `alt`.
- `seo.metaTitle` <= 60 chars; `seo.metaDescription` 50-160 chars; metaTitle and
  H1 stay aligned (no mismatched framing).
- **Two CTAs minimum**: a mid-article CTA aimed at contractors/bulk buyers, and
  a closing enquiry CTA (request a quote / talk to us) - not only the calculator.
- **FAQ required** (>= 2 Q&As) on every post - it generates FAQPage schema.
- **Honest product fit**: recommend the right fabric for the job (SHIELD for
  garden/weed, XBAR for hardscape/load, TERRA for drainage), even if cheaper.
- Comparison posts must include a `comparisonTable` block.
- Hashtags appear in two places: `seo.social.excerpt` (ending in hashtags) and
  `closingHashtags`.
- DOTDAY Instagram: `@dotday_landscape_fabrics`
  (https://www.instagram.com/dotday_landscape_fabrics/).

---

## 7. Generation workflow (the loop)

1. **Read this file** + fetch `schema/blogPost.schema.json` and one example post
   (`content/blog/woven-vs-non-woven-landscape-fabric.json`).
2. **Inventory** existing pages: `scripts/list-content.mjs`. Pick a non-colliding
   slug; plan internal links + relatedPosts against real URLs.
3. **Write** `content/blog/<slug>.json` following the schema + rules above.
   `status: "draft"` until a human approves.
4. **Source images** from Drive into `public/blog/<slug>/` (or leave refs for
   placeholders for now).
5. **Validate**: `node scripts/validate-post.mjs content/blog/<slug>.json` (and
   `npm run content:validate`). Fix anything it flags - a failing post is not
   shippable.
6. **Preview** at `localhost:3000/post/<slug>`.
7. **Ship**: commit on a branch -> PR -> Vercel preview -> set
   `status: "published"` and merge to `main`.

---

## 8. Stack (fixed)

Next.js 14 App Router (static/SSG-first) - Vercel (auto-deploy from GitHub, PR
previews) - content is data-as-code JSON in this repo (no CMS) - Wix hosts
commerce at `store.thedotday.com` - lead capture posts to `/api/lead`
(Supabase-ready). Font: Wix Madefor Text only (no Wix Madefor Display),
self-hosted. Brand: white +
neon `#D8FF00` + charcoal `#101010`.
