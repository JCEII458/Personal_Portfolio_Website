import { softwareTools } from "@/content/expertise";
import { Badge } from "./ui/Badge";

/** Software grid with neutral text marks (no third-party logos). */
export function SoftwareGrid({ compact = false }: { compact?: boolean }) {
  return (
    <ul className={compact ? "grid gap-3 min-[420px]:grid-cols-2" : "grid gap-5 sm:grid-cols-2 lg:grid-cols-4"}>
      {softwareTools.map((tool) => (
        <li
          key={tool.name}
          className={
            compact
              ? "rounded-lg border border-line bg-white px-4 py-4"
              : "flex flex-col rounded-xl border border-line bg-white p-6 shadow-card"
          }
        >
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="grid size-10 shrink-0 place-items-center rounded-md bg-navy font-display text-xs font-bold tracking-wide text-white"
            >
              {tool.name
                .replace(/[^A-Za-z ]/g, " ")
                .split(" ")
                .filter(Boolean)
                .map((w) => w[0])
                .join("")
                .slice(0, 3)
                .toUpperCase()}
            </span>
            <div className="min-w-0">
              <h3 className="text-base font-bold">{tool.name}</h3>
              <p className="text-xs text-muted">{tool.category}</p>
            </div>
          </div>
          {!compact && (
            <>
              <p className="mt-4 text-sm leading-relaxed text-muted">{tool.use}</p>
              <div className="mt-auto pt-5">
                {tool.proficiency ? <Badge tone="blue">{tool.proficiency}</Badge> : <Badge>Proficiency to be confirmed</Badge>}
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
