import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  index?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, index, title, description, align = "left", tone = "light", as = "h2", id, className }: Props) {
  const Heading = as;
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-3 flex items-center gap-3 text-xs font-semibold tracking-[0.18em] uppercase",
            align === "center" && "justify-center",
            dark ? "text-accent-soft" : "text-eng-blue",
          )}
        >
          {index && <span className={cn("font-mono", dark ? "text-white/50" : "text-muted")}>{index}</span>}
          <span aria-hidden="true" className={cn("h-px w-8", dark ? "bg-accent-soft/60" : "bg-eng-blue/50")} />
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        className={cn(
          "text-3xl leading-tight font-bold sm:text-4xl",
          dark && "text-white",
        )}
      >
        {title}
      </Heading>
      {description && (
        <div className={cn("mt-4 text-base leading-relaxed sm:text-lg", dark ? "text-white/75" : "text-muted")}>{description}</div>
      )}
    </div>
  );
}
