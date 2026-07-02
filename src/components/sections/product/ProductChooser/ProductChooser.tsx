/**
 * ProductChooser - "Which DOTDAY fabric do you have?" post-purchase roll
 * identification cards. Ported from the approved my-qr-zone V3 proof.
 * Schema-first: shape lives in ProductChooser.schema.json (types generated).
 *
 * Deliberately separate from groundConditionCards: that section maps a ground
 * condition to the right fabric pre-purchase and is pixel-locked to the
 * homepage; this one maps the roll the customer already owns to its product
 * page. Classes are pch-* in globals.css.
 */
import { Img } from "@/components/primitives/Img";
import { renderInlineLinks } from "@/components/primitives/InlineLinks";
import type { ProductChooserSection } from "./ProductChooser.types";

export function ProductChooser({ data }: { data: ProductChooserSection }) {
  return (
    <section className="sec" style={{ background: "var(--paper2, #f4f4f4)" }} aria-label={data.heading}>
      <div className="wrap">
        {data.eyebrow && (
          <div className="badgewrap"><span className="pch-eyebrow">{data.eyebrow}</span></div>
        )}
        <h2>{data.heading}</h2>
        {data.lead && <p className="pch-lead">{renderInlineLinks(data.lead)}</p>}
        <div className="pch-rolls">
          {data.cards.map((c, i) => (
            <div className="pch-roll" key={i}>
              <div className="pch-pic">
                <Img src={c.image?.ref} alt={c.image?.alt || c.title} ratio="r-11" placeholderLabel={c.tag} />
              </div>
              <span className="pch-tag">{c.tag}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <a className="pch-lk" href={c.link.href}>{c.link.label}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
