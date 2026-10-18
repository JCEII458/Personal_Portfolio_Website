"use client";

/** Renders the visitor's current year (falls back to build year before hydration). */
export function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
