"use client";
import { useState } from "react";
import type { Faq } from "@/lib/blog/types";

/**
 * FAQ - the accordion from the reference design. One item open by default,
 * neon +/- toggle. FAQPage JSON-LD is emitted by the page (lib/blog/jsonld),
 * not here, so the schema stays in <head> and this stays a pure UI component.
 */
export function FAQ({ faq }: { faq: Faq }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="sec">
      <div className="eyebrow">
        <b>Questions</b>
      </div>
      <h2 id="faq">{faq.heading || "Frequently asked questions"}</h2>
      <div>
        {faq.items.map((item, i) => {
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
