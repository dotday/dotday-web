/**
 * DOTDAY Google Drive image library - the source map for page imagery.
 *
 * When Claude (or you) creates a page, images come from Drive: pick the right
 * file from the right product folder, download it, optimize to WebP, and place
 * it under /public/blog/<slug>/ (posts) or /public/brand/products/ (products).
 *
 * This manifest records the real folder IDs and notable files so image sourcing
 * is consistent and never guesses. IDs are from the DOTDAY brand Drive
 * (owner: dotdaydesigns@gmail.com). See scripts/fetch-drive-images.md for the
 * download + convert workflow.
 *
 * NOTE: this file is reference data for the build/authoring process. It is not
 * imported by the running site (the site only serves the optimized WebP files
 * already placed in /public).
 */

export interface DriveFolder {
  id: string;
  label: string;
  useFor: string;
}

/** Top-level + per-product folders. */
export const DRIVE_FOLDERS = {
  parentBrand: {
    id: "1Sw_v7muVEruoweCI7CQOXKBSeRdSoU_x",
    label: "Parent brand folder (branded PNGs: Shield_*, XBar_*, Terra_*)",
    useFor: "Branded product graphics for all three products + hero/product imagery.",
  },
  shieldRaw: {
    id: "1CH0aMxUU4EKUM8zYgBs-xtEBOF-9QY1D",
    label: "SHIELD raw photos (IMG_3089-3713, 50+ JPGs)",
    useFor: "Garden, mulch, weed-control, and installation blog imagery.",
  },
  shieldBranded: {
    id: "1Sw_v7muVEruoweCI7CQOXKBSeRdSoU_x",
    label: "SHIELD branded PNGs (Shield_02-07)",
    useFor: "SHIELD product cards, comparison graphics.",
  },
  xbarRawLifestyle: {
    id: "1v5oIXSrjxxKwqo1xSXc8Uu6M-OJsdNgN",
    label: "XBAR raw lifestyle (IMG_3402-3404)",
    useFor: "Gravel, hardscape, paver blog imagery.",
  },
  xbarAplus: {
    id: "156aOUI7XPRUTDOZUh04LvoGMxJN4aGU6",
    label: "XBAR A+ images (5oz_S01-05, 5oz_MS01-05 macro, 5oz_B01-04 banners, 5oz_Applications.png)",
    useFor: "XBAR product cards, macro construction shots, application banners.",
  },
  terraBranded: {
    id: "1Sw_v7muVEruoweCI7CQOXKBSeRdSoU_x",
    label: "TERRA branded assets (Terra_02-09, Terra_06_4oz/6oz/8oz.png)",
    useFor: "Drainage, French drain, retaining wall blog + product imagery.",
  },
  press: {
    id: "14qLm_qtFkZteEN485ER11JwgNS1VjIAt",
    label: "Press images (Turf Magazine.png, In the Press.png)",
    useFor: "Trust/credibility sections, 'as featured in' strips.",
  },
} satisfies Record<string, DriveFolder>;

/**
 * Known good files already used in the build (Drive file IDs). Extend as you
 * pull more. These are the safe defaults to reach for per product.
 */
export const DRIVE_FILES = {
  // Product card images currently shipped in /public/brand/products/
  shieldProduct: { id: "1uDQV-OJY3VlwMyn1DcdfFeYSm0qSJU-M", title: "Shield_06.png", out: "/brand/products/shield.webp" },
  xbarProduct: { id: "1Lxr6xM0MVOE70H5l00k7Xr91aQBpQxGz", title: "XBar_06.png", out: "/brand/products/xbar.webp" },
  terraProduct: { id: "19pxLEPmal86hoV7ENHS9LefIiLv9Qeal", title: "Terra_05.jpg", out: "/brand/products/terra.webp" },

  // Other notable branded assets (good for blog heroes / sections)
  terraApplications: { id: "19pxLEPmal86hoV7ENHS9LefIiLv9Qeal", title: "Terra_05.jpg (applications grid)", out: "" },
  terraLayers: { id: "1r7sKlmrPrl3rYm6y7d_o6ff6RmJrpV88", title: "Terra_03.jpg (soil separation diagram)", out: "" },
  terraPress: { id: "1n9NyHirYhUfaGHCvM9y7nHuKLCuJLxH3", title: "Terra_09.jpg (featured-in publications)", out: "" },
  xbarPromise: { id: "1yV3gFrp9quVfGqK-DuL2Y7UBE2Q5tRca", title: "XBar_05.png (DOTDAY promise vs others)", out: "" },
  xbarInstall: { id: "1VqSq9_ZKgc6mNiR3iawJwcFqHoK_LOYA", title: "XBar_08.png (install steps)", out: "" },
} as const;

/**
 * Which folder to pull from for a given primary product. Authoring helper.
 */
export const PRODUCT_FOLDER = {
  SHIELD: ["shieldRaw", "shieldBranded"],
  XBAR: ["xbarRawLifestyle", "xbarAplus"],
  TERRA: ["terraBranded"],
  MULTIPLE: ["parentBrand"],
  NONE: ["parentBrand"],
} as const;
