import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "blue" | "navy" | "neutral" | "amber" | "on-dark";

const tones: Record<Tone, string> = {
  blue: "bg-blue-soft text-eng-blue ring-blue-line",
  navy: "bg-navy text-white ring-navy",
  neutral: "bg-surface text-muted ring-line",
  amber: "bg-warn-bg text-warn-text ring-warn-line",
  "on-dark": "bg-white/10 text-white ring-white/20",
};

export function Badge({ children, tone = "neutral", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Marks content that still needs confirmation before launch. */
export function ToConfirm({ className }: { className?: string }) {
  return (
    <Badge tone="amber" className={className}>
      To be confirmed
    </Badge>
  );
}
