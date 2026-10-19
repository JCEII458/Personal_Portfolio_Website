import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "outline-light" | "light" | "text";

const variants: Record<Variant, string> = {
  primary: "bg-eng-blue text-white hover:bg-eng-blue-hover shadow-sm",
  outline: "border border-line bg-white text-navy hover:border-eng-blue hover:text-eng-blue",
  "outline-light": "border border-white/30 text-white hover:border-white hover:bg-white/10",
  light: "bg-white text-navy hover:bg-surface shadow-sm",
  text: "px-0! text-eng-blue hover:text-navy underline-offset-4 hover:underline",
};

type Props = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  /** Use a plain <a> (for files and external links). */
  external?: boolean;
} & Omit<ComponentProps<"a">, "href">;

export function ButtonLink({ href, variant = "primary", children, className, external, ...rest }: Props) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-colors duration-200",
    variants[variant],
    className,
  );
  if (external) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
