import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site of Grace",
  alternates: { canonical: "/road/" },
  openGraph: { title: "Site of Grace · Ping Chun Lui", url: "/road/", images: ["/og.jpg"] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
