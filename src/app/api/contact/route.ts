import { NextResponse } from "next/server";
import { contactLimits, inquiryTypes, validateContact, type ContactPayload } from "@/lib/inquiry";
import { isContactConfigured } from "@/lib/contact";

export const runtime = "nodejs";

/**
 * Best-effort in-memory rate limit (per server instance). On serverless
 * platforms instances are short-lived, so this is a speed bump rather than a
 * guarantee — the honeypot and fill-time checks provide additional filtering.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max) : "";

export async function POST(request: Request) {
  if (!isContactConfigured()) {
    return NextResponse.json(
      { ok: false, message: "The contact form is not configured yet, so your message was not sent." },
      { status: 503 },
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ ok: false, message: "Unsupported request format." }, { status: 415 });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, message: "Too many messages were sent recently. Please try again later." }, { status: 429 });
  }

  let raw: Partial<ContactPayload>;
  try {
    const text = await request.text();
    if (text.length > 20_000) {
      return NextResponse.json({ ok: false, message: "Your message is too large." }, { status: 413 });
    }
    raw = JSON.parse(text);
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  // Spam checks: honeypot filled, or submitted implausibly fast. Respond as if
  // successful so bots get no signal, but do not send anything.
  const startedAt = typeof raw.startedAt === "number" ? raw.startedAt : 0;
  if (clean(raw.website, 200) || !startedAt || Date.now() - startedAt < contactLimits.minFillTimeMs) {
    return NextResponse.json({ ok: true });
  }

  const payload = {
    name: clean(raw.name, contactLimits.name + 1),
    email: clean(raw.email, contactLimits.email + 1),
    organization: clean(raw.organization, contactLimits.organization + 1),
    inquiryType: clean(raw.inquiryType, 40),
    message: clean(raw.message, contactLimits.message.max + 1),
    consent: raw.consent === true,
  };

  const errors = validateContact(payload);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, message: "Please correct the highlighted fields.", errors }, { status: 422 });
  }

  const inquiryLabel = inquiryTypes.find((t) => t.value === payload.inquiryType)?.label ?? payload.inquiryType;
  const subject = `[Portfolio] ${inquiryLabel} — ${payload.name}`.replace(/[\r\n]+/g, " ").slice(0, 200);
  const text = [
    `Inquiry type: ${inquiryLabel}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Organization: ${payload.organization || "—"}`,
    "",
    payload.message,
    "",
    "—",
    "Sent from the portfolio contact form.",
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: [process.env.CONTACT_TO_EMAIL],
        reply_to: payload.email,
        subject,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("Contact form delivery failed", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ ok: false, message: "Your message could not be delivered. Please try again later." }, { status: 502 });
    }
  } catch (error) {
    console.error("Contact form delivery error", error);
    return NextResponse.json({ ok: false, message: "Your message could not be delivered. Please try again later." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json({ ok: false, message: "Method not allowed." }, { status: 405, headers: { Allow: "POST" } });
}
