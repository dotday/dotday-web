import type { Metadata } from "next";
import { Badge } from "@/components/blog/ui/Badge";
import { LeadForm } from "@/components/site/LeadForm";

export const metadata: Metadata = {
  title: "Contact DOTDAY",
  description:
    "Get in touch with DOTDAY Landscape Fabrics. Questions on SHIELD, XBAR, or TERRA, project quotes, or bulk orders for contractors, farms, and nurseries.",
  alternates: { canonical: "/contact-us" },
};

export default function ContactPage() {
  return (
    <div className="wrap page">
      <Badge>Contact</Badge>
      <h1 style={{ marginTop: 14 }}>Get in touch</h1>
      <p className="lead">
        Questions on which fabric fits your job, a project quote, or a bulk order?
        Send a note and we will get back to you.
      </p>
      <div className="section">
        <LeadForm formId="contact" submitLabel="Send message" />
      </div>
    </div>
  );
}
