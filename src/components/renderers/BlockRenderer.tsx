import type { Block, BlogPost } from "@/lib/blog/types";
import { Prose } from "@/components/sections/_core/Prose";
import { StatStrip } from "@/components/sections/_core/StatStrip";
import { TrustStrip } from "@/components/sections/_core/TrustStrip";
import { Callout } from "@/components/sections/_core/Callout";
import { Steps } from "@/components/sections/_core/Steps";
import { ComparisonTable } from "@/components/sections/product/ComparisonTable";
import { ImageBlock } from "@/components/sections/media/ImageBlock";
import { InlineCTA } from "@/components/sections/conversion/InlineCTA";

/**
 * BlockRenderer - the blog dispatcher. Maps each block's `_type` to its
 * component. Prose/StatStrip/TrustStrip/Callout/Steps render from the shared
 * section core directly (data={block}); the former { block } pass-through
 * wrappers were removed. Adding a block type = a case here + a type in
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
            return <Prose key={i} data={block} />;
          case "statStrip":
            return <StatStrip key={i} data={block} />;
          case "trustStrip":
            return <TrustStrip key={i} data={block} />;
          case "comparisonTable":
            return <ComparisonTable key={i} block={block} />;
          case "proTip":
          case "warning":
            return <Callout key={i} data={block} />;
          case "steps":
            return <Steps key={i} data={block} />;
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
