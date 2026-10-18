import type { InvolvementType, Project, ProjectCategory, DisclosureStatus } from "./types";

/**
 * PROJECT PORTFOLIO
 * ------------------------------------------------------------------
 * Every record below is an ILLUSTRATIVE SAMPLE with a generic title. They
 * exist to demonstrate the layout and must be replaced (or edited) with
 * real, publication-approved project information before launch.
 *
 * To add a project: copy one record, give it a unique `slug`, update the
 * fields, set `disclosureStatus` to "approved" or "sanitized", and replace
 * the images. The cards, filters, search, and case-study page are generated
 * automatically.
 *
 * Do NOT include confidential documents, internal procurement details,
 * restricted drawings, or other people's personal information.
 */

export const projectCategories: ProjectCategory[] = [
  {
    id: "structural-building",
    label: "Structural Engineering and Building Design",
    shortLabel: "Structural & Buildings",
    description: "Analysis and design of reinforced concrete and steel building structures.",
  },
  {
    id: "bridges-transport",
    label: "Bridges and Transportation Infrastructure",
    shortLabel: "Bridges",
    description: "Bridge superstructure and substructure design, review, and coordination.",
  },
  {
    id: "roads",
    label: "Roads and Farm-to-Market Roads",
    shortLabel: "Roads",
    description: "Road alignment, pavement, and drainage planning and design support.",
  },
  {
    id: "ports-coastal",
    label: "Ports and Coastal Infrastructure",
    shortLabel: "Ports & Coastal",
    description: "Wharves, causeways, and coastal protection structures.",
  },
  {
    id: "flood-drainage-slope",
    label: "Flood Control, Drainage, and Slope Protection",
    shortLabel: "Flood & Drainage",
    description: "River control, drainage systems, and slope stabilization works.",
  },
  {
    id: "public-buildings",
    label: "Public Buildings and Evacuation Centers",
    shortLabel: "Public Buildings",
    description: "Schools, health facilities, multipurpose halls, and evacuation centers.",
  },
  {
    id: "seismic-assessment",
    label: "Structural Assessment and Seismic Evaluation",
    shortLabel: "Seismic Evaluation",
    description: "Condition assessment, seismic evaluation, and strengthening studies.",
  },
  {
    id: "software-innovation",
    label: "Engineering Software and Technical Innovation",
    shortLabel: "Software & Innovation",
    description: "Calculation tools, automation, and digital engineering workflows.",
  },
];

export const involvementLabels: Record<InvolvementType, { label: string; description: string }> = {
  designed: {
    label: "Personally Designed",
    description: "I prepared the engineering design and calculations for this work.",
  },
  "technical-review": {
    label: "Technical Review",
    description: "I reviewed engineering plans, calculations, or estimates prepared by others.",
  },
  supervised: {
    label: "Supervised / Monitored",
    description: "I supervised or monitored implementation for technical compliance.",
  },
  "planning-support": {
    label: "Planning & Technical Support",
    description: "I contributed planning, coordination, or technical support to the project team.",
  },
};

export const disclosureLabels: Record<DisclosureStatus, { label: string; note: string }> = {
  "illustrative-sample": {
    label: "Illustrative Sample",
    note: "This is an illustrative sample record with a generic title, created to demonstrate the portfolio format. It does not describe a specific completed project. Images are generic technical illustrations.",
  },
  approved: {
    label: "Approved for Publication",
    note: "Project details shown here have been approved for publication.",
  },
  sanitized: {
    label: "Sanitized Summary",
    note: "Identifying, confidential, and sensitive details have been removed. Information is presented for professional portfolio purposes only.",
  },
};

const img = (name: string, alt: string, caption?: string) => ({
  src: `/images/illustrations/${name}.svg`,
  alt,
  caption,
  width: 1200,
  height: 750,
  illustrative: true,
});

export const projects: Project[] = [
  {
    slug: "sample-two-storey-rc-public-building",
    title: "Two-Storey Reinforced Concrete Public Building",
    category: "structural-building",
    involvement: "designed",
    disclosureStatus: "illustrative-sample",
    featured: true,
    summary:
      "Structural analysis and design of a two-storey reinforced concrete moment-frame building for public use, from modelling to detailing.",
    overview:
      "A representative structural design workflow for a low-rise reinforced concrete public building: establishing design criteria, building and verifying a 3D analysis model, designing frame members and foundations, and coordinating structural drawings with architectural and plumbing requirements.",
    projectType: "Low-rise reinforced concrete building — structural design",
    scope: [
      "Structural design criteria and load derivation",
      "3D analysis model and load combinations",
      "Design of slabs, beams, columns, and isolated footings",
      "Structural drawings and detailing coordination",
    ],
    challenge:
      "Delivering a code-compliant lateral force-resisting system in a high-seismicity region while keeping member sizes and reinforcement practical for local construction methods and workmanship.",
    role: [
      "Defined design criteria, loads, and load combinations",
      "Built and checked the structural analysis model",
      "Designed reinforced concrete members and foundations",
      "Coordinated structural layout with architectural and sanitary/plumbing plans",
    ],
    methodology: [
      "Gravity and seismic loads derived per the governing structural code; site class assumed pending geotechnical data.",
      "3D frame model with rigid diaphragms; modal response spectrum analysis compared against the static lateral force procedure.",
      "Drift, irregularity, and strong-column/weak-beam checks before member design.",
      "Foundation design checked for bearing, punching shear, and one-way shear using separate slab/foundation software.",
      "Hand checks and spreadsheets used to verify critical software outputs.",
    ],
    standards: [
      "National Structural Code of the Philippines (NSCP) 2015",
      "ACI 318 — Building Code Requirements for Structural Concrete (reference)",
      "National Building Code of the Philippines (PD 1096)",
    ],
    software: ["ETABS", "SAFE", "AutoCAD", "Microsoft Excel"],
    images: [
      img("rc-building-frame", "Illustrative line drawing of a two-storey reinforced concrete frame with columns, beams, and footings", "Illustrative structural frame elevation (generic)."),
      img("rc-beam-section", "Illustrative reinforced concrete beam cross-section showing longitudinal bars and stirrups", "Illustrative beam section detail (generic)."),
    ],
    outcomes: [
      "[Sample] Replace with verified, approved outcomes — e.g. design package completed and approved for implementation.",
    ],
    lessons: [
      "Early coordination of column grids with architectural layouts avoids late, costly structural changes.",
      "Independent hand checks remain essential, even with mature analysis software.",
    ],
    keywords: ["concrete", "frame", "building", "foundation", "seismic", "ETABS"],
  },
  {
    slug: "sample-rc-girder-bridge-design-review",
    title: "Reinforced Concrete Girder Bridge — Design Review",
    category: "bridges-transport",
    involvement: "technical-review",
    disclosureStatus: "illustrative-sample",
    featured: true,
    summary:
      "Technical review of a short-span reinforced concrete deck-girder bridge, covering design criteria, loading, substructure, and plan consistency.",
    overview:
      "A representative technical review of a short-span bridge design submitted for approval: verifying design criteria and live loading, checking superstructure and substructure calculations, and confirming that plans, quantities, and specifications are consistent.",
    projectType: "Short-span RC deck-girder bridge — design review",
    scope: [
      "Review of design criteria and hydraulic assumptions",
      "Check of superstructure and substructure calculations",
      "Plan, quantity, and specification consistency review",
      "Review comments and resolution tracking",
    ],
    challenge:
      "Confirming that the submitted design used appropriate live loading, hydraulic clearance, and scour assumptions, and that abutment and pier design reflected available geotechnical information.",
    role: [
      "Reviewed design criteria, loads, and calculations",
      "Independently checked selected girder and abutment designs",
      "Prepared consolidated technical review comments",
      "Verified resolution of comments in revised submissions",
    ],
    methodology: [
      "Compared design criteria against current bridge design guidelines and specifications.",
      "Spot-checked girder flexure and shear using an independent line-girder model.",
      "Reviewed abutment stability (sliding, overturning, bearing) against reported soil parameters.",
      "Cross-checked plan dimensions, reinforcement schedules, and bill of quantities.",
    ],
    standards: [
      "DPWH Design Guidelines, Criteria and Standards (DGCS)",
      "AASHTO LRFD Bridge Design Specifications (reference)",
      "DPWH Standard Specifications for Highways, Bridges and Airports",
    ],
    software: ["STAAD.Pro", "Microsoft Excel", "AutoCAD"],
    images: [img("girder-bridge", "Illustrative elevation of a short-span girder bridge with abutments, piers, and river channel", "Illustrative bridge elevation (generic).")],
    outcomes: ["[Sample] Replace with verified, approved outcomes of the review."],
    lessons: ["A structured review checklist makes comments consistent, traceable, and easier for designers to resolve."],
    keywords: ["bridge", "girder", "abutment", "review", "AASHTO", "scour"],
  },
  {
    slug: "sample-farm-to-market-road-improvement",
    title: "Farm-to-Market Road Improvement",
    category: "roads",
    involvement: "planning-support",
    disclosureStatus: "illustrative-sample",
    featured: true,
    summary:
      "Planning and design support for a rural road improvement, including alignment review, pavement section, and cross-drainage provisions.",
    overview:
      "A representative farm-to-market road improvement: validating the proposed alignment, selecting a suitable concrete pavement section, providing cross-drainage and side ditches, and preparing supporting technical documents for project approval.",
    projectType: "Rural road — planning and design support",
    scope: [
      "Site validation and alignment review",
      "Typical road cross-section and pavement thickness",
      "Cross-drainage and side ditch provisions",
      "Support to program of works and cost estimate preparation",
    ],
    challenge:
      "Providing durable, all-weather access across rolling terrain with seasonal flooding, while keeping the design within typical rural road standards and available funding.",
    role: [
      "Participated in site validation and needs assessment",
      "Reviewed alignment, typical sections, and drainage provisions",
      "Supported preparation of technical documents and estimates",
    ],
    methodology: [
      "Typical sections and pavement thickness based on applicable road design standards.",
      "Cross-drainage locations identified from site inspection and natural drainage paths.",
      "Quantities derived from typical sections and stationing.",
    ],
    standards: [
      "DPWH Design Guidelines, Criteria and Standards (DGCS)",
      "DPWH Standard Specifications for Highways, Bridges and Airports",
    ],
    software: ["AutoCAD", "Microsoft Excel"],
    images: [img("road-cross-section", "Illustrative typical road cross-section with concrete pavement, shoulders, and side ditches", "Illustrative typical road section (generic).")],
    outcomes: ["[Sample] Replace with verified, approved outcomes."],
    keywords: ["road", "pavement", "rural", "drainage", "culvert", "FMR"],
  },
  {
    slug: "sample-small-port-wharf-rehabilitation",
    title: "Small Port Wharf Rehabilitation — Technical Review",
    category: "ports-coastal",
    involvement: "technical-review",
    disclosureStatus: "illustrative-sample",
    summary:
      "Technical review of rehabilitation works for a small reinforced concrete wharf exposed to an aggressive marine environment.",
    overview:
      "A representative review of rehabilitation works for a small port: assessing visible deterioration, reviewing repair and strengthening proposals, and checking durability provisions for marine exposure.",
    projectType: "Coastal structure — rehabilitation review",
    scope: [
      "Review of condition assessment findings",
      "Review of repair and strengthening details",
      "Durability and concrete cover provisions",
      "Constructability review for tidal working conditions",
    ],
    challenge:
      "Ensuring repair details address the root causes of deterioration — chloride-induced corrosion and wave action — rather than only cosmetic damage, while remaining constructible within tidal windows.",
    role: [
      "Reviewed condition findings and repair proposals",
      "Checked durability and detailing provisions",
      "Provided constructability and sequencing comments",
    ],
    methodology: [
      "Reviewed repair scope against observed deterioration mechanisms.",
      "Checked concrete cover, mix requirements, and protective measures for marine exposure.",
      "Reviewed construction sequencing relative to tidal access.",
    ],
    standards: [
      "National Structural Code of the Philippines (NSCP) 2015",
      "DPWH Design Guidelines, Criteria and Standards (DGCS)",
    ],
    software: ["AutoCAD", "Microsoft Excel"],
    images: [img("port-wharf", "Illustrative section through a pile-supported wharf deck above water level", "Illustrative wharf section (generic).")],
    outcomes: ["[Sample] Replace with verified, approved outcomes."],
    keywords: ["port", "wharf", "marine", "corrosion", "rehabilitation", "coastal"],
  },
  {
    slug: "sample-river-control-slope-protection",
    title: "River Control and Slope Protection Works",
    category: "flood-drainage-slope",
    involvement: "planning-support",
    disclosureStatus: "illustrative-sample",
    featured: true,
    summary:
      "Design coordination for riverbank protection and slope stabilization to reduce erosion and flood risk to adjacent communities.",
    overview:
      "A representative river control project: identifying eroding reaches, comparing protection options, coordinating the design of revetment and toe protection, and reviewing drainage provisions behind the wall.",
    projectType: "River control and slope protection — design coordination",
    scope: [
      "Site assessment of eroding riverbanks",
      "Option comparison (revetment, gabions, embankment)",
      "Coordination of wall, toe protection, and weepholes",
      "Review of quantities and specifications",
    ],
    challenge:
      "Selecting protection measures that resist scour and high flows during typhoon season while remaining maintainable and suitable for local materials.",
    role: [
      "Supported site assessment and option comparison",
      "Coordinated design inputs and drawings",
      "Reviewed technical documents and estimates",
    ],
    methodology: [
      "Protection type selected considering flow velocity, available materials, and maintenance.",
      "Toe depth and scour protection reviewed against observed bed conditions.",
      "Wall stability checks for sliding, overturning, and bearing.",
    ],
    standards: [
      "DPWH Design Guidelines, Criteria and Standards (DGCS) — Flood Control",
      "DPWH Standard Specifications",
    ],
    software: ["AutoCAD", "Microsoft Excel"],
    images: [img("slope-protection", "Illustrative cross-section of a stepped riverbank revetment with toe protection and weepholes", "Illustrative revetment section (generic).")],
    outcomes: ["[Sample] Replace with verified, approved outcomes."],
    keywords: ["flood", "river", "revetment", "slope", "erosion", "drainage", "gabion"],
  },
  {
    slug: "sample-multipurpose-evacuation-center",
    title: "Multipurpose Evacuation Center",
    category: "public-buildings",
    involvement: "designed",
    disclosureStatus: "illustrative-sample",
    featured: true,
    summary:
      "Structural design of a multipurpose hall intended to serve as an evacuation center, with emphasis on wind and seismic resilience.",
    overview:
      "A representative design of a public multipurpose building that doubles as an evacuation center: a reinforced concrete substructure and frame supporting a long-span steel roof, designed for elevated importance and typhoon-level wind loads.",
    projectType: "Public building / evacuation center — structural design",
    scope: [
      "RC frame and foundation design",
      "Long-span steel roof truss design",
      "Connection design for roof-to-frame anchorage",
      "Coordination with architectural and plumbing layouts",
    ],
    challenge:
      "The building must remain usable after the very events it shelters people from, which requires essential-facility importance factors, robust roof anchorage against uplift, and a continuous load path.",
    role: [
      "Structural modelling and design of frame and foundations",
      "Steel roof truss and connection design",
      "Coordination with plumbing and sanitary provisions as a Master Plumber",
    ],
    methodology: [
      "Essential/hazardous facility importance factors applied to wind and seismic loads.",
      "Roof uplift and net pressures checked for typhoon wind speeds.",
      "Steel connections and anchor bolts verified using connection design software.",
    ],
    standards: [
      "National Structural Code of the Philippines (NSCP) 2015",
      "AISC 360 — Specification for Structural Steel Buildings (reference)",
      "Revised National Plumbing Code of the Philippines",
    ],
    software: ["ETABS", "STAAD.Pro", "IDEA StatiCa", "AutoCAD", "Revit"],
    images: [img("evacuation-center", "Illustrative elevation of a multipurpose hall with reinforced concrete frame and steel roof truss", "Illustrative building elevation (generic).")],
    outcomes: ["[Sample] Replace with verified, approved outcomes."],
    keywords: ["evacuation", "multipurpose", "steel", "truss", "wind", "typhoon", "public building"],
  },
  {
    slug: "sample-seismic-evaluation-low-rise-school",
    title: "Seismic Evaluation of a Low-Rise RC School Building",
    category: "seismic-assessment",
    involvement: "designed",
    disclosureStatus: "illustrative-sample",
    featured: true,
    summary:
      "Seismic evaluation of an existing low-rise reinforced concrete building and comparison of concrete jacketing as a retrofit option.",
    overview:
      "A representative seismic evaluation of an existing two-storey school building: collecting as-built information, modelling the existing structure, identifying deficiencies, and comparing performance before and after column jacketing.",
    projectType: "Existing building — seismic evaluation and retrofit study",
    scope: [
      "Visual inspection and as-built data collection",
      "Analytical model of the existing structure",
      "Deficiency identification (strength, drift, detailing)",
      "Concrete jacketing retrofit concept and comparison",
    ],
    challenge:
      "Many older low-rise buildings have light transverse reinforcement and weak columns. The challenge is to identify the governing failure modes and quantify how much jacketing improves performance.",
    role: [
      "Developed analytical models of existing and retrofitted conditions",
      "Evaluated demand-to-capacity ratios and drift",
      "Prepared the retrofit concept and comparison",
    ],
    methodology: [
      "Material properties assumed from available records and typical construction of the era, to be verified by testing.",
      "Linear and nonlinear static (pushover) analysis to identify weak storeys and failure mechanisms.",
      "Column jacketing modelled as enlarged composite sections; performance compared at target displacement.",
    ],
    standards: [
      "ASCE/SEI 41 — Seismic Evaluation and Retrofit of Existing Buildings (reference)",
      "National Structural Code of the Philippines (NSCP) 2015",
    ],
    software: ["ETABS", "Microsoft Excel"],
    images: [
      img("pushover-curve", "Illustrative pushover capacity curves comparing an existing building and a jacketed retrofit", "Illustrative capacity curves (generic, not analysis results)."),
    ],
    outcomes: ["[Sample] Replace with verified, approved outcomes."],
    keywords: ["seismic", "retrofit", "jacketing", "pushover", "existing building", "school", "ASCE 41"],
  },
  {
    slug: "sample-rc-design-spreadsheet-toolkit",
    title: "Reinforced Concrete Design Checking Toolkit",
    category: "software-innovation",
    involvement: "designed",
    disclosureStatus: "illustrative-sample",
    summary:
      "Concept for a transparent spreadsheet and Python toolkit to check reinforced concrete beam and column designs against code provisions.",
    overview:
      "A representative engineering automation project: a set of calculation sheets and scripts that make routine reinforced concrete checks faster, consistent, and fully traceable to code clauses — supporting both design and technical review.",
    projectType: "Engineering automation — calculation toolkit",
    scope: [
      "Beam flexure and shear design checks",
      "Column axial–moment interaction check",
      "Clause-referenced, printable calculation output",
      "Verification against hand calculations",
    ],
    challenge:
      "Making calculations quick enough for review workloads without becoming a 'black box' — every step must be visible and checkable by another engineer.",
    role: ["Defined calculation logic and verification cases", "Built spreadsheet and script prototypes"],
    methodology: [
      "Each check references the governing code clause and shows intermediate values.",
      "Results validated against worked examples and independent hand calculations.",
      "Inputs separated from calculations to reduce entry errors.",
    ],
    standards: ["National Structural Code of the Philippines (NSCP) 2015", "ACI 318 (reference)"],
    software: ["Microsoft Excel", "Python"],
    images: [img("automation-workflow", "Illustrative workflow diagram from inputs through calculation and verification to report output", "Illustrative workflow diagram (generic).")],
    outcomes: ["[Sample] Replace with verified outcomes once the tool is developed and validated."],
    keywords: ["python", "excel", "automation", "spreadsheet", "calculation", "tool"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getCategory(id: string) {
  return projectCategories.find((c) => c.id === id);
}

export const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);
