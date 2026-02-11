"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#fun", label: "Fun" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-md"
      style={{ background: "var(--navbar-bg)" }}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="#home" className="text-xl font-semibold text-white hover:text-accent-cobalt transition-colors">
          KB
        </Link>

        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="relative inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/10 px-2 py-1 text-[11px] font-medium text-gray-300 shadow-sm hover:border-accent-cobalt hover:text-white transition-colors"
            aria-label="Toggle color theme"
          >
            <span
              className={`px-2 py-0.5 rounded-full transition-colors ${
                theme === "dark" ? "bg-accent-cobalt text-white" : "text-gray-400"
              }`}
            >
              Dark
            </span>
            <span
              className={`px-2 py-0.5 rounded-full transition-colors ${
                theme === "night" ? "bg-accent-orange text-black" : "text-gray-400"
              }`}
            >
              Night
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-400 hover:text-accent-cobalt transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden border-t border-white/5"
      >
        <ul className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block text-gray-400 hover:text-accent-cobalt transition-colors font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.header>
  );
}
