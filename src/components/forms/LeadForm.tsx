"use client";
import { useState, useRef } from "react";
import { Icon } from "@/components/site/Icon";

/**
 * LeadForm - the shared capture form for contact, bulk pricing, and project
 * quotes. Posts to /api/lead. Per the page-builder skill, the *submission
 * target* lives in code (Supabase, when wired); the copy lives in the page.
 * The `formId` distinguishes which funnel a lead came from.
 *
 * No HTML <form> submit navigation - uses fetch so the user stays on-page.
 *
 * Layout: a two-column "split" card that mirrors the DOTDAY Wix contact design.
 * The left rail carries the value proposition + trust badges; the right card is
 * the form itself (neon top edge, paired fields, black submit bar). On narrow
 * screens the two columns stack (rail first).
 *
 * Fields captured: role ("I am a..."), name, email, company, phone, message.
 * `role` and `phone` are newer than the API's typed columns, so they are folded
 * into the `message` string as a labeled prefix. This keeps the /api/lead +
 * Supabase contract ({ name, email, company, message }) unchanged while still
 * recording every field a lead submits. When the leads table grows dedicated
 * `role` / `phone` columns, send them as top-level keys instead.
 *
 * Spam defense paired with the API: a hidden honeypot field (company_url) that
 * real users never see, plus renderedAt timing so the server can reject
 * bot-speed submits.
 */

const ROLE_OPTIONS = [
  "Homeowner (DIY Project)",
  "Professional Landscaper / Contractor",
  "Distributor / Retailer",
] as const;

type TrustBadge = { icon: string; title: string; note: string };

const TRUST_BADGES: TrustBadge[] = [
  { icon: "shieldCheck", title: "20-Year Warranty", note: "Guaranteed durability" },
  { icon: "check", title: "Same-Day Shipping", note: "Orders before 2PM EST" },
  { icon: "flag", title: "10M+ Sq Ft Sold", note: "Proven performance" },
  { icon: "user", title: "5,000+ Pro Partners", note: "Trusted by the best" },
];

export function LeadForm({
  formId,
  submitLabel = "Send",
  eyebrow = "America's #1 Landscape Fabric",
  headline = "Professional grade. Direct to you.",
  lead = "Built for serious ground conditions. SHIELD, XBAR, and TERRA, in stock and ready to ship from Miami Gardens, FL.",
  formTitle = "Get started",
  showCompany = true,
  showProject = true,
  showRole = true,
  showPhone = true,
  showTrust = true,
}: {
  formId: "contact" | "bulk-pricing" | "quote";
  submitLabel?: string;
  eyebrow?: string;
  headline?: string;
  lead?: string;
  formTitle?: string;
  showCompany?: boolean;
  showProject?: boolean;
  showRole?: boolean;
  showPhone?: boolean;
  showTrust?: boolean;
}) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const renderedAt = useRef<number>(Date.now());
  const honeypot = useRef<string>("");
  const [form, setForm] = useState({
    role: ROLE_OPTIONS[0] as string,
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const set =
    (k: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const projectLabel =
    formId === "bulk-pricing" ? "Quantity + product" : "How can we help?";
  const projectPlaceholder =
    formId === "bulk-pricing"
      ? "Tell us project size, fabric (3.2oz SHIELD / XBAR 5oz / TERRA NW), and est. roll quantity..."
      : "Tell us project size, fabric (3.2oz SHIELD / XBAR 5oz / TERRA NW), and est. roll quantity...";

  const submit = async () => {
    if (!form.name || !form.email) {
      setState("error");
      return;
    }
    setState("sending");

    // Fold the newer role/phone fields into message context so the existing
    // {name,email,company,message} API + DB contract stays unchanged.
    const contextLines: string[] = [];
    if (showRole && form.role) contextLines.push(`Role: ${form.role}`);
    if (showPhone && form.phone) contextLines.push(`Phone: ${form.phone}`);
    const composedMessage = contextLines.length
      ? `${contextLines.join("\n")}\n\n${form.message}`.trim()
      : form.message;

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          message: composedMessage,
          // Sent for forward-compat; the API ignores unknown keys today and can
          // promote these to columns later without a client change.
          role: form.role,
          phone: form.phone,
          formId,
          company_url: honeypot.current,
          renderedAt: renderedAt.current,
        }),
      });
      setState(res.ok ? "ok" : "error");
      if (res.ok)
        setForm({
          role: ROLE_OPTIONS[0],
          name: "",
          email: "",
          company: "",
          phone: "",
          message: "",
        });
    } catch {
      setState("error");
    }
  };

  return (
    <div className="leadsplit">
      {/* LEFT RAIL: value proposition + trust badges */}
      <div className="leadsplit-rail">
        <span className="leadsplit-eyebrow">
          <Icon name="shieldCheck" size={14} stroke={2} />
          {eyebrow}
        </span>
        <h2 className="leadsplit-headline">{headline}</h2>
        <p className="leadsplit-lead">{lead}</p>

        {showTrust && (
          <div className="leadsplit-trust">
            {TRUST_BADGES.map((b) => (
              <div className="leadsplit-badge" key={b.title}>
                <span className="leadsplit-badge-ic">
                  <Icon name={b.icon} size={20} stroke={1.8} />
                </span>
                <span className="leadsplit-badge-txt">
                  <strong>{b.title}</strong>
                  <em>{b.note}</em>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT CARD: the form */}
      <div className="leadcard">
        {state === "ok" ? (
          <div className="leadcard-done">
            <h3>Thanks, message received</h3>
            <p>
              We will get back to you shortly. For urgent job-site orders,
              mention your timeline and quantity and we will prioritize it.
            </p>
          </div>
        ) : (
          <>
            <h3 className="leadcard-title">{formTitle}</h3>

            {/* Honeypot: hidden from humans + assistive tech; bots fill it and
                get silently dropped server-side. */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                width: 1,
                height: 1,
                overflow: "hidden",
              }}
            >
              <label htmlFor={`cu-${formId}`}>Do not fill this field</label>
              <input
                id={`cu-${formId}`}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                onChange={(e) => (honeypot.current = e.target.value)}
              />
            </div>

            {showRole && (
              <div className="lf-field">
                <label htmlFor={`role-${formId}`}>I am a...</label>
                <select
                  id={`role-${formId}`}
                  className="lf-select"
                  value={form.role}
                  onChange={set("role")}
                >
                  {ROLE_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="lf-row">
              <div className="lf-field">
                <label htmlFor={`name-${formId}`}>
                  Full Name <span className="lf-req">*</span>
                </label>
                <input
                  id={`name-${formId}`}
                  value={form.name}
                  onChange={set("name")}
                  placeholder="e.g., John Martinez"
                  autoComplete="name"
                />
              </div>
              <div className="lf-field">
                <label htmlFor={`email-${formId}`}>
                  Email Address <span className="lf-req">*</span>
                </label>
                <input
                  id={`email-${formId}`}
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="e.g., john@landscaping.com"
                  autoComplete="email"
                />
              </div>
            </div>

            {(showCompany || showPhone) && (
              <div className="lf-row">
                {showCompany && (
                  <div className="lf-field">
                    <label htmlFor={`company-${formId}`}>Company Name</label>
                    <input
                      id={`company-${formId}`}
                      value={form.company}
                      onChange={set("company")}
                      placeholder="e.g., GreenScape LLC"
                      autoComplete="organization"
                    />
                  </div>
                )}
                {showPhone && (
                  <div className="lf-field">
                    <label htmlFor={`phone-${formId}`}>Phone Number</label>
                    <input
                      id={`phone-${formId}`}
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="(555) 123-4567"
                      autoComplete="tel"
                    />
                  </div>
                )}
              </div>
            )}

            {showProject && (
              <div className="lf-field">
                <label htmlFor={`msg-${formId}`}>
                  {projectLabel} <span className="lf-req">*</span>
                </label>
                <textarea
                  id={`msg-${formId}`}
                  rows={4}
                  value={form.message}
                  onChange={set("message")}
                  placeholder={projectPlaceholder}
                />
              </div>
            )}

            <button
              type="button"
              className="lf-submit"
              onClick={submit}
              disabled={state === "sending"}
            >
              {state === "sending" ? "Sending..." : submitLabel}
              <Icon name="arrowRight" size={16} stroke={2.2} />
            </button>

            {state === "error" && (
              <p className="lf-error">
                Please add your name and a valid email, then try again.
              </p>
            )}

            <p className="lf-secure">
              Your information is secure. We never sell your data.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
