import Link from "next/link";
import { Img } from "@/components/primitives/Img";
import { Icon } from "@/components/site/Icon";
import { CTAButton } from "@/components/primitives/Badge";
import { VideoSection } from "@/components/sections/media/VideoSection";
import type { HubCard } from "@/lib/blog/hub";

/**
 * Blog hub sections - magazine-grade editorial layout. Server components fed
 * entirely by the derived HubModel (real posts, curated unique images). Visual
 * language matches the homepage: white-dominant, neon accents, Wix Madefor,
 * square-ish radii. Rainbow gradient is used sparingly + intentionally (the two
 * pull-quote bands and a couple of highlight words only).
 *
 * Every section degrades gracefully when there are few posts.
 */

function categorySlug(category: string): string {
  return category.replace(/[^a-z]/gi, "").toLowerCase();
}

/* ----------------------------------------------------------------- HERO --- */

export function HubHero({ hero }: { hero: HubCard | null }) {
  return (
    <section className="bhero">
      <div className="wrap bhero-grid">
        <div className="bhero-copy">
          <span className="bhero-trend-pill">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            Trending: Garden Transformations
          </span>
          <span className="bhero-eyebrow">
            <span className="bhero-eyebrow-dot" />
            The Groundwork
            <span className="bhero-eyebrow-sep">/</span>
            DOTDAY Field Guide
          </span>
          <h1 className="bhero-h1">
            Expert insights for <mark>landscapes that last</mark>.
          </h1>
          <p className="bhero-sub">
            Field-tested guides on choosing and installing the right landscape
            fabric, from the people who make it. Use the right fabric for the
            right ground condition.
          </p>
          <div className="bhero-cta">
            <CTAButton href="/fabric-finder" variant="primary">
              Find Your Fabric
            </CTAButton>
            <CTAButton href="/landscape-fabric-calculator" variant="ghost">
              Fabric Calculator
            </CTAButton>
          </div>
        </div>

        {hero ? (
          <Link href={hero.href} className="bhero-card">
            <Img
              src={hero.img}
              alt={hero.imgAlt}
              ratio="r-54"
              priority
              placeholderLabel={hero.kicker}
              sizes="(max-width: 980px) 100vw, 620px"
            />
            <span className="bhero-card-grad" aria-hidden="true" />
            <span className="bhero-card-tag">{hero.kicker}</span>
            <span className="bhero-card-body">
              <span className="bhero-card-eyebrow">Featured guide</span>
              <span className="bhero-card-title">{hero.title}</span>
              <span className="bhero-card-cta">
                Read the guide
                <Icon name="arrowRight" size={15} />
              </span>
            </span>
          </Link>
        ) : (
          <div className="bhero-card">
            <Img src={undefined} alt="DOTDAY landscape fabric" ratio="r-54" />
          </div>
        )}
      </div>

      <div className="bhero-stats">
        <div className="wrap bhero-stats-grid">
          <div className="bhero-stat">
            <span className="bhero-stat-n">95%+</span>
            <span className="bhero-stat-l">Weed suppression, right fabric</span>
          </div>
          <span className="bhero-stat-div" aria-hidden="true" />
          <div className="bhero-stat">
            <span className="bhero-stat-n">20+</span>
            <span className="bhero-stat-l">Year lifespan, premium woven</span>
          </div>
          <span className="bhero-stat-div" aria-hidden="true" />
          <div className="bhero-stat">
            <span className="bhero-stat-n">48</span>
            <span className="bhero-stat-l">States shipped from the USA</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- TRENDING --- */

export function TrendingRail({ cards }: { cards: HubCard[] }) {
  if (cards.length === 0) return null;
  return (
    <section className="wrap bsection btrend" aria-label="Trending now">
      <div className="bsec-head bsec-head--row">
        <h2 className="bsec-title">
          <Icon name="star" size={17} fill className="btrend-spark" />
          Trending now
        </h2>
        <Link href="/blog" className="bsec-all">
          View all
          <Icon name="arrowRight" size={14} />
        </Link>
      </div>
      <div className="btrend-rail">
        {cards.map((c, i) => (
          <Link className="btrend-card" href={c.href} key={c.slug}>
            <div className="btrend-media">
              <Img
                src={c.img}
                alt={c.imgAlt}
                ratio="r-43"
                placeholderLabel={c.kicker}
                sizes="(max-width: 700px) 80vw, 260px"
              />
              <span className="btrend-rank">{String(i + 1).padStart(2, "0")}</span>
              <span className="pill pill--level pill--onmedia">{c.level}</span>
            </div>
            <div className="btrend-body">
              <span className={`kicker kicker--${categorySlug(c.category)}`}>
                {c.kicker}
              </span>
              <h3>{c.title}</h3>
              <span className="meta">{c.readTime} read</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- FEATURED --- */

export function FeaturedArticles({ cards }: { cards: HubCard[] }) {
  if (cards.length === 0) return null;
  const [lead, ...rest] = cards;
  return (
    <section className="wrap bsection" aria-label="Featured articles">
      <div className="bsec-head">
        <span className="bsec-kicker">Editorial</span>
        <h2 className="bsec-title">Featured articles</h2>
      </div>
      <div className="bfeat-grid">
        <Link className="bfeat-lead" href={lead.href}>
          <div className="bfeat-lead-media">
            <Img
              src={lead.img}
              alt={lead.imgAlt}
              ratio="r-169"
              placeholderLabel={lead.kicker}
              sizes="(max-width: 980px) 100vw, 600px"
            />
            <span className={`kicker kicker--onmedia kicker--${categorySlug(lead.category)}`}>
              {lead.kicker}
            </span>
          </div>
          <div className="bfeat-lead-body">
            <h3>{lead.title}</h3>
            <p>{lead.excerpt}</p>
            <div className="bfeat-foot">
              <span className="meta">
                {lead.author} &middot; {lead.readTime}
              </span>
              <span className="link-arrow">
                Read <Icon name="arrowRight" size={14} />
              </span>
            </div>
          </div>
        </Link>

        <div className="bfeat-side">
          {rest.map((c) => (
            <Link className="bfeat-row" href={c.href} key={c.slug}>
              <div className="bfeat-row-media">
                <Img
                  src={c.img}
                  alt={c.imgAlt}
                  ratio="r-11"
                  placeholderLabel={c.kicker}
                  sizes="120px"
                />
              </div>
              <div className="bfeat-row-body">
                <span className={`kicker kicker--${categorySlug(c.category)}`}>
                  {c.kicker}
                </span>
                <h4>{c.title}</h4>
                <span className="meta">{c.readTime} read</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------- EXPERT QUOTE BAND --- */

export function ExpertQuote() {
  return (
    <section className="bquote" aria-label="From the DOTDAY team">
      <div className="wrap bquote-inner">
        <span className="bquote-mark" aria-hidden="true">&ldquo;</span>
        <p className="bquote-text">
          Quality landscape fabric isn&rsquo;t just about{" "}
          <span className="rainbow-text">weeds</span>. It&rsquo;s about building
          a surface that holds up, drains right, and stays low maintenance for
          years.
        </p>
        <p className="bquote-by">
          <span className="bquote-by-line" aria-hidden="true" />
          DOTDAY Field Team
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- EDITOR'S PICKS --- */

export function EditorsPicks({ cards }: { cards: HubCard[] }) {
  if (cards.length === 0) return null;
  return (
    <section className="wrap bsection" aria-label="Editor's picks">
      <div className="bsec-head">
        <span className="bsec-kicker">Hand-picked</span>
        <h2 className="bsec-title">Editor&rsquo;s picks</h2>
      </div>
      <div className="bpick-grid">
        {cards.map((c) => (
          <article className="bpick" key={c.slug}>
            <Link href={c.href} className="bpick-media">
              <Img
                src={c.img}
                alt={c.imgAlt}
                ratio="r-43"
                placeholderLabel={c.kicker}
                sizes="(max-width: 920px) 100vw, 380px"
              />
              <span className={`kicker kicker--onmedia kicker--${categorySlug(c.category)}`}>
                {c.kicker}
              </span>
              <span className="pill pill--level pill--onmedia pill--right">
                {c.level}
              </span>
            </Link>
            <div className="bpick-body">
              <span className="bpick-author">
                <span className="bpick-avatar" aria-hidden="true">
                  {c.authorMonogram}
                </span>
                <span className="bpick-author-meta">
                  <span className="bpick-author-name">{c.author}</span>
                  <span className="meta">{c.readTime} read</span>
                </span>
              </span>
              <Link href={c.href}>
                <h3>{c.title}</h3>
              </Link>
              <p>{c.excerpt}</p>
              <Link href={c.href} className="link-arrow">
                Read article <Icon name="arrowRight" size={14} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- DID YOU KNOW --- */

export function DidYouKnow() {
  return (
    <section className="bdyk-wrap" aria-label="Did you know">
      <div className="wrap">
        <div className="bdyk">
          <div className="bdyk-copy">
            <span className="bsec-kicker">Did you know?</span>
            <h2 className="bdyk-h2">
              The right fabric cuts watering and weeding, without chemicals.
            </h2>
            <p>
              Permeable construction holds soil moisture and regulates
              temperature while blocking weeds from below. The catch is matching
              the fabric to the job, a light bed cloth and a hardscape fabric
              are not interchangeable.
            </p>
            <ul className="bdyk-list">
              <li>
                <Icon name="check" size={15} className="bdyk-check" />
                Permeable build lets water and air reach the soil
              </li>
              <li>
                <Icon name="check" size={15} className="bdyk-check" />
                Blocks weeds from below with no herbicides
              </li>
              <li>
                <Icon name="check" size={15} className="bdyk-check" />
                UV-stabilized to hold up under mulch, gravel, and sun
              </li>
            </ul>
            <Link href="/post/landscape-fabric-thickness-chart" className="link-arrow link-arrow--strong">
              See the thickness chart by job
              <Icon name="arrowRight" size={14} />
            </Link>
          </div>
          <div className="bdyk-card">
            <span className="bdyk-card-n">3</span>
            <span className="bdyk-card-l">fabrics, one for each ground condition</span>
            <span className="bdyk-card-rows">
              <Link href="/product-page/shield-landscape-fabric" className="bdyk-fabric">
                <mark className="bdyk-fabric-name">SHIELD</mark>
                <span className="bdyk-fabric-use">beds &amp; weed barrier</span>
              </Link>
              <Link href="/product-page/xbar-landscape-fabric" className="bdyk-fabric">
                <mark className="bdyk-fabric-name">XBAR</mark>
                <span className="bdyk-fabric-use">gravel &amp; hardscape</span>
              </Link>
              <Link href="/product-page/terra-geotextile-fabric" className="bdyk-fabric">
                <mark className="bdyk-fabric-name">TERRA</mark>
                <span className="bdyk-fabric-use">drainage &amp; filtration</span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- LATEST --- */

export function LatestArticles({ cards }: { cards: HubCard[] }) {
  if (cards.length === 0) return null;
  return (
    <section className="wrap bsection" aria-label="Latest articles">
      <div className="bsec-head bsec-head--row">
        <div>
          <span className="bsec-kicker">Fresh off the bench</span>
          <h2 className="bsec-title">Latest articles</h2>
        </div>
        <Link href="/blog" className="bsec-all">
          Browse all
          <Icon name="arrowRight" size={14} />
        </Link>
      </div>
      <div className="blatest-grid">
        {cards.map((c) => (
          <Link className="blatest-card" href={c.href} key={c.slug}>
            <div className="blatest-media">
              <Img
                src={c.img}
                alt={c.imgAlt}
                ratio="r-169"
                placeholderLabel={c.kicker}
                sizes="(max-width: 920px) 100vw, 360px"
              />
            </div>
            <div className="blatest-body">
              <div className="blatest-meta-top">
                <span className={`kicker kicker--${categorySlug(c.category)}`}>
                  {c.kicker}
                </span>
                <span className="pill pill--level">{c.level}</span>
              </div>
              <h3>{c.title}</h3>
              <p>{c.excerpt}</p>
              <span className="meta">
                {c.author} &middot; {c.readTime}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------- VIDEO FEATURE ---- */

export function HubVideo() {
  return <VideoSection />;
}

/* ----------------------------------------------------- DOTDAY DIFFERENCE --- */

export function DifferenceBand() {
  const stats = [
    { n: "95%", l: "UV resistant", sub: "After 10 years" },
    { n: "20+", l: "Year lifespan", sub: "Premium woven" },
    { n: "100%", l: "Breathable", sub: "Full drainage" },
    { n: "USA", l: "Made & shipped", sub: "48 states" },
  ];
  return (
    <section className="bdiff" aria-label="The DOTDAY difference">
      <div className="wrap">
        <div className="bdiff-head">
          <h2>The DOTDAY difference</h2>
          <p>
            Premium landscape fabric engineered for performance. Three builds,
            one for each ground condition, trusted by contractors and serious
            growers.
          </p>
        </div>
        <div className="bdiff-grid">
          {stats.map((s) => (
            <div className="bdiff-card" key={s.l}>
              <span className="bdiff-n">{s.n}</span>
              <span className="bdiff-l">{s.l}</span>
              <span className="bdiff-sub">{s.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------- SUSTAINABLE GARDENING ---- */

export function SustainableGardening() {
  return (
    <section className="bsus-wrap" aria-label="Sustainable gardening">
      <div className="wrap bsus">
        <div className="bsus-media">
          <Img
            src="/home/apps/garden-beds.webp"
            alt="Eco-friendly garden grown over DOTDAY landscape fabric with no chemical herbicides"
            ratio="r-43"
            sizes="(max-width: 920px) 100vw, 540px"
          />
        </div>
        <div className="bsus-copy">
          <h2 className="bsus-title">Sustainable gardening starts here</h2>
          <p className="bsus-lead">
            Landscape fabric blocks weeds without chemical herbicides, which
            makes it an eco-friendly choice for conscientious growers. By holding
            soil moisture and reducing erosion, the right fabric protects both
            your garden and the ground it sits on.
          </p>

          <div className="bsus-stats">
            <div className="bsus-stat">
              <span className="bsus-stat-n">0</span>
              <div className="bsus-stat-body">
                <span className="bsus-stat-l">Chemical herbicides needed</span>
                <span className="bsus-stat-sub">Weeds are blocked from below, no spraying</span>
              </div>
            </div>
            <div className="bsus-stat">
              <span className="bsus-stat-n bsus-stat-n--arrow">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
                </svg>
                up to 60%
              </span>
              <div className="bsus-stat-body">
                <span className="bsus-stat-l">Less watering</span>
                <span className="bsus-stat-sub">Retains soil moisture, reduces runoff</span>
              </div>
            </div>
          </div>

          {/* Unverified marketing figures: shown as placeholders so the layout
              is complete but no unsourced claim is published. Replace the
              bracketed text with a confirmed, sourced number (or delete). */}
          <div className="bsus-cobenefit">
            <span className="bsus-cobenefit-n">[verify: CO2 saved]</span>
            <span className="bsus-cobenefit-l">
              CO&#8322; equivalent saved [verify: per 5,000 sq ft over 10 years]
            </span>
          </div>

          <Link href="/fabric-finder" className="link-arrow link-arrow--strong bsus-cta">
            Find your fabric
            <Icon name="arrowRight" size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------ FIELD QUOTE (BRIANA) --- */

export function FieldQuote() {
  return (
    <section className="bfq-wrap" aria-label="From a DOTDAY customer">
      <div className="wrap bfq">
        <div className="bfq-media">
          <Img
            src="/home/realjobs/bri-chicken-coop.webp"
            alt="Briana laying DOTDAY XBAR 5oz woven fabric along her chicken coop and farm beds in Oregon"
            ratio="r-54"
            sizes="(max-width: 920px) 100vw, 480px"
          />
          <span className="bfq-tag">XBAR 5oz &middot; Farm &amp; coop install</span>
        </div>
        <figure className="bfq-quotewrap">
          <div className="bfq-stars" aria-label="5 out of 5 stars">
            {[0, 1, 2, 3, 4].map((i) => (
              <Icon key={i} name="star" size={18} fill />
            ))}
          </div>
          <blockquote className="bfq-quote">
            Absolutely <span className="rainbow-text">love</span> this weed
            barrier. It&rsquo;s durable, thicker, and a game changer for having
            to pull weeds. It doesn&rsquo;t shred like its competitors. Dot Day
            has gained a customer for life over here!
          </blockquote>
          <figcaption className="bfq-by">
            <span className="bfq-by-name">Briana Talmage</span>
            <span className="bfq-by-role">
              Verified Amazon Purchase &middot; XBAR on a chicken-coop &amp; farm
              project, Oregon
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------------------- WHAT EXPERTS ARE SAYING ----- */

export function ExpertReviews() {
  // Real, attributable voices only. Briana = verified customer review;
  // Marcus = real DOTDAY specialist. Add more only with real, sourced quotes.
  const reviews = [
    {
      quote:
        "Absolutely love this weed barrier. It's durable, thicker, and a game changer for having to pull weeds. It doesn't shred like its competitors.",
      name: "Briana Talmage",
      role: "Verified Amazon Purchase",
      monogram: "BT",
    },
    {
      quote:
        "On hardscape and paver jobs, the dual-layer XBAR is what holds up. It resists the punching and pumping that tears a light garden cloth apart under a compacted base.",
      name: "Marcus Halvorsen",
      role: "Hardscape & Landscape Fabric Specialist, DOTDAY",
      monogram: "MH",
    },
  ];
  return (
    <section className="wrap bsection brev" aria-label="What experts and customers are saying">
      <div className="bsec-head" style={{ textAlign: "center" }}>
        <span className="bsec-kicker">Real voices</span>
        <h2 className="bsec-title brev-title">What people are saying</h2>
      </div>
      <div className="brev-grid">
        {reviews.map((r) => (
          <figure className="brev-card" key={r.name}>
            <div className="brev-stars" aria-label="5 out of 5 stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <Icon key={i} name="star" size={15} fill />
              ))}
            </div>
            <blockquote className="brev-quote">{r.quote}</blockquote>
            <figcaption className="brev-by">
              <span className="brev-avatar" aria-hidden="true">{r.monogram}</span>
              <span className="brev-by-meta">
                <span className="brev-by-name">{r.name}</span>
                <span className="brev-by-role">{r.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------- MISSION + MEET THE TEAM --- */

export function MissionTeam() {
  // Placeholder team members. Roles per brand: Nikita = Founder, Rakshit =
  // Co-Founder. Avatars are branded placeholder images in /home/team/;
  // swap for real headshots when available.
  const team = [
    { name: "Nikita", role: "Founder", img: "/home/team/nikita.webp" },
    { name: "Rakshit", role: "Co-Founder", img: "/home/team/rakshit.webp" },
    { name: "Marcus Halvorsen", role: "Hardscape & Fabric Specialist", img: "/home/team/marcus.webp" },
    { name: "Bri Talmage", role: "Field & Farm Projects", img: "/home/team/bri.webp" },
  ];
  return (
    <section className="bmt-wrap" aria-label="Our mission and team">
      <div className="wrap bmt-row">
        {/* LEFT: mission with subtle oversized watermark words */}
        <div className="bmt-mission">
          <span className="bmt-water bmt-water--1" aria-hidden="true">grow</span>
          <span className="bmt-water bmt-water--2" aria-hidden="true">right</span>
          <div className="bmt-mission-inner">
            <span className="bmt-leaf" aria-hidden="true">
              <Icon name="seedling" size={32} />
            </span>
            <span className="bsec-kicker bmt-mission-kicker">Our mission</span>
            <p className="bmt-statement">
              The right fabric, installed correctly, lasts for years. DOTDAY
              makes that simple, so you can get back to growing your landscape
              with ease.
            </p>
            <p className="bmt-tagline">
              <mark>Right fabric. Right ground.</mark>
            </p>
          </div>
        </div>

        {/* RIGHT: framed team box; title sits ON the top border line */}
        <div className="bmt-team">
          <h2 className="bmt-team-title">Meet the team</h2>
          <p className="bmt-team-sub">
            Say hello to the crew that tests, installs, and writes about the
            fabric that holds up on real jobs.
          </p>

          <div className="bmt-grid">
            {team.map((m) => (
              <div className="bmt-member" key={m.name}>
                <span className="bmt-photo">
                  <Img src={m.img} alt={m.name} ratio="r-11" sizes="110px" />
                </span>
                <span className="bmt-name">{m.name}</span>
                <span className="bmt-role">{m.role}</span>
              </div>
            ))}
          </div>

          <Link href="/contact-us" className="bmt-more">
            Meet the rest of the team
            <Icon name="arrowRight" size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
