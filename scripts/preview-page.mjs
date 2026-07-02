#!/usr/bin/env node
/**
 * preview-page.mjs - full-fidelity, self-contained HTML proof of a landing (or
 * blog) page, rendered through the REAL components + globals.css + self-hosted
 * fonts, with client hydration so the FAQ, calculator, header dropdown, and
 * hovers actually work in the browser.
 *
 *   node scripts/preview-page.mjs landing <slug>     # content/landing/<slug>.json
 *   node scripts/preview-page.mjs blog <slug>        # content/blog/<slug>.json  (if wired)
 *
 * Output: preview/<slug>-PREVIEW.html  (open it in any browser; nothing external)
 *
 * WHY THIS EXISTS (read PREVIEW-CHECKLIST.md): hand-assembling a preview each
 * time kept missing a layer (real components, self-hosted fonts, the header/
 * footer frame, real images, interactivity) and the page "looked wrong" for
 * reasons that were never the section designs. This script bakes in every item
 * on that checklist and, because it imports the repo's own components, it tracks
 * them automatically - redesign a section and the preview updates for free.
 *
 * It needs esbuild + react + react-dom as devDependencies (already used elsewhere).
 * No network, no headless browser.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join, resolve, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import esbuild from "esbuild";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SRC = join(ROOT, "src");
const PUBLIC = join(ROOT, "public");
const TMP = join(ROOT, ".preview-tmp");
const OUTDIR = join(ROOT, "preview");

const surface = process.argv[2] || "landing";
const slug = process.argv[3];
if (!slug) {
  console.error("usage: node scripts/preview-page.mjs <landing|blog> <slug>");
  process.exit(1);
}
const contentPath = join(ROOT, "content", surface, `${slug}.json`);
if (!existsSync(contentPath)) {
  console.error(`not found: ${contentPath}`);
  process.exit(1);
}
mkdirSync(TMP, { recursive: true });
mkdirSync(OUTDIR, { recursive: true });

/* ---------- helpers baked into the temp entries ---------- */

const MIME = { ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".svg": "image/svg+xml", ".woff2": "font/woff2" };

function dataUri(absPath) {
  const ext = extname(absPath).toLowerCase();
  const b64 = readFileSync(absPath).toString("base64");
  return `data:${MIME[ext] || "application/octet-stream"};base64,${b64}`;
}

/* ---------- shims (written to TMP so aliasing is simple) ---------- */

const logoPath = join(PUBLIC, "brand", "logo-neon.png");
const logoUri = existsSync(logoPath) ? dataUri(logoPath) : "";

const shims = {
  "next-link.js": `import React from "react";
export default function Link({href,children,...r}){return React.createElement("a",{href,...r},children);}`,
  "next-script.js": `export default function Script(){return null;}`,
  "server-only.js": `export default {};`,
  "path-browser.js": `export function join(...p){return p.join("/").replace(/\\/+/g,"/");}export default {join};`,
  "fs-browser.js": `export function existsSync(){return false;}export default {existsSync};`,
  // SERVER next/image: inline logo + any /public image from disk as a data URI.
  "next-image-server.js": `import React from "react";import fs from "node:fs";import path from "node:path";
const MIME=${JSON.stringify(MIME)};const PUBLIC=${JSON.stringify(PUBLIC)};const LOGO=${JSON.stringify(logoUri)};const cache=new Map();
function inline(src){if(!src||typeof src!=="string")return src;if(src.startsWith("data:"))return src;if(cache.has(src))return cache.get(src);
 let out=src;if(src.includes("/brand/logo-neon.png")&&LOGO){out=LOGO;}else{const p=path.join(PUBLIC,src.replace(/^\\//,""));try{if(fs.existsSync(p)){const e=path.extname(p).toLowerCase();out="data:"+(MIME[e]||"application/octet-stream")+";base64,"+fs.readFileSync(p).toString("base64");}}catch{}}
 cache.set(src,out);return out;}
export default function Image({src,alt,fill,priority,sizes,style,...r}){const s=fill?{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",...(style||{})}:style;return React.createElement("img",{src:inline(src),alt,style:s,...r});}`,
  // BROWSER next/image: images are pre-baked as data URIs in window.__PAGE__.
  "next-image-browser.js": `import React from "react";
export default function Image({src,alt,fill,priority,sizes,style,...r}){let real=src;if(typeof src==="string"&&src.includes("/brand/logo-neon.png")&&typeof window!=="undefined"&&window.__LOGO__)real=window.__LOGO__;const s=fill?{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",...(style||{})}:style;return React.createElement("img",{src:real,alt,style:s,...r});}`,
};
for (const [name, body] of Object.entries(shims)) writeFileSync(join(TMP, name), body);

/* ---------- server + client entries ---------- */

const dispatcher = surface === "blog"
  ? { imp: `import { BlockRenderer as Renderer } from "@/components/blog/BlockRenderer";`, call: `React.createElement(Renderer,{ blocks: baked.sections || baked.blocks, page: baked })` }
  : { imp: `import { SectionRenderer as Renderer } from "@/components/renderers/SectionRenderer";`, call: `React.createElement(Renderer,{ sections: baked.sections, page: { slug: baked.slug, images: {} } })` };

const serverEntry = `
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
${dispatcher.imp}
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const ROOT = ${JSON.stringify(ROOT)};
const PUBLIC = ${JSON.stringify(PUBLIC)};
const page = JSON.parse(readFileSync(${JSON.stringify(contentPath)}, "utf8"));

// Pre-bake every image ref to a data URI so server AND hydrated client show real
// photos (client can't touch fs). Resolver convention: /<surface>/<slug>/<ref>.webp
const MIME = ${JSON.stringify(MIME)};
function tryUri(p){ try { const e=p.slice(p.lastIndexOf(".")).toLowerCase(); return "data:"+(MIME[e]||"application/octet-stream")+";base64,"+readFileSync(p).toString("base64"); } catch { return undefined; } }
function refToUri(ref){
  const mapped = page.images && page.images[ref];
  if (typeof mapped === "string" && mapped.startsWith("/")) { const u=tryUri(join(PUBLIC, mapped.replace(/^\\//,""))); if(u)return u; }
  const clean = String(ref).replace(/\\.(webp|png|jpe?g|gif|avif)$/i,"");
  const u = tryUri(join(PUBLIC, ${JSON.stringify(surface)}, page.slug, clean+".webp"));
  return u; // undefined -> component shows its own branded placeholder
}
function bake(node){
  if (Array.isArray(node)) return node.map(bake);
  if (node && typeof node === "object") {
    if (typeof node.ref==="string" && typeof node.alt==="string") { const u=refToUri(node.ref); return u?{...node,ref:u}:node; }
    const o={}; for (const [k,v] of Object.entries(node)) o[k]=bake(v); return o;
  }
  return node;
}
const baked = { ...page, sections: bake(page.sections || page.blocks) };

const body = renderToStaticMarkup(
  React.createElement(React.Fragment, null,
    React.createElement(SiteHeader),
    ${dispatcher.call},
    React.createElement(SiteFooter)
  )
);

// Real self-hosted fonts (FontFace.tsx equivalent), inlined.
const FW = [["WixMadeforText-Regular.woff2",400],["WixMadeforText-Medium.woff2",500],["WixMadeforText-SemiBold.woff2",600],["WixMadeforText-Bold.woff2",700],["WixMadeforText-ExtraBold.woff2",800]];
let fontFaces = "";
for (const [file,w] of FW) { try { const b64=readFileSync(join(PUBLIC,"brand","fonts",file)).toString("base64"); fontFaces += "@font-face{font-family:'Wix Madefor Text';font-style:normal;font-weight:"+w+";font-display:swap;src:url(data:font/woff2;base64,"+b64+") format('woff2');}\\n"; } catch {} }
const css = readFileSync(join(ROOT,"src","styles","globals.css"),"utf8");
const clientBundle = readFileSync(join(${JSON.stringify(TMP)},"client-bundle.js"),"utf8");
const LOGO = ${JSON.stringify(logoUri)};

const html = \`<!DOCTYPE html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>\${page.seo?.metaTitle || page.title}</title>
<meta name="description" content="\${page.seo?.metaDescription || ""}">
<style>\${fontFaces}:root{--font-madefor:'Wix Madefor Text',system-ui,sans-serif;}</style>
<style>:root{color-scheme:light}*{box-sizing:border-box}html,body{margin:0;padding:0}body{background:#fff}\${css}</style>
</head><body>
<div style="background:#101010;color:#cfcfcf;font-size:12.5px;padding:12px 24px;text-align:center;font-family:'Wix Madefor Text',sans-serif"><b style="color:#d8ff00">PREVIEW</b> · real SiteHeader + section components + SiteFooter, real globals.css, self-hosted Wix Madefor Text, real images, hydrated (FAQ/calculator/hovers live). Shipped artifact is the validated JSON.</div>
<div id="app">\${body}</div>
<script>window.__PAGE__=\${JSON.stringify(baked)};window.__LOGO__=\${JSON.stringify(LOGO)};</script>
<script>\${clientBundle}</script>
</body></html>\`;

writeFileSync(${JSON.stringify(join(OUTDIR, `${slug}-PREVIEW.html`))}, html);
console.log("wrote", ${JSON.stringify(join("preview", `${slug}-PREVIEW.html`))}, Math.round(html.length/1024/1024*10)/10, "MB");
`;

const clientEntry = `
import React from "react";
import { hydrateRoot } from "react-dom/client";
${dispatcher.imp}
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
const baked = window.__PAGE__;
function App(){ return React.createElement(React.Fragment,null,
  React.createElement(SiteHeader),
  ${dispatcher.call},
  React.createElement(SiteFooter)); }
const m = document.getElementById("app");
if (m) hydrateRoot(m, React.createElement(App));
`;

writeFileSync(join(TMP, "server-entry.jsx"), serverEntry);
writeFileSync(join(TMP, "client-entry.jsx"), clientEntry);

/* ---------- alias plugin: @/ -> repo src, next/* + node builtins -> shims ---------- */

function alias(browser) {
  return {
    name: "alias",
    setup(b) {
      b.onResolve({ filter: /^@\// }, (a) => {
        const rel = a.path.slice(2);
        for (const c of [`${rel}.tsx`, `${rel}.ts`, `${rel}/index.tsx`, `${rel}/index.ts`].map((p) => join(SRC, p)))
          if (existsSync(c)) return { path: c };
        return { path: join(SRC, rel) };
      });
      b.onResolve({ filter: /^next\/link$/ }, () => ({ path: join(TMP, "next-link.js") }));
      b.onResolve({ filter: /^next\/script$/ }, () => ({ path: join(TMP, "next-script.js") }));
      b.onResolve({ filter: /^server-only$/ }, () => ({ path: join(TMP, "server-only.js") }));
      b.onResolve({ filter: /^next\/image$/ }, () => ({ path: join(TMP, browser ? "next-image-browser.js" : "next-image-server.js") }));
      if (browser) {
        b.onResolve({ filter: /^node:fs$/ }, () => ({ path: join(TMP, "fs-browser.js") }));
        b.onResolve({ filter: /^node:path$/ }, () => ({ path: join(TMP, "path-browser.js") }));
      }
    },
  };
}

const common = { bundle: true, jsx: "automatic", loader: { ".ts": "tsx", ".tsx": "tsx", ".js": "jsx" }, logLevel: "warning" };

async function main() {
  await esbuild.build({
    ...common,
    entryPoints: [join(TMP, "client-entry.jsx")],
    platform: "browser",
    format: "iife",
    outfile: join(TMP, "client-bundle.js"),
    define: { "process.env.NODE_ENV": '"production"' },
    plugins: [alias(true)],
  });
  await esbuild.build({
    ...common,
    entryPoints: [join(TMP, "server-entry.jsx")],
    platform: "node",
    format: "cjs",
    outfile: join(TMP, "server-out.cjs"),
    plugins: [alias(false)],
  });
  await import(join(TMP, "server-out.cjs"));
}
main().catch((e) => { console.error("preview build failed:", e.message || e); process.exit(1); });
