import type { Faq } from "@/lib/blog/types";
import { SharedFAQ } from "@/components/global/sections/SharedFAQ";

/**
 * FAQ (blog block) - thin adapter over the GLOBAL SharedFAQ. Maps the blog
 * content shape (Faq) to the shared component so the accordion is identical on
 * blogs and landing pages. Improve SharedFAQ once, both update. FAQPage JSON-LD
 * is still emitted by the page (lib/blog/jsonld), not here.
 */
export function FAQ({ faq }: { faq: Faq }) {
  return (
    <SharedFAQ
      heading={faq.heading || "Frequently asked questions"}
      items={faq.items}
    />
  );
}
