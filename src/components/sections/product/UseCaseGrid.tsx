/**
 * Auto-extracted from the former components/landing/sections.tsx monolith.
 * One section per file; registered via the SectionRegistry.
 */
import Link from "next/link";
import { Img } from "@/components/primitives/Img";
import { CTAButton } from "@/components/primitives/Badge";
import type {
  UseCaseGridSection,
} from "@/lib/landing/types";

export function UseCaseGrid({ data }: { data: UseCaseGridSection }) {
  // Rich variant: any card carries an image/eyebrow/cta -> render the ucard
  // grid (the "Quick Tips for your installs" treatment). Otherwise fall back to
  // the simple rcard grid the application pages use.
  const isRich = data.cards.some((c) => c.image || c.eyebrow || c.ctaLabel);

  if (isRich) {
    return (
      <section className="wrap section ucase">
        {(data.eyebrow || data.heading || data.intro) && (
          <div className="ucase-head">
            {data.eyebrow && <span className="badge">{data.eyebrow}</span>}
            {data.heading && <h2>{data.heading}</h2>}
            {data.intro && <p>{data.intro}</p>}
          </div>
        )}
        <div className="ucase-grid">
          {data.cards.map((c, i) => (
            <article className="ucard" key={i}>
              {c.image && (
                <Img
                  src={c.image.ref}
                  alt={c.image.alt}
                  ratio="r-43"
                  placeholderLabel={c.eyebrow || c.title}
                />
              )}
              <div className="ucard-body">
                {c.eyebrow && <span className="ucard-eyebrow">{c.eyebrow}</span>}
                {!c.eyebrow && <h3>{c.title}</h3>}
                <p>{c.body}</p>
                {c.href && (
                  <div className="ucard-foot">
                    <CTAButton href={c.href} variant="ghost">
                      {c.ctaLabel || "Learn more"}
                    </CTAButton>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className="wrap sec">
      {data.heading && <h2>{data.heading}</h2>}
      <div className="rgrid" style={{ marginTop: 8 }}>
        {data.cards.map((c, i) => {
          const inner = (
            <div className="pad">
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          );
          return c.href ? (
            <Link className="rcard" href={c.href} key={i}>
              {inner}
            </Link>
          ) : (
            <div className="rcard" key={i}>
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * StatementBand - the oversized-watermark positioning band. Self-contained
 * inline styles (mirrors the original install-page section) so it renders
 * identically regardless of global CSS load order. Driven entirely by the JSON:
 * three watermark words, a charcoal statement, an optional neon-highlighted
 * tail, and an optional olive leaf mark.
 */
