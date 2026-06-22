"use client";
import { useState, useRef } from "react";
import { footer } from "@/lib/site";

/**
 * ProListForm - the footer email capture ("Join the DOTDAY Pro List"). Posts to
 * the same /api/lead endpoint as the contact forms, tagged formId "pro-list".
 * Kept as a small client island so the rest of the footer stays a server
 * component. Carries the same honeypot + timing spam defense as LeadForm.
 */
export function ProListForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const renderedAt = useRef<number>(Date.now());
  const honeypot = useRef<string>("");

  const submit = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Pro List subscriber",
          email,
          formId: "pro-list",
          company_url: honeypot.current,
          renderedAt: renderedAt.current,
        }),
      });
      setState(res.ok ? "ok" : "error");
      if (res.ok) setEmail("");
    } catch {
      setState("error");
    }
  };

  if (state === "ok") {
    return (
      <p className="prolist-done">You are on the list. Watch your inbox for your 10% off code.</p>
    );
  }

  return (
    <div className="prolist-form">
      <span
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
      >
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          onChange={(e) => (honeypot.current = e.target.value)}
        />
      </span>
      <input
        type="email"
        placeholder={footer.proList.placeholder}
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
      />
      <button type="button" onClick={submit} disabled={state === "sending"}>
        {state === "sending" ? "..." : footer.proList.cta}
      </button>
      {state === "error" && <span className="prolist-err">Enter a valid email.</span>}
    </div>
  );
}
