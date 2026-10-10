"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 lg:pt-28 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-64 sm:w-72 lg:w-[22rem]"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl shadow-black/40">
            <img
              src="/Profile.png"
              alt="Kiran Subrahamanya Sai Bandaru - DevOps / SRE Engineer"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </motion.div>

        {/* Text Content */}
        <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-3 font-mono text-sm tracking-wide text-sky-400"
          >
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 max-w-xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
          >
            Kiran Subrahamanya Sai{" "}
            <span className="text-sky-400">Bandaru</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-2 text-xl font-semibold text-gray-100 sm:text-2xl"
          >
            DevOps Engineer
          </motion.p>

          <p className="mb-4 text-sm font-medium tracking-wide text-sky-300 sm:text-base">
            AWS &amp; Azure <span className="px-1 text-gray-600">·</span>{" "}
            Kubernetes <span className="px-1 text-gray-600">·</span> Terraform{" "}
            <span className="px-1 text-gray-600">·</span> CI/CD &amp; SRE
          </p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-400 text-lg mb-6"
          >
           DevOps Engineer with 3.5 years of experience building CI/CD pipelines and automating cloud infrastructure. Focused on secure delivery, Kubernetes operations, and reliable production systems.
          </motion.p>

          <div className="flex flex-col gap-1 text-gray-400 text-sm mb-6">
            <a href="mailto:saikiran19991223@gmail.com" className="transition-colors hover:text-sky-300">
              saikiran19991223@gmail.com
            </a>
            <span>Dublin, Ireland</span>
          </div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <Link
              href="#experience"
              className="inline-flex items-center rounded-lg bg-sky-600 px-6 py-3 font-medium text-white shadow-lg shadow-sky-950/30 transition-colors hover:bg-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              View My Work <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>

          {/* Empty spacer (skills link removed per request) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8"
            aria-hidden
          />
          
        </div>
      </div>
    </section>
  );
}
