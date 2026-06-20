import { Img } from "@/components/blog/ui/Img";
import { CTAButton } from "@/components/blog/ui/Badge";

/**
 * JobGallery - "Real jobs. Real ground." A band of authentic install photos
 * from the brand Drive (rolled out, cut to the planting guides, planted
 * through, fabric detail). Reinforces that this is field-proven product, not
 * stock. Ends with a Fabric Finder nudge.
 */

const SHOTS = [
  { src: "/brand/home/gal-rollout.webp", alt: "SHIELD landscape fabric rolled out across a planting plot on site", cap: "Roll out" },
  { src: "/brand/home/gal-cutting.webp", alt: "Cutting DOTDAY fabric to the 12-inch planting guide lines", cap: "Cut to the guide lines" },
  { src: "/brand/home/gal-planting.webp", alt: "Seedlings planted through DOTDAY weed barrier fabric in even rows", cap: "Plant through" },
  { src: "/brand/home/gal-guideline.webp", alt: "Close-up of DOTDAY woven fabric showing high-visibility planting guide lines", cap: "Guide lines for clean rows" },
];

export function JobGallery() {
  return (
    <section className="jobg jobg--dark">
      <div className="wrap">
        <div className="jobg-head">
          <div>
            <span className="badge">Real jobs. Real ground.</span>
            <h2>DOTDAY on the job across the US.</h2>
          </div>
          <p>
            From market gardens to gravel paths, this is field-proven fabric that
            cuts clean and lays flat.
          </p>
        </div>

        <div className="jobg-grid">
          {SHOTS.map((s) => (
            <figure className="jobg-item" key={s.src}>
              <Img src={s.src} alt={s.alt} ratio="r-54" placeholderLabel={s.cap} />
              <figcaption>{s.cap}</figcaption>
            </figure>
          ))}
        </div>

        <div className="jobg-cta">
          <span>Not sure which weight your project needs?</span>
          <CTAButton href="/fabric-finder" variant="primary">
            Find Your Fabric
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
