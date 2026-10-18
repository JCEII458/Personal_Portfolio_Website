import Link from "next/link";
import { ArrowRight, Building2, ClipboardCheck, Landmark, Check } from "lucide-react";
import type { ExpertiseGroup } from "@/content/types";
import { expertiseGroups } from "@/content/expertise";

const icons = { structural: Building2, infrastructure: Landmark, management: ClipboardCheck } as const;

function GroupIcon({ id }: { id: string }) {
  const Icon = icons[id as keyof typeof icons] ?? Building2;
  return (
    <span className="grid size-12 place-items-center rounded-lg bg-[#e8f1fb] text-eng-blue">
      <Icon className="size-6" aria-hidden="true" />
    </span>
  );
}

/** Compact three-pillar overview (homepage). */
export function ExpertiseOverview() {
  return (
    <ul className="grid gap-6 lg:grid-cols-3">
      {expertiseGroups.map((group) => (
        <li key={group.id} className="flex flex-col rounded-xl border border-line bg-white p-7 shadow-card">
          <GroupIcon id={group.id} />
          <h3 className="mt-5 text-xl font-bold">{group.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{group.summary}</p>
          <ul className="mt-5 space-y-2 border-t border-line pt-5">
            {group.items.slice(0, 4).map((item) => (
              <li key={item.title} className="flex gap-2.5 text-sm text-ink">
                <Check className="mt-0.5 size-4 shrink-0 text-eng-blue" aria-hidden="true" />
                {item.title}
              </li>
            ))}
          </ul>
          <Link
            href={`/expertise#${group.id}`}
            className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-eng-blue hover:text-navy"
          >
            Explore {group.title.toLowerCase()} <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Full detailed grid (expertise page). */
export function ExpertiseGrid({ groups = expertiseGroups }: { groups?: ExpertiseGroup[] }) {
  return (
    <div className="space-y-16">
      {groups.map((group, i) => (
        <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`} className="scroll-mt-28">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <GroupIcon id={group.id} />
                <p className="mt-5 font-mono text-xs text-muted">0{i + 1}</p>
                <h2 id={`${group.id}-title`} className="mt-1 text-2xl font-bold sm:text-3xl">
                  {group.title}
                </h2>
                <p className="mt-3 leading-relaxed text-muted">{group.summary}</p>
              </div>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
              {group.items.map((item) => (
                <li key={item.title} className="rounded-lg border border-line bg-white p-5 transition-colors hover:border-eng-blue/40">
                  <h3 className="text-base font-bold">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
}
