import Link from "next/link";
import { Icon } from "@/components/site/Icon";
import type { ToolsBandData } from "@/lib/home/types";

/**
 * ToolsBand - two-up panel pointing at the FabricFinder quiz and the fabric
 * calculator. Approved CTA copy only. Now data-driven; markup byte-identical
 * (tools-* / tool-card classes). DEFAULT_TOOLS_BAND holds today's content.
 */

export const DEFAULT_TOOLS_BAND: ToolsBandData = {
  _type: "toolsBand",
  tools: [
    {
      icon: "search",
      kicker: "60-second quiz",
      title: "FabricFinder\u2122",
      body: "Answer a few questions about your ground condition and get matched to SHIELD, XBAR, or TERRA.",
      cta: "Find Your Fabric",
      href: "/fabric-finder",
    },
    {
      icon: "qr",
      kicker: "Plan your order",
      title: "Fabric Calculator",
      body: "Enter your area and get the exact roll count, with a 10% overlap buffer added automatically.",
      cta: "Use the Fabric Calculator",
      href: "/landscape-fabric-calculator",
    },
  ],
};

export function ToolsBand({ data = DEFAULT_TOOLS_BAND }: { data?: ToolsBandData }) {
  return (
    <section className="wrap section">
      <div className="tools-grid">
        {data.tools.map((t) => (
          <Link className="tool-card" href={t.href} key={t.title}>
            <span className="tool-ico">
              <Icon name={t.icon} size={22} />
            </span>
            {t.kicker && <span className="tool-kicker">{t.kicker}</span>}
            <h3>{t.title}</h3>
            <p>{t.body}</p>
            <span className="tool-cta">
              {t.cta}
              <Icon name="arrowRight" size={15} className="tool-cta-arrow" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
