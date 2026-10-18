/**
 * PROFILE CONTENT — edit this file to update name, biography, contact
 * details and headline messaging across the whole site.
 *
 * Rules of thumb:
 *  - Only publish information that is accurate and approved.
 *  - Leave a field empty ("") when it is not yet available; the site will
 *    show a neutral "to be added" note instead of a broken link.
 */

export const profile = {
  name: "Joel C. Escareal II",
  shortName: "Joel Escareal",
  initials: "JE",
  title: "Civil Engineer | Structural Engineering Specialist",

  credentials: ["Registered Civil Engineer", "Registered Master Plumber"],

  positioning: "Engineering Structures. Developing Infrastructure. Delivering Lasting Impact.",
  supportingMessage:
    "Combining structural engineering expertise, infrastructure development experience, and analytical problem-solving to support safe, efficient, and resilient engineering solutions.",

  heroDescription:
    "I am a Civil Engineer specializing in Structural Engineering, with experience in infrastructure planning, detailed engineering design, structural evaluation, and multidisciplinary project coordination.",
  heroSupporting:
    "My work sits where engineering analysis meets practical delivery — translating structural models, codes, and calculations into infrastructure that can be built well, maintained responsibly, and relied on by the communities it serves.",

  /** Short statement used in the footer and metadata. */
  statement:
    "Civil and structural engineer focused on safe, code-compliant, and resilient public infrastructure — from structural analysis to project delivery.",

  /** Substantiated metrics only. Do not add unverified figures. */
  metrics: [
    { value: "10+", label: "Years in public infrastructure engineering" },
    { value: "2", label: "Professional registrations (RCE, RMP)" },
    { value: "MSCE", label: "Postgraduate units, Structural Engineering" },
  ],

  portrait: {
    // Replace with e.g. "/images/portrait/joel-escareal.jpg" (4:5 ratio recommended)
    src: "/images/portrait-placeholder.svg",
    alt: "Portrait placeholder for Joel C. Escareal II",
    width: 800,
    height: 1000,
    isPlaceholder: true,
  },

  contact: {
    /** e.g. "joel@yourdomain.com" — leave empty until approved for publication. */
    email: "",
    /** e.g. "https://www.linkedin.com/in/your-profile" */
    linkedin: "",
    /** General location shown publicly, e.g. "Philippines". Keep it general. */
    location: "Philippines",
    availability:
      "Open to discussing international engineering roles and selected professional collaborations.",
  },

  /** Shown wherever private consultancy is mentioned. Edit to suit your situation. */
  consultancyNotice:
    "Private engineering consultancy and collaboration are offered only where permitted by applicable professional regulations, current employment rules, conflict-of-interest requirements, and any required approvals.",

  /** Ensures no implied endorsement by any agency or employer. */
  independenceNotice:
    "This is a personal professional website. It does not represent, and is not endorsed by, any government agency, local government unit, or current or former employer.",
};

/**
 * About page — first-person biography, organised by section.
 * Each section is an array of paragraphs.
 */
export const about = {
  introduction: [
    "I am a Civil Engineer specializing in Structural Engineering, a Registered Civil Engineer and Registered Master Plumber with more than ten years of experience in local government infrastructure planning, detailed engineering design, project evaluation, and technical review.",
    "I approach engineering as a discipline of responsibility: every drawing, calculation, and review comment ultimately affects the safety of people who will use a structure long after the design team has moved on.",
  ],
  careerBackground: [
    "My career has been built in public infrastructure. Working within local government, I have been involved in planning, designing, reviewing, and monitoring a broad range of projects — roads, bridges, drainage systems, river control and flood protection works, ports, evacuation centers, schools, health facilities, and multipurpose buildings.",
    "This environment demands versatility. A single programme of works can move from a reinforced concrete building to a drainage outfall to a farm-to-market road, and each requires its own codes, design logic, and construction realities. It taught me to coordinate across disciplines and to review engineering work with both rigour and practicality.",
  ],
  structuralInterests: [
    "My technical focus is structural engineering — reinforced concrete and steel design, structural analysis and modelling, and the seismic performance of buildings. I am particularly interested in how existing low-rise buildings behave under strong ground motion, and how strengthening techniques such as concrete jacketing change that behaviour.",
    "This interest has shaped my postgraduate studies in Structural Engineering and my proposed research on performance-based seismic evaluation and collapse fragility assessment using Incremental Dynamic Analysis.",
  ],
  infrastructureExperience: [
    "Alongside structural work, I have developed practical experience across the infrastructure life cycle: identifying needs, preparing and reviewing detailed engineering designs, checking programs of work and cost estimates, verifying technical compliance, and supporting project monitoring during implementation.",
    "That delivery experience keeps my design work grounded. I think about constructability, local materials and workmanship, maintenance access, and long-term performance from the earliest stage of a project.",
  ],
  philosophy: [
    { title: "Evidence-based design", text: "Decisions should follow from analysis, data, and clearly stated assumptions — and the assumptions should be checked." },
    { title: "Safety and code compliance", text: "Applicable codes and standards set the minimum. Good engineering understands why each provision exists." },
    { title: "Constructability", text: "A design is only as good as what can be built on site with the available resources, skills, and supervision." },
    { title: "Quality and accountability", text: "Clear documentation, independent checking, and traceable decisions protect the public and the project." },
    { title: "Life-cycle thinking", text: "Durability, maintenance, and resilience matter as much as initial cost, especially for public assets." },
    { title: "Public value", text: "Infrastructure exists to serve communities. Engineering choices should deliver lasting value for the people who rely on it." },
  ],
  professionalDevelopment: [
    "I continue to develop my technical capability through postgraduate studies in Structural Engineering, independent study of structural and earthquake engineering, and hands-on use of analysis and design software including ETABS, SAFE, STAAD.Pro, IDEA StatiCa, and Prokon.",
    "I am also building skills in digital engineering — Python-based tools, spreadsheet automation, and structured analysis workflows — to make engineering calculations more transparent, repeatable, and efficient.",
  ],
  careerObjectives: [
    "I am seeking opportunities to contribute to structural and infrastructure engineering teams internationally, where I can apply my design, review, and coordination experience while continuing to deepen my expertise in structural and seismic engineering.",
    "I also welcome professional collaboration on civil and structural engineering work, within the limits of applicable professional and employment requirements.",
  ],
};
