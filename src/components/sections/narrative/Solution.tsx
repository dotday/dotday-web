/**
 * Auto-extracted from the former components/landing/sections.tsx monolith.
 * One section per file; registered via the SectionRegistry.
 */
import { Img } from "@/components/primitives/Img";
import { CTAButton } from "@/components/primitives/Badge";
import type {
  SolutionSection,
} from "@/lib/landing/types";

export function Solution({ data }: { data: SolutionSection }) {
  return (
    <div className="wrap sec">
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
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
        <CTAButton href={data.productHref}>View {data.product}</CTAButton>
        {data.cta && (
          <CTAButton href={data.cta.href} variant="ghost">
            {data.cta.label}
          </CTAButton>
        )}
      </div>
    </div>
  );
}
