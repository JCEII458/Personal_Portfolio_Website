import type { Metadata } from "next";
import { ArrowRight, Target } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ContactCTA } from "@/components/ContactCTA";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { about, profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "About",
  description:
    "Professional profile of Joel C. Escareal II — Registered Civil Engineer and Master Plumber specializing in structural engineering and public infrastructure development.",
  alternates: { canonical: "/about" },
};

const sections = [
  { id: "career", title: "Career background", body: about.careerBackground },
  { id: "structural", title: "Structural engineering interests", body: about.structuralInterests },
  { id: "infrastructure", title: "Infrastructure development experience", body: about.infrastructureExperience },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="Engineering with responsibility, rigour, and purpose" description={profile.supportingMessage} />

      <section className="bg-white py-16 sm:py-20" aria-labelledby="intro">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="rounded-xl border border-line bg-surface p-6 lg:sticky lg:top-28">
              <p className="font-display text-lg font-bold text-navy">{profile.name}</p>
              <p className="text-sm text-muted">{profile.title}</p>
              <ul className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm text-ink">
                {profile.credentials.map((c) => (
                  <li key={c}>{c}</li>
                ))}
                <li>10+ years in public infrastructure</li>
                <li>{profile.contact.location}</li>
              </ul>
              <nav aria-label="On this page" className="mt-6 border-t border-line pt-4">
                <p className="text-xs font-semibold tracking-wider text-muted uppercase">On this page</p>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {[
                    ["intro", "Professional introduction"],
                    ...sections.map((s) => [s.id, s.title]),
                    ["philosophy", "Engineering philosophy"],
                    ["development", "Professional development"],
                    ["objectives", "Career objectives"],
                  ].map(([id, label]) => (
                    <li key={id}>
                      <a href={`#${id}`} className="text-eng-blue hover:text-navy hover:underline">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          <div className="space-y-14 lg:col-span-8">
            <section aria-labelledby="intro" className="scroll-mt-28">
              <h2 id="intro" className="text-2xl font-bold sm:text-3xl">
                Professional introduction
              </h2>
              <div className="prose-body mt-5 text-lg leading-relaxed text-ink">
                {about.introduction.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>

            {sections.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-28 border-t border-line pt-12">
                <h2 id={`${s.id}-h`} className="text-2xl font-bold sm:text-3xl">
                  {s.title}
                </h2>
                <div className="prose-body mt-5 leading-relaxed text-ink">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section id="philosophy" aria-labelledby="philosophy-h" className="scroll-mt-20 bg-navy py-16 sm:py-20">
        <div className="container-page">
          <p className="text-xs font-semibold tracking-[0.18em] text-accent-soft uppercase">Engineering philosophy</p>
          <h2 id="philosophy-h" className="mt-3 max-w-3xl text-3xl font-bold text-white sm:text-4xl">
            Principles that guide my engineering decisions
          </h2>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {about.philosophy.map((item, i) => (
              <li key={item.title} className="bg-navy p-7">
                <p className="font-mono text-xs text-accent-soft">0{i + 1}</p>
                <h3 className="mt-2 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <section id="development" aria-labelledby="development-h" className="scroll-mt-28">
            <h2 id="development-h" className="text-2xl font-bold sm:text-3xl">
              Professional development
            </h2>
            <div className="prose-body mt-5 leading-relaxed text-ink">
              {about.professionalDevelopment.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
          <section id="objectives" aria-labelledby="objectives-h" className="scroll-mt-28 rounded-xl border border-line bg-surface p-7 sm:p-9">
            <Target className="size-7 text-eng-blue" aria-hidden="true" />
            <h2 id="objectives-h" className="mt-4 text-2xl font-bold sm:text-3xl">
              Career objectives
            </h2>
            <div className="prose-body mt-5 leading-relaxed text-ink">
              {about.careerObjectives.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-5 text-xs leading-relaxed text-muted">{profile.consultancyNotice}</p>
            <ButtonLink href="/experience" variant="primary" className="mt-7">
              View experience &amp; credentials <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </section>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
