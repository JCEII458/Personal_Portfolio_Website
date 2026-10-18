import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { BookOpen, FileText, FlaskConical, Presentation, Wrench } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { featuredResearch as r, researchOutputs, researchStageLabels } from "@/content/research";
import type { ResearchStage } from "@/content/types";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Research & Innovation",
  description:
    "Proposed research on performance-based seismic evaluation and collapse fragility assessment of low-rise buildings retrofitted with concrete jacketing using Incremental Dynamic Analysis.",
  alternates: { canonical: "/research" },
};

const stages: ResearchStage[] = ["proposed", "ongoing", "completed", "published"];

function Section({ id, title, children, label }: { id: string; title: string; children: ReactNode; label?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-28 border-t border-line pt-10">
      <div className="flex flex-wrap items-center gap-3">
        <h2 id={`${id}-h`} className="text-2xl font-bold">
          {title}
        </h2>
        {label && <Badge tone="amber">{label}</Badge>}
      </div>
      <div className="prose-body mt-4 leading-relaxed text-ink">{children}</div>
    </section>
  );
}

const outputIcons = { Paper: FileText, Presentation: Presentation, "Engineering tool": Wrench, "Technical publication": BookOpen } as const;

export default function ResearchPage() {
  const currentIndex = stages.indexOf(r.stage);
  const methodLabel = r.stage === "proposed" ? "Proposed" : r.stage === "ongoing" ? "In progress" : undefined;

  return (
    <>
      <PageHeader eyebrow="Research & innovation" title={r.shortTitle} description={r.summary}>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="amber">
            <FlaskConical className="size-3.5" aria-hidden="true" /> {researchStageLabels[r.stage].label}
          </Badge>
          <Badge tone="on-dark">Earthquake Engineering</Badge>
          <Badge tone="on-dark">Nonlinear Dynamic Analysis</Badge>
        </div>
      </PageHeader>

      <section className="bg-white py-14 sm:py-16" aria-labelledby="status-h">
        <div className="container-page">
          <h2 id="status-h" className="text-sm font-bold tracking-wider uppercase">
            Research status
          </h2>
          <ol className="mt-5 grid gap-3 sm:grid-cols-4">
            {stages.map((s, i) => {
              const current = i === currentIndex;
              const done = i < currentIndex;
              return (
                <li
                  key={s}
                  aria-current={current ? "step" : undefined}
                  className={cn(
                    "rounded-lg border p-4",
                    current ? "border-eng-blue bg-[#e8f1fb]" : done ? "border-line bg-surface" : "border-dashed border-line bg-white",
                  )}
                >
                  <p className={cn("font-mono text-xs", current ? "text-eng-blue" : "text-muted")}>Stage {i + 1}</p>
                  <p className={cn("mt-1 text-sm font-bold", current ? "text-navy" : "text-muted")}>{researchStageLabels[s].label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{researchStageLabels[s].description}</p>
                </li>
              );
            })}
          </ol>
          <p className="mt-4 text-sm text-muted">{r.institution}</p>
        </div>
      </section>

      <div className="bg-surface pb-20">
        <div className="container-page grid gap-12 pt-4 lg:grid-cols-12">
          <article className="space-y-10 lg:col-span-8">
            <h2 className="sr-only">Research overview</h2>
            <p className="pt-10 font-display text-xl leading-snug font-bold text-navy sm:text-2xl">{r.title}</p>

            <Section id="background" title="Research background">
              {r.background.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Section>

            <Section id="problem" title="Problem statement">
              <p>{r.problem}</p>
            </Section>

            <Section id="objectives" title="Objectives">
              <ol className="space-y-3">
                {r.objectives.map((o, i) => (
                  <li key={o} className="flex gap-4">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#e8f1fb] font-mono text-xs font-semibold text-eng-blue">
                      {i + 1}
                    </span>
                    {o}
                  </li>
                ))}
              </ol>
            </Section>

            <Section id="methodology" title="Proposed methodology and analysis workflow" label={methodLabel}>
              <ol className="relative mt-2 space-y-0">
                {r.methodology.map((m, i) => (
                  <li key={m.step} className="relative flex gap-5 pb-6 last:pb-0">
                    {i < r.methodology.length - 1 && <span aria-hidden="true" className="absolute top-9 left-[17px] h-[calc(100%-2.25rem)] w-px bg-line" />}
                    <span className="relative grid size-9 shrink-0 place-items-center rounded-full border-2 border-eng-blue bg-white font-mono text-xs font-bold text-eng-blue">
                      {i + 1}
                    </span>
                    <div className="pt-1">
                      <h3 className="text-base font-bold">{m.step}</h3>
                      <p className="mt-1 text-sm text-muted">{m.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Section>

            <Section id="ida" title="Incremental Dynamic Analysis">
              {r.idaExplanation.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <figure className="mt-6">
                <div className="relative overflow-hidden rounded-lg border border-line bg-white">
                  <Image
                    src="/images/illustrations/ida-curves.svg"
                    alt="Illustrative IDA curves plotting ground-motion intensity against maximum inter-storey drift, flattening at collapse"
                    width={1200}
                    height={750}
                    unoptimized
                    className="w-full"
                  />
                </div>
                <figcaption className="mt-2 text-xs text-muted">Conceptual illustration of IDA curves — not analysis results.</figcaption>
              </figure>
            </Section>

            <Section id="fragility" title="Collapse fragility assessment">
              {r.fragilityExplanation.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <figure className="mt-6">
                <div className="relative overflow-hidden rounded-lg border border-line bg-white">
                  <Image
                    src="/images/illustrations/fragility-curve.svg"
                    alt="Illustrative lognormal collapse fragility curves for an existing and a retrofitted building"
                    width={1200}
                    height={750}
                    unoptimized
                    className="w-full"
                  />
                </div>
                <figcaption className="mt-2 text-xs text-muted">Conceptual illustration of fragility curves — not analysis results.</figcaption>
              </figure>
            </Section>

            <Section id="jacketing" title="Concrete jacketing evaluation">
              {r.jacketingEvaluation.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Section>

            <Section id="references" title="Applicable codes and literature">
              <ul className="space-y-2.5 text-sm">
                {r.references.map((ref) => (
                  <li key={ref} className="border-l-2 border-line pl-4">
                    {ref}
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="findings" title="Findings and conclusions">
              {r.findings.length > 0 ? (
                <ul className="space-y-2">
                  {r.findings.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              ) : (
                <p className="rounded-lg border border-dashed border-line bg-white p-5 text-sm text-muted">
                  No findings are reported yet. This section will be updated only when results have been established through completed analysis.
                </p>
              )}
            </Section>
          </article>

          <aside className="lg:col-span-4">
            <div className="space-y-6 pt-10 lg:sticky lg:top-28">
              <nav aria-label="Research sections" className="rounded-xl border border-line bg-white p-6">
                <p className="text-xs font-semibold tracking-wider text-muted uppercase">Contents</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {[
                    ["background", "Background"],
                    ["problem", "Problem statement"],
                    ["objectives", "Objectives"],
                    ["methodology", "Methodology"],
                    ["ida", "Incremental Dynamic Analysis"],
                    ["fragility", "Collapse fragility"],
                    ["jacketing", "Concrete jacketing"],
                    ["references", "Codes & literature"],
                    ["findings", "Findings"],
                  ].map(([id, label]) => (
                    <li key={id}>
                      <a href={`#${id}`} className="text-eng-blue hover:text-navy hover:underline">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <section aria-labelledby="outputs-h" className="rounded-xl border border-line bg-white p-6">
                <h2 id="outputs-h" className="text-base font-bold">
                  Papers, presentations &amp; tools
                </h2>
                {researchOutputs.length > 0 ? (
                  <ul className="mt-4 space-y-3">
                    {researchOutputs.map((o) => {
                      const Icon = outputIcons[o.type];
                      const href = o.file ?? o.url;
                      return (
                        <li key={o.title} className="flex gap-3 text-sm">
                          <Icon className="mt-0.5 size-4 shrink-0 text-eng-blue" aria-hidden="true" />
                          <div>
                            {href ? (
                              <a href={href} className="font-semibold text-navy hover:text-eng-blue" {...(o.url ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                                {o.title}
                              </a>
                            ) : (
                              <span className="font-semibold text-navy">{o.title}</span>
                            )}
                            <p className="text-xs text-muted">{[o.type, o.venue, o.year].filter(Boolean).join(" · ")}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Future papers, technical presentations, engineering tools, and downloadable publications will be listed here as they become
                    available.
                  </p>
                )}
              </section>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
