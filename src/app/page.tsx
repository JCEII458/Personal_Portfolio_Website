import Link from "next/link";
import { ArrowRight, Cpu, GraduationCap, ShieldCheck } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { SectionHeading } from "@/components/SectionHeading";
import { ExpertiseOverview } from "@/components/ExpertiseGrid";
import { SoftwareGrid } from "@/components/SoftwareGrid";
import { ResearchCard } from "@/components/ResearchCard";
import { ContactCTA } from "@/components/ContactCTA";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { about, profile } from "@/content/profile";
import { education } from "@/content/experience";

const sectors = [
  "Roads",
  "Bridges",
  "Drainage systems",
  "River control & flood protection",
  "Ports",
  "Evacuation centers",
  "Schools",
  "Health facilities",
  "Multipurpose buildings",
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Brand pillars strip */}
      <section aria-label="Professional focus" className="border-b border-line bg-white">
        <div className="container-page grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { title: "Structural Engineering", text: "Analysis, design, seismic assessment, and strengthening." },
            { title: "Infrastructure Development", text: "Roads, bridges, drainage, flood control, ports, and public buildings." },
            { title: "Engineering Innovation", text: "Structural modelling, digital tools, and performance-based research." },
          ].map((pillar, i) => (
            <div key={pillar.title} className="py-7 sm:px-6 sm:first:pl-0 sm:last:pr-0">
              <p className="font-mono text-xs text-muted">0{i + 1}</p>
              <p className="mt-1 font-display text-base font-bold text-navy">{pillar.title}</p>
              <p className="mt-1 text-sm text-muted">{pillar.text}</p>
            </div>
          ))}
        </div>
      </section>

      <FeaturedProjects />

      <section className="bg-white py-20 sm:py-24" aria-labelledby="expertise-title">
        <div className="container-page">
          <SectionHeading
            id="expertise-title"
            index="02"
            eyebrow="Professional expertise"
            title="Technical depth with delivery experience"
            description="My work spans structural analysis and design, public infrastructure development, and the technical review that keeps both safe, compliant, and buildable."
          />
          <div className="mt-12">
            <ExpertiseOverview />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface py-20 sm:py-24" aria-labelledby="software-title">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading
              id="software-title"
              index="03"
              eyebrow="Software & tools"
              title="Digital engineering toolkit"
              description="Industry-standard analysis, design, and documentation software — supported by spreadsheets and scripting for transparent, verifiable calculations."
            />
            <ButtonLink href="/expertise#software" variant="outline" className="mt-8">
              <Cpu className="size-4" aria-hidden="true" /> Software &amp; automation
            </ButtonLink>
          </div>
          <div className="lg:col-span-7">
            <SoftwareGrid compact />
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24" aria-labelledby="about-title">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading id="about-title" index="04" eyebrow="About & experience" title="Public infrastructure, engineered with care" />
            <div className="prose-body mt-6 leading-relaxed text-ink">
              <p>{about.introduction[0]}</p>
              <p className="text-muted">{about.careerBackground[0]}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/about" variant="primary">
                About me <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/experience" variant="outline">
                Experience &amp; credentials
              </ButtonLink>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-6">
            <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
              <h3 className="text-sm font-bold tracking-wider uppercase">Infrastructure experience</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {sectors.map((s) => (
                  <li key={s} className="rounded-md border border-line bg-white px-3 py-1.5 text-sm text-ink">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-line p-6">
                <ShieldCheck className="size-6 text-eng-blue" aria-hidden="true" />
                <h3 className="mt-4 text-sm font-bold tracking-wider uppercase">Registrations</h3>
                <ul className="mt-2 space-y-1 text-sm text-ink">
                  {profile.credentials.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-line p-6">
                <GraduationCap className="size-6 text-eng-blue" aria-hidden="true" />
                <h3 className="mt-4 text-sm font-bold tracking-wider uppercase">Education</h3>
                <ul className="mt-2 space-y-2 text-sm text-ink">
                  {education.map((e) => (
                    <li key={e.title}>
                      {e.title.replace("Master of Science in Civil Engineering, major in", "MSCE —").replace("Bachelor of Science in Civil Engineering", "BS Civil Engineering")}
                      {e.detail && <span className="block text-xs text-muted">{e.detail}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-24" aria-labelledby="research-title">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="research-title"
              index="05"
              eyebrow="Research & innovation"
              title="Performance-based seismic research"
              description="Investigating how strengthening existing low-rise buildings changes their probability of collapse during strong earthquakes."
            />
            <Link href="/research" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-eng-blue hover:text-navy">
              Research page <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12">
            <ResearchCard />
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
