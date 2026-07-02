/**
 * Reviews - customer-proof section with four layouts, chosen by `variant`:
 *   - "grid"      (default): the rcard grid. Bigger neon stars + bolder author.
 *   - "cards"     : the Testimonials card look (avatar / initials, product tag).
 *   - "spotlight" : one featured review beside a project photo (caption overlay).
 *   - "centered"  : one featured review, centered, no photo.
 * grid/cards render every item; spotlight/centered feature the first item only.
 */
import { Img } from "@/components/primitives/Img";
import { CTAButton } from "@/components/primitives/Badge";
import type { ReviewSection } from "@/lib/landing/types";

/** Five neon stars at a given pixel size. Reused across every variant. */
function Stars({ size = 22, gap = 3 }: { size?: number; gap?: number }) {
  return (
    <div className="rev-stars" style={{ gap }} aria-label="5 out of 5">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 18.6 5.9 21l1.4-6.8L2.2 9.6l6.9-.7z" />
        </svg>
      ))}
    </div>
  );
}

/** First letters of the first two name words, e.g. "Trevor M." -> "TM". */
function deriveInitials(name: string): string {
  const parts = name.replace(/,/g, "").split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return (parts[0] || "?").slice(0, 2).toUpperCase();
}

function Avatar({ src, name, monogram }: { src?: string; name: string; monogram?: string }) {
  if (src) {
    return <img className="tcard-avatar" src={src} alt={`${name} headshot`} width={48} height={48} loading="lazy" />;
  }
  return <div className="tcard-mono" aria-hidden="true">{monogram || deriveInitials(name)}</div>;
}

export function Reviews({ data }: { data: ReviewSection }) {
  const variant = data.variant || "grid";
  const heading = data.heading || "What pros say";
  const featured = data.items[0];

  // --- spotlight: featured review + project photo ---
  if (variant === "spotlight" && featured) {
    return (
      <div className="wrap sec">
        {data.heading && <h2 style={{ marginBottom: 24 }}>{heading}</h2>}
        <div className="rev-spot">
          <div className="rev-spot-media">
            <Img src={data.image?.ref} alt={data.image?.alt || featured.quote} ratio="r-54" placeholderLabel={data.caption || featured.product} />
            {data.caption && <span className="rev-spot-cap">{data.caption}</span>}
          </div>
          <div className="rev-spot-body">
            <Stars size={26} gap={5} />
            <blockquote className="rev-spot-quote">{featured.quote}</blockquote>
            <div className="rev-spot-author">{featured.author}</div>
            {featured.role && <div className="rev-spot-meta">{featured.role}</div>}
            {(data.primaryCta || data.secondaryCta) && (
              <div className="rev-spot-ctas">
                {data.primaryCta && <CTAButton href={data.primaryCta.href}>{data.primaryCta.label}</CTAButton>}
                {data.secondaryCta && <CTAButton href={data.secondaryCta.href} variant="ghost">{data.secondaryCta.label}</CTAButton>}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- centered: featured review, no photo ---
  if (variant === "centered" && featured) {
    return (
      <section className="rev-center">
        <div className="wrap" style={{ maxWidth: 880 }}>
          <div className="rev-center-stars"><Stars size={26} gap={5} /></div>
          <blockquote className="rev-center-quote">{featured.quote}</blockquote>
          <div className="rev-center-meta">
            <b>{featured.author}</b>
            {featured.role ? ` \u00b7 ${featured.role}` : ""}
          </div>
          {(data.primaryCta || data.secondaryCta) && (
            <div className="rev-center-ctas">
              {data.primaryCta && <CTAButton href={data.primaryCta.href}>{data.primaryCta.label}</CTAButton>}
              {data.secondaryCta && <CTAButton href={data.secondaryCta.href} variant="ghost">{data.secondaryCta.label}</CTAButton>}
            </div>
          )}
        </div>
      </section>
    );
  }

  // --- rail: horizontal photo-card rail (my-qr-zone V3). Every card is a
  // customer project photo beside the quote, with a Verified badge, neon
  // stars, and a product chip. Scroll-snapped; photo becomes a top banner and
  // the card goes near full-bleed under 700px (rrl-* classes in globals.css,
  // figure margin reset included - the V3 proof's "empty gap" bug). ---
  if (variant === "rail") {
    return (
      <section className="sec" style={{ background: "var(--paper2)" }} aria-label={heading}>
        <div className="wrap">
          <div className="rrl-head"><h2>{heading}</h2></div>
          <div className="rrl-rail">
            {data.items.map((r, i) => (
              <figure className="rrl-card" key={i}>
                <div className="rrl-photo">
                  <Img src={r.image?.ref} alt={r.image?.alt || `Customer project by ${r.author}`} ratio="r-11" placeholderLabel={r.product} />
                </div>
                <figcaption className="rrl-body">
                  <div className="rrl-top">
                    <div className="rrl-namerow">
                      <span className="rrl-name">{r.author}</span>
                      {r.verified && <span className="rrl-vbadge">{"\u2713"} Verified</span>}
                    </div>
                    <Stars size={17} gap={3} />
                  </div>
                  <p className="rrl-text">{r.quote}</p>
                  {r.product && (
                    <span className="rrl-prod">
                      Used <b>{r.product}</b>
                    </span>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="rrl-hint">Drag or scroll to see more reviews {"\u2192"}</p>
        </div>
      </section>
    );
  }

  // --- cards: Testimonials look (avatar / initials + product tag) ---
  if (variant === "cards") {
    return (
      <div className="wrap sec">
        <h2>{heading}</h2>
        <div className="tmon-grid" style={{ marginTop: 22 }}>
          {data.items.map((r, i) => (
            <figure className="tcard" key={i}>
              <div className="tcard-stars"><Stars size={15} gap={2} /></div>
              <blockquote>{r.quote}</blockquote>
              <figcaption>
                <Avatar src={r.avatar} name={r.author} monogram={r.monogram} />
                <span className="tcard-meta">
                  <span className="tcard-name">{r.author}</span>
                  {r.role && <span className="tcard-role">{r.role}</span>}
                </span>
              </figcaption>
              {r.product && <span className="tcard-tag">{r.product}</span>}
            </figure>
          ))}
        </div>
      </div>
    );
  }

  // --- grid (default): rcard grid, bigger stars + bolder author ---
  return (
    <div className="wrap sec">
      <h2>{heading}</h2>
      <div className="rgrid" style={{ marginTop: 8 }}>
        {data.items.map((r, i) => (
          <div className="rcard" key={i}>
            <div className="pad">
              <div className="tcard-stars" style={{ marginBottom: 10 }}><Stars size={22} gap={3} /></div>
              <p>{r.quote}</p>
              <span className="rev-name">{r.author}</span>
              {r.role && <span className="rev-role">{r.role}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
