import { Badge } from "@/components/blog/ui/Badge";
import { CTAButton } from "@/components/blog/ui/Badge";

/**
 * FinalCTA - the solid-neon climax block. Fixed copy + the two primary actions
 * (Calculator + Shop). Used at the bottom of every post and reusable on landing
 * pages.
 */
export function FinalCTA({
  heading = "Need help choosing the right fabric?",
  body = "Answer a few questions or run the numbers, and get matched to SHIELD, XBAR, or TERRA for your exact ground condition.",
  primaryHref = "/landscape-fabric-calculator",
  primaryLabel = "Use Our Calculator",
  secondaryHref = "/product-page/xbar-landscape-fabric",
  secondaryLabel = "Shop DOTDAY Products",
}: {
  heading?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="final">
      <div className="final-inner">
        <div className="final-glow" />
        <div className="final-c">
          <Badge white>Find your fabric</Badge>
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
