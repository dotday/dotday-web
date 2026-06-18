import { NextResponse } from "next/server";

/**
 * POST /api/lead - capture endpoint for contact / bulk-pricing / quote forms.
 *
 * For first launch this validates + logs the lead and returns ok. When Supabase
 * is wired (env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, LEADS_TABLE), insert
 * the row here. The form component already sends { name, email, company,
 * message, formId }.
 *
 * Kept deliberately minimal and dependency-free so the build is green before
 * the backend exists.
 */

export const runtime = "nodejs";

type LeadBody = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  formId?: string;
};

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  let body: LeadBody;
  try {
    body = (await req.json()) as LeadBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  if (!name || !isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "name_and_valid_email_required" },
      { status: 422 }
    );
  }

  const lead = {
    name,
    email,
    company: (body.company || "").trim(),
    message: (body.message || "").trim(),
    formId: body.formId || "contact",
    createdAt: new Date().toISOString(),
  };

  // --- Supabase insert goes here when configured ---
  // const url = process.env.SUPABASE_URL;
  // const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  // const table = process.env.LEADS_TABLE || "leads";
  // if (url && key) { await fetch(`${url}/rest/v1/${table}`, { ... }); }

  // Until then, log so leads are visible in Vercel function logs.
  console.log("[lead]", JSON.stringify(lead));

  return NextResponse.json({ ok: true });
}
