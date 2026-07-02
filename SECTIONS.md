# DOTDAY Section Catalog

**GENERATED FILE - do not edit.** Regenerate with `npm run content:catalog`.
Derived from the registry seed, SectionRenderer, validate-landing APPROVED set,
the LandingSection union, the landing doc schema, and co-located section schemas.
"Use when" notes come from `scripts/catalog-meta.json`.

Sections: **38** (33 registry, 5 adapted) | Landing-approved: **37** | Blog blocks: **9**

## Page sections (landing / home / profile)

| Type | Component | Family | Render path | Surfaces | Landing OK | Union | Doc schema | Schema-first | Use when |
|---|---|---|---|---|---|---|---|---|---|
| `applicationGallery` | ApplicationGallery | product | registry | home, landing | yes | no | yes | yes | Application photo cards with labels. Use to show breadth of where a fabric works. |
| `bigTypeFeatures` | BigTypeFeatures | narrative | registry | home, landing | yes | yes | yes | no | Large-type feature list. Use when 3-4 product properties deserve headline treatment instead of a table. |
| `calculatorEmbed` | CalculatorEmbed | conversion | registry | landing | yes | yes | yes | no | Embeds the Fabric Calculator. Use on pages where the next step is sizing a job. |
| `callout` | (renderer switch) | _core (adapted) | adapted | landing | yes | yes | yes | no | Emphasized note or warning box. Use sparingly for the one thing readers must not miss. |
| `cta` | (renderer switch) | _core (adapted) | adapted | landing | yes | yes | yes | no | Closing call to action with approved labels only. Every landing page ends with one. |
| `dualBenefit` | DualBenefit | narrative | registry | landing | yes | yes | yes | yes | Two side-by-side benefit panels. Use when exactly two outcomes matter, e.g. weed control plus water flow. |
| `editorialCards` | EditorialCards | media | registry | landing | yes | yes | yes | no | Cards linking to blog guides. Use to route landing traffic into the content hub. |
| `fabricMatrix` | CompareTable | product | registry | home, landing | yes | no | yes | yes | Full three-fabric comparison matrix. Use when the whole line needs comparing, not just two products. |
| `faq` | (renderer switch) | _core (adapted) | adapted | landing | yes | yes | yes | no | 2-6 question accordion. Use on every landing page; feeds FAQPage JSON-LD. |
| `featuredGuide` | FeaturedGuide | media | registry | landing | yes | yes | yes | yes | One highlighted guide with cover art. Use when a single guide is the natural next read. |
| `groundConditionCards` | UseCases | product | registry | home, landing | yes | no | yes | yes | The three-product chooser by ground condition. Use when the page must explain SHIELD vs XBAR vs TERRA selection. |
| `hero` | LandingHero | heroes | registry | landing, profile | yes | yes | yes | no | Landing page opener. One H1 per page lives here. Use on every landing and profile page. |
| `homeStatStrip` | HomeStatStrip | proof | registry | home, landing, profile | yes | no | yes | yes | Row of proof numbers. Use to compress credibility into one line, e.g. jobs covered, states shipped. |
| `homeVideoFeature` | HomeVideoFeature | media | registry | home, landing | yes | no | yes | yes | Home-style video feature variant. Use on home-like layouts; prefer videoFeature elsewhere. |
| `instagramFeed` | InstagramFeed (isAction) | media | registry | home | no | no | no | no | Live Instagram embed, third-party script (isAction). Home only; confirm before any new surface. |
| `installShowcase` | InstallShowcase | media | registry | home, landing | yes | no | yes | yes | Installation walkthrough with imagery. Use when showing the install builds buying confidence. |
| `internalLinks` | InternalLinks | conversion | registry | landing, blog, profile | yes | yes | yes | no | Related links block. Use near the page end to route to products, tools, and guides. |
| `jobGallery` | JobGallery | proof | registry | home, landing | yes | no | yes | yes | Photo gallery of installs. Use when images carry the proof and captions can stay short. |
| `leadFormSplit` | LeadFormSplit | conversion | registry | landing | yes | yes | yes | yes | Light-grey lead capture band: centered eyebrow + heading over the shared LeadForm split (rail + trust badges + form card). Copy props flow to LeadForm; logic stays in the form. |
| `problem` | Problem | narrative | registry | landing | yes | yes | yes | no | Names the ground-condition problem before selling anything. Use early on application pages, right after the hero. |
| `productChooser` | ProductChooser | product | registry | landing | yes | yes | yes | yes | Post-purchase roll identification cards (Which DOTDAY fabric do you have?): square product photo, neon tag, title, body, product-page link per card. |
| `productComparison` | (renderer switch) | _core (adapted) | adapted | landing | yes | yes | yes | no | Two or three products compared on shared attributes. Use on comparison and vs pages. |
| `projectSpotlight` | ProjectSpotlight | proof | registry | landing, profile | yes | yes | yes | no | One real job told as a story. Use on application and profile pages with strong photos. |
| `qrHero` | QrHero | heroes | registry | landing | yes | yes | yes | yes | Dark scan-themed QR activation hero: animated grid, neon scan beam, reticles, pulsing tag, two-line uppercase H1, up to two CTAs. Post-purchase hub pages. |
| `quoteBand` | QuoteBand | proof | registry | home, landing | yes | no | yes | yes | Single large customer quote on a band. Use for one standout quote, max once per page. |
| `realJobs` | RealJobs | proof | registry | home, landing | yes | no | yes | yes | Grid of real installation jobs. Use when several jobs prove the application at a glance. |
| `reviews` | Reviews | proof | registry | landing | yes | yes | yes | no | Customer review cards. Use as social proof after the product case is made. |
| `sizeSelector` | SizeSelector | product | registry | landing | yes | yes | yes | yes | Roll size and coverage picker. Use near the end of product pages, before the CTA. |
| `solution` | Solution | narrative | registry | landing | yes | yes | yes | no | Answers the problem block with the fabric match. Always pair after problem. |
| `specSheet` | SpecSheet | product | registry | landing | yes | yes | yes | yes | Technical spec table for one product. Use on product-focused pages for contractors who buy on numbers. |
| `splitHero` | HomeHero | heroes | registry | home, landing | yes | no | yes | yes | Home-style split hero with image and product framing. Use when the page opens on a visual product story instead of a plain headline. |
| `statementBand` | StatementBand | narrative | registry | landing | yes | yes | yes | no | One short bold claim on a full-width band. Use as a breather between dense sections, max once per page. |
| `steps` | (renderer switch) | _core (adapted) | adapted | landing | yes | yes | yes | no | Numbered how-to steps. Use for install or prep sequences of 3-7 steps. |
| `testimonials` | Testimonials | proof | registry | home, landing, profile | yes | no | yes | yes | Quote-led testimonials. Use when the proof is a person's words rather than a star rating. |
| `toolsBand` | ToolsBand | conversion | registry | home, landing | yes | no | yes | yes | Band promoting the site tools: Calculator, Finder Quiz, Comparison Engine. Use once, mid or late page. |
| `useCaseGrid` | UseCaseGrid | product | registry | landing | yes | yes | yes | no | Grid of applications a fabric serves. Use to route readers to their own use case. |
| `videoFeature` | VideoFeature | media | registry | home, landing | yes | yes | yes | no | Single video with supporting copy. Use when footage explains the fabric better than stills. |
| `videoPlaylist` | VideoPlaylist | media | registry | landing | yes | yes | yes | yes | Featured video player + Watch-more selector rail with in-box click-to-load playback (YouTube nocookie or self-hosted MP4). Data-driven multi-video counterpart to videoFeature. |

## Blog body blocks

| Type | Use when |
|---|---|
| `comparisonTable` | Compact comparison table. Use for weight, product, or method comparisons inside a post. |
| `cta` | Inline call to action, approved labels only. Every post ends with one. |
| `image` | Inline image with required alt and optional caption. Source from DOTDAY Drive assets. |
| `proTip` | Highlighted practical tip. Use once or twice per post, never stacked. |
| `prose` | Body copy with optional H2 heading. The default block; posts open with it. |
| `statStrip` | Row of numeric proof points inside a post. |
| `steps` | Numbered instructions inside a post. Use for install and how-to sequences. |
| `trustStrip` | Compact credibility strip. Use in buying guides where trust needs an early anchor. |
| `warning` | Caution block for mistakes that cost money or a redo. Use only when a real failure mode exists. |

The blog envelope (hero, quickAnswer, faq, relatedPosts, internalLinks,
closingHashtags) is enforced by `schema/blogPost.schema.json` + `validate-post.mjs`;
only the body block sequence varies per post.

## Drift report

**25 finding(s):**

- `applicationGallery` is landing-approved but absent from the LandingSection union (src/lib/landing/types.ts) - content using it is untyped at the renderer boundary.
- `bigTypeFeatures` (BigTypeFeatures) has no co-located *.schema.json - pending schema-first migration.
- `calculatorEmbed` (CalculatorEmbed) has no co-located *.schema.json - pending schema-first migration.
- `editorialCards` (EditorialCards) has no co-located *.schema.json - pending schema-first migration.
- `fabricMatrix` is landing-approved but absent from the LandingSection union (src/lib/landing/types.ts) - content using it is untyped at the renderer boundary.
- `groundConditionCards` is landing-approved but absent from the LandingSection union (src/lib/landing/types.ts) - content using it is untyped at the renderer boundary.
- `hero` (LandingHero) has no co-located *.schema.json - pending schema-first migration.
- `homeStatStrip` is landing-approved but absent from the LandingSection union (src/lib/landing/types.ts) - content using it is untyped at the renderer boundary.
- `homeVideoFeature` is landing-approved but absent from the LandingSection union (src/lib/landing/types.ts) - content using it is untyped at the renderer boundary.
- `instagramFeed` (InstagramFeed) has no co-located *.schema.json - pending schema-first migration.
- `installShowcase` is landing-approved but absent from the LandingSection union (src/lib/landing/types.ts) - content using it is untyped at the renderer boundary.
- `internalLinks` (InternalLinks) has no co-located *.schema.json - pending schema-first migration.
- `jobGallery` is landing-approved but absent from the LandingSection union (src/lib/landing/types.ts) - content using it is untyped at the renderer boundary.
- `problem` (Problem) has no co-located *.schema.json - pending schema-first migration.
- `projectSpotlight` (ProjectSpotlight) has no co-located *.schema.json - pending schema-first migration.
- `quoteBand` is landing-approved but absent from the LandingSection union (src/lib/landing/types.ts) - content using it is untyped at the renderer boundary.
- `realJobs` is landing-approved but absent from the LandingSection union (src/lib/landing/types.ts) - content using it is untyped at the renderer boundary.
- `reviews` (Reviews) has no co-located *.schema.json - pending schema-first migration.
- `solution` (Solution) has no co-located *.schema.json - pending schema-first migration.
- `splitHero` is landing-approved but absent from the LandingSection union (src/lib/landing/types.ts) - content using it is untyped at the renderer boundary.
- `statementBand` (StatementBand) has no co-located *.schema.json - pending schema-first migration.
- `testimonials` is landing-approved but absent from the LandingSection union (src/lib/landing/types.ts) - content using it is untyped at the renderer boundary.
- `toolsBand` is landing-approved but absent from the LandingSection union (src/lib/landing/types.ts) - content using it is untyped at the renderer boundary.
- `useCaseGrid` (UseCaseGrid) has no co-located *.schema.json - pending schema-first migration.
- `videoFeature` (VideoFeature) has no co-located *.schema.json - pending schema-first migration.
