import type { Metadata } from "next";

export const metadata: Metadata = { title: "Site of Grace", alternates: { canonical: "/road/" } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
