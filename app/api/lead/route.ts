import { NextResponse } from "next/server";

/**
 * POST /api/lead - capture endpoint for every DOTDAY lead funnel
 * (contact / bulk-pricing / quote / pro-list).
 *
 * Persistence is env-gated so the build stays green before the backend exists,
 * and so production starts saving leads the moment these env vars are set in
 * Vercel:
 *
 *   SUPABASE_URL                 e.g. https://xxxx.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY    service-role key (server-only; never NEXT_PUBLIC)
 *   LEADS_TABLE                  optional, defaults to "leads"
 *   LEAD_NOTIFY_WEBHOOK          optional: also POST the lead JSON here (Slack,
 *                                Make, email relay) for an instant alert
 *
 * If no store is configured the lead is still logged to Vercel function logs, so
 * nothing is ever silently dropped, and the caller still gets ok.
 *
 * Spam defenses (no third-party captcha, no dependencies):
 *  - honeypot field `company_url` must be empty (bots fill every field)
 *  - `renderedAt` timing gate: a submit faster than MIN_FILL_MS is almost
 *    certainly a bot
 *  - best-effort in-memory per-IP rate limit (resets on cold start)
 *
 * The form components send { name, email, company, message, formId,
 * company_url, renderedAt }. The API contract is unchanged for the real fields.
 */

export const runtime = "nodejs";

const LEADS_TABLE = process.env.LEADS_TABLE || "leads";
const MIN_FILL_MS = 1500; // a human takes longer than 1.5s to fill a form
const RATE_MAX = 5; // max submissions...
const RATE_WINDOW_MS = 60_000; // ...per minute, per IP

type LeadBody = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  formId?: string;
  company_url?: string; // honeypot - real users never see or fill this
  renderedAt?: number; // ms epoch when the form mounted (set client-side)
};

const VALID_FORMS = new Set(["contact", "bulk-pricing", "quote", "pro-list"]);

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

// Best-effort in-memory rate limiter. Survives within a warm lambda; a cold
// start resets it. Stops the common flood cheaply without an external store.
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > RATE_MAX;
}

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

async function persist(lead: Record<string, unknown>): Promise<void> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (url && key) {
    const res = await fetch(`${url}/rest/v1/${LEADS_TABLE}`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(lead),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      // Throw so the caller returns 500 and the user can retry, rather than
      // telling them "ok" while the row never landed.
      throw new Error(`supabase_insert_failed ${res.status} ${detail}`);
    }
  } else {
    // No store wired yet: never drop the lead silently.
    console.log("[lead]", JSON.stringify(lead));
  }

  // Optional instant notification, fire-and-forget.
  const hook = process.env.LEAD_NOTIFY_WEBHOOK;
  if (hook) {
    fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    }).catch((e) => console.error("[lead] notify webhook failed:", e));
  }
}

export async function POST(req: Request) {
  let body: LeadBody;
  try {
    body = (await req.json()) as LeadBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // 1. Honeypot: silently accept (200) so bots get no signal, but don't store.
  if (body.company_url && body.company_url.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // 2. Timing gate: a too-fast submit is a bot. Also silent-accept.
  if (
    typeof body.renderedAt === "number" &&
    Date.now() - body.renderedAt < MIN_FILL_MS
  ) {
    return NextResponse.json({ ok: true });
  }

  // 3. Rate limit per IP.
  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  // 4. Validate the real fields.
  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  if (!name || !isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "name_and_valid_email_required" },
      { status: 422 }
    );
  }

  const formId = VALID_FORMS.has(body.formId || "") ? body.formId! : "contact";

  // snake_case row for the DB; the API contract above stays camelCase.
  const lead = {
    name,
    email,
    company: (body.company || "").trim(),
    message: (body.message || "").trim(),
    form_id: formId,
    source_ip: ip,
    created_at: new Date().toISOString(),
  };

  try {
    await persist(lead);
  } catch (err) {
    console.error("[lead] persist failed:", err);
    return NextResponse.json({ ok: false, error: "store_unavailable" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
