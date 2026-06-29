import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Contact DOTDAY",
  description:
    "Get in touch with DOTDAY Landscape Fabrics. Questions on SHIELD, XBAR, or TERRA, project quotes, or bulk orders for contractors, farms, and nurseries.",
  alternates: { canonical: "/contact-us" },
};

export default function ContactPage() {
  return (
    <div className="wrap page">
      <LeadForm
        formId="contact"
        submitLabel="Send Message"
        eyebrow="America's #1 Landscape Fabric"
        headline="Professional grade. Direct to you."
        lead="Questions on which fabric fits your job, a project quote, or a bulk order? Send a note and we will get back to you. In stock and ready to ship from Miami Gardens, FL."
        formTitle="Get started"
      />
    </div>
  );
}
