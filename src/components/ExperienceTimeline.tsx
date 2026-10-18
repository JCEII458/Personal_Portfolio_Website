import { Briefcase, MapPin } from "lucide-react";
import type { ExperienceEntry } from "@/content/types";
import { ToConfirm, Badge } from "./ui/Badge";

export function ExperienceTimeline({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <ol className="relative space-y-10 border-l-2 border-line pl-8 sm:pl-10">
      {entries.map((entry) => (
        <li key={`${entry.position}-${entry.organization}`} className="relative">
          <span
            aria-hidden="true"
            className="absolute top-1 -left-[calc(2rem+9px)] grid size-4 place-items-center rounded-full border-2 border-eng-blue bg-white sm:-left-[calc(2.5rem+9px)]"
          >
            <span className="size-1.5 rounded-full bg-eng-blue" />
          </span>
          <article className="rounded-xl border border-line bg-white p-6 shadow-card sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold text-eng-blue">{entry.dates}</p>
              {entry.status === "to-confirm" && <ToConfirm />}
            </div>
            <h3 className="mt-2 text-xl font-bold">{entry.position}</h3>
            <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="size-4" aria-hidden="true" />
                {entry.organization}
              </span>
              {entry.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-4" aria-hidden="true" />
                  {entry.location}
                </span>
              )}
            </p>

            <div className="mt-6 grid gap-8 lg:grid-cols-2">
              <div>
                <h4 className="text-sm font-bold tracking-wide uppercase">Responsibilities</h4>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink">
                  {entry.responsibilities.map((r) => (
                    <li key={r} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-eng-blue" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold tracking-wide uppercase">Selected contributions</h4>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                    {entry.contributions.map((c) => (
                      <li key={c} className="flex gap-2.5">
                        <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-line" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-wide uppercase">Infrastructure work</h4>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {entry.relevantWork.map((w) => (
                      <li key={w}>
                        <Badge>{w}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
