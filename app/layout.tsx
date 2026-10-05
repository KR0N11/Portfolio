import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, EB_Garamond } from "next/font/google";
import SiteBar from "@/components/SiteBar";
import Veil from "@/components/Veil";
import "./globals.css";

/* Cormorant Garamond is the closest free match to the game's Agmena-style
   type: mixed case for menus and titles, capitals only for the name. */
const cormorant = Cormorant_Garamond({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const description = "Ping Chun Lui, Computer Science at Concordia, Montréal. Eight software projects, each shown running.";

export const metadata: Metadata = {
  metadataBase: new URL("https://pingchunlui.ca"),
  title: { default: "Ping Chun Lui", template: "%s · Ping Chun Lui" },
  description,
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Ping Chun Lui",
    title: "Ping Chun Lui",
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Ping Chun Lui" }],
  },
  twitter: { card: "summary_large_image", title: "Ping Chun Lui", description, images: ["/og.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#05090c",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${garamond.variable}`}>
      <body>
        {children}
        <SiteBar />
        <Veil />
      </body>
    </html>
  );
}
