import { Icon } from "@/components/site/Icon";

/**
 * Testimonials - three short field quotes from the Wix homepage. Keep these to
 * real, on-brand customer language (no superlatives added). Update copy here if
 * the source quotes change.
 */

const QUOTES = [
  {
    body: "Used SHIELD 3.2oz across my garden beds. Blocks weeds completely, easy to install, and holding up well after six months under mulch.",
    name: "Brooklyn",
    role: "DIY Home Gardener, OH",
    product: "SHIELD",
  },
  {
    body: "Installed SHIELD across our lavender rows. Controls weeds well, water flows through easily, and it held up through a full growing season.",
    name: "Trevor M.",
    role: "Farm Owner, OR",
    product: "SHIELD",
  },
  {
    body: "Using XBAR 5oz for gravel driveways and pathways. Strong, installs clean, and the base hasn't shifted at all.",
    name: "Mike",
    role: "Contractor, TX",
    product: "XBAR",
  },
];

export function Testimonials() {
  return (
    <section className="tmon">
      <div className="wrap">
        <div className="tmon-head">
          <span className="badge">From the field</span>
          <h2>Trusted on real projects.</h2>
        </div>
        <div className="tmon-grid">
          {QUOTES.map((q) => (
            <figure className="tcard" key={q.name}>
              <div className="tcard-stars" aria-label="5 out of 5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Icon key={i} name="star" size={15} />
                ))}
              </div>
              <blockquote>{q.body}</blockquote>
              <figcaption>
                <span className="tcard-name">{q.name}</span>
                <span className="tcard-role">{q.role}</span>
              </figcaption>
              <span className="tcard-tag">{q.product}</span>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
