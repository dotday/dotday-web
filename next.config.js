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
    ];
  },
};

module.exports = nextConfig;
