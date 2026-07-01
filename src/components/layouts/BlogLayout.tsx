import type { BlogPost, RelatedPost } from "@/lib/blog/types";
import { ReadingProgress } from "@/components/primitives/ReadingProgress";
import { BlogHero } from "@/components/sections/heroes/BlogHero";
import { QuickAnswer } from "@/components/sections/editorial/QuickAnswer";
import { BlockRenderer } from "@/components/renderers/BlockRenderer";
import { ProductBlock } from "@/components/sections/product/ProductBlock";
import { FAQ } from "@/components/sections/editorial/FAQ";
import { RelatedArticles } from "@/components/sections/editorial/RelatedArticles";
import { AuthorBio } from "@/components/sections/editorial/AuthorBio";
import { FinalCTA } from "@/components/sections/conversion/FinalCTA";
import { getPostBySlug } from "@/lib/blog/loader";
import { resolveImage } from "@/lib/blog/images";

/**
 * Enrich each related post with its own hero image (resolved to a URL) so the
 * "Keep reading" cards show a real photo. The related link is `/post/<slug>`;
 * we look the post up and pull its hero. If the post or image can't be found,
 * the card falls back to the category placeholder (image stays undefined).
 */
function withRelatedImages(related: RelatedPost[]): RelatedPost[] {
  return related.map((r) => {
    const slug = r.url.replace(/^\/post\//, "").replace(/\/$/, "");
    const target = getPostBySlug(slug);
    if (!target?.hero?.image) return r;
    const src = resolveImage(target, target.hero.image.ref);
    if (!src) return r;
    return {
      ...r,
      image: {
        src,
        alt: target.hero.image.alt,
        focalPoint: target.hero.image.focalPoint,
      },
    };
  });
}

/**
 * BlogLayout - the fixed section arc for every post. Order is intentional and
 * matches the design + content standard:
 *
 *   progress -> hero -> quick answer -> body blocks -> product block ->
 *   FAQ -> closing hashtags -> related -> final CTA
 *
 * The body blocks (and their inline CTAs) come from post.blocks. Product block,
 * FAQ, and final CTA are always present. Header/footer come from the root
 * layout, so this component is purely the article.
 */
export function BlogLayout({ post }: { post: BlogPost }) {
  const closing = post.closingHashtags || post.seo.social.hashtags;
  return (
    <>
      <ReadingProgress />
      <BlogHero post={post} />

      {post.quickAnswer && <QuickAnswer data={post.quickAnswer} />}

      <div className="wrap">
        <div className="body-single">
          <article>
            <BlockRenderer blocks={post.blocks} post={post} />

            <ProductBlock />

            <FAQ faq={post.faq} />

            {closing?.length > 0 && (
              <div className="hashrow">{closing.join("  ")}</div>
            )}

            <AuthorBio post={post} />
          </article>
        </div>
      </div>

      <RelatedArticles posts={withRelatedImages(post.relatedPosts)} />
      <FinalCTA />
    </>
  );
}
