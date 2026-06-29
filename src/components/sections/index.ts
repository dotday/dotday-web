/**
 * @/components/sections - the SHARED SECTION CORE.
 *
 * Surface-agnostic sections that render identically on blogs, landing pages,
 * profiles, and home. This is the canonical home for these components; surface
 * folders (blog/blocks, landing) re-export or import from here so there is one
 * implementation per section. Add a cross-surface section here, not in a surface
 * folder.
 */
export { Prose } from "@/components/sections/Prose";
export { Steps } from "@/components/sections/Steps";
export { Callout } from "@/components/sections/Callout";
export { StatStrip } from "@/components/sections/StatStrip";
export { TrustStrip } from "@/components/sections/TrustStrip";
export { RichText } from "@/components/sections/RichText";
export type {
  ProseData,
  StepsData,
  CalloutData,
  StatStripData,
  TrustStripData,
} from "@/components/sections/types";
