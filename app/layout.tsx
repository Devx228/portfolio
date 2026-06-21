import type { Metadata } from "next";
import "./globals.css";
import { profile } from "@/content/portfolio";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: {
    default: `${profile.name} | Developer Portfolio`,
    template: `%s | ${profile.name}`,
  },
  description: profile.seoDescription,
  keywords: [
    "Devansh Abhay Dhok",
    "IIT Kanpur",
    "speech recognition",
    "medical AI",
    "machine learning",
    "learning agents",
    "document question answering",
    "developer portfolio",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    title: `${profile.name} | Developer Portfolio`,
    description: profile.seoDescription,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    email: profile.email,
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    sameAs: [profile.github, profile.linkedin],
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "Indian Institute of Technology Kanpur",
    },
    description: profile.seoDescription,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="min-h-screen overflow-hidden bg-graphite-950 text-slate-100">
            <div className="fixed inset-0 -z-10 bg-command-grid opacity-70" aria-hidden="true" />
            <div
              className="fixed inset-0 -z-10 bg-[linear-gradient(120deg,rgba(103,232,249,0.08),transparent_32%,rgba(134,239,172,0.06)_58%,transparent_80%)]"
              aria-hidden="true"
            />
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </div>
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
