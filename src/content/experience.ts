import type { CredentialEntry, ExperienceEntry } from "./types";

/**
 * EXPERIENCE & CREDENTIALS
 * ------------------------------------------------------------------
 * Items marked `status: "to-confirm"` display a "To be confirmed" label.
 * Replace placeholder text with accurate details and switch the status to
 * "confirmed". Do NOT publish registration numbers, signatures, or ID
 * documents unless you deliberately choose to.
 */

export const experience: ExperienceEntry[] = [
  {
    position: "Civil Engineer — position title to be confirmed",
    organization: "Local Government Unit — name to be confirmed",
    dates: "Dates to be confirmed (10+ years in total)",
    location: "Philippines",
    status: "to-confirm",
    responsibilities: [
      "Infrastructure planning and project identification for public works.",
      "Preparation and coordination of detailed engineering designs.",
      "Structural analysis and design of public buildings and infrastructure components.",
      "Review of engineering plans, programs of work, and cost estimates.",
      "Verification of technical compliance with applicable codes and standards.",
      "Project monitoring and technical support during implementation.",
      "Coordination with planners, architects, and other engineering disciplines.",
    ],
    contributions: [
      "Add selected, verifiable contributions here (avoid confidential or unapproved details).",
    ],
    relevantWork: [
      "Roads and farm-to-market roads",
      "Bridges",
      "Drainage systems",
      "River control and flood protection",
      "Ports",
      "Evacuation centers",
      "Schools and health facilities",
      "Multipurpose buildings",
    ],
  },
];

export const registrations: CredentialEntry[] = [
  {
    title: "Registered Civil Engineer",
    issuer: "Professional Regulation Commission (PRC), Philippines",
    detail: "Registration details available on request.",
    status: "confirmed",
  },
  {
    title: "Registered Master Plumber",
    issuer: "Professional Regulation Commission (PRC), Philippines",
    detail: "Registration details available on request.",
    status: "confirmed",
  },
];

export const education: CredentialEntry[] = [
  {
    title: "Master of Science in Civil Engineering, major in Structural Engineering",
    issuer: "University of Eastern Philippines",
    detail: "Postgraduate units completed.",
    status: "confirmed",
  },
  {
    title: "Bachelor of Science in Civil Engineering",
    issuer: "University of Eastern Philippines",
    status: "confirmed",
  },
];

export const training: CredentialEntry[] = [
  {
    title: "Professional training and seminars — to be added",
    detail: "List relevant technical trainings, CPD seminars, and software courses with dates.",
    status: "to-confirm",
  },
];

export const memberships: CredentialEntry[] = [
  {
    title: "Professional memberships — to be added",
    detail: "e.g. accredited professional organization membership and chapter, once confirmed.",
    status: "to-confirm",
  },
];
