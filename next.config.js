/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Blog images live in-repo under /public/blog/<slug>/ and are served by next/image.
  // No remote patterns needed for first launch (all assets are local).
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Posts are canonical at /post/<slug> (the original Wix structure that
      // carries the SEO equity). Any old /blog/<slug> link 301-redirects here.
      // Done at the config level so /blog/<slug> is NOT built as a route at all.
      // The /blog hub listing page (app/blog/page.tsx) is unaffected - only the
      // per-post /blog/<slug> pattern redirects.
      {
        source: "/blog/:slug",
        destination: "/post/:slug",
        permanent: true,
      },
      // The QR Zone owner's hub is canonical at the root /my-qrzone (the original
      // Wix path that carries its equity), served by app/my-qrzone/page.tsx. The
      // /l/my-qrzone twin that the landing engine would otherwise expose
      // 301-redirects here so there is exactly one canonical URL for the page.
      {
        source: "/l/my-qrzone",
        destination: "/my-qrzone",
        permanent: true,
      },
      // The install guide is canonical at the root /how-to-install-weed-barrier-fabric
      // (served by app/how-to-install-weed-barrier-fabric/page.tsx, bound to the
      // same JSON the landing engine uses). Redirect the /l/<slug> twin so there
      // is one canonical URL, exactly as with /my-qrzone.
      {
        source: "/l/how-to-install-weed-barrier-fabric",
        destination: "/how-to-install-weed-barrier-fabric",
        permanent: true,
      },
      // The holiday-garden post originally shipped with a non-ASCII slug
      // (".../holiday-garden-décor-...") which percent-encodes awkwardly and
      // caused Unicode-normalization issues. Its slug is now ASCII ("decor").
      // Redirect the old encoded URL so the original link keeps its SEO equity.
      {
        source: "/post/holiday-garden-d%C3%A9cor-ideas-natural-easy-beautiful",
        destination: "/post/holiday-garden-decor-ideas-natural-easy-beautiful",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
