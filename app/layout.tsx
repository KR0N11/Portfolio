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

export const metadata: Metadata = {
  title: "Ping Chun Lui",
  description: "Ping Chun Lui, software developer in Montréal. Walk the road and watch the projects run.",
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
