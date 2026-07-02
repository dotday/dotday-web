# DOTDAY Landing/Blog Preview - Fidelity Checklist (MANIFEST)

A preview is only trustworthy if it renders the page the way production does.
Every item below MUST be true before a preview is shown. If any item is skipped,
the preview will "look wrong" in ways that are NOT the section designs' fault
(this is the failure mode that wasted three review cycles). Check them off.

## The render must go through the REAL code (never re-invented)
- [ ] Sections render through the real dispatcher `SectionRenderer.tsx`, over
      `page.sections`, using the real registered components - NOT hand-written
      markup or made-up class names. (If you're writing your own `.hero-grid` /
      `.dual-card` CSS, STOP - that is the bug.)
- [ ] Adapter sections (`productComparison`, `faq`, `cta`, `steps`, `callout`)
      go through their SHARED components (`SharedComparisonTable`, `SharedFAQ`,
      `SharedCTA`, `_core/Steps`, `_core/Callout`) with the exact wrapper divs
      the renderer uses.
- [ ] `src/styles/globals.css` is included WHOLE and unmodified. No inventing or
      overriding tokens/spacing.

## The page FRAME must match app/layout.tsx exactly
- [ ] Order is `<SiteHeader />` -> sections -> `<SiteFooter />` inside `<body>`
      (that is literally what `app/layout.tsx` renders). The header/footer are
      NOT optional - without them the page has no anchor and the spacing "reads
      wrong."
- [ ] No extra `<main>` or wrapper the real layout does not have. The landing
      route renders `SectionRenderer` directly - reproduce that, nothing more.

## Fonts must be the REAL self-hosted files (NOT Google Fonts)
- [ ] The five self-hosted WOFF2 weights from `public/brand/fonts/`
      (`WixMadeforText-{Regular,Medium,SemiBold,Bold,ExtraBold}.woff2`, weights
      400/500/600/700/800) are embedded as `@font-face`, exactly as
      `components/site/FontFace.tsx` emits them.
- [ ] `--font-madefor` is set on `:root` (globals.css `--text` resolves to it).
- [ ] NO `fonts.googleapis.com` link anywhere. (Google Fonts renders different
      metrics/weights - it is a substitute, not the brand font.)
- [ ] There is NO Wix Madefor Display. `--display` was retired; every heading
      uses `--text`. Do not introduce a second family.

## Images: real photography, resolved the real way
- [ ] Section image refs resolve through the real resolver
      (`resolveSectionImages` -> `resolveImageRef`), base dir `landing`
      (`/landing/<slug>/<ref>.webp`), same as blog.
- [ ] For a self-contained proof file, real images are base64-inlined (logo +
      every section photo). A missing file falls back to the component's OWN
      branded placeholder (`imgph`) - never a broken 404, never a made-up box.
- [ ] Images come from the correct product's Drive folder (SHIELD/XBAR/TERRA),
      are EXIF-transposed, cropped to each slot's ratio, saved as WebP.

## Interactivity: the preview must behave, not just look
- [ ] The real components are HYDRATED client-side (ship a browser bundle +
      `hydrateRoot`), so:
      - [ ] FAQ items open/close on click (SharedFAQ is `useState`, not
            `<details>`),
      - [ ] the Fabric Calculator computes (it is a `"use client"` React widget),
      - [ ] header dropdown + mobile toggle work,
      - [ ] `:hover` states work (these are CSS-only and work even without JS).
- [ ] `window.__PAGE__` carries the (image-baked) page data the client renders
      from; the client never touches `fs`.

## The shipped artifact is STILL the JSON
- [ ] The preview is disposable proof. The delivered file is the validated
      `content/landing/<slug>.json` (+ any new `public/landing/<slug>/` images).
- [ ] JSON passes BOTH gates: `node scripts/validate-schema.mjs` (structural,
      Ajv, all slice `$ref`s resolved) AND `node scripts/validate-landing.mjs`
      (rules: approved sections, hero-first, cta + internalLinks present, SEO
      lengths, dash ban, no keyword cannibalization).

## Prefer the checked-in harness over rebuilding
- [ ] If `scripts/preview-page.mjs` exists in the repo, USE IT (`npm run
      preview:landing -- <slug>`). It already does all of the above and tracks
      the components automatically. Only hand-assemble a harness if that script
      is genuinely absent, then port the fixes back into it.
