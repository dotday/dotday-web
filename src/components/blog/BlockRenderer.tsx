import type { Block, BlogPost } from "@/lib/blog/types";
import { Prose } from "@/components/blog/blocks/Prose";
import { StatStrip } from "@/components/blog/blocks/StatStrip";
import { TrustStrip } from "@/components/blog/blocks/TrustStrip";
import { ComparisonTable } from "@/components/blog/blocks/ComparisonTable";
import { Callout } from "@/components/blog/blocks/Callout";
import { Steps } from "@/components/blog/blocks/Steps";
import { ImageBlock } from "@/components/blog/blocks/ImageBlock";
import { InlineCTA } from "@/components/blog/cta/InlineCTA";

/**
 * BlockRenderer - the dispatcher. Maps each block's `_type` to its component.
 * This is the only place that knows the block->component mapping; the page just
 * hands it `post.blocks`. Adding a new block type = add a case here + a type in
 * lib/blog/types.ts + the schema.
 */
export function BlockRenderer({
  blocks,
  post,
}: {
  blocks: Block[];
  post: Pick<BlogPost, "slug" | "images">;
}) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block._type) {
          case "prose":
            return <Prose key={i} block={block} />;
          case "statStrip":
            return <StatStrip key={i} block={block} />;
          case "trustStrip":
            return <TrustStrip key={i} block={block} />;
          case "comparisonTable":
            return <ComparisonTable key={i} block={block} />;
          case "proTip":
          case "warning":
            return <Callout key={i} block={block} />;
          case "steps":
            return <Steps key={i} block={block} />;
          case "image":
            return <ImageBlock key={i} block={block} post={post} />;
          case "cta":
            return <InlineCTA key={i} block={block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
