"use client";

import { useEffect } from "react";
import Script from "next/script";
import type { InstagramFeedData } from "@/lib/home/types";

/**
 * InstagramFeed - "More from the DOTDAY community." Live Instagram wall built on
 * Instagram's OFFICIAL embed system (embed.js + <blockquote class="instagram-
 * media">). Each real permalink renders to a live post/reel card; empty slots
 * render a branded placeholder tile. No API key, within TOS.
 *
 * CLIENT BEHAVIOR PRESERVED EXACTLY: still a client component; the embed.js
 * <Script>, the useEffect that re-runs window.instgrm.Embeds.process() on mount/
 * navigation, and the window.instgrm global typing are all unchanged. Only the
 * post permalinks + profile URL moved into `data` (POSTS/PROFILE_URL -> data.posts/
 * data.profileUrl). Authoring the wall is now editing data, not the component.
 *
 * To populate: paste real post/reel permalinks into data.posts; leave "" for an
 * unfilled slot. https://www.instagram.com/p/SHORTCODE/ (photo/carousel) or
 * https://www.instagram.com/reel/SHORTCODE/ (reel).
 */

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

function isPost(url: string) {
  return /instagram\.com\/(p|reel|tv)\//.test(url);
}

export const DEFAULT_INSTAGRAM_FEED: InstagramFeedData = {
  _type: "instagramFeed",
  eyebrow: "@dotday_landscape_fabrics",
  heading: "More from the DOTDAY community.",
  sub: "Real installs, tips, and field stories from gardens, farms, and job sites. Follow along on Instagram for the latest.",
  profileUrl: "https://www.instagram.com/dotday_landscape_fabrics/",
  posts: ["", "", "", ""],
};

export function InstagramFeed({
  data = DEFAULT_INSTAGRAM_FEED,
}: {
  data?: InstagramFeedData;
}) {
  const { eyebrow, heading, sub, profileUrl, posts } = data;

  // Re-run Instagram's parser after mount and on client navigation so any
  // blockquotes hydrate into real cards.
  useEffect(() => {
    if (typeof window !== "undefined" && window.instgrm) {
      window.instgrm.Embeds.process();
    }
  });

  const hasRealPosts = posts.some(isPost);

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
        {eyebrow && <span className="igf-eyebrow">{eyebrow}</span>}
        <h2 className="igf-title">{heading}</h2>
        {sub && <p className="igf-sub">{sub}</p>}
        <a className="igf-follow" href={profileUrl} target="_blank" rel="noopener noreferrer">
          Follow on Instagram
        </a>
      </div>

      <div className="wrap igf-grid">
        {posts.map((url, i) =>
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
              href={profileUrl}
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
