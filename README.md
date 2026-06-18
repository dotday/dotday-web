# DOTDAY Web

The DOTDAY Landscape Fabrics website. Next.js 14 (App Router) + Vercel, with a
**shared shell** (header, footer, design system) and **self-contained content
files** so new blog and landing pages drop in without touching anything else.

> **Brand:** Use the right fabric for the right ground condition.
> SHIELD (3.2 oz woven weed barrier) · XBAR (5 oz woven-hybrid hardscape) ·
> TERRA (4/6/8 oz non-woven geotextile). Commerce lives on Wix
> (`store.thedotday.com`); content + marketing live here.

---

## The core idea (why pages are independent)

Adding a blog post is **one file**:

```
content/blog/<slug>.json   ->   renders at /blog/<slug>
```

`generateStaticParams()` reads the `content/blog/` folder at build time, so a new
JSON file becomes a new static page automatically. **No index to edit, no import
to register, no other page touched.** Publishing a new post never disturbs the
ones already live - you add a file, open a PR, Vercel builds a preview, you
merge. That is the whole dependency model you asked for.

The same pattern drives products (`lib/content/products.ts`) - fixed template,
data-driven content.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

Build (runs the content validator first, then Next):

```bash
npm run build
npm run start        # serve the production build locally
```

---

## The two-stage workflow

**Stage 1 (done): the framework.** Header, footer, blog template, landing/page
shells, calculators, contact + bulk forms, SEO plumbing (metadata, JSON-LD,
sitemap, robots), and the validation gate. This is the repo you are reading.

**Stage 2 (ongoing): keep adding pages.** For each new blog or landing page:

1. **Scaffold** a post skeleton:
   ```bash
   npm run new:blog -- my-focus-keyword-slug
   ```
   This writes `content/blog/my-focus-keyword-slug.json` with every required
   field stubbed (`status: "draft"`).
2. **Fill the copy** - by hand, via Claude (the `dotday-blog-template` /
   `dotday-page-builder` skills), or by editing the JSON directly.
3. **Add images** to `public/blog/<slug>/` as WebP
   (`hero.webp`, `og.webp`, `pin.webp`, plus any in-body refs). Until they
   exist, the page renders branded placeholders - the build never breaks.
4. **Validate**:
   ```bash
   npm run content:validate
   ```
   This is the gate. It enforces the SEO + content rules (focus keyword
   placement, meta limits, dash ban, internal-link + FAQ requirements, etc.).
   A post that fails is not shippable.
5. **Preview** at `localhost:3000/blog/<slug>` (drafts are visible in dev).
6. **Ship**: commit on a branch -> open a PR -> Vercel builds a **preview
   deploy** -> review -> to go live, set `"status": "published"` and merge to
   `main`.

Drafts (`status: draft` / `in-review`) are excluded from listings + sitemap in
production and render `noindex`, so you can stage work safely on `main` if you
prefer.

---

## Project structure

```
app/
  layout.tsx                     # shared shell: header + footer + font, base metadata
  page.tsx                       # homepage
  blog/page.tsx                  # blog hub (category filter)
  blog/[slug]/page.tsx           # canonical post route (metadata + JSON-LD)
  post/[slug]/page.tsx           # legacy Wix URL preservation (/post/<slug>)
  product-page/[slug]/page.tsx   # product pages (data-driven)
  landscape-fabric-calculator/   # the calculator tool page
  fabric-finder/                 # the product-quiz tool page
  how-to-install-weed-barrier-fabric/  # install guide
  contact-us/ , bulk-pricing/    # lead-capture pages
  api/lead/route.ts              # form submission endpoint (Supabase-ready)
  sitemap.ts , robots.ts , icon.png , not-found.tsx

components/
  site/        SiteHeader · SiteFooter · FontFace · LeadForm
  blog/        BlogLayout · BlogHero · QuickAnswer · BlockRenderer · RelatedArticles
    blocks/    Prose · StatStrip · ComparisonTable · Callout · Steps · ImageBlock · ProductBlock · FAQ
    cta/       InlineCTA · FinalCTA
    ui/        Img · Badge/CTAButton · ReadingProgress · ShareButtons · RichText
  tools/       FabricCalculator · FabricFinder

content/
  blog/        <slug>.json        # one file per post  <-- the drop-in unit
  landing/ , product/             # reserved for future data-driven pages

lib/
  blog/        types · loader · images · jsonld · tokens
  content/     products            # product catalog data
  site.ts                          # origin, nav, footer links

schema/
  blogPost.schema.json             # the frozen data contract (schemaVersion 1.0.0)

scripts/
  validate-post.mjs                # the SEO/content gate (from the brand skill)
  validate-content.mjs             # parses product/landing JSON in the build
  new-blog.mjs                     # scaffolds a new post skeleton

public/
  brand/       logo-neon.png · dd-circle.png · fonts/   # brand assets
  blog/<slug>/ hero.webp · og.webp · ...                # per-post images
styles/
  globals.css                      # the full brand design system (CSS vars + classes)
```

---

## Design system

Tokens live in `lib/blog/tokens.ts` and are mirrored as CSS variables in
`styles/globals.css`. Palette: white-dominant, neon `#D8FF00` accent, soft-neon
`#DFFF6A` panels, minimal charcoal `#101010`. Type is **Wix Madefor Text**
(Apple-light headings: 400-500; CTAs + small labels bold). The visual reference
is the finalized blog template; every component here was ported from it.

**Font:** Wix Madefor Text is **self-hosted and installed** - real WOFF2 files
in `public/brand/fonts/` (weights 400-800), loaded by
`components/site/FontFace.tsx`. No network call at build; identical on Vercel.
Replace the WOFF2 files (same names) to update.

## Images come from Google Drive

Page imagery is sourced from the DOTDAY brand Google Drive, optimized to WebP,
and committed into `/public`. The folder + file IDs are mapped in
`lib/content/drive-images.ts`; the full download -> convert workflow is in
`scripts/fetch-drive-images.md`. Already shipped from Drive: the three product
card images (`public/brand/products/*.webp`) and the seed post's images
(`public/blog/woven-vs-non-woven-landscape-fabric/*.webp`).

When Claude builds a new page it pulls the right images from the matching
product folder (SHIELD/XBAR/TERRA), converts them, and places them under
`public/blog/<slug>/`. Missing images fall back to branded placeholders, so the
build never breaks while imagery is being sourced.

---

## Deploy (GitHub + Vercel)

1. Push this repo to GitHub.
2. In Vercel: **New Project** -> import the repo. Framework preset = Next.js
   (auto-detected). No build overrides needed (`npm run build` already runs the
   validator).
3. Set environment variables (see `.env.example`):
   - `NEXT_PUBLIC_SITE_URL=https://www.thedotday.com`
   - `NEXT_PUBLIC_STORE_URL=https://store.thedotday.com`
   - (later) Supabase vars for lead capture.
4. Point DNS (GoDaddy) for `thedotday.com` at Vercel. Keep `store.thedotday.com`
   on Wix.
5. Every PR gets a preview deploy; merging to `main` ships to production.

---

## Lead capture

`/api/lead` validates and currently **logs** submissions (visible in Vercel
function logs). When ready, wire Supabase in `app/api/lead/route.ts` (the insert
spot is marked) and set the env vars - no front-end changes needed.

---

## Content + SEO rules (enforced by the validator)

- One **focus keyword** per post; must appear in title, slug, an H2, the first
  100 words, an image alt, metaTitle, and metaDescription.
- Meta title <= 60 chars; meta description 50-160 chars.
- 3-6 internal links incl. >=1 product page + the calculator; FAQ block
  required; 2-3 real related posts.
- Mid-article CTA + closing enquiry CTA required.
- **No em/en dashes** anywhere (brand AI-tell); US spelling; no hype/superlative
  banned phrases.
- Hashtags in two places (social excerpt + end of body).
- Comparison posts must include a comparison table.

Run `npm run content:validate` any time; it is also part of `npm run build`.
```
