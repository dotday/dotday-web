import type { Metadata } from "next";
import Link from "next/link";
import { getPublicPosts } from "@/lib/blog/loader";
import { resolveImage } from "@/lib/blog/images";
import { Img } from "@/components/blog/ui/Img";
import { Badge } from "@/components/blog/ui/Badge";

const CATEGORIES = [
  "All Posts",
  "Buying Guides",
  "Comparisons",
  "How-To & Installation",
  "Product Focused",
  "Landscape Fabric",
] as const;

export const metadata: Metadata = {
  title: "Landscape Fabric Blog",
  description:
    "Guides, comparisons, and how-tos on choosing and installing the right landscape fabric: weed barrier, hardscape fabric, and geotextile.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const active = searchParams.category || "All Posts";
  const all = getPublicPosts();
  const posts =
    active === "All Posts" ? all : all.filter((p) => p.category === active);

  return (
    <div className="wrap page">
      <Badge>Blog</Badge>
      <h1 style={{ marginTop: 14 }}>Landscape fabric guides</h1>
      <p className="lead">
        Pick the right fabric for the job, then install it so it lasts. Buying
        guides, head-to-head comparisons, and field-tested how-tos.
      </p>

      <div
        className="section"
        style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
      >
        {CATEGORIES.map((c) => {
          const isActive = c === active;
          const href = c === "All Posts" ? "/blog" : `/blog?category=${encodeURIComponent(c)}`;
          return (
            <Link
              key={c}
              href={href}
              className="btn"
              style={{
                background: isActive ? "var(--neon)" : "transparent",
                borderColor: isActive ? "var(--neon)" : "var(--grey2)",
                color: "var(--ink)",
                padding: "9px 16px",
              }}
            >
              {c}
            </Link>
          );
        })}
      </div>

      {posts.length === 0 ? (
        <p className="form-note">No posts in this category yet.</p>
      ) : (
        <div className="rgrid" style={{ marginTop: 8, marginBottom: 40 }}>
          {posts.map((p) => (
            <Link className="rcard" href={`/blog/${p.slug}`} key={p.slug}>
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
      )}
    </div>
  );
}
