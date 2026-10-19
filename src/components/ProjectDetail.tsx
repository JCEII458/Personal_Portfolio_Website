import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, Calendar, Info, Layers, MapPin, UserRound } from "lucide-react";
import type { Project } from "@/content/types";
import { disclosureLabels, getCategory, involvementLabels, projects } from "@/content/projects";
import { ProjectImage } from "./ProjectImage";
import { Badge } from "./ui/Badge";

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="scroll-mt-28 border-t border-line pt-10">
      <h2 id={id} className="text-2xl font-bold">
        {title}
      </h2>
      <div className="mt-4 text-base leading-relaxed text-ink">{children}</div>
    </section>
  );
}

function List({ items, ordered = false }: { items: string[]; ordered?: boolean }) {
  if (ordered) {
    return (
      <ol className="space-y-3">
        {items.map((item, i) => (
          <li key={item} className="flex gap-4">
            <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-blue-soft font-mono text-xs font-semibold text-eng-blue">
              {i + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-eng-blue" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProjectDetail({ project }: { project: Project }) {
  const category = getCategory(project.category);
  const involvement = involvementLabels[project.involvement];
  const disclosure = disclosureLabels[project.disclosureStatus];
  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = index > 0 ? projects[index - 1] : undefined;
  const next = index < projects.length - 1 ? projects[index + 1] : undefined;
  const [cover, ...gallery] = project.images;

  return (
    <>
      <section className="blueprint-grid bg-navy pt-28 pb-28 sm:pt-32 sm:pb-36">
        <div className="container-page">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/60">
              <li>
                <Link href="/projects" className="inline-block py-1 hover:text-white">
                  Projects
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`/projects?category=${project.category}`} className="inline-block py-1 hover:text-white">
                  {category?.shortLabel}
                </Link>
              </li>
            </ol>
          </nav>
          <h1 className="mt-5 max-w-4xl text-3xl leading-tight font-extrabold text-white sm:text-5xl">{project.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg">{project.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge tone="on-dark">{involvement.label}</Badge>
            <Badge tone={project.disclosureStatus === "illustrative-sample" ? "amber" : "on-dark"}>{disclosure.label}</Badge>
          </div>
        </div>
      </section>

      <div className="bg-surface pb-20">
        <div className="container-page">
          {cover && (
            <ProjectImage
              image={cover}
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="relative -mt-16 aspect-[16/10] max-h-[640px] w-full rounded-xl border border-line shadow-card-hover sm:-mt-24"
            />
          )}
          {cover?.caption && <p className="mt-3 text-xs text-muted">{cover.caption}</p>}

          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            <aside className="lg:col-span-4 lg:order-2">
              <div className="space-y-6 lg:sticky lg:top-28">
                <dl className="rounded-xl border border-line bg-white p-6 shadow-card">
                  <h2 className="text-sm font-bold tracking-wider text-navy uppercase">Project facts</h2>
                  {[
                    { icon: Layers, label: "Category", value: category?.label },
                    { icon: Layers, label: "Project type", value: project.projectType },
                    { icon: UserRound, label: "My involvement", value: involvement.label, hint: involvement.description },
                    { icon: MapPin, label: "Location", value: project.location ?? "Not disclosed" },
                    { icon: Calendar, label: "Year", value: project.year ?? "Not disclosed" },
                  ].map((row) => (
                    <div key={row.label} className="mt-4 flex gap-3 border-t border-line pt-4 first-of-type:border-t-0">
                      <row.icon className="mt-0.5 size-4 shrink-0 text-eng-blue" aria-hidden="true" />
                      <div>
                        <dt className="text-xs font-medium text-muted">{row.label}</dt>
                        <dd className="text-sm font-semibold text-ink">{row.value}</dd>
                        {row.hint && <dd className="mt-0.5 text-xs text-muted">{row.hint}</dd>}
                      </div>
                    </div>
                  ))}
                </dl>

                <div className="rounded-xl border border-line bg-white p-6 shadow-card">
                  <h2 className="text-sm font-bold tracking-wider text-navy uppercase">Software &amp; tools</h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.software.map((s) => (
                      <li key={s}>
                        <Badge tone="blue">{s}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  role="note"
                  className={
                    project.disclosureStatus === "illustrative-sample"
                      ? "rounded-xl border border-warn-line bg-warn-bg p-6"
                      : "rounded-xl border border-line bg-white p-6"
                  }
                >
                  <h2 className="flex items-center gap-2 text-sm font-bold tracking-wider text-navy uppercase">
                    <Info className="size-4" aria-hidden="true" /> Project disclosure
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink">{project.disclosureNote ?? disclosure.note}</p>
                </div>
              </div>
            </aside>

            <article className="space-y-10 lg:col-span-8 lg:order-1">
              <Block id="overview" title="Project overview">
                <p>{project.overview}</p>
              </Block>
              <Block id="scope" title="Project type and scope">
                <p className="mb-4 font-semibold text-navy">{project.projectType}</p>
                <List items={project.scope} />
              </Block>
              <Block id="challenge" title="Engineering challenge">
                <p>{project.challenge}</p>
              </Block>
              <Block id="role" title="My role and responsibilities">
                <p className="mb-4 text-muted">
                  Involvement: <strong className="font-semibold text-ink">{involvement.label}</strong> — {involvement.description}
                </p>
                <List items={project.role} />
              </Block>
              <Block id="methodology" title="Technical approach and design methodology">
                <List items={project.methodology} ordered />
              </Block>
              <Block id="standards" title="Applicable codes and standards">
                <List items={project.standards} />
                <p className="mt-4 text-xs text-muted">Standards listed are those referenced for this type of work; editions and applicability are confirmed per project.</p>
              </Block>
              {gallery.length > 0 && (
                <Block id="drawings" title="Drawings, models, and diagrams">
                  <div className="grid gap-6 sm:grid-cols-2">
                    {gallery.map((image) => (
                      <figure key={image.src}>
                        <ProjectImage image={image} sizes="(min-width: 1024px) 400px, 100vw" className="aspect-[16/10] rounded-lg border border-line" />
                        {image.caption && <figcaption className="mt-2 text-xs text-muted">{image.caption}</figcaption>}
                      </figure>
                    ))}
                  </div>
                </Block>
              )}
              <Block id="results" title="Results and engineering lessons">
                <List items={project.outcomes} />
                {project.lessons && project.lessons.length > 0 && (
                  <div className="mt-6 rounded-lg border-l-4 border-eng-blue bg-white p-5">
                    <h3 className="text-base font-bold">Lessons learned</h3>
                    <div className="mt-3 text-sm">
                      <List items={project.lessons} />
                    </div>
                  </div>
                )}
              </Block>
            </article>
          </div>

          <nav aria-label="More projects" className="mt-16 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
            {prev ? (
              <Link href={`/projects/${prev.slug}`} className="group rounded-xl border border-line bg-white p-5 transition-colors hover:border-eng-blue">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-muted uppercase">
                  <ArrowLeft className="size-3.5" aria-hidden="true" /> Previous
                </span>
                <span className="mt-1 block font-display font-bold text-navy group-hover:text-eng-blue">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/projects/${next.slug}`} className="group rounded-xl border border-line bg-white p-5 text-right transition-colors hover:border-eng-blue">
                <span className="flex items-center justify-end gap-1.5 text-xs font-semibold text-muted uppercase">
                  Next <ArrowRight className="size-3.5" aria-hidden="true" />
                </span>
                <span className="mt-1 block font-display font-bold text-navy group-hover:text-eng-blue">{next.title}</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
