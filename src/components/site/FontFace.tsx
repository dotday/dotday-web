import fs from "node:fs";
import path from "node:path";

/**
 * FontFace - emits @font-face rules for self-hosted Wix Madefor Text, but ONLY
 * for the WOFF2 weight files that actually exist in public/brand/fonts/.
 *
 * Why not next/font? next/font/google needs a network fetch at build (fails in
 * offline CI), and next/font/local needs a statically-analyzable src array.
 * This approach:
 *   - never hits the network at build,
 *   - never breaks the build when font files are absent (emits nothing; the
 *     stack in globals.css falls back to system fonts),
 *   - activates the real brand font the moment you drop the WOFF2 files in.
 *
 * The --font-madefor variable is set on :root so globals.css picks it up. With
 * no files present, it resolves to the fallback stack already declared there.
 */

const FONT_DIR = path.join(process.cwd(), "public", "brand", "fonts");

const WEIGHTS: Array<{ file: string; weight: number }> = [
  { file: "WixMadeforText-Regular.woff2", weight: 400 },
  { file: "WixMadeforText-Medium.woff2", weight: 500 },
  { file: "WixMadeforText-SemiBold.woff2", weight: 600 },
  { file: "WixMadeforText-Bold.woff2", weight: 700 },
  { file: "WixMadeforText-ExtraBold.woff2", weight: 800 },
];

export function FontFace() {
  let present: typeof WEIGHTS = [];
  try {
    present = WEIGHTS.filter((w) => fs.existsSync(path.join(FONT_DIR, w.file)));
  } catch {
    present = [];
  }

  if (present.length === 0) {
    // No self-hosted files yet: point the variable at the fallback stack so
    // globals.css var(--font-madefor) still resolves to a real font.
    return (
      <style
        dangerouslySetInnerHTML={{
          __html: `:root{--font-madefor:'Wix Madefor Text',system-ui,sans-serif;}`,
        }}
      />
    );
  }

  const faces = present
    .map(
      (w) => `@font-face{
  font-family:'Wix Madefor Text';
  font-style:normal;
  font-weight:${w.weight};
  font-display:swap;
  src:url('/brand/fonts/${w.file}') format('woff2');
}`
    )
    .join("\n");

  // Preload the two most-used weights (400 body, 500 headings) to cut FOUT.
  const preloadWeights = present.filter((w) => w.weight === 400 || w.weight === 500);

  return (
    <>
      {preloadWeights.map((w) => (
        <link
          key={w.file}
          rel="preload"
          href={`/brand/fonts/${w.file}`}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      ))}
      <style
        dangerouslySetInnerHTML={{
          __html: `${faces}\n:root{--font-madefor:'Wix Madefor Text',system-ui,sans-serif;}`,
        }}
      />
    </>
  );
}
