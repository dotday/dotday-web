import Link from "next/link";
import { Badge } from "@/components/blog/ui/Badge";

/**
 * LegalPage - shared template for DOTDAY policy/legal pages (Privacy, Terms,
 * and any future Returns / Shipping pages). Matches the house page style used
 * across the site: a .wrap.page container, a neon Badge eyebrow, an h1, and a
 * .lead standfirst, followed by readable sections.
 *
 * Exports the three building blocks the policy pages compose with:
 *   - LegalPage    the page shell (eyebrow, title, standfirst, updated, current)
 *   - LegalSection a titled section (heading + children)
 *   - LegalList    a simple bulleted list (items)
 *   - LegalNote    an optional muted note callout (kept for forward use)
 *
 * Content lives in the page files (app/privacy-policy, app/terms-of-service);
 * this only owns layout, so policies are edited as copy without touching markup.
 */

export function LegalPage({
  eyebrow,
  title,
  standfirst,
  updated,
  current,
  children,
}: {
  eyebrow: string;
  title: string;
  standfirst?: string;
  /** Human-readable last-updated label, e.g. "June 2026". */
  updated?: string;
  /** Current path, used for the breadcrumb trail, e.g. "/privacy-policy". */
  current?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="wrap page legal">
      {current && (
        <nav className="crumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true"> / </span>
          <span>{title}</span>
        </nav>
      )}
      <Badge>{eyebrow}</Badge>
      <h1 style={{ marginTop: 14 }}>{title}</h1>
      {standfirst && <p className="lead">{standfirst}</p>}
      {updated && (
        <p className="legal-updated" style={{ color: "var(--muted)", fontSize: 13, marginTop: 8 }}>
          Last updated: {updated}
        </p>
      )}
      <div className="legal-body" style={{ marginTop: 24 }}>
        {children}
      </div>
    </div>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="legal-sec" style={{ marginTop: 28 }}>
      <h2>{heading}</h2>
      {children}
    </section>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="legal-list">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function LegalNote({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="legal-note"
      style={{
        marginTop: 16,
        padding: "12px 16px",
        background: "var(--grey1, #f4f4f4)",
        borderRadius: 8,
        fontSize: 14,
        color: "var(--muted)",
      }}
    >
      {children}
    </p>
  );
}
