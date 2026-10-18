"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SearchX, X } from "lucide-react";
import type { InvolvementType, Project, ProjectCategory } from "@/content/types";
import { involvementLabels } from "@/content/projects";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";

type Props = { projects: Project[]; categories: ProjectCategory[] };

const normalize = (value: string) => value.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");

export function ProjectFilter({ projects, categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get("category");
  const [category, setCategory] = useState<string>(
    initialCategory && categories.some((c) => c.id === initialCategory) ? initialCategory : "all",
  );
  const [involvement, setInvolvement] = useState<string>("all");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const syncUrl = (next: { category?: string; q?: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    const nextCategory = next.category ?? category;
    const nextQuery = next.q ?? query;
    if (nextCategory === "all") params.delete("category");
    else params.set("category", nextCategory);
    if (nextQuery.trim()) params.set("q", nextQuery.trim());
    else params.delete("q");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: projects.length };
    for (const p of projects) map[p.category] = (map[p.category] ?? 0) + 1;
    return map;
  }, [projects]);

  const results = useMemo(() => {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    return projects.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (involvement !== "all" && p.involvement !== involvement) return false;
      if (!terms.length) return true;
      const label = categories.find((c) => c.id === p.category)?.label ?? "";
      const haystack = normalize(
        [p.title, p.summary, p.overview, p.projectType, label, involvementLabels[p.involvement].label, ...p.software, ...(p.keywords ?? []), p.location ?? ""].join(" "),
      );
      return terms.every((t) => haystack.includes(t));
    });
  }, [projects, categories, category, involvement, query]);

  const reset = () => {
    setCategory("all");
    setInvolvement("all");
    setQuery("");
    router.replace(pathname, { scroll: false });
  };

  const activeCategory = categories.find((c) => c.id === category);
  const filtersActive = category !== "all" || involvement !== "all" || query.trim() !== "";

  return (
    <div>
      <div className="rounded-xl border border-line bg-white p-4 shadow-card sm:p-6">
        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
          <div className="relative">
            <label htmlFor="project-search" className="sr-only">
              Search projects
            </label>
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              id="project-search"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                syncUrl({ q: e.target.value });
              }}
              placeholder="Search projects (e.g. bridge, seismic, ETABS)"
              className="h-12 w-full rounded-md border border-line bg-surface pr-10 pl-11 text-sm text-ink placeholder:text-muted focus:border-accent focus:bg-white focus:outline-none focus-visible:outline-2"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  syncUrl({ q: "" });
                }}
                className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded text-muted hover:text-navy"
                aria-label="Clear search"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            )}
          </div>
          <div>
            <label htmlFor="involvement" className="sr-only">
              Filter by my involvement
            </label>
            <select
              id="involvement"
              value={involvement}
              onChange={(e) => setInvolvement(e.target.value)}
              className="h-12 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink focus:border-accent focus:outline-none focus-visible:outline-2 md:w-64"
            >
              <option value="all">All involvement types</option>
              {(Object.keys(involvementLabels) as InvolvementType[]).map((key) => (
                <option key={key} value={key}>
                  {involvementLabels[key].label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5" role="group" aria-label="Filter by project category">
          <ul className="-mx-1 flex flex-wrap gap-2">
            {[{ id: "all", shortLabel: "All projects", label: "All projects" }, ...categories].map((c) => {
              const selected = category === c.id;
              const count = counts[c.id] ?? 0;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    title={c.label}
                    onClick={() => {
                      setCategory(c.id);
                      syncUrl({ category: c.id });
                    }}
                    className={cn(
                      "inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors",
                      selected ? "border-navy bg-navy text-white" : "border-line bg-white text-ink hover:border-eng-blue hover:text-eng-blue",
                    )}
                  >
                    {c.shortLabel}
                    <span className={cn("text-xs tabular-nums", selected ? "text-white/70" : "text-muted")}>{count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-sm text-muted" aria-live="polite" aria-atomic="true">
          Showing <strong className="font-semibold text-ink">{results.length}</strong> of {projects.length} projects
          {activeCategory && (
            <>
              {" "}
              in <strong className="font-semibold text-ink">{activeCategory.label}</strong>
            </>
          )}
          {query.trim() && (
            <>
              {" "}
              matching <strong className="font-semibold text-ink">&ldquo;{query.trim()}&rdquo;</strong>
            </>
          )}
        </p>
        {filtersActive && (
          <button type="button" onClick={reset} className="text-sm font-semibold text-eng-blue hover:text-navy">
            Clear all filters
          </button>
        )}
      </div>

      {activeCategory && <p className="mt-2 text-sm text-muted">{activeCategory.description}</p>}

      {results.length > 0 ? (
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 flex flex-col items-center rounded-xl border border-dashed border-line bg-white px-6 py-16 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-surface text-muted">
            <SearchX className="size-7" aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-lg font-bold">No projects match these filters</h2>
          <p className="mt-2 max-w-md text-sm text-muted">
            Try a broader keyword such as &ldquo;concrete&rdquo;, &ldquo;bridge&rdquo; or &ldquo;drainage&rdquo;, choose a different category, or
            clear the filters to see all projects.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 inline-flex min-h-11 items-center rounded-md bg-eng-blue px-5 text-sm font-semibold text-white hover:bg-navy"
          >
            Show all projects
          </button>
        </div>
      )}
    </div>
  );
}
