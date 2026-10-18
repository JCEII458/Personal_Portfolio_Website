import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";
import { getCategory, involvementLabels } from "@/content/projects";
import { ProjectImage } from "./ProjectImage";
import { Badge } from "./ui/Badge";

export function ProjectCard({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const category = getCategory(project.category);
  const Heading = headingLevel;
  const cover = project.images[0];
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
      {cover && (
        <ProjectImage
          image={cover}
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
          className="aspect-[16/10] border-b border-line"
        />
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold tracking-wider text-eng-blue uppercase">{category?.shortLabel}</p>
        <Heading className="mt-2 text-lg leading-snug font-bold">
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {project.title}
          </Link>
        </Heading>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge tone="blue">{involvementLabels[project.involvement].label}</Badge>
          {project.disclosureStatus === "illustrative-sample" && <Badge tone="amber">Illustrative sample</Badge>}
        </div>
        <span className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-semibold text-eng-blue transition-colors group-hover:text-navy">
          View Case Study
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </span>
      </div>
      {/* Focus ring for the stretched link */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-xl ring-accent ring-offset-2 group-has-[a:focus-visible]:ring-2" />
    </article>
  );
}
