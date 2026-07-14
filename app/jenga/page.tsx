import type { Metadata } from "next";
import JengaGame from "@/components/jenga/JengaGame";

export const metadata: Metadata = {
  title: "Jenga | Ping Chun Lui",
  description: "You found the easter egg.",
  robots: { index: false },
};

export default function JengaPage() {
  return <JengaGame />;
}
