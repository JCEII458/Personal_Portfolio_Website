import { ArrowRight, FileText } from "lucide-react";
import { ButtonLink } from "./ui/ButtonLink";
import { profile } from "@/content/profile";

export function ContactCTA() {
  return (
    <section className="bg-white py-20 sm:py-24" aria-labelledby="contact-cta-title">
      <div className="container-page">
        <div className="blueprint-grid relative overflow-hidden rounded-2xl bg-navy px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-accent-soft uppercase">Let&rsquo;s work together</p>
              <h2 id="contact-cta-title" className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Building safer, more resilient infrastructure starts with a conversation.
              </h2>
              <p className="mt-4 max-w-2xl text-white/75">{profile.contact.availability}</p>
              <p className="mt-3 max-w-2xl text-xs leading-relaxed text-white/50">{profile.consultancyNotice}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <ButtonLink href="/contact" variant="light">
                Start a conversation <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/cv" variant="outline-light">
                <FileText className="size-4" aria-hidden="true" /> View CV
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
