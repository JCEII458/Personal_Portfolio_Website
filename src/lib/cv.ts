import "server-only";
import fs from "node:fs";
import path from "node:path";
import { cvConfig } from "@/content/site";

/**
 * Returns CV download info only when the PDF really exists in /public/cv.
 * Evaluated at build time for static pages, so add the file and redeploy.
 */
export function getCv(): { available: true; href: string; sizeLabel: string } | { available: false; expectedPath: string } {
  const relative = path.join("cv", cvConfig.fileName);
  const absolute = path.join(process.cwd(), "public", relative);
  try {
    const stat = fs.statSync(absolute);
    if (stat.isFile() && stat.size > 0) {
      const kb = stat.size / 1024;
      const sizeLabel = kb > 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(kb))} KB`;
      return { available: true, href: `/${relative.split(path.sep).join("/")}`, sizeLabel };
    }
  } catch {
    // File not present — fall through to placeholder.
  }
  return { available: false, expectedPath: `public/cv/${cvConfig.fileName}` };
}
