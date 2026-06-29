import type { CtaBlock } from "@/lib/blog/types";
import { CTAButton } from "@/components/primitives/Badge";

/**
 * InlineCTA - renders the four escalating CTA tiers from one block type:
 *   calculator -> light grey block (tier 1)
 *   quiz       -> solid-neon centered block (tier 2)
 *   contractor -> outline bulk-pricing bar
 *   enquiry    -> solid-neon centered closing panel
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

  if (block.variant === "enquiry") {
    // Closing CTA - centered solid-neon panel (matches the quiz panel look).
    return (
      <div className="cta-enquiry">
        <div className="cta-lbl">{block.eyebrow || "Find your fabric"}</div>
        <h3>{block.heading}</h3>
        {block.body && <p>{block.body}</p>}
        <CTAButton href={block.href} variant="onneon">
          {block.cta}
        </CTAButton>
      </div>
    );
  }

  // contractor - solid-neon "bulk" bar (full tier-1 / calculator match, no eyebrow)
  return (
    <div className="bulk">
      <div className="body">
        <h3>{block.heading}</h3>
        {block.body && <p>{block.body}</p>}
      </div>
      <CTAButton href={block.href} variant="primary">
        {block.cta}
      </CTAButton>
    </div>
  );
}
