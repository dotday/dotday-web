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

// How many post cards per page. At 200 posts this yields ~17 pages instead of
// one multi-megabyte page that would tank its own Core Web Vitals.
const PER_PAGE = 12;

export default function BlogIndex({
  searchParams,
}: {
  searchParams: { category?: string; page?: string };
}) {
  const active = searchParams.category || "All Posts";
  const all = getPublicPosts();
  const filtered =
    active === "All Posts" ? all : all.filter((p) => p.category === active);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const rawPage = parseInt(searchParams.page || "1", 10);
  const page = Math.min(Math.max(1, isNaN(rawPage) ? 1 : rawPage), totalPages);
  const posts = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Build a hrefs that preserve the active category across page links.
  const pageHref = (p: number) => {
    const params = new URLSearchParams();
    if (active !== "All Posts") params.set("category", active);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/blog?${qs}` : "/blog";
  };

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
        <>
          <div className="rgrid" style={{ marginTop: 8, marginBottom: 40 }}>
            {posts.map((p) => (
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

          {totalPages > 1 && (
            <nav
              className="pager"
              aria-label="Blog pagination"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                margin: "8px 0 48px",
                flexWrap: "wrap",
              }}
            >
              {page > 1 && (
                <Link className="btn" href={pageHref(page - 1)} style={{ padding: "9px 16px" }}>
                  Previous
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={pageHref(p)}
                  className="btn"
                  aria-current={p === page ? "page" : undefined}
                  style={{
                    padding: "9px 14px",
                    background: p === page ? "var(--neon)" : "transparent",
                    borderColor: p === page ? "var(--neon)" : "var(--grey2)",
                    color: "var(--ink)",
                    minWidth: 40,
                    textAlign: "center",
                  }}
                >
                  {p}
                </Link>
              ))}
              {page < totalPages && (
                <Link className="btn" href={pageHref(page + 1)} style={{ padding: "9px 16px" }}>
                  Next
                </Link>
              )}
            </nav>
          )}
        </>
      )}
    </div>
  );
}
