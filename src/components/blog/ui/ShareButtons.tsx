"use client";
import { useState } from "react";

/**
 * ShareButtons - Pinterest, Facebook, X, Copy (per brand rule; Instagram is a
 * follow link only, never a web-share button). Client component for the copy
 * action. The set is driven by the post's seo.social.shareButtons.
 */
export function ShareButtons({
  url,
  title,
  pinterestImage,
  buttons = ["pinterest", "facebook", "x", "copy"],
}: {
  url: string;
  title: string;
  pinterestImage?: string;
  buttons?: Array<"pinterest" | "facebook" | "x" | "copy">;
}) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const media = pinterestImage ? encodeURIComponent(pinterestImage) : "";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* clipboard unavailable - no-op */
    }
  };

  return (
    <div className="share">
      {buttons.includes("pinterest") && (
        <a
          className="share-btn"
          href={`https://pinterest.com/pin/create/button/?url=${u}&media=${media}&description=${t}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Save to Pinterest"
          title="Save to Pinterest"
        >
          P
        </a>
      )}
      {buttons.includes("facebook") && (
        <a
          className="share-btn"
          href={`https://www.facebook.com/sharer/sharer.php?u=${u}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          title="Share on Facebook"
        >
          f
        </a>
      )}
      {buttons.includes("x") && (
        <a
          className="share-btn"
          href={`https://twitter.com/intent/tweet?url=${u}&text=${t}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
          title="Share on X"
        >
          X
        </a>
      )}
      {buttons.includes("copy") && (
        <button
          className="share-btn"
          type="button"
          aria-label="Copy link"
          title="Copy link"
          onClick={copy}
        >
          {copied ? "✓" : "⧉"}
        </button>
      )}
    </div>
  );
}
