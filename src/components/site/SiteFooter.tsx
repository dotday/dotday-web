import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/site/Icon";
import { ProListForm } from "@/components/site/ProListForm";
import { footer, site } from "@/lib/site";

/**
 * SiteFooter - matches the DOTDAY reference: a "Join the Pro List" signup band,
 * five link columns (Products / Resources / Account / Customer Service / Pro
 * Zone) beside the brand block, a payment + trust badge row, and a bottom legal
 * bar. Rendered once in the root layout.
 *
 * Mostly server-rendered; only the email field is a small client island.
 */

const socialIcon: Record<string, string> = {
  "brand-instagram": "instagram",
  "brand-facebook": "facebook",
  "brand-youtube": "youtube",
  "brand-pinterest": "pinterest",
};

const payColors: Record<string, string> = {
  VISA: "#1A1F71",
  MC: "#EB001B",
  AMEX: "#2E77BC",
  PayPal: "#003087",
};

function FLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  if (href.startsWith("http")) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="ftr-inner">
        {/* Pro List band */}
        <div className="ftr-proband">
          <div>
            <div className="ftr-pro-h">{footer.proList.heading}</div>
            <div className="ftr-pro-sub">{footer.proList.sub}</div>
          </div>
          <ProListForm />
        </div>

        {/* Columns */}
        <div className="ftr-cols">
          <div className="ftr-brandcol">
            <Link href="/" aria-label={`${site.shortName} home`} className="dd-logo-img">
              <Image
                src="/brand/logo-neon.png"
                alt={site.name}
                width={88}
                height={88}
              />
            </Link>
            <p className="ftr-desc">{site.description}</p>
            <div className="ftr-social">
              {footer.social.map((s) => (
                <a key={s.label} href={s.href} className="ftr-soc" aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  <Icon name={socialIcon[s.icon]} size={18} />
                </a>
              ))}
            </div>
          </div>

          {footer.columns.map((col) => (
            <div className="ftr-col" key={col.heading}>
              <div className="ftr-colh">{col.heading}</div>
              {col.links.map((l, i) => (
                <FLink key={`${l.label}-${i}`} href={l.href} className="ftr-lnk">
                  {l.label}
                </FLink>
              ))}
            </div>
          ))}
        </div>

        {/* Trust + payments band */}
        <div className="ftr-trustband">
          <div className="ftr-pay">
            <span className="ftr-accept">WE ACCEPT</span>
            {footer.payments.map((p) => (
              <span className="ftr-paychip" key={p} style={payColors[p] ? { color: payColors[p] } : undefined}>
                {p}
              </span>
            ))}
          </div>
          <div className="ftr-trust">
            {footer.trust.map((t) => (
              <span className="ftr-trustitem" key={t.label}>
                <Icon
                  name={t.icon === "shield-check" ? "shieldCheck" : "flag"}
                  size={17}
                  style={{ color: t.icon === "shield-check" ? "#1D9E75" : "#378ADD" }}
                />
                {t.label}
              </span>
            ))}
            <span className="ftr-trustpilot">
              <Icon name="star" size={15} style={{ color: "#85a300" }} />
              Excellent on Trustpilot
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="ftr-botbar">
          <span className="ftr-copy">
            &copy; {year} {site.name}. All rights reserved. &nbsp;|&nbsp; thedotday.com
          </span>
          <div className="ftr-legal">
            {footer.legal.map((l) => (
              <FLink key={l.label} href={l.href} className="ftr-legallnk">
                {l.label}
              </FLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
