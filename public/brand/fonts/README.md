# Wix Madefor Text - self-hosted webfonts

**Installed.** These WOFF2 files (Wix Madefor Text, latin subset, weights
400/500/600/700/800) are the real brand font, served locally so the build never
depends on a network call to Google Fonts. They are loaded by
`components/site/FontFace.tsx`.

Files:

    WixMadeforText-Regular.woff2     (400)
    WixMadeforText-Medium.woff2      (500)
    WixMadeforText-SemiBold.woff2    (600)
    WixMadeforText-Bold.woff2        (700)
    WixMadeforText-ExtraBold.woff2   (800)

Source: Fontsource (@fontsource/wix-madefor-text), which packages the official
Google Fonts files. Licensed under the SIL Open Font License 1.1 (free for
commercial use, embedding, and self-hosting).

To update: download a newer version from
https://fonts.google.com/specimen/Wix+Madefor+Text or
https://www.npmjs.com/package/@fontsource/wix-madefor-text and replace these
files (keep the same filenames).
