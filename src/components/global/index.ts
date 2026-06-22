/**
 * @/components/global - the GLOBAL component layer: the "improve once, updates
 * everywhere" surface. Shared sections used across BOTH blogs and landing pages.
 * Improve the file behind one of these exports and every page that uses it
 * updates - no per-page edits.
 */
export { SharedFAQ } from "@/components/global/sections/SharedFAQ";
export type { FaqItem } from "@/components/global/sections/SharedFAQ";
export { SharedComparisonTable } from "@/components/global/sections/SharedComparisonTable";
export type { ComparisonTableData } from "@/components/global/sections/SharedComparisonTable";
export { SharedCTA } from "@/components/global/sections/SharedCTA";
