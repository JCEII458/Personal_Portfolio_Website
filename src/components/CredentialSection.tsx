import type { LucideIcon } from "lucide-react";
import type { CredentialEntry } from "@/content/types";
import { ToConfirm } from "./ui/Badge";

type Props = { id: string; title: string; icon: LucideIcon; entries: CredentialEntry[]; note?: string };

export function CredentialSection({ id, title, icon: Icon, entries, note }: Props) {
  return (
    <section aria-labelledby={id} className="rounded-xl border border-line bg-white p-6 shadow-card sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-lg bg-[#e8f1fb] text-eng-blue">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h2 id={id} className="text-xl font-bold">
          {title}
        </h2>
      </div>
      <ul className="mt-6 divide-y divide-line">
        {entries.map((entry) => (
          <li key={entry.title} className="py-4 first:pt-0 last:pb-0">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="text-base font-semibold text-ink">{entry.title}</h3>
              {entry.status === "to-confirm" && <ToConfirm />}
            </div>
            {entry.issuer && <p className="mt-1 text-sm text-muted">{entry.issuer}</p>}
            {(entry.detail || entry.date) && (
              <p className="mt-1 text-sm text-muted">
                {entry.detail}
                {entry.detail && entry.date && " · "}
                {entry.date}
              </p>
            )}
          </li>
        ))}
      </ul>
      {note && <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-muted">{note}</p>}
    </section>
  );
}
