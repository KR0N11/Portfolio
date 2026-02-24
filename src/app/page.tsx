"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Achievements from "@/components/Achievements";
import Footer from "@/components/Footer";

const CursorGlow = dynamic(() => import("@/components/CursorGlow"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Achievements />
        <Footer />
      </main>
    </>
  );
}
