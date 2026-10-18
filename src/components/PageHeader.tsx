import type { ReactNode } from "react";
import { SectionHeading } from "./SectionHeading";

/** Navy title band used at the top of inner pages. */
export function PageHeader({ eyebrow, title, description, children }: { eyebrow: string; title: string; description?: ReactNode; children?: ReactNode }) {
  return (
    <section className="blueprint-grid relative overflow-hidden bg-navy pt-32 pb-16 sm:pt-36 sm:pb-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-navy-deep/40" />
      <div className="container-page relative">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} tone="dark" className="[&_h1]:text-4xl sm:[&_h1]:text-5xl" />
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
