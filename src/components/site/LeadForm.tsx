"use client";
import { useState, useRef } from "react";

/**
 * LeadForm - the shared capture form for contact, bulk pricing, and project
 * quotes. Posts to /api/lead. Per the page-builder skill, the *submission
 * target* lives in code (Supabase, when wired); the copy lives in the page.
 * The `formId` distinguishes which funnel a lead came from.
 *
 * No HTML <form> submit navigation - uses fetch so the user stays on-page.
 *
 * Spam defense paired with the API: a hidden honeypot field (company_url) that
 * real users never see, plus renderedAt timing so the server can reject
 * bot-speed submits.
 */
export function LeadForm({
  formId,
  submitLabel = "Send",
  showCompany = true,
  showProject = true,
}: {
  formId: "contact" | "bulk-pricing" | "quote";
  submitLabel?: string;
  showCompany?: boolean;
  showProject?: boolean;
}) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const renderedAt = useRef<number>(Date.now());
  const honeypot = useRef<string>("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    if (!form.name || !form.email) {
      setState("error");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          formId,
          company_url: honeypot.current,
          renderedAt: renderedAt.current,
        }),
      });
      setState(res.ok ? "ok" : "error");
      if (res.ok) setForm({ name: "", email: "", company: "", message: "" });
    } catch {
      setState("error");
    }
  };

  if (state === "ok") {
    return (
      <div className="quick" style={{ maxWidth: 560 }}>
        <h2>Thanks - message received</h2>
        <p style={{ margin: 0, color: "var(--ink)" }}>
          We will get back to you shortly. For urgent job-site orders, mention
          your timeline and quantity and we will prioritize it.
        </p>
      </div>
    );
  }

  return (
    <div className="form">
      {/* Honeypot: hidden from humans + assistive tech; bots fill it and get
          silently dropped server-side. */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
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
      <div className="field">
        <label>Name</label>
        <input value={form.name} onChange={set("name")} placeholder="Your name" />
      </div>
      <div className="field">
        <label>Email</label>
        <input
          type="email"
          value={form.email}
          onChange={set("email")}
          placeholder="you@example.com"
        />
      </div>
      {showCompany && (
        <div className="field">
          <label>Company (optional)</label>
          <input
            value={form.company}
            onChange={set("company")}
            placeholder="Business or farm name"
          />
        </div>
      )}
      {showProject && (
        <div className="field">
          <label>
            {formId === "bulk-pricing"
              ? "Quantity + product"
              : "How can we help?"}
          </label>
          <textarea
            rows={4}
            value={form.message}
            onChange={set("message")}
            placeholder={
              formId === "bulk-pricing"
                ? "e.g. 20 rolls of XBAR 6ft x 300ft, delivery to 33056"
                : "Tell us about your project or question"
            }
          />
        </div>
      )}
      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={submit}
          disabled={state === "sending"}
        >
          {state === "sending" ? "Sending..." : submitLabel}
        </button>
      </div>
      {state === "error" && (
        <p className="form-note" style={{ color: "#a00" }}>
          Please add your name and a valid email, then try again.
        </p>
      )}
      <p className="form-note">
        We use your details only to respond to this request.
      </p>
    </div>
  );
}
