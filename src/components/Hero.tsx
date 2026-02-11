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
        {/* Profile Picture (Smaller) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative group w-64 sm:w-72 lg:w-80"
        >
          {/* Floating Halo Rings */}
          <div className="absolute -inset-2 rounded-full border-2 border-purple-400/30 animate-spin-slow" />
          <div className="absolute inset-4 rounded-full border border-cyan-400/30 animate-ping-slow" />
          <div className="absolute inset-6 rounded-full border border-pink-400/30 animate-spin-reverse-slow" />

          {/* Glassy 3D Profile */}
          <div className="relative w-full h-64 sm:h-72 lg:h-80 rounded-full overflow-hidden bg-gradient-to-tr from-indigo-900/40 to-purple-900/50 shadow-2xl ring-4 ring-white/10 group-hover:scale-105 transition-transform duration-500">
            <img
              src="/profile.jpg"
              alt="Kiran Bandaru - AWS DevOps Engineer"
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                const el = e.currentTarget;
                if (el.src.includes("profile.png.jpg")) el.src = "/profile.jpg";
              }}
            />
          </div>

          {/* Glowing Shadow */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-36 h-8 bg-purple-500/20 blur-2xl rounded-full animate-pulse" />
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
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 mb-4 tracking-tight"
          >
            Kiran Bandaru
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-xl sm:text-2xl text-accent-cobalt font-semibold mb-4"
          >
            AWS DevOps Engineer / MSc Computing Student
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-400 text-lg mb-6"
          >
            With 3.5 years of experience transforming cloud-native platforms, CI/CD pipelines, and Kubernetes deployments into seamless, reliable systems.
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

          {/* Skill Chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            {["AWS", "Terraform", "Kubernetes", "CI/CD", "Docker", "Ansible"].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 text-white text-sm font-medium hover:scale-110 transition-transform"
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
