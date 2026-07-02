/* AUTO-GENERATED from the sibling *.schema.json by scripts/gen-types.mjs.
 * Do NOT edit by hand - edit the schema and run `npm run content:types`. */

/**
 * Multi-video playlist with in-box playback: a featured player (copy beside a poster frame that swaps to a privacy-enhanced YouTube embed or self-hosted MP4 on click) over a 'Watch more' selector rail. Data-driven counterpart to the single hardcoded videoFeature. This file is the SINGLE SOURCE OF TRUTH for the section's shape - the TS type is generated from it (VideoPlaylist.types.ts) and the landing-page doc schema $refs it.
 */
export interface VideoPlaylistSection {
  _type: "videoPlaylist";
  /**
   * Charcoal pill with neon glow above the player, e.g. 'What to watch now'.
   */
  eyebrow?: string;
  /**
   * Label above the selector rail. Defaults to 'Watch more'.
   */
  railLabel?: string;
  /**
   * Optional arrow link under the featured blurb, e.g. to the related guide.
   */
  link?: {
    label: string;
    href: string;
  };
  /**
   * @minItems 1
   */
  videos: [
    {
      title: string;
      blurb?: string;
      /**
       * YouTube video id; played via youtube-nocookie.com. Ignored when mp4 is set.
       */
      youtubeId?: string;
      /**
       * Self-hosted MP4 path; takes precedence over youtubeId.
       */
      mp4?: string;
      poster?: {
        /**
         * Poster image path under /public.
         */
        ref?: string;
        alt: string;
      };
    },
    ...{
      title: string;
      blurb?: string;
      /**
       * YouTube video id; played via youtube-nocookie.com. Ignored when mp4 is set.
       */
      youtubeId?: string;
      /**
       * Self-hosted MP4 path; takes precedence over youtubeId.
       */
      mp4?: string;
      poster?: {
        /**
         * Poster image path under /public.
         */
        ref?: string;
        alt: string;
      };
    }[]
  ];
}
