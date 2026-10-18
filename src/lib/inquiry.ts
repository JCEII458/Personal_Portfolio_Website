/** Shared by the contact form (client) and the API route (server). */
export const inquiryTypes = [
  { value: "employment", label: "Employment opportunity" },
  { value: "collaboration", label: "Engineering collaboration" },
  { value: "consultation", label: "Structural engineering consultation" },
  { value: "general", label: "General professional inquiry" },
] as const;

export type InquiryType = (typeof inquiryTypes)[number]["value"];

export const contactLimits = {
  name: 100,
  email: 254,
  organization: 150,
  message: { min: 20, max: 5000 },
  /** Submissions faster than this (ms after the form loads) are treated as bots. */
  minFillTimeMs: 3000,
};

export type ContactPayload = {
  name: string;
  email: string;
  organization: string;
  inquiryType: string;
  message: string;
  /** Honeypot — must stay empty. */
  website: string;
  /** Epoch ms when the form was rendered. */
  startedAt: number;
  consent: boolean;
};

export type FieldErrors = Partial<Record<"name" | "email" | "organization" | "inquiryType" | "message" | "consent", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Validation shared by client (for instant feedback) and server (authoritative). */
export function validateContact(input: Partial<ContactPayload>): FieldErrors {
  const errors: FieldErrors = {};
  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const organization = (input.organization ?? "").trim();
  const message = (input.message ?? "").trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > contactLimits.name) errors.name = `Name must be ${contactLimits.name} characters or fewer.`;

  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > contactLimits.email || !EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";

  if (organization.length > contactLimits.organization)
    errors.organization = `Organization must be ${contactLimits.organization} characters or fewer.`;

  if (!inquiryTypes.some((t) => t.value === input.inquiryType)) errors.inquiryType = "Please select an inquiry type.";

  if (message.length < contactLimits.message.min)
    errors.message = `Please write at least ${contactLimits.message.min} characters so I can understand your inquiry.`;
  else if (message.length > contactLimits.message.max)
    errors.message = `Message must be ${contactLimits.message.max} characters or fewer.`;

  if (input.consent !== true) errors.consent = "Please confirm you have read the privacy notice.";

  return errors;
}
