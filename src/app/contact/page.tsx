import type { Metadata } from "next";
import { Mail, MapPin, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { LinkedInIcon } from "@/components/LinkedInIcon";
import { profile } from "@/content/profile";
import { inquiryTypes } from "@/lib/inquiry";
import { isContactConfigured } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Professional inquiries for Joel C. Escareal II — employment opportunities, engineering collaboration, and structural engineering consultation.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { email, linkedin, location, availability } = profile.contact;
  return (
    <>
      <PageHeader eyebrow="Contact" title="Professional inquiries" description={availability} />

      <section className="bg-surface py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-xl border border-line bg-white p-6 shadow-card">
              <h2 className="text-base font-bold">Direct contact</h2>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-eng-blue" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-muted">Email</p>
                    {email ? (
                      <a href={`mailto:${email}`} className="font-semibold text-navy hover:text-eng-blue">
                        {email}
                      </a>
                    ) : (
                      <p className="text-ink">To be added</p>
                    )}
                  </div>
                </li>
                <li className="flex gap-3">
                  <LinkedInIcon className="mt-0.5 size-4 shrink-0 text-eng-blue" />
                  <div>
                    <p className="text-xs text-muted">LinkedIn</p>
                    {linkedin ? (
                      <a href={linkedin} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy hover:text-eng-blue">
                        View profile<span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <p className="text-ink">To be added</p>
                    )}
                  </div>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-eng-blue" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-muted">Based in</p>
                    <p className="text-ink">{location}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-line bg-white p-6">
              <h2 className="text-base font-bold">I welcome inquiries about</h2>
              <ul className="mt-3 space-y-2 text-sm text-ink">
                {inquiryTypes.map((t) => (
                  <li key={t.value} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-eng-blue" />
                    {t.label}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-line pt-4 text-xs leading-relaxed text-muted">{profile.consultancyNotice}</p>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <div className="rounded-xl border border-line bg-white p-6 shadow-card sm:p-9">
              <h2 className="text-2xl font-bold">Send an inquiry</h2>
              <p className="mt-2 mb-8 text-sm text-muted">Fields marked * are required.</p>
              <ContactForm configured={isContactConfigured()} showSetupHint={process.env.NODE_ENV === "development"} />
            </div>

            <section id="privacy" aria-labelledby="privacy-h" className="mt-6 scroll-mt-28 rounded-xl border border-line bg-white p-6 sm:p-8">
              <h2 id="privacy-h" className="flex items-center gap-2 text-base font-bold">
                <ShieldCheck className="size-5 text-eng-blue" aria-hidden="true" /> Privacy notice
              </h2>
              <div className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                <p>
                  Information submitted through this form — your name, email address, organization, inquiry type, and message — is used only
                  to read and respond to your inquiry. It is delivered by email through a transactional email provider and is not stored in a
                  database on this website.
                </p>
                <p>
                  Your details are not sold, published, or shared with third parties for marketing. You may ask for your correspondence to be
                  deleted at any time. Please do not include confidential, sensitive, or personal information about other people in your
                  message.
                </p>
                <p>This website does not use advertising or tracking cookies.</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
