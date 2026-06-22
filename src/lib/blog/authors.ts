/**
 * DOTDAY author registry.
 *
 * Single source of truth for author identity (name, title, bio, monogram).
 * Posts reference an author by a stable `authorRef` id; the identity lives here
 * so a title or bio change happens in one place and renders everywhere (article
 * byline, blog hub cards, JSON-LD Person).
 *
 * Honesty rule (brand): these are REAL DOTDAY people/teams. Do not invent
 * outside "experts", fabricated credentials, or testimonials. `type` controls
 * the JSON-LD @type: "Person" for a named individual, "Organization" for a team
 * byline like the DOTDAY Field Team.
 */

export type AuthorType = "Person" | "Organization";

export interface Author {
  id: string;
  name: string;
  /** Role line under the name, e.g. "Hardscape & Landscape Fabric Specialist, DOTDAY". */
  title: string;
  /** 1-2 sentence bio shown on the article byline. */
  bio?: string;
  /** Monogram shown in the neon avatar chip (e.g. "MH"). Falls back to initials. */
  monogram?: string;
  /** Optional avatar image path under /public; if absent, the monogram chip is used. */
  avatar?: string;
  type: AuthorType;
}

export const AUTHORS: Record<string, Author> = {
  "marcus-halvorsen": {
    id: "marcus-halvorsen",
    name: "Marcus Halvorsen",
    title: "Hardscape & Landscape Fabric Specialist, DOTDAY",
    bio: "15+ years installing geotextiles and paver bases on residential and commercial sites across the US. Marcus writes and reviews DOTDAY's fabric guides so the advice matches what holds up in the field, not just on paper.",
    monogram: "MH",
    type: "Person",
  },
  "dotday-field-team": {
    id: "dotday-field-team",
    name: "DOTDAY Field Team",
    title: "Landscape fabric specialists, DOTDAY",
    bio: "The DOTDAY crew that tests, installs, and documents how each fabric performs on real jobs. Our guides are written and reviewed against what actually holds up on site.",
    monogram: "DD",
    type: "Organization",
  },
};

/** Initials from a name, e.g. "Marcus Halvorsen" -> "MH". */
function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "DD";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Resolve a post's author into a full Author object.
 * Priority: authorRef id -> registry entry; else synthesize from the legacy
 * `author` string so older posts still render a clean byline. Never returns
 * null, so callers always have a name + monogram.
 */
export function resolveAuthor(
  authorRef: string | undefined,
  legacyName: string | undefined
): Author {
  if (authorRef && AUTHORS[authorRef]) {
    const a = AUTHORS[authorRef];
    return { ...a, monogram: a.monogram || initials(a.name) };
  }
  const name = legacyName || "DOTDAY Field Team";
  return {
    id: "legacy",
    name,
    title: "DOTDAY",
    monogram: initials(name),
    type: name.toLowerCase().includes("team") ? "Organization" : "Person",
  };
}
