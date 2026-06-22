"use client";

import { useState, useRef } from "react";
import Link from "next/link";

/**
 * HubNewsletter - email capture for the dark "Get expert tips weekly" band on
 * the blog hub. Same /api/lead contract + honeypot + timing gate as the footer
 * Pro List form (formId "pro-list"); styled for the dark band. Client island so
 * the rest of the hub stays server-rendered.
 */
export function HubNewsletter() {
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

  return (
    <section className="bnews" aria-label="Subscribe to the DOTDAY Pro List">
      <div className="wrap bnews-inner">
        <h2 className="bnews-title">Get expert tips delivered weekly</h2>
        <p className="bnews-sub">
          Join the DOTDAY Pro List for field-tested guidance on fabric
          selection, installation, and jobs that hold up. Get 10% off your first
          order.
        </p>

        {state === "ok" ? (
          <p className="bnews-done">
            You are on the list. Watch your inbox for your 10% off code.
          </p>
        ) : (
          <>
            <div className="bnews-form">
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
                className="bnews-input"
                placeholder="your@email.com"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
              />
              <button
                type="button"
                className="btn btn-primary bnews-btn"
                onClick={submit}
                disabled={state === "sending"}
              >
                {state === "sending" ? "..." : "Subscribe"}
              </button>
            </div>
            {state === "error" && (
              <span className="bnews-err">Enter a valid email address.</span>
            )}
          </>
        )}

        <p className="bnews-fine">
          No spam. Unsubscribe anytime. Read our{" "}
          <Link href="/privacy-policy" className="bnews-fine-link">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
