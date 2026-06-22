"use client";

import { useEffect } from "react";
import Script from "next/script";

/**
 * InstagramFeed - "More from the DOTDAY community."
 *
 * Live Instagram wall built on Instagram's OFFICIAL embed system (embed.js +
 * <blockquote class="instagram-media">). Each real permalink renders to a live
 * post/reel card: Instagram serves current content (caption, media, inline reel
 * playback), so the wall stays in sync with no API key and stays within TOS.
 *
 * HOW TO POPULATE (you do this once with real posts):
 * Open a post or reel on instagram.com, copy its URL, and paste it into POSTS:
 *   https://www.instagram.com/p/SHORTCODE/      (photo / carousel)
 *   https://www.instagram.com/reel/SHORTCODE/   (reel)
 * Each filled slot becomes a real embed. Empty slots ("") render a branded
 * placeholder tile so the section looks right before the links are added.
 *
 * On a fully auto-updating "every new post" feed: that needs Instagram's Graph
 * API (access token + Facebook Business + app review). This embed route is the
 * no-token, compliant path; refresh the wall by updating POSTS.
 */

const PROFILE_URL = "https://www.instagram.com/dotday_landscape_fabrics/";

// Paste real post/reel permalinks here. Leave "" for an unfilled slot.
const POSTS: string[] = ["", "", "", ""];

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

function isPost(url: string) {
  return /instagram\.com\/(p|reel|tv)\//.test(url);
}

export function InstagramFeed() {
  // Re-run Instagram's parser after mount and on client navigation so any
  // blockquotes hydrate into real cards.
  useEffect(() => {
    if (typeof window !== "undefined" && window.instgrm) {
      window.instgrm.Embeds.process();
    }
  });

  const hasRealPosts = POSTS.some(isPost);

  return (
    <section className="igf" aria-label="DOTDAY on Instagram">
      {hasRealPosts && (
        <Script
          src="https://www.instagram.com/embed.js"
          strategy="lazyOnload"
          onLoad={() => window.instgrm?.Embeds.process()}
        />
      )}

      <div className="wrap igf-head">
        <span className="igf-eyebrow">@dotday_landscape_fabrics</span>
        <h2 className="igf-title">
          More from the <mark>DOTDAY</mark> community.
        </h2>
        <p className="igf-sub">
          Real installs, tips, and field stories from gardens, farms, and job
          sites. Follow along on Instagram for the latest.
        </p>
        <a
          className="igf-follow"
          href={PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Follow on Instagram
        </a>
      </div>

      <div className="wrap igf-grid">
        {POSTS.map((url, i) =>
          isPost(url) ? (
            <blockquote
              key={`${url}-${i}`}
              className="instagram-media igf-card"
              data-instgrm-permalink={url}
              data-instgrm-version="14"
            >
              <a href={url} target="_blank" rel="noopener noreferrer">
                View this post on Instagram
              </a>
            </blockquote>
          ) : (
            <a
              key={`ph-${i}`}
              className="igf-ph"
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View DOTDAY on Instagram"
            >
              <span className="igf-ph-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
                </svg>
              </span>
              <span className="igf-ph-text">Add a post link</span>
              <span className="igf-ph-handle">@dotday_landscape_fabrics</span>
            </a>
          )
        )}
      </div>
    </section>
  );
}
