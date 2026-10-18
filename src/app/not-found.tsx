import type { Metadata } from "next";
import { ArrowLeft, Compass } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="blueprint-grid flex min-h-[80vh] items-center bg-navy pt-28 pb-20">
      <div className="container-page text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-full border border-white/20 text-accent-soft">
          <Compass className="size-8" aria-hidden="true" />
        </span>
        <p className="mt-6 font-mono text-sm text-accent-soft">Error 404</p>
        <h1 className="mt-2 text-4xl font-extrabold text-white sm:text-5xl">This page could not be found</h1>
        <p className="mx-auto mt-4 max-w-xl text-white/70">
          The page may have been moved, renamed, or is no longer available. Let&rsquo;s get you back on solid ground.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" variant="light">
            <ArrowLeft className="size-4" aria-hidden="true" /> Back to home
          </ButtonLink>
          <ButtonLink href="/projects" variant="outline-light">
            Browse projects
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
