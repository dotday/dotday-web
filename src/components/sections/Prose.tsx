import type { ProseData } from "@/components/sections/types";
import { RichText } from "@/components/sections/RichText";

function slugifyHeading(h?: string) {
  return h
    ? h
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    : undefined;
}

/**
 * Prose - shared markdown-lite text block (H2 + RichText body). The workhorse
 * copy section, identical on blog + landing. Heading gets a slug id for in-page
 * anchors. Canonical home; blog re-exports a `{ block }` wrapper.
 */
export function Prose({ data }: { data: ProseData }) {
  const id = slugifyHeading(data.heading);
  return (
    <div className="sec">
      {data.eyebrow && (
        <div className="eyebrow">
          <b>{data.eyebrow}</b>
        </div>
      )}
      {data.heading && <h2 id={id}>{data.heading}</h2>}
      <RichText body={data.body} />
    </div>
  );
}
