/**
 * Site-wide configuration: URL, navigation, and CV file location.
 */

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const siteConfig = {
  url: resolveSiteUrl(),
  name: "Joel C. Escareal II",
  titleTemplate: "%s | Joel C. Escareal II",
  defaultTitle: "Joel C. Escareal II — Civil Engineer | Structural Engineering Specialist",
  description:
    "Portfolio of Joel C. Escareal II, Registered Civil Engineer specializing in structural engineering, infrastructure planning, detailed engineering design, and technical project evaluation.",
  locale: "en_US",
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/expertise", label: "Expertise" },
  { href: "/research", label: "Research" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * CV / résumé.
 *
 * Place the real PDF at `public/cv/<fileName>`. The download button is only
 * shown when that file actually exists at build time; otherwise the site
 * shows a clear "CV not yet uploaded" placeholder.
 */
export const cvConfig = {
  fileName: "Joel-C-Escareal-II-CV.pdf",
  lastUpdated: "", // e.g. "October 2026"
  summary: [
    "Registered Civil Engineer and Registered Master Plumber specializing in Structural Engineering.",
    "More than 10 years of experience in local government infrastructure planning, detailed engineering design, project evaluation, technical review, and infrastructure development.",
    "Experience across roads, bridges, drainage, river control and flood protection, ports, evacuation centers, schools, health facilities, and multipurpose buildings.",
    "BS Civil Engineering and postgraduate units in MS Civil Engineering (Structural Engineering), University of Eastern Philippines.",
    "Software: ETABS, SAFE, STAAD.Pro, IDEA StatiCa, Prokon, AutoCAD, Revit, Microsoft Excel.",
  ],
};

/**
 * Optional supporting documents (sanitized project sheets, publications).
 * Add entries only for files that exist in /public and are approved for release.
 * Example:
 *   { title: "Project Sheet — RC Building (sanitized)", file: "/documents/project-sheet-01.pdf", type: "Project sheet" }
 */
export const supportingDocuments: { title: string; file: string; type: string; description?: string }[] = [];
