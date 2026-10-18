import type { Metadata } from "next";
import { Code } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ExpertiseGrid } from "@/components/ExpertiseGrid";
import { SoftwareGrid } from "@/components/SoftwareGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactCTA } from "@/components/ContactCTA";
import { Badge } from "@/components/ui/Badge";
import { automationAreas } from "@/content/expertise";

export const metadata: Metadata = {
  title: "Technical Expertise",
  description:
    "Structural engineering, infrastructure engineering, and technical review capabilities, plus engineering software and digital automation.",
  alternates: { canonical: "/expertise" },
};

export default function ExpertisePage() {
  return (
    <>
      <PageHeader
        eyebrow="Technical expertise"
        title="Engineering capabilities"
        description="An overview of the structural, infrastructure, and technical review work I am involved in. Descriptions reflect the nature of the work rather than claims of independent specialist status in every area."
      >
        <nav aria-label="Expertise sections">
          <ul className="flex flex-wrap gap-2">
            {[
              ["#structural", "Structural Engineering"],
              ["#infrastructure", "Infrastructure Engineering"],
              ["#management", "Management & Technical Review"],
              ["#software", "Software"],
              ["#automation", "Automation"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="inline-flex min-h-10 items-center rounded-full border border-white/20 px-4 text-sm text-white/85 transition-colors hover:border-white hover:text-white">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      <div className="bg-surface py-16 sm:py-20">
        <div className="container-page">
          <ExpertiseGrid />
        </div>
      </div>

      <section id="software" aria-labelledby="software-h" className="scroll-mt-20 bg-white py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            id="software-h"
            eyebrow="Software & digital engineering"
            title="Engineering software"
            description="Tools I use for analysis, design, connection checks, documentation, and estimating. Proficiency levels are shown only once confirmed. Product names are trademarks of their respective owners."
          />
          <div className="mt-12">
            <SoftwareGrid />
          </div>
        </div>
      </section>

      <section id="automation" aria-labelledby="automation-h" className="scroll-mt-20 border-t border-line bg-surface py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="grid size-12 place-items-center rounded-lg bg-navy text-white">
              <Code className="size-6" aria-hidden="true" />
            </span>
            <h2 id="automation-h" className="mt-5 text-2xl font-bold sm:text-3xl">
              Engineering automation
            </h2>
            <p className="mt-3 leading-relaxed text-muted">
              Using code and structured spreadsheets to make engineering calculations faster, more consistent, and fully traceable — without
              hiding the engineering behind a black box.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {automationAreas.map((a) => (
              <li key={a.title} className="rounded-lg border border-line bg-white p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-bold">{a.title}</h3>
                  <Badge tone={a.status === "In use" ? "blue" : "neutral"}>{a.status}</Badge>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
