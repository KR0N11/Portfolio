import type { Metadata } from "next";

export const metadata: Metadata = { title: "Projects", alternates: { canonical: "/works/" } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
