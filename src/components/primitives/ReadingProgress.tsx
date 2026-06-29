"use client";
import { useEffect } from "react";

/**
 * ReadingProgress - the neon scroll bar fixed at the top. Client component
 * because it listens to scroll. Mounted on article pages.
 */
export function ReadingProgress() {
  useEffect(() => {
    const bar = document.getElementById("progress");
    if (!bar) return;
    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
      bar.style.width = pct + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div id="progress" />;
}
