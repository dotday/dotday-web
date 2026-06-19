import type { Metadata } from "next";
import Link from "next/link";
import { Badge, CTAButton } from "@/components/blog/ui/Badge";
import { ProductBlock } from "@/components/blog/blocks/ProductBlock";
import { FinalCTA } from "@/components/blog/cta/FinalCTA";
import { getPublicPosts } from "@/lib/blog/loader";
import { resolveImage } from "@/lib/blog/images";
import { Img } from "@/components/blog/ui/Img";

export const metadata: Metadata = {
  title: "Landscape Fabric Built for the Job",
  description:
    "DOTDAY makes professional landscape fabric: SHIELD weed barrier, XBAR hardscape fabric, and TERRA geotextile. Use the right fabric for the right ground condition.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const latest = getPublicPosts().slice(0, 3);
  return (
    <>
      {/* Hero */}
      <header className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <Badge>Professional landscape fabric</Badge>
              <h1>Use the right fabric for the right ground condition.</h1>
              <p className="excerpt">
                Weed barrier, hardscape fabric, and geotextile are not
                interchangeable. DOTDAY makes three fabrics built for three jobs,
                so your install holds up.
              </p>
              <div className="final-btns" style={{ justifyContent: "flex-start" }}>
                <CTAButton href="/fabric-finder" variant="primary">
                  Find Your Fabric
                </CTAButton>
                <CTAButton href="/landscape-fabric-calculator" variant="ghost">
                  Use the Fabric Calculator
                </CTAButton>
              </div>
            </div>
            <Img
              src="/brand/hero.webp"
              alt="DOTDAY landscape fabric installed on site"
              ratio="r-54"
              priority
              placeholderLabel="DOTDAY landscape fabric in use"
            />
          </div>
        </div>
      </header>

      {/* Three-fabric system */}
      <div className="wrap">
        <ProductBlock />
      </div>

      {/* Latest from the blog */}
      {latest.length > 0 && (
        <section className="wrap section">
          <div className="related-head">
            <h2>From the blog</h2>
            <p>Guides on picking and installing the right fabric.</p>
          </div>
          <div className="rgrid">
            {latest.map((p) => (
              <Link className="rcard" href={`/post/${p.slug}`} key={p.slug}>
                <Img
                  src={resolveImage(p, p.hero.image.ref)}
                  alt={p.hero.image.alt}
                  ratio="r-169"
                  placeholderLabel={p.category}
                />
                <div className="pad">
                  <span className="badge">{p.category}</span>
                  <h3>{p.title}</h3>
                  <span className="rtime">
                    {p.readTimeMinutes ? `${p.readTimeMinutes} min read` : "Read article"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <FinalCTA />
    </>
  );
}
