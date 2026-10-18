import "server-only";

/** True when all variables needed to deliver contact-form email are set. */
export function isContactConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL);
}
