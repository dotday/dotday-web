import type { Metadata } from "next";
import { Badge } from "@/components/blog/ui/Badge";
import { LeadForm } from "@/components/site/LeadForm";

export const metadata: Metadata = {
  title: "Bulk Pricing for Contractors & Farms",
  description:
    "Request volume pricing on DOTDAY landscape fabric. Bulk rolls of SHIELD, XBAR, and TERRA for contractors, hardscape crews, farms, and nurseries.",
  alternates: { canonical: "/bulk-pricing" },
};

export default function BulkPricingPage() {
  return (
    <div className="wrap page">
      <Badge>For job sites</Badge>
      <h1 style={{ marginTop: 14 }}>Request bulk pricing</h1>
      <p className="lead">
        Volume pricing for contractors, hardscape crews, farms, and nurseries.
        Tell us the product and quantity and we will put together a quote.
      </p>
      <div className="section">
        <LeadForm formId="bulk-pricing" submitLabel="Request Bulk Pricing" />
      </div>
    </div>
  );
}
