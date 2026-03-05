"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaDownload } from "react-icons/fa";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 lg:pt-28 overflow-hidden"
    >
      {/* Dynamic Background Orbs */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 w-72 h-72 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-10 w-60 h-60 rounded-full bg-cyan-400/20 blur-2xl animate-spin-slow" />
        <div className="absolute bottom-20 left-20 w-56 h-56 rounded-full bg-pink-400/10 blur-2xl animate-pulse" />
        <div className="absolute top-1/4 left-1/2 w-72 h-72 rounded-full bg-yellow-400/10 blur-3xl animate-spin-slow" />
        <div className="absolute bottom-10 right-1/3 w-60 h-60 rounded-full bg-green-400/20 blur-2xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Professional Profile Picture with Spice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative group w-64 sm:w-72 lg:w-80"
        >
          {/* Animated Background Orbs Around Profile */}
          <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-2xl animate-pulse" />
          <div className="absolute -inset-6 rounded-full border border-purple-400/40 animate-spin-slow" />
          <div className="absolute -inset-10 rounded-full border-2 border-cyan-400/20" />

          {/* Floating Halo Rings */}
          <div className="absolute -inset-2 rounded-full border-2 border-purple-400/60 animate-spin-slow" />
          <div className="absolute inset-4 rounded-full border border-cyan-400/50 animate-ping-slow" />
          <div className="absolute inset-6 rounded-full border border-pink-400/40 animate-spin-reverse-slow" />

          {/* Glassy 3D Profile */}
          <div className="relative w-full h-64 sm:h-72 lg:h-80 rounded-full overflow-hidden bg-gradient-to-tr from-indigo-900/60 to-purple-900/60 shadow-2xl ring-4 ring-white/20 group-hover:ring-cyan-400/60 group-hover:shadow-cyan-500/20 group-hover:shadow-2xl transition-all duration-300">
            <img
              src="/profile.jpg"
              alt="Kiran Bandaru - DevOps / SRE Engineer"
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                const el = e.currentTarget;
                if (el.src.includes("profile.png.jpg")) el.src = "/profile.jpg";
              }}
            />
            {/* Inner Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />
          </div>

          {/* Decorative Glowing Shadow */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-40 h-10 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 blur-3xl rounded-full animate-pulse" />

          {/* Sparkle Elements */}
          <div className="absolute top-10 -right-6 w-3 h-3 bg-cyan-400 rounded-full animate-pulse opacity-60" />
          <div className="absolute bottom-16 -left-8 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60" />
          <div className="absolute top-1/3 -right-10 w-2 h-2 bg-pink-400 rounded-full animate-pulse opacity-50" />
        </motion.div>

        {/* Text Content */}
        <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-accent-cobalt font-mono text-sm mb-4 tracking-wide"
          >
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 mb-4 tracking-tight"
          >
            Kiran Bandaru
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-xl sm:text-2xl text-accent-cobalt font-semibold mb-4"
          >
            DevOps / SRE Engineer
            
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-400 text-lg mb-6"
          >
           DevOps Engineer specializing in automation, CI/CD pipelines, containerization, and cloud-native infrastructure to build scalable and reliable systems.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <Link
              href="#experience"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-medium shadow-lg hover:scale-105 hover:shadow-2xl transition-transform"
            >
              View My Work <FaArrowRight className="ml-2" />
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-xl border border-gray-600 text-gray-300 font-medium hover:border-cyan-400 hover:text-cyan-400 transition-transform hover:scale-105"
            >
              Download Resume <FaDownload className="ml-2" />
            </a>
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
