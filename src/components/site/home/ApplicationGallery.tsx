"use client";

import { useRef } from "react";
import Link from "next/link";
import { Icon } from "@/components/site/Icon";

/**
 * ApplicationGallery - "Built For Every Application."
 *
 * Horizontal-scroll row of circular application photos, each with a neon icon
 * badge, a title, a neon product-weight pill, and a one-line description. Tiles
 * link through to the matching product page (honest fit: garden -> SHIELD,
 * gravel/hardscape -> XBAR, drainage -> TERRA). Arrow controls + native scroll.
 *
 * Images are real install photography from the brand Drive, committed under
 * public/brand/home/apps/. Some scenes repeat across related categories until
 * dedicated photos exist; swap any file in that folder to refine.
 */

type App = {
  icon: "seedling" | "pottedPlant" | "greenhouse" | "car" | "footsteps" | "droplet";
  title: string;
  product: string;
  body: string;
  image: string;
  alt: string;
  href: string;
};

const APPS: App[] = [
  {
    icon: "seedling",
    title: "Garden Beds",
    product: "SHIELD 3.2 oz",
    body: "Weed control with water and nutrient flow.",
    image: "/brand/home/apps/garden-beds.webp",
    alt: "Seedlings planted through DOTDAY SHIELD fabric in a garden bed",
    href: "/product-page/shield-landscape-fabric",
  },
  {
    icon: "pottedPlant",
    title: "Raised Beds",
    product: "SHIELD 3.2 oz",
    body: "Protects soil quality and reduces weeds.",
    image: "/brand/home/apps/raised-beds.webp",
    alt: "DOTDAY SHIELD weed barrier lining a raised planting bed",
    href: "/product-page/shield-landscape-fabric",
  },
  {
    icon: "greenhouse",
    title: "Nurseries",
    product: "SHIELD 3.2 oz",
    body: "Ideal for plant rows and greenhouse floors.",
    image: "/brand/home/apps/nurseries.webp",
    alt: "DOTDAY SHIELD fabric laid across nursery plant rows",
    href: "/product-page/shield-landscape-fabric",
  },
  {
    icon: "car",
    title: "Driveways & Gravel",
    product: "XBAR 5 oz",
    body: "High strength for gravel, traffic, and stability.",
    image: "/brand/home/apps/driveways.webp",
    alt: "Gravel driveway stabilized over DOTDAY XBAR fabric",
    href: "/product-page/xbar-landscape-fabric",
  },
  {
    icon: "footsteps",
    title: "Walkways & Pathways",
    product: "XBAR 5 oz",
    body: "Stable base under pavers, stone, or mulch.",
    image: "/brand/home/apps/walkways.webp",
    alt: "DOTDAY XBAR fabric under a gravel walkway",
    href: "/product-page/xbar-landscape-fabric",
  },
  {
    icon: "droplet",
    title: "Drainage & Erosion",
    product: "TERRA 8 oz",
    body: "Allows water to flow while preventing soil washout.",
    image: "/brand/home/apps/drainage.webp",
    alt: "DOTDAY TERRA non-woven geotextile installed for drainage",
    href: "/product-page/terra-geotextile-fabric",
  },
];

export function ApplicationGallery() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="apps" aria-label="DOTDAY applications">
      <div className="wrap apps-head">
        <span className="apps-eyebrow">Where DOTDAY gets used</span>
        <h2 className="apps-title">Built for every application</h2>
        <p className="apps-sub">
          Explore common uses and find the right DOTDAY fabric for your project.
        </p>
      </div>

      <div className="apps-rail">
        <div className="apps-track" ref={trackRef}>
          {APPS.map((a) => (
            <Link className="apps-card" href={a.href} key={a.title}>
              <span className="apps-circle">
                <img
                  className="apps-img"
                  src={a.image}
                  alt={a.alt}
                  loading="lazy"
                  width={260}
                  height={260}
                />
                <span className="apps-badge" aria-hidden="true">
                  <Icon name={a.icon} size={22} />
                </span>
              </span>
              <span className="apps-name">{a.title}</span>
              <span className="apps-pill">{a.product}</span>
              <span className="apps-body">{a.body}</span>
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="apps-arrow apps-arrow--prev"
          aria-label="Scroll left"
          onClick={() => scrollBy(-1)}
        >
          <Icon name="arrowRight" size={18} />
        </button>
        <button
          type="button"
          className="apps-arrow apps-arrow--next"
          aria-label="Scroll right"
          onClick={() => scrollBy(1)}
        >
          <Icon name="arrowRight" size={18} />
        </button>
      </div>
    </section>
  );
}
