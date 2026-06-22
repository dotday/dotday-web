# DOTDAY Web

The DOTDAY Landscape Fabrics website. Next.js 14 (App Router) + Vercel, with a
**shared shell** (header, footer, design system) and **self-contained content
files** so new blog posts and landing pages drop in without touching anything
else. Application code lives under `src/` (the `@/*` alias maps to `src/*`);
content, schema, scripts, and public assets stay at the repo root.

> **Brand:** Use the right fabric for the right ground condition.
> SHIELD (3.2 oz woven weed barrier) · XBAR (5 oz woven-hybrid hardscape) ·
> TERRA (4/6/8 oz non-woven geotextile). Commerce lives on Wix
> (`store.thedotday.com`); content + marketing live here.

---

## The core idea (why pages are independent)

The site has **two content systems**, both data-as-code, both fully static, both
"one file = one page":

```
content/blog/<slug>.json      ->  renders at /post/<slug>     (blog posts)
content/landing/<slug>.json   ->  renders at /l/<slug>        (landing pages)
```

`generateStaticParams()` reads each content folder at build time, so a new JSON
file becomes a new static page automatically. **No index to edit, no import to
register, no other page touched.** You add a file, open a PR, Vercel builds a
preview, you merge. Publishing never disturbs the pages already live.

The same pattern drives products (`src/lib/content/products.ts`) - fixed template,
data-driven content.

**Blog vs landing:** blog posts are ~80% uniform (a fixed hero + blocks + FAQ
arc, for informational/how-to content). Landing pages are assembled from approved
**sections** in any order (for commercial, use-case keywords). They are rendered
by two parallel dispatchers (`BlockRenderer` for blog blocks, `SectionRenderer`
for landing sections) and validated by two parallel gates.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

Build (runs the content validators first, then Next):

```bash
npm run build
npm run start        # serve the production build locally
```

---

## Adding a page

### A blog post
1. **Scaffold**: `npm run new:blog -- my-focus-keyword-slug`
   (writes `content/blog/<slug>.json`, every field stubbed, `status: "draft"`).
2. **Fill the copy** - by hand, or via Claude (the `dotday-page-builder` /
   `dotday-blog-template` skills).
3. **Add images** to `public/blog/<slug>/` as WebP (`hero.webp`, `og.webp`,
   `pin.webp`, plus in-body refs). Missing images render branded placeholders;
   the build never breaks.
4. **Validate**: `npm run content:validate` (the gate - see rules below).
5. **Preview** at `localhost:3000/post/<slug>` (drafts visible in dev).
6. **Ship**: PR -> Vercel preview -> set `"status": "published"` -> merge.

### A landing page
1. **Write** `content/landing/<slug>.json` (mirror the seed example
   `content/landing/landscape-fabric-for-gravel.json`). Assemble from approved
   sections; `status: "draft"`.
2. **Validate**: `node scripts/validate-landing.mjs content/landing/<slug>.json`
   (also runs in `npm run content:validate`). It checks SEO limits, the dash
   ban, that the first section is a hero, and that the page has a CTA +
   internal-links section. It also **warns if a landing page and a blog post
   share a focus keyword** (cannibalization).
3. **Preview** at `localhost:3000/l/<slug>`.
4. **Ship**: same PR -> preview -> publish -> merge flow.

Drafts (`status: draft` / `in-review`) are excluded from listings + sitemap in
production and render `noindex`, so you can stage work safely on `main`.

---

## Project structure

All application code lives under `src/`; the `@/*` import alias maps to `src/*`.
Data (`content/`), the data contracts (`schema/`), build tooling (`scripts/`),
and assets (`public/`) stay at the repo root - they are read by the loaders and
build scripts via the filesystem (`process.cwd()`), not the import alias.

```
src/
  app/
    layout.tsx                     # shared shell: header + footer + font, base metadata
    page.tsx                       # homepage
    blog/page.tsx                  # blog hub (category filter + pagination, 12/page)
    post/[slug]/page.tsx           # canonical blog post route (/post/<slug>)
    l/[slug]/page.tsx              # landing page route (/l/<slug>)
    product-page/[slug]/page.tsx   # product pages (data-driven)
    landscape-fabric-calculator/   # the calculator tool page
    fabric-finder/                 # the product-quiz tool page
    how-to-install-weed-barrier-fabric/  # install guide
    contact-us/ , bulk-pricing/    # lead-capture pages
    privacy-policy/ , terms-of-service/  # legal
    api/lead/route.ts              # form submission endpoint (Supabase + spam defense)
    sitemap.ts , robots.ts , not-found.tsx

  components/
    site/        SiteHeader · SiteFooter · FontFace · LeadForm · ProListForm · LegalPage · Icon
      home/      HomeHero · CompareTable · UseCases · ToolsBand · JobGallery · Testimonials · StatStrip
    blog/        BlogLayout · BlogHero · QuickAnswer · BlockRenderer · RelatedArticles
      blocks/    Prose · StatStrip · ComparisonTable · TrustStrip · Callout · Steps · ImageBlock · ProductBlock · FAQ
      cta/       InlineCTA · FinalCTA
      ui/        Img · Badge/CTAButton · ReadingProgress · ShareButtons · RichText
    global/      sections (SharedFAQ · SharedComparisonTable · SharedCTA - shared by blog + landing)
    landing/     SectionRenderer · sections (hero, problem, solution, useCaseGrid,
                 productComparison, calculatorEmbed, faq, reviews, cta, internalLinks)
    tools/       FabricCalculator · FabricFinder

  lib/
    blog/        types · loader (memoized) · images · jsonld · tokens
    landing/     types · loader (memoized) · jsonld
    content/     products · drive-images
    site.ts                        # origin, nav, footer links

  styles/
    globals.css                    # the full brand design system (CSS vars + classes)

content/                           # data-as-code (read at build via process.cwd())
  blog/        <slug>.json          # one file per post     -> /post/<slug>
  landing/     <slug>.json          # one file per landing  -> /l/<slug>

schema/
  blogPost.schema.json             # blog data contract (schemaVersion 1.0.0)
  landingPage.schema.json          # landing data contract (schemaVersion 1.0.0)

scripts/
  validate-post.mjs                # blog SEO/content gate
  validate-landing.mjs             # landing SEO/content gate (+ keyword-overlap warning)
  validate-content.mjs             # parses product/landing JSON in the build
  new-blog.mjs                     # scaffolds a new post skeleton
  list-content.mjs                 # lists existing slugs/keywords (collision check)

public/
  brand/       logo-neon.png · dd-circle.png · fonts/   # brand assets
  blog/<slug>/ hero.webp · og.webp · ...                # per-post images
```

---

## Design system

Tokens live in `src/lib/blog/tokens.ts` and are mirrored as CSS variables in
`src/styles/globals.css`. Palette: white-dominant, neon `#D8FF00` accent, soft-neon
`#DFFF6A` panels, minimal charcoal `#101010`. Type is **Wix Madefor Text**
(Apple-light headings: 400-500; CTAs + small labels bold).

**Font:** self-hosted - real WOFF2 files in `public/brand/fonts/` (weights
400-800), loaded by `src/components/site/FontFace.tsx`. No network call at build;
identical on Vercel. Replace the WOFF2 files (same names) to update.

## Images come from Google Drive

Page imagery is sourced from the DOTDAY brand Google Drive, optimized to WebP,
and committed into `/public`. The folder + file IDs are mapped in
`src/lib/content/drive-images.ts`; the full download -> convert workflow is in
`scripts/fetch-drive-images.md`. Missing images fall back to branded
placeholders, so the build never breaks while imagery is being sourced.

---

## Lead capture

Forms (contact, bulk pricing, project quote, and the footer Pro List) all post to
`/api/lead`, tagged by `formId`. The endpoint:

- **Persists to Supabase** when configured. Set `SUPABASE_URL`,
  `SUPABASE_SERVICE_ROLE_KEY`, and (optional) `LEADS_TABLE` in Vercel; create a
  `leads` table. Until those env vars exist, it logs to Vercel function logs so
  nothing is dropped. An optional `LEAD_NOTIFY_WEBHOOK` also pushes each lead to
  a webhook (Slack / Make / email relay).
- **Spam defense, no captcha:** a hidden honeypot field, a submit-timing gate
  (sub-1.5s submits treated as bots), and a per-IP rate limit.

No front-end changes are needed to turn storage on - just set the env vars and
redeploy.

---

## Deploy (GitHub + Vercel)

1. Push this repo to GitHub.
2. In Vercel: **New Project** -> import the repo. Framework preset = Next.js
   (auto-detected). No build overrides needed (`npm run build` runs the
   validators).
3. Set environment variables (see `.env.example`):
   - `NEXT_PUBLIC_SITE_URL=https://www.thedotday.com`
   - `NEXT_PUBLIC_STORE_URL=https://store.thedotday.com`
   - Supabase vars for lead capture (above).
4. Point DNS (GoDaddy) for `thedotday.com` at Vercel. Keep `store.thedotday.com`
   on Wix.
5. Every PR gets a preview deploy; merging to `main` ships to production.

---

## Content + SEO rules (enforced by the validators)

**Blog posts** (`validate-post.mjs`):
- One **focus keyword** per post; must appear in title, slug, an H2, the first
  100 words, an image alt, metaTitle, and metaDescription.
- Meta title <= 60 chars; meta description 50-160 chars.
- 3-6 internal links incl. >=1 product page + the calculator; FAQ block
  required; 2-3 real related posts.
- Mid-article CTA + closing enquiry CTA required.
- Comparison posts must include a comparison table.

**Landing pages** (`validate-landing.mjs`):
- Focus keyword in slug, title, metaTitle; absolute canonical URL.
- First section is a `hero`; page includes a `cta` and an `internalLinks`
  section; FAQ items are Q+A pairs.
- Warns when the focus keyword overlaps a blog post.

**Both:** **no em/en dashes** anywhere (brand AI-tell); US spelling; no
hype/superlative banned phrases; never invent specs.

Run `npm run content:validate` any time; it runs both gates and is part of
`npm run build`.
