import type { BlogPost } from "@/lib/blog/types";
import Image from "next/image";
import { Badge } from "@/components/primitives/Badge";
import { Img } from "@/components/primitives/Img";
import { ShareButtons } from "@/components/primitives/ShareButtons";
import { resolveImage } from "@/lib/blog/images";
import { resolveAuthor } from "@/lib/blog/authors";
import { SITE_URL, site } from "@/lib/site";

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export function BlogHero({ post }: { post: BlogPost }) {
  const url = post.seo.canonical || `${SITE_URL}/post/${post.slug}`;
  const heroSrc = resolveImage(post, post.hero.image.ref);
  const pin = post.seo.social.pinterestImage
    ? resolveImage(post, post.seo.social.pinterestImage.ref)
    : heroSrc;
  const dateLabel = fmtDate(post.dateModified || post.publishedAt);
  const read = post.readTimeMinutes ? `${post.readTimeMinutes} min read` : "";
  const author = resolveAuthor(post.authorRef, post.author);
  // Byline avatar: a real person shows their photo, else their initials; a
  // generic DOTDAY/org post shows the DOTDAY brand mark instead of a text chip.
  const isOrg = author.type === "Organization";

  return (
    <header className="hero">
      <div className="wrap">
        <div className="crumb">
          Blog &nbsp;/&nbsp; {post.category}
        </div>
        <div className="hero-grid">
          <div>
            <Badge>{post.hero.badge || post.category}</Badge>
            <h1 className="bhero-h1">{post.title}</h1>
            <p className="excerpt">{post.hero.excerpt}</p>
            <div className="meta-row">
              <div className="author">
                {author.avatar ? (
                  <Image
                    className="avatar-img"
                    src={author.avatar}
                    alt={author.name}
                    width={40}
                    height={40}
                  />
                ) : isOrg ? (
                  <Image
                    className="avatar-mark"
                    src="/brand/dd-circle.png"
                    alt="DOTDAY"
                    width={40}
                    height={40}
                  />
                ) : (
                  <span className="avatar-mono" aria-hidden="true">
                    {author.monogram}
                  </span>
                )}
                <div>
                  <div className="author-name">{author.name}</div>
                  <div className="author-sub">
                    {author.title}
                    {(dateLabel || read) ? " · " : ""}
                    {dateLabel ? `Updated ${dateLabel}` : ""}
                    {dateLabel && read ? " · " : ""}
                    {read}
                  </div>
                </div>
              </div>
              <ShareButtons
                url={url}
                title={post.title}
                pinterestImage={pin}
                buttons={post.seo.social.shareButtons}
              />
            </div>
          </div>
          <Img
            src={heroSrc}
            alt={post.hero.image.alt}
            ratio="r-43"
            priority
            focalPoint={post.hero.image.focalPoint}
            placeholderLabel={post.hero.image.alt}
            sizes="(max-width: 980px) 100vw, 540px"
          />
        </div>
      </div>
    </header>
  );
}
