import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/PageHeader";
import { ProjectFilter } from "@/components/ProjectFilter";
import { ProjectCard } from "@/components/ProjectCard";
import { involvementLabels, projectCategories, projects } from "@/content/projects";
import type { InvolvementType } from "@/content/types";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Engineering project portfolio — structural design, bridges, roads, ports, flood control, public buildings, seismic evaluation, and engineering software.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Project portfolio"
        title="Engineering projects and case studies"
        description="Structural and infrastructure work organised by discipline. Each case study states my specific involvement, so it is clear what I designed, reviewed, supervised, or supported."
      />

      <section className="bg-surface py-12 sm:py-16" aria-label="Projects">
        <div className="container-page">
          <div role="note" className="mb-8 rounded-lg border border-[#efdcae] bg-[#fdf6e7] p-4 text-sm leading-relaxed text-[#5c3f0b]">
            <strong className="font-semibold">Portfolio in preparation:</strong> the projects below are illustrative samples with generic titles
            and technical illustrations. They demonstrate the case-study format and will be replaced with publication-approved project records.
          </div>

          <Suspense
            fallback={
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((p) => (
                  <li key={p.slug}>
                    <ProjectCard project={p} headingLevel="h2" />
                  </li>
                ))}
              </ul>
            }
          >
            <ProjectFilter projects={projects} categories={projectCategories} />
          </Suspense>

          <section aria-labelledby="involvement-key" className="mt-16 rounded-xl border border-line bg-white p-6 sm:p-8">
            <h2 id="involvement-key" className="text-lg font-bold">
              How to read my involvement
            </h2>
            <dl className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {(Object.keys(involvementLabels) as InvolvementType[]).map((key) => (
                <div key={key}>
                  <dt className="text-sm font-semibold text-eng-blue">{involvementLabels[key].label}</dt>
                  <dd className="mt-1 text-sm text-muted">{involvementLabels[key].description}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </section>
    </>
  );
}
