import type { ProseBlock } from "@/lib/blog/types";
import { RichText } from "@/components/blog/ui/RichText";

function slugifyHeading(h?: string) {
  return h
    ? h
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    : undefined;
}

export function Prose({ block }: { block: ProseBlock }) {
  const id = slugifyHeading(block.heading);
  return (
    <div className="sec">
      {block.eyebrow && (
        <div className="eyebrow">
          <b>{block.eyebrow}</b>
        </div>
      )}
      {block.heading && <h2 id={id}>{block.heading}</h2>}
      <RichText body={block.body} />
    </div>
  );
}
