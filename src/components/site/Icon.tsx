import type { CSSProperties } from "react";

/**
 * Icon - tiny inline-SVG icon set for the header and footer. Using inline SVG
 * (rather than an icon font) keeps the site dependency-free and offline-safe,
 * and the icons inherit currentColor so they theme with their parent.
 *
 * Only the icons actually used in the chrome are included. Add paths as needed.
 */

const PATHS: Record<string, JSX.Element> = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>
  ),
  check: <polyline points="20 6 9 17 4 12" />,
  star: (
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  ),
  user: (
    <>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  cart: (
    <>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </>
  ),
  qr: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <line x1="14" y1="14" x2="14" y2="14" />
      <line x1="17.5" y1="14" x2="21" y2="14" />
      <line x1="14" y1="17.5" x2="14" y2="21" />
      <line x1="21" y1="17.5" x2="21" y2="21" />
      <line x1="17.5" y1="17.5" x2="17.5" y2="17.5" />
    </>
  ),
  chevronDown: <polyline points="6 9 12 15 18 9" />,
  arrowRight: (
    <>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </>
  ),
  menu: (
    <>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </>
  ),
  x: (
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>
  ),
  briefcase: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
  discount: (
    <>
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </>
  ),
  shieldCheck: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <polyline points="9 12 11 14 15 10" />
    </>
  ),
  seedling: (
    <>
      <path d="M12 22V11" />
      <path d="M12 11C12 7 9 5 5 5c0 4 3 6 7 6Z" />
      <path d="M12 13c0-3 3-5 7-5 0 3-3 5-7 5Z" />
    </>
  ),
  pottedPlant: (
    <>
      <path d="M12 13V8" />
      <path d="M12 8c0-2.5 2-4 4.5-4 0 2.5-2 4-4.5 4Z" />
      <path d="M12 9c0-2-1.8-3.5-4-3.5 0 2 1.8 3.5 4 3.5Z" />
      <path d="M6 13h12l-1.2 6.2a1 1 0 0 1-1 .8H8.2a1 1 0 0 1-1-.8L6 13Z" />
    </>
  ),
  greenhouse: (
    <>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v10h14V10" />
      <line x1="12" y1="6" x2="12" y2="20" />
      <line x1="8.5" y1="13" x2="8.5" y2="20" />
      <line x1="15.5" y1="13" x2="15.5" y2="20" />
    </>
  ),
  car: (
    <>
      <path d="M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13" />
      <path d="M4 13h16v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4Z" />
      <circle cx="7.5" cy="15.5" r="0.6" />
      <circle cx="16.5" cy="15.5" r="0.6" />
    </>
  ),
  footsteps: (
    <>
      <path d="M7 4c1.4 0 2 1.4 2 3.2 0 1.5-.4 3.3-1.6 3.3S5.4 9.2 5.4 7.6C5.4 5.6 5.6 4 7 4Z" />
      <path d="M6 12c1.6 0 2.4.8 2.4 2.4 0 1.4-.8 2.6-2 2.6S4 16 4 14.6C4 13 4.4 12 6 12Z" />
      <path d="M17 8c1.4 0 2 1.4 2 3.2 0 1.5-.4 3.3-1.6 3.3S15.4 13.2 15.4 11.6C15.4 9.6 15.6 8 17 8Z" />
      <path d="M16 16c1.6 0 2.4.8 2.4 2.4 0 1.4-.8 2.6-2 2.6S14 20 14 18.6C14 17 14.4 16 16 16Z" />
    </>
  ),
  droplet: (
    <path d="M12 3s6 6.5 6 10.5a6 6 0 0 1-12 0C6 9.5 12 3 12 3Z" />
  ),
  flag: (
    <>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1Z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </>
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
  facebook: (
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
  ),
  youtube: (
    <>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33Z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </>
  ),
  pinterest: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M9 20c.6-1.5 1.5-4.5 1.5-4.5M12 7a3.5 3.5 0 0 1 1 6.8c-1.2.4-2.3-.3-2.3-.3" />
      <line x1="11" y1="9.5" x2="9.8" y2="15.5" />
    </>
  ),
};

export function Icon({
  name,
  size = 20,
  stroke = 1.8,
  fill = false,
  style,
  className,
}: {
  name: keyof typeof PATHS | string;
  size?: number;
  stroke?: number;
  fill?: boolean;
  style?: CSSProperties;
  className?: string;
}) {
  const path = PATHS[name];
  if (!path) return null;
  // Brand icons (filled glyphs) read better as solid; line icons as stroked.
  const solid = fill || ["facebook", "youtube", "instagram"].includes(name);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={solid ? "currentColor" : "none"}
      stroke={solid ? "none" : "currentColor"}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    >
      {path}
    </svg>
  );
}
