"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { CircleAlert, CircleCheck, LoaderCircle, Lock, Send, TriangleAlert } from "lucide-react";
import { contactLimits, inquiryTypes, validateContact, type ContactPayload, type FieldErrors } from "@/lib/inquiry";
import { cn } from "@/lib/utils";

type Status = { state: "idle" } | { state: "submitting" } | { state: "success" } | { state: "error"; message: string };

type Props = { configured: boolean; showSetupHint: boolean };

const fieldBase =
  "block w-full rounded-md border bg-white px-3.5 text-sm text-ink placeholder:text-muted/80 transition-colors focus:outline-none focus-visible:outline-2 disabled:cursor-not-allowed disabled:bg-surface";

export function ContactForm({ configured, showSetupHint }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [startedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [messageLength, setMessageLength] = useState(0);

  const focusFirstError = (errs: FieldErrors) => {
    const first = (["name", "email", "organization", "inquiryType", "message", "consent"] as const).find((k) => errs[k]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured || status.state === "submitting") return;
    const data = new FormData(event.currentTarget);
    const payload: ContactPayload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      organization: String(data.get("organization") ?? ""),
      inquiryType: String(data.get("inquiryType") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
      consent: data.get("consent") === "on",
      startedAt,
    };

    const clientErrors = validateContact(payload);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length) {
      setStatus({ state: "idle" });
      focusFirstError(clientErrors);
      return;
    }

    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: FieldErrors };
      if (res.ok && body.ok) {
        setStatus({ state: "success" });
        setErrors({});
        formRef.current?.reset();
        setMessageLength(0);
        return;
      }
      if (body.errors) {
        setErrors(body.errors);
        focusFirstError(body.errors);
      }
      setStatus({ state: "error", message: body.message ?? "Your message could not be sent. Please try again later." });
    } catch {
      setStatus({ state: "error", message: "A network error occurred. Please check your connection and try again." });
    }
  }

  const describedBy = (key: keyof FieldErrors, extra?: string) =>
    [errors[key] ? `${key}-error` : null, extra].filter(Boolean).join(" ") || undefined;

  const renderError = (field: keyof FieldErrors) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#b42318]">
        <CircleAlert className="size-3.5 shrink-0" aria-hidden="true" />
        {errors[field]}
      </p>
    ) : null;

  const inputClass = (field: keyof FieldErrors) =>
    cn(fieldBase, errors[field] ? "border-[#d92d20] focus:border-[#d92d20]" : "border-line focus:border-accent");

  if (status.state === "success") {
    return (
      <div role="status" className="rounded-xl border border-[#b7e0c6] bg-[#f0faf3] p-8 text-center">
        <CircleCheck className="mx-auto size-10 text-[#1f7a3f]" aria-hidden="true" />
        <h2 className="mt-4 text-xl font-bold">Thank you — your message has been sent.</h2>
        <p className="mt-2 text-sm text-muted">I review inquiries personally and will reply to the email address you provided.</p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="mt-6 inline-flex min-h-11 items-center rounded-md border border-line bg-white px-5 text-sm font-semibold text-navy hover:border-eng-blue"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={!configured ? "form-setup-notice" : undefined}>
      {!configured && (
        <div id="form-setup-notice" role="note" className="mb-6 flex gap-3 rounded-lg border border-[#efdcae] bg-[#fdf6e7] p-4 text-sm text-[#5c3f0b]">
          <TriangleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold">The online inquiry form is not active yet.</p>
            <p className="mt-1">Messages cannot be submitted until delivery is configured, so nothing you type here will be sent.</p>
            {showSetupHint && (
              <p className="mt-2 font-mono text-xs">
                Site owner: set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL (see README → Contact form), then restart or redeploy.
              </p>
            )}
          </div>
        </div>
      )}

      <fieldset disabled={!configured || status.state === "submitting"} className="space-y-5">
        <legend className="sr-only">Professional inquiry</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-ink">
              Full name <span aria-hidden="true" className="text-[#b42318]">*</span>
            </label>
            <input id="name" name="name" type="text" autoComplete="name" required maxLength={contactLimits.name} aria-invalid={!!errors.name} aria-describedby={describedBy("name")} className={cn(inputClass("name"), "h-12")} />
            {renderError("name")}
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
              Email address <span aria-hidden="true" className="text-[#b42318]">*</span>
            </label>
            <input id="email" name="email" type="email" autoComplete="email" required maxLength={contactLimits.email} aria-invalid={!!errors.email} aria-describedby={describedBy("email")} className={cn(inputClass("email"), "h-12")} />
            {renderError("email")}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="organization" className="mb-1.5 block text-sm font-semibold text-ink">
              Organization <span className="font-normal text-muted">(optional)</span>
            </label>
            <input id="organization" name="organization" type="text" autoComplete="organization" maxLength={contactLimits.organization} aria-invalid={!!errors.organization} aria-describedby={describedBy("organization")} className={cn(inputClass("organization"), "h-12")} />
            {renderError("organization")}
          </div>
          <div>
            <label htmlFor="inquiryType" className="mb-1.5 block text-sm font-semibold text-ink">
              Inquiry type <span aria-hidden="true" className="text-[#b42318]">*</span>
            </label>
            <select id="inquiryType" name="inquiryType" required defaultValue="" aria-invalid={!!errors.inquiryType} aria-describedby={describedBy("inquiryType")} className={cn(inputClass("inquiryType"), "h-12")}>
              <option value="" disabled>
                Select an inquiry type
              </option>
              {inquiryTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            {renderError("inquiryType")}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-ink">
            Message <span aria-hidden="true" className="text-[#b42318]">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={7}
            required
            minLength={contactLimits.message.min}
            maxLength={contactLimits.message.max}
            onChange={(e) => setMessageLength(e.target.value.length)}
            aria-invalid={!!errors.message}
            aria-describedby={describedBy("message", "message-hint")}
            placeholder="Briefly describe the opportunity, project, or question — including timeline and location where relevant."
            className={cn(inputClass("message"), "py-3 leading-relaxed")}
          />
          <div className="mt-1.5 flex items-start justify-between gap-4">
            {renderError("message")}
            <p id="message-hint" className="ml-auto shrink-0 text-xs text-muted tabular-nums">
              {messageLength} / {contactLimits.message.max}
            </p>
          </div>
        </div>

        {/* Honeypot: hidden from people, tempting for bots. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div>
          <div className="flex gap-3">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              aria-invalid={!!errors.consent}
              aria-describedby={describedBy("consent")}
              className="mt-0.5 size-5 shrink-0 rounded border-line accent-eng-blue"
            />
            <label htmlFor="consent" className="text-sm leading-relaxed text-ink">
              I have read the <a href="#privacy" className="font-semibold text-eng-blue underline-offset-2 hover:underline">privacy notice</a> and agree that the information I submit may be used to respond to my inquiry.
            </label>
          </div>
          {renderError("consent")}
        </div>

        {status.state === "error" && (
          <div role="alert" className="flex gap-3 rounded-lg border border-[#f4c7c3] bg-[#fef3f2] p-4 text-sm text-[#912018]">
            <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            <p>{status.message}</p>
          </div>
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-xs text-muted">
            <Lock className="size-3.5" aria-hidden="true" /> Your details are never published or shared.
          </p>
          <button
            type="submit"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-eng-blue px-6 text-sm font-semibold text-white transition-colors hover:bg-navy disabled:cursor-not-allowed disabled:bg-muted/60"
          >
            {status.state === "submitting" ? (
              <>
                <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> Sending…
              </>
            ) : configured ? (
              <>
                <Send className="size-4" aria-hidden="true" /> Send inquiry
              </>
            ) : (
              "Form not yet active"
            )}
          </button>
        </div>
        <p aria-live="polite" className="sr-only">
          {status.state === "submitting" ? "Sending your message" : ""}
        </p>
      </fieldset>
      {!configured && (
        <p className="mt-6 text-sm text-muted">
          In the meantime, you can review my <Link href="/cv" className="font-semibold text-eng-blue hover:underline">CV summary</Link>.
        </p>
      )}
    </form>
  );
}
