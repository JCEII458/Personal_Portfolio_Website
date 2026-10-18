"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, X } from "lucide-react";
import { navigation } from "@/content/site";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";
import { Logo, isActive } from "./Logo";

type Props = { open: boolean; onClose: () => void; pathname: string };

export function MobileNavigation({ open, onClose, pathname }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      id="mobile-navigation"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-navy-deep lg:hidden"
    >
      <div className="container-page flex h-18 shrink-0 items-center justify-between">
        <Logo onNavigate={onClose} />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="inline-flex size-11 items-center justify-center rounded-md text-white hover:bg-white/10"
        >
          <X className="size-6" aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Mobile" className="container-page flex-1 pt-6 pb-10">
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {navigation.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-14 items-center justify-between py-3 font-display text-xl font-semibold transition-colors",
                    active ? "text-white" : "text-white/75 hover:text-white",
                  )}
                >
                  {item.label}
                  <ArrowRight aria-hidden="true" className={cn("size-5", active ? "text-accent" : "text-white/30")} />
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href="/cv"
          onClick={onClose}
          className="mt-8 flex min-h-12 items-center justify-center rounded-md bg-eng-blue px-5 text-sm font-semibold text-white"
        >
          Curriculum Vitae
        </Link>
        <p className="mt-8 text-sm text-white/55">{profile.title}</p>
      </nav>
    </div>
  );
}
