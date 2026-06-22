"use client";

import { useState } from "react";
import type { Faq } from "@/lib/blog/types";

/**
 * HubFaq - accordion styled for the blog hub (.bfaq-* classes, serif questions,
 * neon +/- toggle). One open by default. FAQPage JSON-LD is emitted by the page,
 * so this stays a pure UI component.
 */
export function HubFaq({ faq }: { faq: Faq }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="hub bfaq">
      <p className="bfaq-eyebrow">Questions</p>
      <h2 id="faq">{faq.heading || "Frequently asked questions"}</h2>
      <p className="bfaq-lead">
        Expert answers on landscape fabric selection, installation, and
        performance.
      </p>
      <div>
        {faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div className={`bfaq-item${isOpen ? " open" : ""}`} key={i}>
              <button
                className="bfaq-q"
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{item.q}</span>
                <span className="bfaq-tog" aria-hidden="true">
                  {isOpen ? "\u2212" : "+"}
                </span>
              </button>
              <div className="bfaq-a">{item.a}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
