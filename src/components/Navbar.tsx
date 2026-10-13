"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/85 shadow-lg shadow-black/10 backdrop-blur-xl"
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        <Link
          href="#home"
          className="group flex items-center gap-3 rounded-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          aria-label="Kiran Bandaru - Home"
          onClick={() => setMobileOpen(false)}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] font-mono text-sm font-bold tracking-tight transition-colors group-hover:border-rose-400/50">
            K<span className="text-rose-400">B</span>
          </span>
          <span className="text-sm font-semibold tracking-wide sm:text-base">
            Kiran Bandaru
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-7 md:flex">
            {navLinks.slice(0, -1).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-gray-300 transition-colors hover:text-rose-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="#contact"
            className="hidden rounded-full border border-rose-300/35 bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-100 transition-colors hover:border-rose-300/60 hover:bg-rose-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 md:inline-flex"
          >
            Contact
          </Link>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-white/15 p-2 text-gray-200 transition-colors hover:border-rose-300/50 hover:bg-rose-950/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M4 7h16M4 12h16M4 17h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <motion.div
        id="mobile-navigation"
        initial={false}
        animate={{
          height: mobileOpen ? "auto" : 0,
          opacity: mobileOpen ? 1 : 0,
        }}
        aria-hidden={!mobileOpen}
        className={`overflow-hidden border-t border-white/10 md:hidden ${
          mobileOpen ? "visible" : "invisible"
        }`}
      >
        <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-3">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-white/[0.06] hover:text-rose-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 ${
                link.href === "#contact" ? "text-rose-300" : "text-gray-300"
                }`}
                tabIndex={mobileOpen ? 0 : -1}
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
