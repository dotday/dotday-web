import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Bulk Pricing for Contractors & Farms",
  description:
    "Request volume pricing on DOTDAY landscape fabric. Bulk rolls of SHIELD, XBAR, and TERRA for contractors, hardscape crews, farms, and nurseries.",
  alternates: { canonical: "/bulk-pricing" },
};

export default function BulkPricingPage() {
  return (
    <div className="wrap page">
      <LeadForm
        formId="bulk-pricing"
        submitLabel="Request Wholesale Pricing"
        eyebrow="America's #1 Landscape Fabric"
        headline="Professional grade. Direct to you."
        lead="Stop weeds forever or scale your landscape business with the industry's strongest fabric. In stock and ready to ship from Miami Gardens, FL."
        formTitle="Get started"
      />
    </div>
  );
}
