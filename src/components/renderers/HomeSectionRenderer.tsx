import type { HomeSection } from "@/lib/home/types";
import { getSection } from "@/components/renderers/registry/registry";
import "@/components/renderers/registry/seed"; // registers all sections (side effect)
import { ProductBlock } from "@/components/sections/product/ProductBlock";

/**
 * HomeSectionRenderer - renders the home page's section list (from
 * content/home.json) through the SAME registry the landing renderer uses. This
 * is what makes the homepage data-driven: the route reads JSON and hands the
 * sections here; the registry maps each _type to its (now data-driven) component.
 *
 * productBlock is a zero-config shared section (the SHIELD/XBAR/TERRA trio) that
 * needs the page's `.wrap` container, so it's handled explicitly here rather than
 * via the registry's uniform `{ data }` path. Every other home section renders
 * directly from its data object.
 */
export function HomeSectionRenderer({ sections }: { sections: HomeSection[] }) {
  return (
    <>
      {sections.map((section, i) => {
        if (section._type === "productBlock") {
          return (
            <div className="wrap" key={i}>
              <ProductBlock />
            </div>
          );
        }
        const def = getSection(section._type);
        if (!def) return null;
        const C = def.component;
        return <C key={i} data={section} />;
      })}
    </>
  );
}
