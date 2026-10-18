/**
 * Content types for the portfolio.
 *
 * All editable content lives in `src/content/*.ts` and is rendered by
 * presentation components in `src/components`. Edit the content files —
 * not the components — to update the website.
 */

export type ImageAsset = {
  /** Path under /public (e.g. "/images/projects/bridge-01.jpg"). */
  src: string;
  /** Descriptive alternative text for screen readers. */
  alt: string;
  /** Optional caption shown under the image on detail pages. */
  caption?: string;
  width: number;
  height: number;
  /**
   * `true` for generic drawings, diagrams or stock-style imagery that do NOT
   * document an actual project. An "Illustrative" label is rendered on top.
   */
  illustrative: boolean;
};

export type ProjectCategoryId =
  | "structural-building"
  | "bridges-transport"
  | "roads"
  | "ports-coastal"
  | "flood-drainage-slope"
  | "public-buildings"
  | "seismic-assessment"
  | "software-innovation";

export type ProjectCategory = {
  id: ProjectCategoryId;
  label: string;
  shortLabel: string;
  description: string;
};

/**
 * How Joel was involved in the project. Keep this accurate — it is shown on
 * every project card and case study.
 */
export type InvolvementType =
  | "designed"
  | "technical-review"
  | "supervised"
  | "planning-support";

/**
 * - `illustrative-sample`: placeholder record; not an actual project.
 * - `approved`: real project, details approved for publication.
 * - `sanitized`: real project, identifying/sensitive details removed.
 */
export type DisclosureStatus = "illustrative-sample" | "approved" | "sanitized";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategoryId;
  involvement: InvolvementType;
  disclosureStatus: DisclosureStatus;
  /** Leave undefined until publication is approved. */
  year?: string;
  /** Leave undefined until publication is approved. */
  location?: string;
  /** Short description for cards (1–2 sentences). */
  summary: string;
  /** Longer overview for the case study page. */
  overview: string;
  projectType: string;
  scope: string[];
  challenge: string;
  role: string[];
  methodology: string[];
  standards: string[];
  software: string[];
  images: ImageAsset[];
  outcomes: string[];
  lessons?: string[];
  /** Optional note displayed in the disclosure panel. */
  disclosureNote?: string;
  /** Extra search terms (not displayed). */
  keywords?: string[];
  featured?: boolean;
};

export type VerificationStatus = "confirmed" | "to-confirm";

export type SoftwareTool = {
  name: string;
  category: string;
  use: string;
  /**
   * Leave `null` until the level is confirmed. Only "Working Knowledge",
   * "Regular Use" or "Advanced" are displayed.
   */
  proficiency: "Working Knowledge" | "Regular Use" | "Advanced" | null;
};

export type ExpertiseItem = {
  title: string;
  description: string;
};

export type ExpertiseGroup = {
  id: string;
  title: string;
  summary: string;
  items: ExpertiseItem[];
};

export type ExperienceEntry = {
  position: string;
  organization: string;
  dates: string;
  location?: string;
  status: VerificationStatus;
  responsibilities: string[];
  contributions: string[];
  relevantWork: string[];
};

export type CredentialEntry = {
  title: string;
  issuer?: string;
  detail?: string;
  date?: string;
  status: VerificationStatus;
};

export type ResearchStage = "proposed" | "ongoing" | "completed" | "published";
