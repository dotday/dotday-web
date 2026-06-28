import { Badge, CTAButton } from "@/components/blog/ui/Badge";

/**
 * SharedCTA - the ONE solid-neon CTA climax block used everywhere.
 *
 * The blog FinalCTA and the landing cta section both delegate here. Improve the
 * CTA once, every blog + landing page updates. Markup is identical to the
 * original blog FinalCTA (final / final-inner / final-glow / final-c /
 * final-btns), so existing posts render unchanged.
 *
 * Defaults reproduce the original blog FinalCTA exactly (eyebrow "Find your
 * fabric", Calculator + Shop actions). Landing pages override copy + actions.
 *
 * `tone` selects the panel treatment:
 *   - "default" (the original flat neon + corner glow) - unchanged for every
 *     existing blog + landing CTA.
 *   - "hardscape" - the brighter diagonal neon gradient used on XBAR / hardscape
 *     landing pages. Adds the `.final-inner--hardscape` modifier; the base
 *     markup and white badge / onneon buttons are identical.
 */
export function SharedCTA({
  eyebrow = "Find your fabric",
  heading = "Need help choosing the right fabric?",
  body = "Answer a few questions or run the numbers, and get matched to SHIELD, XBAR, or TERRA for your exact ground condition.",
  primaryHref = "/landscape-fabric-calculator",
  primaryLabel = "Use Our Calculator",
  secondaryHref = "/product-page/xbar-landscape-fabric",
  secondaryLabel = "Shop DOTDAY Products",
  tone = "default",
}: {
  eyebrow?: string;
  heading?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  tone?: "default" | "hardscape";
}) {
  const innerCls =
    tone === "hardscape" ? "final-inner final-inner--hardscape" : "final-inner";
  return (
    <section className="final">
      <div className={innerCls}>
        <div className="final-glow" />
        <div className="final-c">
          <Badge white>{eyebrow}</Badge>
          <h2>{heading}</h2>
          <p>{body}</p>
          <div className="final-btns">
            <CTAButton href={primaryHref} variant="onneon">
              {primaryLabel}
            </CTAButton>
            <CTAButton href={secondaryHref} variant="onneon-ghost">
              {secondaryLabel}
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
