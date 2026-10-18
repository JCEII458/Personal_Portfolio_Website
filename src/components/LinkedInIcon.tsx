/** Neutral "in" glyph — avoids reproducing third-party brand artwork. */
export function LinkedInIcon({ className = "size-4" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center rounded-[3px] border border-current text-[9px] leading-none font-bold ${className}`}
    >
      in
    </span>
  );
}
