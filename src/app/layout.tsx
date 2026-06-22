import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FontFace } from "@/components/site/FontFace";
import { SITE_URL, site } from "@/lib/site";
import { tokens } from "@/lib/blog/tokens";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.shortName}`,
  },
  description:
    "Professional-grade landscape fabric: SHIELD weed barrier, XBAR hardscape fabric, and TERRA geotextile. Use the right fabric for the right ground condition.",
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: tokens.color.neon,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <FontFace />
      </head>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
