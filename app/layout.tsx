import type { Metadata, Viewport } from "next";
import { Jersey_15 } from "next/font/google";
import SiteBar from "@/components/SiteBar";
import Veil from "@/components/Veil";
import { person } from "@/lib/content";
import "./globals.css";

/* One pixel face for everything, like a game's bitmap font. Mixed case only:
   its capital S reads as a B when a whole word is set in capitals. */
const pixel = Jersey_15({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: "400",
});

const description = "Ping Chun Lui, software developer. Eight software projects, each shown running.";

export const metadata: Metadata = {
  metadataBase: new URL("https://pingchunlui.ca"),
  title: { default: "Ping Chun Lui", template: "%s · Ping Chun Lui" },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Ping Chun Lui",
    title: "Ping Chun Lui",
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Ping Chun Lui" }],
  },
  twitter: { card: "summary_large_image", title: "Ping Chun Lui", description, images: ["/og.jpg"] },
  // Google Search Console ownership check
  verification: { google: "abDuj9V8E24-4UlyfIqXdLyJ5nlKLMtg7YLAc-85A0I" },
};

/* Tells search engines the site's name (so results read "Ping Chun Lui",
   not the domain) and ties it to the same person's GitHub and LinkedIn. */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://pingchunlui.ca/#website",
      url: "https://pingchunlui.ca/",
      name: person.name,
      alternateName: "pingchunlui",
    },
    {
      "@type": "Person",
      "@id": "https://pingchunlui.ca/#person",
      name: person.name,
      url: "https://pingchunlui.ca/",
      jobTitle: person.role,
      alumniOf: { "@type": "CollegeOrUniversity", name: "Concordia University" },
      address: { "@type": "PostalAddress", addressLocality: "Montréal", addressCountry: "CA" },
      sameAs: [person.github, person.linkedin],
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#04090d",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={pixel.variable}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {children}
        <SiteBar />
        <Veil />
      </body>
    </html>
  );
}
