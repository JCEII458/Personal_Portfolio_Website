import type { Metadata } from "next";
import { Award, BookOpen, GraduationCap, Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { CredentialSection } from "@/components/CredentialSection";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactCTA } from "@/components/ContactCTA";
import { education, experience, memberships, registrations, training } from "@/content/experience";

export const metadata: Metadata = {
  title: "Experience & Credentials",
  description:
    "Professional experience, registrations, education, training, and memberships of Joel C. Escareal II, Registered Civil Engineer and Registered Master Plumber.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience & credentials"
        title="Professional experience"
        description="More than ten years in local government infrastructure — planning, detailed engineering design, project evaluation, technical review, and implementation support."
      />

      <section className="bg-surface py-16 sm:py-20" aria-labelledby="timeline-h">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="timeline-h" eyebrow="Career timeline" title="Where I have worked" description="Entries marked “To be confirmed” are awaiting verified titles and dates before publication." />
          </div>
          <div className="lg:col-span-8">
            <ExperienceTimeline entries={experience} />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" aria-labelledby="credentials-h">
        <div className="container-page">
          <SectionHeading id="credentials-h" eyebrow="Credentials" title="Registration, education, and development" />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <CredentialSection
              id="registration-h"
              title="Professional registration"
              icon={Award}
              entries={registrations}
              note="Registration numbers and certificates are intentionally not published on this website and can be provided to prospective employers on request."
            />
            <CredentialSection id="education-h" title="Education" icon={GraduationCap} entries={education} />
            <CredentialSection id="training-h" title="Training and continuing professional development" icon={BookOpen} entries={training} />
            <CredentialSection id="memberships-h" title="Professional memberships" icon={Users} entries={memberships} />
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
