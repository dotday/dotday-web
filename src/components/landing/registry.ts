import type { LandingSection } from "@/lib/landing/types";
import type { ComponentType } from "react";

/**
 * SectionRegistry - the single _type -> component map for assembled pages
 * (landing, and later profile + custom, which share the same free-assembly
 * engine).
 *
 * WHY A REGISTRY: the dispatcher was a hand-written switch in SectionRenderer.
 * Every new section meant editing that switch AND the type union AND the schema -
 * three places, easy to drift. The registry centralizes the _type -> component
 * half so the renderer becomes a one-line lookup, and "add a section" is a single
 * entry here (+ the type + the schema def). It also lets other tooling - the
 * /_blocks gallery, validation, docs generation - enumerate every section from
 * one source instead of re-parsing a switch.
 *
 * SHAPE NOTE: some sections need bespoke wrapper markup (the shared FAQ /
 * comparison / CTA / steps / callout are wrapped in `.wrap` / `.body-single`
 * containers, and a few adapt prop names). Those stay in the renderer's switch
 * as "adapted" cases. The registry covers the sections that render directly from
 * their data object with a uniform `{ data }` prop. The renderer checks the
 * registry first and falls through to adapted cases - so this is additive and
 * non-breaking, and sections migrate into the registry as they're normalized.
 *
 * `surfaces` records where a section is approved; `isAction` flags sections with
 * side effects (forms, third-party scripts) that need confirmation before being
 * placed on a new surface.
 */

export type Surface = "home" | "landing" | "blog" | "profile";

// Components in the registry take the section's own data object as `{ data }`.
// (LandingSection is the union; each component narrows on its own _type.)
export interface SectionDef {
  type: string;
  component: ComponentType<{ data: any }>;
  surfaces: Surface[];
  isAction?: boolean;
}

/**
 * The registry is intentionally seeded with the directly-rendered landing
 * sections that already use a uniform `{ data }` prop. Wrapped/adapted sections
 * (faq, productComparison, cta, steps, callout) remain handled in the renderer
 * switch until their wrappers are normalized; they are documented here as a
 * comment so the full surface map stays in one place.
 *
 * Seeding is done in registry.seed.ts to avoid a circular import (sections.tsx
 * imports types that ultimately reference this module). Consumers import
 * `SectionRegistry` and call the lookup; the seed file is imported for its
 * side effect by the renderer.
 */
export const SectionRegistry: Record<string, SectionDef> = {};

/** Register a section. Idempotent; last registration wins (useful for overrides). */
export function registerSection(def: SectionDef): void {
  SectionRegistry[def.type] = def;
}

/** Look up the component for a section type, or undefined if not registered. */
export function getSection(type: string): SectionDef | undefined {
  return SectionRegistry[type];
}

/** All registered sections (for the /_blocks gallery, docs, validation). */
export function allSections(): SectionDef[] {
  return Object.values(SectionRegistry);
}
