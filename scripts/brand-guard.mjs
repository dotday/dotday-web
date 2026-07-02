// brand-guard.mjs - warns (never fails) when src/styles/globals.css drifts from
// the DOTDAY brand rules. Runs as part of `content:validate`.
//
// Enforces, by warning only (exit 0 always):
//   1. No Wix Madefor Display: the brand font is Wix Madefor Text only, so no
//      `var(--display)` or `--display:` token should appear.
//   2. No serif fonts: Wix Madefor only (flags `serif` except `sans-serif`, plus
//      Georgia / Times).
//   3. No off-brand colors: only the DOTDAY palette (white / greys / charcoal /
//      neon / text greys) plus a small allowlist of neutrals, neon shades, and a
//      functional error red. Anything else (purple / pink / orange / blue / green
//      / lavender / peach ...) is flagged.
//
// This is a lint-style guard, deliberately non-fatal: it prints what to look at
// without blocking a deploy. Tighten to a hard fail later if desired.

import fs from "node:fs";
import path from "node:path";

const CSS_PATH = path.join(process.cwd(), "src", "styles", "globals.css");

const YELLOW = "\x1b[33m";
const DIM = "\x1b[2m";
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";

function warn(msg) {
  console.log(`${YELLOW}brand-guard:${RESET} ${msg}`);
}

if (!fs.existsSync(CSS_PATH)) {
  // Nothing to check; stay silent and pass.
  process.exit(0);
}

const css = fs.readFileSync(CSS_PATH, "utf8");
const lines = css.split("\n");

let findings = 0;

// --- 1. Wix Madefor Display must not appear -------------------------------
lines.forEach((line, i) => {
  if (/var\(--display\)/.test(line) || /--display\s*:/.test(line)) {
    // Skip our own explanatory comment that mentions the retired token.
    if (line.includes("retired")) return;
    warn(
      `line ${i + 1}: references --display (Wix Madefor Display is retired; use var(--text))`
    );
    findings++;
  }
});

// --- 2. No serif fonts ----------------------------------------------------
lines.forEach((line, i) => {
  const noSans = line.replace(/sans-serif/g, "");
  if (/\bserif\b/.test(noSans) || /\bGeorgia\b/.test(line) || /\bTimes\b/.test(line)) {
    warn(`line ${i + 1}: serif font reference (brand is Wix Madefor only)`);
    findings++;
  }
});

// --- 3. Off-brand colors --------------------------------------------------
// Brand palette + allowlisted neutrals / neon shades / functional colors.
// Everything here is lowercase; hexes from the file are lowercased before test.
const ALLOWED = new Set([
  // brand palette
  "#ffffff", "#fff",
  "#f4f4f4",
  "#e9e9e9",
  "#101010",
  "#d8ff00",
  "#dfff6a",
  "#1a1a1a",
  "#333333", "#333",
  "#6b6b6b",
  // pure black / common shorthands
  "#000000", "#000",
  // functional error reds (kept by decision)
  "#a00", "#d92d20",
  // olive (in brief) + dark-neon/olive shades used in gradients & hovers
  "#5b6e00", "#6b7f00", "#3a4a00", "#2c3500", "#2c3600", "#243300",
  "#1d2408", "#2c3500",
]);

// Neutral greys (any #xy repeated greyscale) and neon-family shades are allowed
// programmatically so the allowlist stays small.
function isGrey(hex) {
  // #rgb or #rrggbb where all channels are equal-ish (grey)
  let h = hex.slice(1);
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length !== 6) return false;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max - min <= 12; // near-equal channels => grey
}
function isNeonFamily(hex) {
  // The DOTDAY neon family runs yellow-green -> neon -> neon-gold -> olive. Its
  // signature: blue is very low, while red and green are both high (or, for the
  // dark olive shades, both low but still blue-starved with green >= blue). This
  // admits #d8ff00, #dfff6a, #f5e000, pale tints (#fbffe6), and olive shades,
  // while rejecting purple/pink/orange/blue/teal/green-with-blue (all of which
  // carry meaningful blue or lack the red+green pairing).
  let h = hex.slice(1);
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length !== 6) return false;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  // bright yellow-green through neon-gold: both R and G high, blue clearly lower.
  if (r >= 170 && g >= 170 && b <= Math.min(r, g) - 40) return true;
  // dark olive / dark-neon shades: green at least matches blue and red, blue low.
  if (b <= 60 && g >= b && r <= g + 30) return true;
  // very pale neon washes (near-white panel tints): all channels light and green
  // is the strongest, e.g. #fbffe6 / #eaf9c0. Blue stays a touch below green.
  if (Math.min(r, g, b) >= 200 && g >= r && g >= b && b < g) return true;
  return false;
}

const seen = new Map(); // hex -> first line number
const hexRe = /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g;
lines.forEach((line, i) => {
  const matches = line.match(hexRe);
  if (!matches) return;
  for (const raw of matches) {
    const hex = raw.toLowerCase();
    if (ALLOWED.has(hex) || isGrey(hex) || isNeonFamily(hex)) continue;
    if (!seen.has(hex)) seen.set(hex, i + 1);
  }
});
for (const [hex, ln] of seen) {
  warn(`line ${ln}: off-brand color ${hex} (not in the DOTDAY palette)`);
  findings++;
}

// --- olive is retired ------------------------------------------------------
// The --olive token (#5b6e00 / #5c6b00, plus the dark-olive text shade #2c3500)
// was removed from the palette; readable accents use charcoal. Note: the
// neon-family heuristic above intentionally does NOT protect these - they are
// flagged explicitly here so they can never sneak back in.
lines.forEach((line, i) => {
  if (/var\(--olive\)|--olive\s*:|#5b6e00|#5c6b00|#2c3500/i.test(line)) {
    warn(`line ${i + 1}: olive is retired - use var(--charcoal) for readable accents`);
    findings++;
  }
});

// --- heading weight contract ------------------------------------------------
// Heroes are 600; every other H1/H2/H3 + card/section title is 400-600, never
// 700/800 (those are reserved for display elements: BigType statement titles,
// watermark spans, spec-value numerals, neon chips). Parses rule blocks and
// flags any heading-ish selector that declares font-weight >= 700.
const HEAVY_OK = new Set([".bigfeat-title", ".bigfeat-card-title"]);
const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
let m;
while ((m = ruleRe.exec(css))) {
  const selector = m[1].trim().split("\n").pop().trim();
  const body = m[2];
  const w = body.match(/font-weight:\s*([78]00)/);
  if (!w) continue;
  const headingish = /(^|[\s.,>+~])h[123]\b|-h[123]\b|title\b/.test(selector);
  if (!headingish) continue;
  if ([...HEAVY_OK].some((ok) => selector.includes(ok))) continue;
  const ln = css.slice(0, m.index).split("\n").length;
  warn(
    `line ${ln}: "${selector}" sets font-weight ${w[1]} - headings/titles are 400 (600 for heroes + conversion cards); 700/800 is display-only`
  );
  findings++;
}

// --- summary --------------------------------------------------------------
if (findings === 0) {
  console.log(
    `${DIM}brand-guard: globals.css clean - no Display, no serif, palette OK.${RESET}`
  );
} else {
  console.log(
    `${YELLOW}${BOLD}brand-guard: ${findings} warning(s) above.${RESET} ${DIM}(non-fatal; review against the brand palette / Wix Madefor Text rule.)${RESET}`
  );
}

// Warn-only: always succeed.
process.exit(0);
