/**
 * LeadFormSplit - lead capture band for landing pages. Ported from the
 * approved my-qr-zone V3 proof, which was itself drawn "faithful to LeadForm":
 * all split-layout markup, fields, trust badges, spam defense, and the
 * /api/lead contract stay in components/forms/LeadForm (leadsplit-* / lf-*
 * classes in globals.css). This section adds only the light-grey band with a
 * centered eyebrow + heading and passes LeadForm its copy props.
 * Schema-first: shape lives in LeadFormSplit.schema.json (types generated).
 */
import { LeadForm } from "@/components/forms/LeadForm";
import type { LeadFormSplitSection } from "./LeadFormSplit.types";

export function LeadFormSplit({ data }: { data: LeadFormSplitSection }) {
  return (
    <section className="sec" style={{ background: "var(--paper2)" }} aria-label={data.heading || "Contact"}>
      <div className="wrap">
        {(data.eyebrow || data.heading) && (
          <div className="lfs-head">
            {data.eyebrow && (
              <div className="badgewrap"><span className="pch-eyebrow">{data.eyebrow}</span></div>
            )}
            {data.heading && <h2>{data.heading}</h2>}
          </div>
        )}
        <LeadForm
          formId={data.formId}
          {...(data.railEyebrow ? { eyebrow: data.railEyebrow } : {})}
          {...(data.headline ? { headline: data.headline } : {})}
          {...(data.lead ? { lead: data.lead } : {})}
          {...(data.submitLabel ? { submitLabel: data.submitLabel } : {})}
        />
      </div>
    </section>
  );
}
