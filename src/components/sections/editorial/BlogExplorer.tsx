"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Img } from "@/components/primitives/Img";
import { Icon } from "@/components/site/Icon";
import type { HubCard } from "@/lib/blog/hub";

/**
 * BlogExplorer - the interactive "Search + category tabs + sort" surface.
 * Pure client filtering over the cards the server already built (no fetch). The
 * full crawlable archive lives at /blog?category=..., so this is an
 * enhancement, not the only browse path.
 */

type Sort = "Trending" | "Recent" | "Quickest";

const CATEGORY_TABS: { label: string; match: (c: HubCard) => boolean }[] = [
  { label: "All Posts", match: () => true },
  { label: "Installation", match: (c) => c.category === "How-To & Installation" },
  { label: "Comparisons", match: (c) => c.category === "Comparisons" },
  { label: "Buying Guides", match: (c) => c.category === "Buying Guides" },
  { label: "Fabric 101", match: (c) => c.category === "Landscape Fabric" },
  { label: "Product", match: (c) => c.category === "Product Focused" },
];

function categorySlug(category: string) {
  return category.replace(/[^a-z]/gi, "").toLowerCase();
}

export function BlogExplorer({ cards }: { cards: HubCard[] }) {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("All Posts");
  const [sort, setSort] = useState<Sort>("Trending");

  const tabDef = CATEGORY_TABS.find((t) => t.label === tab) || CATEGORY_TABS[0];

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = cards.filter(tabDef.match);
    if (needle) {
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(needle) ||
          c.excerpt.toLowerCase().includes(needle) ||
          c.category.toLowerCase().includes(needle)
      );
    }
    // cards arrive newest-first (that's "Recent"); other sorts reorder a copy.
    if (sort === "Trending") {
      list = [...list].sort((a, b) => b.trendRank - a.trendRank);
    } else if (sort === "Quickest") {
      list = [...list].sort((a, b) => a.readMinutes - b.readMinutes);
    }
    return list;
  }, [cards, q, tabDef, sort]);

  const tabsWithContent = CATEGORY_TABS.filter(
    (t) => t.label === "All Posts" || cards.some(t.match)
  );

  return (
    <section className="wrap bsection bhx" aria-label="Browse all articles">
      <div className="bsec-head">
        <span className="bsec-kicker">The library</span>
        <h2 className="bsec-title">Browse every guide</h2>
      </div>

      <div className="bhx-bar">
        <div className="bhx-search">
          <Icon name="search" size={18} className="bhx-search-ico" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles, guides, and how-tos..."
            aria-label="Search articles"
          />
        </div>
        <div className="bhx-sort" role="tablist" aria-label="Sort articles">
          {(["Trending", "Recent", "Quickest"] as Sort[]).map((s) => (
            <button
              key={s}
              role="tab"
              aria-selected={sort === s}
              className={`bhx-sortbtn${sort === s ? " is-active" : ""}`}
              onClick={() => setSort(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bhx-tabs" role="tablist" aria-label="Filter by topic">
        {tabsWithContent.map((t) => (
          <button
            key={t.label}
            role="tab"
            aria-selected={tab === t.label}
            className={`bhx-tab${tab === t.label ? " is-active" : ""}`}
            onClick={() => setTab(t.label)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <p className="bhx-empty">
          No articles match that search yet. Try a broader term, or{" "}
          <Link className="ilink" href="/fabric-finder">
            use FabricFinder
          </Link>
          .
        </p>
      ) : (
        <div className="bhx-grid">
          {results.map((c) => (
            <Link
              className="bhx-card"
              href={c.href}
              key={c.slug}
              data-category={c.category}
              data-read={c.readMinutes}
              data-trend={c.trendRank}
              data-title={c.title.toLowerCase()}
            >
              <div className="bhx-card-media">
                <Img
                  src={c.img}
                  alt={c.imgAlt}
                  ratio="r-169"
                  placeholderLabel={c.kicker}
                  sizes="(max-width: 640px) 100vw, 300px"
                />
                <span className="pill pill--level pill--onmedia pill--right">
                  {c.level}
                </span>
              </div>
              <div className="bhx-card-body">
                <span className={`kicker kicker--${categorySlug(c.category)}`}>
                  {c.kicker}
                </span>
                <h3>{c.title}</h3>
                <p>{c.excerpt}</p>
                <span className="meta">
                  {c.author} &middot; {c.readTime}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
