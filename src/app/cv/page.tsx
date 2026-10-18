import type { Metadata } from "next";
import Link from "next/link";
import { Check, Download, FileText, FolderOpen, TriangleAlert } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cvConfig, supportingDocuments } from "@/content/site";
import { researchOutputs } from "@/content/research";
import { getCv } from "@/lib/cv";

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  description: "Résumé summary and CV download for Joel C. Escareal II, Civil Engineer specializing in Structural Engineering.",
  alternates: { canonical: "/cv" },
};

export default function CvPage() {
  const cv = getCv();
  const publications = researchOutputs.filter((o) => o.file);

  return (
    <>
      <PageHeader eyebrow="Curriculum vitae" title="CV and professional documents" description="A concise summary of my professional background, with the full CV available as a PDF." />

      <section className="bg-surface py-16 sm:py-20">
        <div className="container-page grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-line bg-white p-7 shadow-card lg:sticky lg:top-28">
              <span className="grid size-12 place-items-center rounded-lg bg-navy text-white">
                <FileText className="size-6" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-xl font-bold">Full CV (PDF)</h2>
              {cv.available ? (
                <>
                  <p className="mt-2 text-sm text-muted">
                    PDF · {cv.sizeLabel}
                    {cvConfig.lastUpdated && ` · Updated ${cvConfig.lastUpdated}`}
                  </p>
                  <ButtonLink href={cv.href} external download variant="primary" className="mt-6 w-full">
                    <Download className="size-4" aria-hidden="true" /> Download My CV
                  </ButtonLink>
                </>
              ) : (
                <div role="note" className="mt-4 rounded-lg border border-[#efdcae] bg-[#fdf6e7] p-4 text-sm text-[#5c3f0b]">
                  <p className="flex items-center gap-2 font-semibold">
                    <TriangleAlert className="size-4" aria-hidden="true" /> CV not yet uploaded
                  </p>
                  <p className="mt-1.5 leading-relaxed">
                    The downloadable CV will be available here soon. Until then, a copy can be requested through the{" "}
                    <Link href="/contact" className="font-semibold underline">
                      contact page
                    </Link>
                    .
                  </p>
                  {process.env.NODE_ENV === "development" && (
                    <p className="mt-2 font-mono text-xs">Site owner: add the PDF at {cv.expectedPath} and rebuild.</p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8 lg:col-span-7">
            <section aria-labelledby="summary-h" className="rounded-xl border border-line bg-white p-7 sm:p-9">
              <h2 id="summary-h" className="text-xl font-bold">
                Résumé summary
              </h2>
              <ul className="mt-5 space-y-3">
                {cvConfig.summary.map((line) => (
                  <li key={line} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                    <Check className="mt-1 size-4 shrink-0 text-eng-blue" aria-hidden="true" />
                    {line}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="docs-h" className="rounded-xl border border-line bg-white p-7 sm:p-9">
              <h2 id="docs-h" className="text-xl font-bold">
                Technical publications and project sheets
              </h2>
              {supportingDocuments.length + publications.length > 0 ? (
                <ul className="mt-5 divide-y divide-line">
                  {[...supportingDocuments, ...publications.map((p) => ({ title: p.title, file: p.file!, type: p.type, description: p.venue }))].map((doc) => (
                    <li key={doc.file} className="flex items-center justify-between gap-4 py-3">
                      <div>
                        <p className="font-semibold text-navy">{doc.title}</p>
                        <p className="text-xs text-muted">{[doc.type, doc.description].filter(Boolean).join(" · ")}</p>
                      </div>
                      <a href={doc.file} download className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-md border border-line px-3 text-sm font-semibold text-eng-blue hover:border-eng-blue">
                        <Download className="size-4" aria-hidden="true" /> PDF
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-5 flex gap-3 rounded-lg border border-dashed border-line p-5 text-sm text-muted">
                  <FolderOpen className="size-5 shrink-0" aria-hidden="true" />
                  <p>Selected technical publications and sanitized project sheets will be published here once they are approved for release.</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
