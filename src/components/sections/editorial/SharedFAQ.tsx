"use client";
import { useState } from "react";

/**
 * SharedFAQ - the ONE FAQ accordion used everywhere (blogs + landing pages).
 *
 * This is the single source of truth for FAQ UI. The blog FAQ block and the
 * landing faq section both delegate here, so improving the accordion updates
 * every post and every landing page at once.
 *
 * Markup is identical to the original blog FAQ (sec / eyebrow / faq-item /
 * faq-q / faq-tog / faq-a classes), so existing posts render unchanged.
 * FAQPage JSON-LD is still emitted by the page (lib/blog/jsonld or
 * lib/landing/jsonld), never here, so this stays a pure UI component.
 */
export interface FaqItem {
  q: string;
  a: string;
}

export function SharedFAQ({
  heading = "Frequently asked questions",
  eyebrow = "Questions",
  lead,
  items,
}: {
  heading?: string;
  eyebrow?: string;
  lead?: string;
  items: FaqItem[];
}) {
  const [open, setOpen] = useState(0);
  return (
    <div className="sec">
      <div className="eyebrow">
        <b>{eyebrow}</b>
      </div>
      <h2 id="faq">{heading}</h2>
      {lead && <p className="faq-lead">{lead}</p>}
      <div>
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div className={`faq-item${isOpen ? " open" : ""}`} key={i}>
              <button
                className="faq-q"
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{item.q}</span>
                <span className="faq-tog">{isOpen ? "-" : "+"}</span>
              </button>
              <div className="faq-a">{item.a}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
