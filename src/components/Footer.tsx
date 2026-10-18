import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { navigation } from "@/content/site";
import { profile } from "@/content/profile";
import { CurrentYear } from "./CurrentYear";
import { LinkedInIcon } from "./LinkedInIcon";

export function Footer() {
  const { email, linkedin, location } = profile.contact;
  return (
    <footer className="bg-navy-deep text-white/70">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-xl font-bold text-white">{profile.name}</p>
          <p className="mt-1 text-sm text-accent-soft">{profile.title}</p>
          <p className="mt-5 max-w-md text-sm leading-relaxed">{profile.statement}</p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-white/50 uppercase">Navigate</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/cv" className="transition-colors hover:text-white">
                CV
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-white/50 uppercase">Connect</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-accent-soft" aria-hidden="true" />
              {email ? (
                <a href={`mailto:${email}`} className="transition-colors hover:text-white">
                  {email}
                </a>
              ) : (
                <span>Email address to be added</span>
              )}
            </li>
            <li className="flex items-center gap-3">
              <LinkedInIcon className="size-4 shrink-0 text-accent-soft" />
              {linkedin ? (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                  LinkedIn profile<span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <span>LinkedIn profile to be added</span>
              )}
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-4 shrink-0 text-accent-soft" aria-hidden="true" />
              <span>{location}</span>
            </li>
          </ul>
          <Link href="/contact" className="mt-6 inline-flex text-sm font-semibold text-white underline decoration-accent underline-offset-4 hover:decoration-white">
            Send a professional inquiry
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © <CurrentYear /> {profile.name}. All rights reserved.
          </p>
          <p className="max-w-2xl md:text-right">{profile.independenceNotice}</p>
        </div>
      </div>
    </footer>
  );
}
