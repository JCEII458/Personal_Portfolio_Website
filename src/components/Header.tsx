"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { navigation } from "@/content/site";
import { cn } from "@/lib/utils";
import { MobileNavigation } from "./MobileNavigation";
import { Logo, isActive } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        scrolled || open ? "border-b border-white/10 bg-navy-deep/95 shadow-lg shadow-navy-deep/20 backdrop-blur" : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-18 items-center justify-between gap-6">
        <Logo onNavigate={() => setOpen(false)} />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      active ? "text-white" : "text-white/70 hover:text-white",
                    )}
                  >
                    {item.label}
                    {active && <span aria-hidden="true" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cv"
            className="hidden min-h-10 items-center rounded-md border border-white/25 px-4 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10 lg:inline-flex"
          >
            CV
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md text-white hover:bg-white/10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileNavigation open={open} onClose={() => setOpen(false)} pathname={pathname} />
    </header>
  );
}
