"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 pt-24 pb-16 lg:pt-28"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Profile image with creative background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative shrink-0 order-first lg:order-none"
          >
            {/* Colorful gradient + shape container */}
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
              {/* Animated gradient orbs (background layer) */}
              <div
                className="absolute inset-0 rounded-full overflow-visible"
                aria-hidden
              >
                <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-accent-cobalt/40 via-violet-500/30 to-cyan-400/40 blur-2xl animate-pulse" />
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-amber-500/25 blur-3xl" />
                <div className="absolute bottom-2 left-2 w-24 h-24 rounded-full bg-emerald-400/20 blur-2xl" />
              </div>
              {/* Geometric / ring decoration */}
              <div
                className="absolute inset-0 rounded-full border-2 border-white/10"
                aria-hidden
              />
              <div
                className="absolute -inset-2 rounded-full border border-accent-cobalt/30"
                aria-hidden
              />
              <div
                className="absolute -inset-6 rounded-full border border-violet-400/20 opacity-60"
                aria-hidden
              />
              {/* Subtle grid pattern overlay */}
              <div
                className="absolute inset-0 rounded-full opacity-[0.07]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }}
                aria-hidden
              />
              {/* Photo container - clean circle with good contrast */}
              <div className="absolute inset-2 sm:inset-3 rounded-full overflow-hidden bg-indigo-900/30 shadow-2xl ring-2 ring-white/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/profile.png.jpg"
                  alt="Kiran Bandaru - AWS DevOps Engineer"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    const el = e.currentTarget;
                    if (el.src.includes("profile.png.jpg")) el.src = "/profile.jpg";
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-accent-cobalt font-mono text-sm mb-4"
            >
              Hi, I&apos;m
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold text-white mb-4 tracking-tight"
            >
              Kiran Bandaru
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-xl sm:text-2xl text-accent-cobalt font-semibold mb-4"
            >
              AWS DevOps Engineer / Systems Engineer
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-gray-400 text-lg mb-10"
            >
              With 3.5 years of experience. Specializing in cloud-native
              platforms, CI/CD automation, and Kubernetes-based deployments.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Link
                href="#experience"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-accent-cobalt text-white font-medium hover:bg-blue-600 transition-colors"
              >
                View My Work
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-600 text-gray-300 font-medium hover:border-accent-cobalt hover:text-accent-cobalt transition-colors"
              >
                Download Resume
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
