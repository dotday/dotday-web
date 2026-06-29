/**
 * @/components/sections - the SHARED SECTION CORE.
 *
 * Surface-agnostic sections that render identically on blogs, landing pages,
 * profiles, and home. This is the canonical home for these components; surface
 * folders (blog/blocks, landing) re-export or import from here so there is one
 * implementation per section. Add a cross-surface section here, not in a surface
 * folder.
 */
export { Prose } from "@/components/sections/_core/Prose";
export { Steps } from "@/components/sections/_core/Steps";
export { Callout } from "@/components/sections/_core/Callout";
export { StatStrip } from "@/components/sections/_core/StatStrip";
export { TrustStrip } from "@/components/sections/_core/TrustStrip";
export { RichText } from "@/components/sections/_core/RichText";
export type {
  ProseData,
  StepsData,
  CalloutData,
  StatStripData,
  TrustStripData,
} from "@/components/sections/_core/types";
