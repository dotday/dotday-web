import { Img } from "@/components/blog/ui/Img";
import { CTAButton } from "@/components/blog/ui/Badge";
import type { JobGalleryData } from "@/components/site/home/types";

/**
 * JobGallery - "Real jobs. Real ground." A band of authentic install photos.
 * Now data-driven; markup byte-identical (jobg-* classes). DEFAULT_JOB_GALLERY
 * holds today's content.
 */

export const DEFAULT_JOB_GALLERY: JobGalleryData = {
  _type: "jobGallery",
  badge: "Real jobs. Real ground.",
  heading: "DOTDAY on the job across the US.",
  intro:
    "From market gardens to gravel paths, this is field-proven fabric that cuts clean and lays flat.",
  shots: [
    { src: "/home/gal-rollout.webp", alt: "SHIELD landscape fabric rolled out across a planting plot on site", cap: "Roll out" },
    { src: "/home/gal-cutting.webp", alt: "Cutting DOTDAY fabric to the 12-inch planting guide lines", cap: "Cut to the guide lines" },
    { src: "/home/gal-planting.webp", alt: "Seedlings planted through DOTDAY weed barrier fabric in even rows", cap: "Plant through" },
    { src: "/home/gal-guideline.webp", alt: "Close-up of DOTDAY woven fabric showing high-visibility planting guide lines", cap: "Guide lines for clean rows" },
  ],
  ctaLabel: "Find Your Fabric",
  ctaHref: "/fabric-finder",
};

export function JobGallery({ data = DEFAULT_JOB_GALLERY }: { data?: JobGalleryData }) {
  return (
    <section className="jobg jobg--dark">
      <div className="wrap">
        <div className="jobg-head">
          <div>
            {data.badge && <span className="badge">{data.badge}</span>}
            <h2>{data.heading}</h2>
          </div>
          {data.intro && <p>{data.intro}</p>}
        </div>

        <div className="jobg-grid">
          {data.shots.map((s) => (
            <figure className="jobg-item" key={s.src}>
              <Img src={s.src} alt={s.alt} ratio="r-54" placeholderLabel={s.cap} />
              {s.cap && <figcaption>{s.cap}</figcaption>}
            </figure>
          ))}
        </div>

        {data.ctaLabel && data.ctaHref && (
          <div className="jobg-cta">
            <span>Not sure which weight your project needs?</span>
            <CTAButton href={data.ctaHref} variant="primary">
              {data.ctaLabel}
            </CTAButton>
          </div>
        )}
      </div>
    </section>
  );
}
