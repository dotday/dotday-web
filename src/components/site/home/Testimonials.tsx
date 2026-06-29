import { Icon } from "@/components/site/Icon";
import type { TestimonialsData } from "@/components/site/home/types";

/**
 * Testimonials - three short field quotes. Real, on-brand customer language (no
 * superlatives added). Now data-driven; markup byte-identical (tmon-* / tcard
 * classes). DEFAULT_TESTIMONIALS holds today's exact content (Option A).
 */

export const DEFAULT_TESTIMONIALS: TestimonialsData = {
  _type: "testimonials",
  badge: "From the field",
  heading: "Trusted on real projects.",
  quotes: [
    {
      body: "Used SHIELD 3.2oz across my garden beds. Blocks weeds completely, easy to install, and holding up well after six months under mulch.",
      name: "Brooklyn",
      role: "DIY Home Gardener, OH",
      product: "SHIELD",
      avatar: "/home/avatars/brooklyn.png",
    },
    {
      body: "Installed SHIELD across our lavender rows. Controls weeds well, water flows through easily, and it held up through a full growing season.",
      name: "Trevor M.",
      role: "Farm Owner, OR",
      product: "SHIELD",
      avatar: "/home/avatars/trevor.png",
    },
    {
      body: "Using XBAR 5oz for gravel driveways and pathways. Strong, installs clean, and the base hasn't shifted at all.",
      name: "Mike",
      role: "Contractor, TX",
      product: "XBAR",
      avatar: "/home/avatars/mike.png",
    },
  ],
};

export function Testimonials({
  data = DEFAULT_TESTIMONIALS,
}: {
  data?: TestimonialsData;
}) {
  return (
    <section className="tmon">
      <div className="wrap">
        <div className="tmon-head">
          {data.badge && <span className="badge">{data.badge}</span>}
          <h2>{data.heading}</h2>
        </div>
        <div className="tmon-grid">
          {data.quotes.map((q) => (
            <figure className="tcard" key={q.name}>
              <div className="tcard-stars" aria-label="5 out of 5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Icon key={i} name="star" size={15} />
                ))}
              </div>
              <blockquote>{q.body}</blockquote>
              <figcaption>
                {q.avatar && (
                  <img
                    className="tcard-avatar"
                    src={q.avatar}
                    alt={`${q.name} headshot`}
                    width={48}
                    height={48}
                    loading="lazy"
                  />
                )}
                <span className="tcard-meta">
                  <span className="tcard-name">{q.name}</span>
                  {q.role && <span className="tcard-role">{q.role}</span>}
                </span>
              </figcaption>
              {q.product && <span className="tcard-tag">{q.product}</span>}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
