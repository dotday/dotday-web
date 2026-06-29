import { registerSection } from "@/components/landing/registry";
import {
  LandingHero,
  Problem,
  Solution,
  UseCaseGrid,
  CalculatorEmbed,
  Reviews,
  InternalLinks,
  StatementBand,
  BigTypeFeatures,
  SpecSheet,
  ProjectSpotlight,
  EditorialCards,
  VideoFeature,
} from "@/components/landing/sections";
import { HomeHero } from "@/components/site/home/HomeHero";
import { UseCases } from "@/components/site/home/UseCases";
import { Testimonials } from "@/components/site/home/Testimonials";
import { ToolsBand } from "@/components/site/home/ToolsBand";
import { InstallShowcase } from "@/components/site/home/InstallShowcase";
import { QuoteBand } from "@/components/site/home/QuoteBand";
import { JobGallery } from "@/components/site/home/JobGallery";
import { StatStrip as HomeStatStrip } from "@/components/site/home/StatStrip";
import { CompareTable } from "@/components/site/home/CompareTable";
import { VideoFeature as HomeVideoFeature } from "@/components/site/home/VideoFeature";
import { ApplicationGallery } from "@/components/site/home/ApplicationGallery";
import { RealJobs } from "@/components/site/home/RealJobs";
import { InstagramFeed } from "@/components/site/home/InstagramFeed";

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

// Product fit & comparison
registerSection({ type: "useCaseGrid", component: UseCaseGrid, surfaces: ["landing"] });
registerSection({ type: "specSheet", component: SpecSheet, surfaces: ["landing"] });

// Proof
registerSection({ type: "reviews", component: Reviews, surfaces: ["landing"] });
registerSection({ type: "projectSpotlight", component: ProjectSpotlight, surfaces: ["landing", "profile"] });

// Media
registerSection({ type: "editorialCards", component: EditorialCards, surfaces: ["landing"] });
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
