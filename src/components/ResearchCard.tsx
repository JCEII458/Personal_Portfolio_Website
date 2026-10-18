import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FlaskConical } from "lucide-react";
import { featuredResearch, researchStageLabels } from "@/content/research";
import { Badge } from "./ui/Badge";

export function ResearchCard() {
  const stage = researchStageLabels[featuredResearch.stage];
  return (
    <article className="grid overflow-hidden rounded-2xl border border-line bg-white shadow-card lg:grid-cols-2">
      <div className="relative border-b border-line bg-surface lg:border-r lg:border-b-0">
        <Image
          src="/images/illustrations/fragility-curve.svg"
          alt="Illustrative collapse fragility curves comparing an existing building and a building retrofitted with concrete jacketing"
          width={1200}
          height={750}
          unoptimized
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-full w-full object-cover"
        />
        <span className="absolute top-3 left-3 rounded bg-navy-deep/85 px-2 py-1 text-[10px] font-semibold tracking-wider text-white uppercase">
          Illustrative — not results
        </span>
      </div>
      <div className="flex flex-col p-7 sm:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="amber">
            <FlaskConical className="size-3.5" aria-hidden="true" />
            {stage.label}
          </Badge>
          <Badge>Structural &amp; Earthquake Engineering</Badge>
        </div>
        <h3 className="mt-5 text-xl leading-snug font-bold sm:text-2xl">{featuredResearch.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{featuredResearch.summary}</p>
        <p className="mt-4 text-xs text-muted">{stage.description}</p>
        <Link
          href="/research"
          className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold text-eng-blue hover:text-navy"
        >
          Read the research overview <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
