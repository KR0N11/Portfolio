"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Guestbook from "@/components/Guestbook";

const CursorGlow = dynamic(() => import("@/components/CursorGlow"), {
  ssr: false,
});

export default function GuestbookPage() {
  return (
    <>
      <CursorGlow />
      <div className="min-h-screen bg-[#141414]">
        {/* Top bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#141414]/95 backdrop-blur-sm border-b border-white/[0.04]">
          <div className="flex items-center h-[60px] px-[4%]">
            <Link
              href="/"
              className="flex items-center gap-2 text-[#e5e5e5] hover:text-white transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              Back to Portfolio
            </Link>
            <span
              className="ml-auto text-xl font-bold"
              style={{ color: "#E50914" }}
            >
              PCL
            </span>
          </div>
        </nav>

        {/* Content */}
        <main className="pt-[60px]">
          <Guestbook />
        </main>
      </div>
    </>
  );
}
