/**
 * RichText - re-exported from the shared section core. The implementation now
 * lives in @/components/sections/RichText so both blog blocks and shared
 * sections (Prose) use one renderer. Existing imports of this path keep working.
 */
export { RichText } from "@/components/sections/RichText";
