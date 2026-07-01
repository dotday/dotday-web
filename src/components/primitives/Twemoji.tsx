/**
 * Twemoji - render a single emoji as Twitter's open-source flat SVG so it looks
 * identical on every device (native emoji render differently per OS, which
 * fights brand consistency). No library, no DOM scanning: we compute the
 * codepoint filename and load the SVG from the jsDelivr CDN.
 *
 * Used for the Problem/Solution section icon tiles. Decorative by default
 * (aria-hidden) since the eyebrow already labels the section.
 */

const TWEMOJI_BASE =
  "https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.0.3/assets/svg";

/** Emoji char -> hyphenated hex codepoints, dropping the VS16 (fe0f) that
 *  Twemoji filenames omit for most glyphs. */
function toCodepoints(emoji: string): string {
  const points: string[] = [];
  for (const ch of emoji) {
    const cp = ch.codePointAt(0);
    if (cp === undefined) continue;
    if (cp === 0xfe0f) continue; // variation selector, not in filename
    points.push(cp.toString(16));
  }
  return points.join("-");
}

export function Twemoji({
  emoji,
  size = 24,
  label,
}: {
  emoji: string;
  size?: number;
  label?: string;
}) {
  const code = toCodepoints(emoji);
  return (
    <img
      className="twemoji"
      src={`${TWEMOJI_BASE}/${code}.svg`}
      alt={label || ""}
      aria-hidden={label ? undefined : true}
      width={size}
      height={size}
      loading="lazy"
      draggable={false}
      style={{ width: size, height: size, display: "block" }}
    />
  );
}
