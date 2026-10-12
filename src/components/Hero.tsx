"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const capabilities = [
  "Cloud infrastructure",
  "CI/CD automation",
  "Kubernetes & GitOps",
  "Reliability engineering",
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] overflow-hidden px-6 pb-8 pt-24 sm:pt-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-[#080304]/65 via-[#080304]/20 to-[#080304]/25"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#080304]/15 via-transparent to-[#080304]/65"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-between">
        <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <p className="mb-5 font-mono text-sm font-semibold uppercase tracking-[0.22em] text-orange-300 sm:text-base">
              Hey, I&apos;m Kiran Bandaru
            </p>
            <h1 className="text-6xl font-bold leading-[0.9] tracking-[-0.065em] text-white sm:text-7xl md:text-8xl xl:text-[7.5rem]">
              DevOps
              <br />
              Engineer
            </h1>
            <p className="mt-7 max-w-xl text-base font-medium leading-relaxed text-rose-100/90 sm:text-lg">
              AWS &amp; Azure <span className="px-1 text-rose-300/60">·</span>{" "}
              Kubernetes <span className="px-1 text-rose-300/60">·</span>{" "}
              Terraform <span className="px-1 text-rose-300/60">·</span> CI/CD
              &amp; SRE
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
            className="max-w-lg lg:ml-auto lg:pt-12"
          >
            <h2 className="mb-4 text-2xl font-semibold leading-snug text-white sm:text-3xl">
              I build cloud platforms that are secure, scalable, and dependable.
            </h2>
            <p className="mb-8 text-base leading-relaxed text-gray-200/85 sm:text-lg">
              I&apos;m a DevOps Engineer with 3.5 years of experience automating
              delivery and infrastructure for production systems. I help teams
              ship confidently through practical cloud engineering, Kubernetes,
              and reliable CI/CD.
            </p>
            <p className="mb-7 text-sm font-medium text-rose-100/75">
              Dublin, Ireland <span className="px-2 text-rose-300/60">/</span>{" "}
              3.5 years in DevOps
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="#projects"
                className="group inline-flex items-center gap-4 rounded-full bg-white py-2 pl-5 pr-2 text-sm font-semibold text-[#171012] transition-colors hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#100507]"
              >
                Explore my work
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-600 text-white transition-transform group-hover:translate-x-0.5">
                  <FaArrowRight aria-hidden="true" className="text-xs" />
                </span>
              </Link>
              <Link
                href="#contact"
                className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/70 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#100507]"
              >
                Get in touch
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35 }}
          className="grid grid-cols-2 border-t border-white/20 py-5 sm:grid-cols-4 sm:py-6"
          aria-label="Core capabilities"
        >
          {capabilities.map((capability, index) => (
            <div
              key={capability}
              className="flex items-baseline gap-2 py-2 pr-3 text-sm font-medium text-white/90 sm:gap-3 sm:py-1 sm:text-base"
            >
              <span className="font-mono text-sm font-bold text-orange-300 sm:text-base">
                #{String(index + 1).padStart(2, "0")}
              </span>
              <span>{capability}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
