import type { ExpertiseGroup, SoftwareTool } from "./types";

/**
 * TECHNICAL EXPERTISE — edit descriptions to reflect your actual depth of
 * experience. Descriptions intentionally describe the work, not a claimed
 * specialist level.
 */
export const expertiseGroups: ExpertiseGroup[] = [
  {
    id: "structural",
    title: "Structural Engineering",
    summary:
      "Analysis, design, and evaluation of building and infrastructure structures, with a particular focus on seismic performance.",
    items: [
      { title: "Reinforced concrete structural design", description: "Design of slabs, beams, columns, walls, and footings for low- to mid-rise structures." },
      { title: "Structural steel design", description: "Design of steel members, roof trusses, and connections for public and industrial-type buildings." },
      { title: "Structural analysis and modelling", description: "3D analysis models, load derivation, load combinations, and verification of software results." },
      { title: "Seismic evaluation", description: "Evaluation of new and existing buildings for seismic demands under the governing code." },
      { title: "Structural performance assessment", description: "Nonlinear static and dynamic methods for understanding structural behaviour beyond code checks." },
      { title: "Concrete jacketing and strengthening", description: "Strengthening concepts for deficient members, the subject of my proposed research." },
      { title: "Foundation and substructure coordination", description: "Coordination of footing, mat, abutment, and pier design with geotechnical inputs." },
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure Engineering",
    summary:
      "Planning, design support, and review across the public infrastructure portfolio of local government.",
    items: [
      { title: "Bridge engineering", description: "Design support and technical review of short-span bridges and their substructures." },
      { title: "Road and pavement design", description: "Typical sections, pavement, and drainage for local and farm-to-market roads." },
      { title: "Drainage and flood control", description: "Drainage systems, culverts, and flood mitigation works." },
      { title: "River control and slope protection", description: "Revetments, embankments, and slope stabilization measures." },
      { title: "Ports and coastal infrastructure", description: "Small port structures and coastal protection works." },
      { title: "Public buildings and evacuation centers", description: "Schools, health facilities, multipurpose halls, and evacuation centers." },
      { title: "Infrastructure planning and design review", description: "Needs assessment, project scoping, and design review for public works." },
    ],
  },
  {
    id: "management",
    title: "Engineering Management and Technical Review",
    summary:
      "Ensuring designs, estimates, and implementation meet technical, quality, and compliance requirements.",
    items: [
      { title: "Detailed Engineering Design review", description: "Reviewing plans, calculations, and specifications for completeness and compliance." },
      { title: "Program of Works and cost estimate review", description: "Checking quantities, unit costs, and consistency with plans and specifications." },
      { title: "Design coordination and technical compliance", description: "Coordinating inputs across disciplines and verifying compliance with standards." },
      { title: "Project monitoring and implementation support", description: "Technical support during construction, including site issues and variations." },
      { title: "Constructability and quality assurance", description: "Reviewing designs for buildability and supporting quality control on site." },
      { title: "Multidisciplinary engineering coordination", description: "Working with architects, planners, sanitary/plumbing, and electrical disciplines." },
    ],
  },
];

/**
 * SOFTWARE — set `proficiency` only when the level is confirmed.
 * Allowed values: "Working Knowledge" | "Regular Use" | "Advanced" | null.
 */
export const softwareTools: SoftwareTool[] = [
  { name: "ETABS", category: "Building analysis & design", use: "3D modelling, response spectrum analysis, and design of building structures.", proficiency: null },
  { name: "SAFE", category: "Slabs & foundations", use: "Design of floor slabs, mats, and footings, including punching shear checks.", proficiency: null },
  { name: "STAAD.Pro", category: "General structural analysis", use: "Frame, truss, and bridge component analysis and design.", proficiency: null },
  { name: "IDEA StatiCa", category: "Connection design", use: "Steel connection and anchorage design and code checking.", proficiency: null },
  { name: "Prokon", category: "Structural design suite", use: "Member and element design checks for concrete, steel, and timber.", proficiency: null },
  { name: "AutoCAD", category: "Drafting & documentation", use: "Engineering drawings, details, and plan review mark-ups.", proficiency: null },
  { name: "Revit", category: "BIM", use: "Building information modelling and coordinated documentation.", proficiency: null },
  { name: "Microsoft Excel", category: "Calculations & estimating", use: "Design calculations, quantity take-offs, and cost estimate review.", proficiency: null },
];

/**
 * ENGINEERING AUTOMATION — describe tools and workflows you actually use or
 * are developing. Mark `status` honestly.
 */
export const automationAreas: { title: string; description: string; status: "In use" | "In development" | "Exploring" }[] = [
  { title: "Python for engineering", description: "Scripts for structural calculations, post-processing analysis results, and batch analyses for research.", status: "In development" },
  { title: "Spreadsheet automation", description: "Clause-referenced design and checking sheets for repeatable, transparent calculations.", status: "In development" },
  { title: "Structural analysis workflows", description: "Structured pipelines linking ground-motion records, analysis runs, and result extraction (e.g., for IDA).", status: "Exploring" },
  { title: "Technical reporting tools", description: "Templates that generate consistent calculation reports and review comments.", status: "Exploring" },
  { title: "Infrastructure monitoring dashboards", description: "Simple dashboards for tracking project status, review comments, and implementation progress.", status: "Exploring" },
];
