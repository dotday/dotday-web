import type { ImageBlock as ImageBlockType, BlogPost } from "@/lib/blog/types";
import { resolveImage } from "@/lib/blog/images";
import { Img } from "@/components/primitives/Img";

export function ImageBlock({
  block,
  post,
}: {
  block: ImageBlockType;
  post: Pick<BlogPost, "slug" | "images">;
}) {
  const src = resolveImage(post, block.ref);
  return (
    <figure style={{ margin: "26px 0" }}>
      <Img src={src} alt={block.alt} ratio="r-169" placeholderLabel={block.alt} />
      {block.caption && (
        <figcaption style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 8 }}>
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}
