import { Img } from "@/components/primitives/Img";
import { CTAButton } from "@/components/primitives/Badge";
import { Twemoji } from "@/components/primitives/Twemoji";
import type { SolutionSection } from "@/lib/landing/types";

/**
 * Solution - the DOTDAY fabric that fixes the problem above. Optional emoji in a
 * solid-neon tile beside the eyebrow; optional figure image; product + ghost CTA.
 */
export function Solution({ data }: { data: SolutionSection }) {
  return (
    <div className="wrap sec nar">
      <div className="nar-row">
        {data.emoji && (
          <span className="nar-ico" aria-hidden="true">
            <Twemoji emoji={data.emoji} size={28} />
          </span>
        )}
        <div className="nar-copy">
          {data.eyebrow && (
            <div className="eyebrow">
              <b>{data.eyebrow}</b>
            </div>
          )}
          <h2>{data.heading}</h2>
          <p>{data.body}</p>
          {data.image && (
            <div style={{ margin: "18px 0" }}>
              <Img src={data.image.ref} alt={data.image.alt} ratio="r-169" />
            </div>
          )}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
            <CTAButton href={data.productHref}>View {data.product}</CTAButton>
            {data.cta && (
              <CTAButton href={data.cta.href} variant="ghost">
                {data.cta.label}
              </CTAButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
