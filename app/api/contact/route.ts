import { NextResponse } from "next/server";
import { contactSchema, PLAN_OPTIONS } from "@/lib/schema";
import { getSmtpConfig, getTransporter, escapeHtml } from "@/lib/smtp";
import { BUSINESS } from "@/lib/constants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ── Minimal in-memory rate limit (per warm serverless instance) ──
const WINDOW_MS = 60_000;
const MAX_HITS = 5;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_HITS;
}

function planLabel(value: string): string {
  return PLAN_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 422 });
  }

  const { company, name, email, phone, plan, message } = parsed.data;

  // Honeypot tripped — pretend success, drop silently.
  if (company) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const cfg = getSmtpConfig();
  const transporter = getTransporter();

  if (!transporter || !cfg.configured) {
    return NextResponse.json(
      {
        error:
          "The email service isn't configured yet. Please call us at " +
          BUSINESS.phoneDisplay +
          " or message us on WhatsApp.",
      },
      { status: 503 }
    );
  }

  const html = `
    <div style="font-family:Arial,sans-serif;color:#111;">
      <h2 style="margin:0 0 12px;">New membership enquiry — ${escapeHtml(BUSINESS.name)}</h2>
      <table cellpadding="6" style="border-collapse:collapse;">
        <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${escapeHtml(phone)}</td></tr>
        <tr><td><strong>Plan</strong></td><td>${escapeHtml(planLabel(plan))}</td></tr>
        <tr><td valign="top"><strong>Message</strong></td><td>${escapeHtml(message).replace(/\n/g, "<br/>")}</td></tr>
      </table>
    </div>`;

  try {
    await transporter.sendMail({
      from: cfg.from,
      to: cfg.to,
      replyTo: email,
      subject: `New enquiry from ${name} — ${planLabel(plan)}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPlan: ${planLabel(plan)}\n\n${message}`,
      html,
    });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please try again or call us." },
      { status: 502 }
    );
  }
}
