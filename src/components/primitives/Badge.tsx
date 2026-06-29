import Link from "next/link";

export function Badge({
  children,
  white = false,
}: {
  children: React.ReactNode;
  white?: boolean;
}) {
  return <span className={`badge${white ? " badge-white" : ""}`}>{children}</span>;
}

type Variant = "primary" | "ghost" | "onneon" | "onneon-ghost";

/**
 * CTAButton - brand button. ALL CAPS + bold is enforced by the .btn class.
 * Internal links use next/link; external (store) fall back to <a>.
 */
export function CTAButton({
  href,
  variant = "primary",
  full = false,
  children,
}: {
  href: string;
  variant?: Variant;
  full?: boolean;
  children: React.ReactNode;
}) {
  const cls = `btn btn-${variant}${full ? " btn-full" : ""}`;
  const external = href.startsWith("http");
  if (external) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link className={cls} href={href}>
      {children}
    </Link>
  );
}
