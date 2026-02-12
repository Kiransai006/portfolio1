import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import FunGames from "@/components/FunGames";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Certifications />
        <FunGames />
        <Contact />
        <footer className="py-8 px-6 border-t border-white/10 text-center text-gray-400 text-sm bg-black/10">
          © {new Date().getFullYear()} Kiran Bandaru. Built with Next.js, Tailwind CSS & Framer Motion.
        </footer>
      </main>
    </>
  );
}
