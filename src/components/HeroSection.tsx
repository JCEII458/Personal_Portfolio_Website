import Image from "next/image";
import { ArrowRight, Download, FileText, ShieldCheck } from "lucide-react";
import { profile } from "@/content/profile";
import { getCv } from "@/lib/cv";
import { ButtonLink } from "./ui/ButtonLink";

export function HeroSection() {
  const cv = getCv();
  const [first, second, third] = profile.positioning.split(". ").map((s) => s.replace(/\.$/, ""));
  const { portrait } = profile;

  return (
    <section className="blueprint-grid relative overflow-hidden bg-navy pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24" aria-labelledby="hero-title">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 right-0 h-[480px] w-[480px] rounded-full bg-eng-blue/20 blur-3xl" />

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="animate-rise lg:col-span-7">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/85">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            {profile.name} — {profile.title}
          </p>

          <h1 id="hero-title" className="mt-6 text-4xl leading-[1.08] font-extrabold text-white sm:text-5xl xl:text-[3.6rem]">
            <span className="block">{first}.</span>
            <span className="block text-accent-soft">{second}.</span>
            <span className="block">{third}.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">{profile.heroDescription}</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">{profile.heroSupporting}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/projects" variant="primary" className="bg-accent hover:bg-eng-blue">
              Explore My Projects <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            {cv.available ? (
              <ButtonLink href={cv.href} external download variant="outline-light">
                <Download className="size-4" aria-hidden="true" /> Download My CV
                <span className="sr-only"> (PDF, {cv.sizeLabel})</span>
              </ButtonLink>
            ) : (
              <ButtonLink href="/cv" variant="outline-light">
                <FileText className="size-4" aria-hidden="true" /> CV &amp; Résumé Summary
              </ButtonLink>
            )}
          </div>

          <dl className="mt-12 grid max-w-2xl grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            {profile.metrics.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span className="block font-display text-3xl font-bold text-white">{m.value}</span>
                  <span className="mt-1 block text-sm leading-snug text-white/60">{m.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-rise [animation-delay:120ms] lg:col-span-5">
          <figure className="relative mx-auto max-w-sm lg:mr-0 lg:max-w-md">
            {/* Drawing-sheet corner marks */}
            <span aria-hidden="true" className="absolute -top-3 -left-3 size-8 border-t-2 border-l-2 border-accent/70" />
            <span aria-hidden="true" className="absolute -right-3 -bottom-3 size-8 border-r-2 border-b-2 border-accent/70" />
            <div className="relative overflow-hidden rounded-xl border border-white/15 bg-navy-800 shadow-2xl shadow-navy-deep/50">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                width={portrait.width}
                height={portrait.height}
                priority
                sizes="(min-width: 1024px) 420px, 90vw"
                unoptimized={portrait.src.endsWith(".svg")}
                className="aspect-[4/5] w-full object-cover"
              />
              {portrait.isPlaceholder && (
                <span className="absolute top-3 left-3 rounded bg-navy-deep/85 px-2 py-1 text-[10px] font-semibold tracking-wider text-white uppercase">
                  Portrait placeholder
                </span>
              )}
            </div>
            <figcaption className="relative -mt-10 mx-4 rounded-lg border border-line bg-white p-5 shadow-card sm:mx-6">
              <p className="font-display text-lg font-bold text-navy">{profile.name}</p>
              <p className="text-sm text-muted">{profile.title}</p>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                {profile.credentials.map((c) => (
                  <li key={c} className="flex items-center gap-1.5 text-xs font-medium text-eng-blue">
                    <ShieldCheck className="size-3.5" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
