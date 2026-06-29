/**
 * Auto-extracted from the former components/landing/sections.tsx monolith.
 * One section per file; registered via the SectionRegistry.
 */
import Link from "next/link";
import { Img } from "@/components/primitives/Img";
import { Icon } from "@/components/site/Icon";
import { VideoSection } from "@/components/sections/media/VideoSection";
import { categorySlug } from "@/components/sections/_core/glyphs";
import type {
  EditorialCardsSection,
} from "@/lib/landing/types";

export function EditorialCards({ data }: { data: EditorialCardsSection }) {
  if (!data.cards || data.cards.length === 0) return null;
  return (
    <section className="wrap bsection" aria-label={data.heading || "Editor's picks"}>
      <div className="bsec-head">
        <span className="bsec-kicker">{data.eyebrow || "Hand-picked"}</span>
        <h2 className="bsec-title">{data.heading || "Editor\u2019s picks"}</h2>
      </div>
      <div className="bpick-grid">
        {data.cards.map((c, i) => (
          <article className="bpick" key={i}>
            <Link href={c.href} className="bpick-media">
              <Img
                src={c.image.ref}
                alt={c.image.alt}
                ratio="r-43"
                placeholderLabel={c.category}
                sizes="(max-width: 920px) 100vw, 380px"
              />
              <span className={`kicker kicker--onmedia kicker--${categorySlug(c.category)}`}>
                {c.category}
              </span>
              {c.level && (
                <span className="pill pill--level pill--onmedia pill--right">{c.level}</span>
              )}
            </Link>
            <div className="bpick-body">
              <span className="bpick-author">
                <span className="bpick-avatar" aria-hidden="true">
                  {c.authorMonogram}
                </span>
                <span className="bpick-author-meta">
                  <span className="bpick-author-name">{c.author}</span>
                  {c.readTime && <span className="meta">{c.readTime} read</span>}
                </span>
              </span>
              <Link href={c.href}>
                <h3>{c.title}</h3>
              </Link>
              <p>{c.excerpt}</p>
              <Link href={c.href} className="link-arrow">
                Read article <Icon name="arrowRight" size={14} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/**
 * VideoFeature - reuses the shared hub VideoSection verbatim. Same 5 videos,
 * same "What to watch now" + "Watch more" rail, same click-to-load YouTube
 * facade. Authoring is zero: drop { "_type": "videoFeature" } into a page.
 */
