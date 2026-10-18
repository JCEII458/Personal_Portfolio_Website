import { ArrowRight } from "lucide-react";
import { featuredProjects } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import { SectionHeading } from "./SectionHeading";
import { ButtonLink } from "./ui/ButtonLink";

export function FeaturedProjects() {
  return (
    <section className="bg-surface py-20 sm:py-24" aria-labelledby="featured-projects">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="featured-projects"
            index="01"
            eyebrow="Featured work"
            title="Engineering projects"
            description={
              <>
                A cross-section of structural and infrastructure work. Current entries are{" "}
                <strong className="font-semibold text-ink">illustrative samples</strong> that show the case-study format; approved
                project records will replace them.
              </>
            }
          />
          <ButtonLink href="/projects" variant="outline" className="shrink-0">
            All projects <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
