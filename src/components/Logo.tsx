import Link from "next/link";
import { profile } from "@/content/profile";

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Logo({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link href="/" onClick={onNavigate} className="group flex items-center gap-3 rounded-md" aria-label={`${profile.name} — home`}>
      <span
        aria-hidden="true"
        className="grid size-10 place-items-center rounded-md border border-white/25 bg-white/5 font-display text-sm font-extrabold tracking-wide text-white transition-colors group-hover:border-accent-soft"
      >
        {profile.initials}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-display text-[15px] font-bold text-white">{profile.name}</span>
        <span className="hidden text-xs tracking-wide text-white/70 sm:block">Civil Engineer · Structural Engineering</span>
      </span>
    </Link>
  );
}

