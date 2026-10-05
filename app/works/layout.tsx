import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  alternates: { canonical: "/works/" },
  openGraph: { title: "Projects · Ping Chun Lui", url: "/works/", images: ["/og.jpg"] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
