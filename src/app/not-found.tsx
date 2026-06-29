import Link from "next/link";
import { Badge } from "@/components/primitives/Badge";

export default function NotFound() {
  return (
    <div className="wrap page" style={{ minHeight: "50vh" }}>
      <Badge>404</Badge>
      <h1 style={{ marginTop: 14 }}>Page not found</h1>
      <p className="lead">
        That page does not exist. Head back to the{" "}
        <Link className="ilink" href="/">
          homepage
        </Link>{" "}
        or browse the{" "}
        <Link className="ilink" href="/blog">
          blog
        </Link>
        .
      </p>
    </div>
  );
}
