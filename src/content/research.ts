import type { ResearchStage } from "./types";

/**
 * RESEARCH — update `stage` as the work progresses:
 *   "proposed" → "ongoing" → "completed" → "published".
 * Only fill `findings` once results are actually established.
 */

export const researchStageLabels: Record<ResearchStage, { label: string; description: string }> = {
  proposed: { label: "Proposed Research", description: "Research design and methodology are defined; analysis has not yet produced results." },
  ongoing: { label: "Ongoing Research", description: "Analysis is in progress; results are preliminary and not yet established." },
  completed: { label: "Completed Research", description: "Analysis is complete and findings are established." },
  published: { label: "Published Research", description: "Findings have been published or formally presented." },
};

export const featuredResearch = {
  slug: "seismic-fragility-concrete-jacketing",
  title:
    "Performance-Based Seismic Evaluation and Collapse Fragility Assessment of Low-Rise Buildings Retrofitted with Concrete Jacketing Using Incremental Dynamic Analysis",
  shortTitle: "Seismic Fragility of Low-Rise Buildings Retrofitted with Concrete Jacketing",
  stage: "proposed" as ResearchStage,
  institution: "Postgraduate research interest — MS Civil Engineering (Structural Engineering), University of Eastern Philippines",
  summary:
    "This proposed study investigates how concrete jacketing changes the seismic performance and collapse risk of existing low-rise reinforced concrete buildings, using Incremental Dynamic Analysis to develop collapse fragility curves for the original and retrofitted structures.",

  background: [
    "A large share of the building stock in seismically active regions consists of low-rise reinforced concrete buildings designed under older codes, with limited ductile detailing. Many serve essential community functions such as schools, offices, and health facilities.",
    "Concrete jacketing — enlarging existing columns and beams with new reinforced concrete — is a widely used strengthening technique because it uses familiar materials and construction skills. However, its benefit is often justified by strength checks alone, rather than by an explicit measure of collapse risk.",
  ],
  problem:
    "There is limited quantitative, building-specific evidence of how much concrete jacketing reduces the probability of collapse of typical low-rise reinforced concrete buildings. Without this evidence, retrofit decisions rely on code-level checks that do not directly describe performance under increasing earthquake intensity.",
  objectives: [
    "Develop nonlinear analytical models of representative low-rise RC buildings in their existing and jacketed conditions.",
    "Perform Incremental Dynamic Analysis using a suite of recorded ground motions.",
    "Derive collapse fragility curves and compare median collapse capacities before and after retrofit.",
    "Evaluate performance against performance-based limit states.",
    "Provide practical insight into the effectiveness of concrete jacketing for retrofit decision-making.",
  ],
  methodology: [
    { step: "Archetype selection", text: "Define representative low-rise RC building configurations reflecting typical local construction." },
    { step: "Nonlinear modelling", text: "Model members with concentrated or distributed plasticity, including strength and stiffness degradation." },
    { step: "Retrofit modelling", text: "Represent jacketed members as enlarged composite sections with appropriate interface assumptions." },
    { step: "Ground-motion selection", text: "Select and scale a suite of recorded ground motions consistent with the site hazard." },
    { step: "Incremental Dynamic Analysis", text: "Run nonlinear response history analyses at increasing intensity levels until collapse." },
    { step: "Fragility derivation", text: "Fit lognormal collapse fragility functions and compare existing vs. retrofitted performance." },
  ],
  idaExplanation: [
    "Incremental Dynamic Analysis (IDA) subjects a structural model to each ground motion record repeatedly, scaling the record to progressively higher intensity levels (for example, spectral acceleration at the fundamental period).",
    "For each run, an engineering demand parameter such as maximum inter-storey drift ratio is recorded. Plotting intensity against demand produces an IDA curve for each record; the point at which the curve flattens — where small increases in intensity cause very large increases in drift — indicates collapse.",
  ],
  fragilityExplanation: [
    "The collapse intensities from all records are used to fit a cumulative probability distribution, typically lognormal. The resulting collapse fragility curve gives the probability of collapse as a function of ground-motion intensity.",
    "Comparing the median collapse intensity and dispersion of the existing and jacketed buildings provides a direct, probabilistic measure of the retrofit's benefit.",
  ],
  jacketingEvaluation: [
    "The study will assess how jacketing alters stiffness, strength, ductility, and failure mechanisms — for example, whether it shifts behaviour from column-sway mechanisms toward more desirable beam-hinging mechanisms.",
    "It will also consider the influence of jacketing configuration (which members are strengthened) on the resulting collapse capacity.",
  ],
  references: [
    "Vamvatsikos, D., & Cornell, C. A. (2002). Incremental dynamic analysis. Earthquake Engineering & Structural Dynamics, 31(3), 491–514.",
    "FEMA P-695 (2009). Quantification of Building Seismic Performance Factors.",
    "FEMA P-58 — Seismic Performance Assessment of Buildings, Methodology and Implementation.",
    "ASCE/SEI 41 — Seismic Evaluation and Retrofit of Existing Buildings.",
    "National Structural Code of the Philippines (NSCP) 2015, Volume I.",
  ],
  /** Leave empty until findings are established. */
  findings: [] as string[],
};

/**
 * Future outputs — add entries as they become real.
 * `file` must point to a file that exists in /public (or leave undefined).
 */
export const researchOutputs: {
  title: string;
  type: "Paper" | "Presentation" | "Engineering tool" | "Technical publication";
  venue?: string;
  year?: string;
  file?: string;
  url?: string;
}[] = [];
