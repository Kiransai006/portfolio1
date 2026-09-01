import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import WhatIDo from "@/components/WhatIDo";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import FunGames from "@/components/FunGames";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Education from "@/components/Education";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <WhatIDo />
        <Skills />
        <Certifications />
        <FunGames />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
