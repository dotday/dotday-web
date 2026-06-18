"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/site/Icon";
import { marquee, nav, site } from "@/lib/site";

/**
 * SiteHeader - matches the DOTDAY reference: a scrolling neon promo marquee, a
 * row with the stacked logo + search bar + center links + utility cluster
 * (USD / QRZone / account / cart), and a secondary row with a Shop All dropdown.
 *
 * Behavior: the marquee scrolls continuously; the bar compacts and the
 * secondary row tucks away on scroll; below 860px the desktop bits collapse
 * into a hamburger panel that includes the search field.
 *
 * Client component because of the scroll listener, dropdown, and mobile toggle.
 */

const iconFor: Record<string, string> = { check: "check", user: "user", star: "star" };

function NavLink({
  href,
  className,
  children,
  onClick,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  if (href.startsWith("http")) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

function Logo() {
  return (
    <Link href="/" aria-label={`${site.shortName} home`} className="dd-logo-img">
      <Image
        src="/brand/logo-neon.png"
        alt={site.name}
        width={72}
        height={72}
        priority
      />
    </Link>
  );
}

export function SiteHeader() {
  const [mobOpen, setMobOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 26);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${compact ? " is-compact" : ""}`}>
      <div className="marquee" aria-label="Store announcements">
        <div className="marquee-track">
          {[0, 1, 2].map((dup) => (
            <span className="marquee-group" key={dup} aria-hidden={dup > 0}>
              {marquee.map((m, i) => (
                <span className="marquee-item" key={`${dup}-${i}`}>
                  <span className="marquee-sep">|</span>
                  {m.icon && iconFor[m.icon] && (
                    <Icon name={iconFor[m.icon]} size={14} style={{ marginRight: 6 }} />
                  )}
                  {m.text}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="hdr-row1">
        <Logo />

        <div className="hdr-search desk-only">
          <Icon name="search" size={18} className="hdr-search-icon" />
          <input type="text" placeholder="Search..." aria-label="Search" />
        </div>

        <nav className="hdr-center desk-only" aria-label="Primary">
          {nav.centerLinks.map((l) => (
            <NavLink key={l.label} href={l.href} className="hdr-toplnk">
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hdr-divider desk-only" />

        <div className="hdr-utility">
          <button className="hdr-util desk-only" type="button" aria-label="Currency: US dollar">
            <span className="us-flag" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            {nav.utility.currency}
            <Icon name="chevronDown" size={13} />
          </button>
          <NavLink href={nav.utility.qrzone.href} className="hdr-util desk-only">
            <Icon name="qr" size={18} />
            {nav.utility.qrzone.label}
          </NavLink>
          <NavLink href={nav.utility.account.href} className="hdr-icon desk-only">
            <span aria-label="Account">
              <Icon name="user" size={21} />
            </span>
          </NavLink>
          <NavLink href={nav.utility.cart.href} className="hdr-icon hdr-cart">
            <span aria-label="Cart">
              <Icon name="cart" size={21} />
            </span>
            {nav.utility.cart.count > 0 && (
              <span className="hdr-cart-badge">{nav.utility.cart.count}</span>
            )}
          </NavLink>
          <button
            type="button"
            className="hdr-icon mob-only"
            aria-label={mobOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobOpen}
            onClick={() => setMobOpen((v) => !v)}
          >
            <Icon name={mobOpen ? "x" : "menu"} size={22} />
          </button>
        </div>
      </div>

      <div className="hdr-row2 desk-only">
        <div className="hdr-row2-inner">
          {nav.secondary.map((l) => (
            <NavLink key={l.label} href={l.href} className="hdr-lvl2">
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>

      {mobOpen && (
        <div className="hdr-mobpanel mob-only">
          <div className="hdr-mobsearch">
            <Icon name="search" size={17} className="hdr-search-icon" />
            <input type="text" placeholder="Search..." aria-label="Search" />
          </div>
          <div className="hdr-mgrp">Shop</div>
          {nav.secondary.map((l) => (
            <NavLink key={l.label} href={l.href} className="hdr-mlnk" onClick={() => setMobOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <div className="hdr-mgrp">Explore</div>
          {nav.centerLinks.map((l) => (
            <NavLink key={l.label} href={l.href} className="hdr-mlnk" onClick={() => setMobOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <div className="hdr-mutil-row">
            <NavLink href={nav.utility.account.href} className="hdr-mutil">
              <Icon name="user" size={16} /> Account
            </NavLink>
            <NavLink href={nav.utility.qrzone.href} className="hdr-mutil">
              <Icon name="qr" size={16} /> My QRZone
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
