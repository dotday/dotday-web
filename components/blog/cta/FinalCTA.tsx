import { SharedCTA } from "@/components/global/sections/SharedCTA";

/**
 * FinalCTA (blog) - thin adapter over the GLOBAL SharedCTA so the solid-neon
 * climax block is identical on blogs and landing pages. All props pass through;
 * defaults live in SharedCTA and reproduce the original blog CTA exactly.
 * Improve the CTA once, every post + landing page updates.
 */
export function FinalCTA(props: {
  heading?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return <SharedCTA {...props} />;
}
