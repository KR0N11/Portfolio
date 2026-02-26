"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Guestbook from "@/components/Guestbook";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const CursorGlow = dynamic(() => import("@/components/CursorGlow"), {
  ssr: false,
});

export default function GuestbookPage() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main className="pt-[68px] min-h-screen">
        {/* Back link */}
        <div className="max-w-6xl mx-auto px-[4%] pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#888] text-sm hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
        </div>
        <Guestbook />
      </main>
      <Footer />
    </>
  );
}
