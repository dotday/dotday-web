/**
 * Auto-extracted from the former components/landing/sections.tsx monolith.
 * One section per file; registered via the SectionRegistry.
 */
import { Img } from "@/components/primitives/Img";
import { Badge, CTAButton } from "@/components/primitives/Badge";
import type {
  LandingHeroSection,
} from "@/lib/landing/types";

export function LandingHero({ data }: { data: LandingHeroSection }) {
  return (
    <section className="wrap page">
      {data.eyebrow && <Badge>{data.eyebrow}</Badge>}
      <h1 style={{ marginTop: 14 }}>{data.heading}</h1>
      {data.subheading && <p className="lead">{data.subheading}</p>}
      {(data.primaryCta || data.secondaryCta) && (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
          {data.primaryCta && (
            <CTAButton href={data.primaryCta.href}>{data.primaryCta.label}</CTAButton>
          )}
          {data.secondaryCta && (
            <CTAButton href={data.secondaryCta.href} variant="ghost">
              {data.secondaryCta.label}
            </CTAButton>
          )}
        </div>
      )}
      {data.image && (
        <div style={{ marginTop: 24 }}>
          <Img src={data.image.ref} alt={data.image.alt} ratio="r-169" />
        </div>
      )}
    </section>
  );
}
