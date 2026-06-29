import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { HomeDoc } from "@/lib/home/types";

/**
 * Home loader - reads content/home.json (the data-driven homepage). Same model
 * as the blog/landing loaders: one JSON file is the source of truth for the
 * homepage's section list, rendered through the shared registry.
 *
 * If the file is missing or malformed, returns null and the route falls back to
 * an empty section list (the special non-section bits - FAQ, blog list, CTA -
 * still render), so a bad edit can never blank the whole page silently in a way
 * that's hard to diagnose; the section list just comes back empty.
 */

const HOME_FILE = path.join(process.cwd(), "content", "home.json");

export function getHomeDoc(): HomeDoc | null {
  try {
    return JSON.parse(fs.readFileSync(HOME_FILE, "utf8")) as HomeDoc;
  } catch (err) {
    console.error("[home] failed to read content/home.json:", err);
    return null;
  }
}
