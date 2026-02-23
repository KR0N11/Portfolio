import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const inter = localFont({
  src: [
    {
      path: "../../public/fonts/inter-light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ping Chun Lui | Software Developer",
  description:
    "Portfolio of Ping Chun Lui — Software Developer specializing in AI, cloud, and full-stack development. Bias toward action, shipping products, and solving complex problems.",
  keywords: [
    "Software Developer",
    "AI Developer",
    "Cloud Developer",
    "React",
    "Next.js",
    "Java",
    "Python",
    "Azure",
    "Portfolio",
  ],
  authors: [{ name: "Ping Chun Lui" }],
  openGraph: {
    title: "Ping Chun Lui | Software Developer",
    description:
      "Portfolio showcasing software development, AI agents, cloud solutions, and full-stack projects.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ping Chun Lui | Software Developer",
    description:
      "Portfolio showcasing software development, AI agents, cloud solutions, and full-stack projects.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
