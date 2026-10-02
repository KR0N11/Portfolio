import type { Metadata, Viewport } from "next";
import { Cinzel, EB_Garamond } from "next/font/google";
import SoundToggle from "@/components/SoundToggle";
import Veil from "@/components/Veil";
import "./globals.css";

/* Cinzel carries titles and labels (carved capitals, like the game's menus);
   EB Garamond carries everything you actually read. */
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
    <html lang="en" className={`${cinzel.variable} ${garamond.variable}`}>
      <body>
        {children}
        <SoundToggle />
        <Veil />
      </body>
    </html>
  );
}
