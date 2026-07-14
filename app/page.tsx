import CursorGlow from "@/components/CursorGlow";
import EasterEgg from "@/components/EasterEgg";
import Grain from "@/components/Grain";
import NavRail from "@/components/NavRail";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Beyond from "@/components/sections/Beyond";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <NavRail />
      <CursorGlow />
      <Grain />
      <EasterEgg />
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Beyond />
        <Contact />
      </main>
    </>
  );
}
