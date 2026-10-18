import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import "./globals.css";
import { siteConfig } from "@/content/site";
import { profile } from "@/content/profile";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.defaultTitle, template: siteConfig.titleTemplate },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: profile.name }],
  creator: profile.name,
  keywords: [
    "civil engineer",
    "structural engineer",
    "structural engineering",
    "infrastructure engineering",
    "seismic evaluation",
    "reinforced concrete design",
    "bridge engineering",
    "Philippines civil engineer",
    profile.name,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#10233F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main-content"
          className="sr-only z-[60] rounded-md bg-white px-4 py-3 text-sm font-semibold text-navy shadow-lg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
