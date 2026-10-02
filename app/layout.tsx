import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Cormorant_SC, IM_Fell_English } from "next/font/google";
import Veil from "@/components/Veil";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const cormorantSC = Cormorant_SC({
  variable: "--font-cormorant-sc",
  subsets: ["latin"],
  weight: ["500"],
});

const fell = IM_Fell_English({
  variable: "--font-fell",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Ping Chun Lui",
  description:
    "Ping Chun Lui, software developer in Montréal. Draw the blade, walk the road, and watch the projects run.",
};

export const viewport: Viewport = {
  themeColor: "#05090c",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${cormorantSC.variable} ${fell.variable}`}>
      <body>
        {children}
        <Veil />
      </body>
    </html>
  );
}
