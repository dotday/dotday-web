# DOTDAY Preview Harness

A checked-in, repo-native way to see a landing (or blog) page **exactly as
production renders it** - real `SiteHeader` + section components + `SiteFooter`,
the real `src/styles/globals.css`, the self-hosted Wix Madefor Text WOFF2s, real
images, and **client hydration** so the FAQ opens, the Fabric Calculator
computes, the header dropdown/mobile toggle work, and `:hover` states behave.
Output is a single self-contained HTML file - no dev server, no network, no
headless browser.

## Why this exists

Hand-assembling a preview each session kept missing a layer (real components ->
self-hosted fonts -> the header/footer frame -> real images -> interactivity),
and the page "looked wrong" for reasons that were never the section designs.
This script bakes in every item in `PREVIEW-CHECKLIST.md`. Because it imports the
repo's OWN components, it tracks them automatically: redesign a section and the
preview updates for free. **Never hand-write preview CSS/markup again - run this.**

## Install (one time)

1. Drop `scripts/preview-page.mjs` into the repo (it lives under `scripts/`).
2. Ensure devDeps exist (already used elsewhere in the repo):
   `esbuild`, `react`, `react-dom`.
3. Add the npm scripts:

```jsonc
// package.json -> "scripts"
"preview:landing": "node scripts/preview-page.mjs landing",
"preview:blog":    "node scripts/preview-page.mjs blog"
```

## Use

```bash
npm run preview:landing -- landscape-fabric-for-nurseries
# -> preview/landscape-fabric-for-nurseries-PREVIEW.html   (open in any browser)
```

or directly:

```bash
node scripts/preview-page.mjs landing <slug>
node scripts/preview-page.mjs blog <slug>     # if the blog BlockRenderer is wired
```

## What it does (and where each checklist item is handled)

- **Real dispatcher + components:** imports `@/components/renderers/SectionRenderer`
  (landing) and the real section components; adapter sections (`faq`, `cta`,
  `steps`, `productComparison`) go through their shared components. `@/` resolves
  to the repo's actual `src/`.
- **Real frame:** renders `<SiteHeader/>` -> sections -> `<SiteFooter/>`, mirroring
  `app/layout.tsx`.
- **Self-hosted fonts, not Google:** inlines the five `public/brand/fonts/
  WixMadeforText-*.woff2` weights as `@font-face` and sets `--font-madefor` -
  exactly what `components/site/FontFace.tsx` emits. No `fonts.googleapis.com`.
- **Real images, resolved the real way:** bakes each image `ref` to a base64
  data URI using the `/<surface>/<slug>/<ref>.webp` convention (or an absolute
  `/public` path from the page `images` map). A missing file falls back to the
  component's OWN branded placeholder - never a 404, never an invented box.
- **Interactivity via hydration:** builds a browser bundle of the same tree and
  `hydrateRoot`s it into the SSR HTML, with the (image-baked) page data in
  `window.__PAGE__`. The client never touches `fs` (stubbed for the browser
  build).

## Notes / limits

- The output embeds fonts, images, and a React bundle, so files are a few MB.
  That is expected for a self-contained proof.
- It renders **initial** client state (e.g. FAQ first item open), then hydration
  makes it interactive on open.
- The shipped artifact is still the validated JSON
  (`content/<surface>/<slug>.json`) - the preview is disposable proof. Keep the
  two validators green: `node scripts/validate-schema.mjs` and
  `node scripts/validate-landing.mjs`.
- Blog support assumes a `@/components/blog/BlockRenderer` with a `{ blocks }`
  prop. If the blog renderer differs, adjust the `dispatcher` block at the top of
  the script (one place).
- The script writes scratch files to `.preview-tmp/` and output to `preview/`.
  Add both to `.gitignore`.
