import { registerSection } from "@/components/renderers/registry/registry";
import { LandingHero } from "@/components/sections/heroes/LandingHero";
import { Problem } from "@/components/sections/narrative/Problem";
import { Solution } from "@/components/sections/narrative/Solution";
import { StatementBand } from "@/components/sections/narrative/StatementBand";
import { BigTypeFeatures } from "@/components/sections/narrative/BigTypeFeatures";
import { UseCaseGrid } from "@/components/sections/product/UseCaseGrid";
import { SpecSheet } from "@/components/sections/product/SpecSheet";
import { SizeSelector } from "@/components/sections/product/SizeSelector";
import { DualBenefit } from "@/components/sections/narrative/DualBenefit";
import { FeaturedGuide } from "@/components/sections/media/FeaturedGuide";
import { CalculatorEmbed } from "@/components/sections/conversion/CalculatorEmbed";
import { Reviews } from "@/components/sections/proof/Reviews";
import { ProjectSpotlight } from "@/components/sections/proof/ProjectSpotlight";
import { EditorialCards } from "@/components/sections/media/EditorialCards";
import { VideoFeature } from "@/components/sections/media/VideoFeature";
import { InternalLinks } from "@/components/sections/conversion/InternalLinks";
import { HomeHero } from "@/components/sections/heroes/HomeHero";
import { UseCases } from "@/components/sections/product/UseCases";
import { Testimonials } from "@/components/sections/proof/Testimonials";
import { ToolsBand } from "@/components/sections/conversion/ToolsBand";
import { InstallShowcase } from "@/components/sections/media/InstallShowcase";
import { QuoteBand } from "@/components/sections/proof/QuoteBand";
import { JobGallery } from "@/components/sections/proof/JobGallery";
import { StatStrip as HomeStatStrip } from "@/components/sections/proof/HomeStatStrip";
import { CompareTable } from "@/components/sections/product/CompareTable";
import { VideoFeature as HomeVideoFeature } from "@/components/sections/media/HomeVideoFeature";
import { ApplicationGallery } from "@/components/sections/product/ApplicationGallery";
import { RealJobs } from "@/components/sections/proof/RealJobs";
import { InstagramFeed } from "@/components/sections/media/InstagramFeed";

/**
 * Registry seed - registers every section that renders directly from its data
 * object with a uniform `{ data }` prop. This is THE list of available
 * assembled-page sections; adding one is a single registerSection() call here
 * (plus its type and its schema def).
 *
 * Sections that need bespoke wrapper markup or prop adaptation (productComparison,
 * faq, cta, steps, callout - delegating to the shared global/core components
 * inside container divs) remain handled by the renderer switch and are NOT seeded
 * here; the renderer tries the registry first, then those adapted cases.
 *
 * Imported for its side effect by SectionRenderer.
 *
 * NOTE: the registry currently lives under components/landing for historical
 * reasons but is surface-agnostic (it carries a `surfaces` field per section). A
 * later step relocates it to a neutral path (e.g. components/sections/registry)
 * once the home + profile surfaces are fully wired.
 */

// --- Landing sections (direct { data } render) ---

// Heroes
registerSection({ type: "hero", component: LandingHero, surfaces: ["landing", "profile"] });

// Narrative
registerSection({ type: "problem", component: Problem, surfaces: ["landing"] });
registerSection({ type: "solution", component: Solution, surfaces: ["landing"] });
registerSection({ type: "statementBand", component: StatementBand, surfaces: ["landing"] });
registerSection({ type: "bigTypeFeatures", component: BigTypeFeatures, surfaces: ["home", "landing"] });
registerSection({ type: "dualBenefit", component: DualBenefit, surfaces: ["landing"] });

// Product fit & comparison
registerSection({ type: "useCaseGrid", component: UseCaseGrid, surfaces: ["landing"] });
registerSection({ type: "specSheet", component: SpecSheet, surfaces: ["landing"] });
registerSection({ type: "sizeSelector", component: SizeSelector, surfaces: ["landing"] });

// Proof
registerSection({ type: "reviews", component: Reviews, surfaces: ["landing"] });
registerSection({ type: "projectSpotlight", component: ProjectSpotlight, surfaces: ["landing", "profile"] });

// Media
registerSection({ type: "editorialCards", component: EditorialCards, surfaces: ["landing"] });
registerSection({ type: "featuredGuide", component: FeaturedGuide, surfaces: ["landing"] });
registerSection({ type: "videoFeature", component: VideoFeature, surfaces: ["home", "landing"] });

// Conversion
registerSection({ type: "calculatorEmbed", component: CalculatorEmbed, surfaces: ["landing"] });
registerSection({ type: "internalLinks", component: InternalLinks, surfaces: ["landing", "blog", "profile"] });

// --- Home sections (lifted from hardcoded JSX, Option A migration) ---
// Registered as they are made data-driven. The homepage still composes them with
// DEFAULT_* content until content/home.json lands; this registration makes them
// available to the unified renderer + the /_blocks gallery now.

registerSection({ type: "splitHero", component: HomeHero, surfaces: ["home", "landing"] });
registerSection({ type: "groundConditionCards", component: UseCases, surfaces: ["home", "landing"] });
registerSection({ type: "testimonials", component: Testimonials, surfaces: ["home", "landing", "profile"] });
registerSection({ type: "toolsBand", component: ToolsBand, surfaces: ["home", "landing"] });
registerSection({ type: "installShowcase", component: InstallShowcase, surfaces: ["home", "landing"] });
registerSection({ type: "quoteBand", component: QuoteBand, surfaces: ["home", "landing"] });
registerSection({ type: "jobGallery", component: JobGallery, surfaces: ["home", "landing"] });
registerSection({ type: "homeStatStrip", component: HomeStatStrip, surfaces: ["home", "landing", "profile"] });
registerSection({ type: "fabricMatrix", component: CompareTable, surfaces: ["home", "landing"] });
registerSection({ type: "homeVideoFeature", component: HomeVideoFeature, surfaces: ["home", "landing"] });
registerSection({ type: "applicationGallery", component: ApplicationGallery, surfaces: ["home", "landing"] });
registerSection({ type: "realJobs", component: RealJobs, surfaces: ["home", "landing"] });
// InstagramFeed loads Instagram's third-party embed.js -> isAction: confirm
// before placing on a new surface.
registerSection({ type: "instagramFeed", component: InstagramFeed, surfaces: ["home"], isAction: true });
