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
      // Legacy Wix blog path preservation: thedotday.com used /post/<slug>.
      // We serve canonical posts at /blog/<slug> but keep /post/<slug> working.
      // (Handled by the app/post/[slug] route, so no hard redirect is forced here.
      //  Add explicit redirects here later if you decide to consolidate URLs.)
    ];
  },
};

module.exports = nextConfig;
