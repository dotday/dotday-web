import type { CtaBlock } from "@/lib/blog/types";
import { CTAButton } from "@/components/blog/ui/Badge";

/**
 * InlineCTA - renders the four escalating CTA tiers from one block type:
 *   calculator -> light grey block (tier 1)
 *   quiz       -> soft-neon centered block (tier 2)
 *   contractor -> outline bulk-pricing bar
 *   enquiry    -> outline bulk/talk bar (closing)
 *
 * The variant drives the styling; the JSON supplies copy + href + button label.
 */
export function InlineCTA({ block }: { block: CtaBlock }) {
  if (block.variant === "calculator") {
    return (
      <div className="cta-calc">
        <div className="body">
          <div className="cta-lbl">{block.eyebrow || "▣ Tool"}</div>
          <h3>{block.heading}</h3>
          {block.body && <p>{block.body}</p>}
        </div>
        <CTAButton href={block.href} variant="primary">
          {block.cta}
        </CTAButton>
      </div>
    );
  }

  if (block.variant === "quiz") {
    return (
      <div className="cta-quiz">
        <div className="cta-lbl">{block.eyebrow || "◎ 60-second quiz"}</div>
        <h3>{block.heading}</h3>
        <CTAButton href={block.href} variant="onneon">
          {block.cta}
        </CTAButton>
      </div>
    );
  }

  // contractor + enquiry share the outline "bulk" bar
  return (
    <div className="bulk">
      <div>
        <h3>{block.heading}</h3>
        {block.body && <p>{block.body}</p>}
      </div>
      <CTAButton href={block.href} variant="ghost">
        {block.cta}
      </CTAButton>
    </div>
  );
}
