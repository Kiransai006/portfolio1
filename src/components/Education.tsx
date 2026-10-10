"use client";

import { motion } from "framer-motion";

const education = [
  {
    period: "Jan 2025 – Jun 2026",
    degree: "Master's in Computing Science",
    institution: "Griffith College Dublin",
    highlights: [
      "Focused on distributed systems, cloud-native architecture, and scalable software design.",
      "Developed end-to-end projects such as an Instagram replica and a Formula 1 database.",
      "Wrote a dissertation on cloud orchestration using Kubernetes and Terraform."
    ],
  },
];

export default function Education() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-16"
        >
          Education &amp; Academic Timeline
        </motion.h2>

        <div className="relative">
          <div className="absolute left-[19px] sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-sky-400/70 via-sky-500/30 to-transparent" />
          <ul className="space-y-12">
            {education.map((edu, i) => (
              <motion.li
                key={edu.institution}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-14 sm:pl-20"
              >
                <div className="absolute left-0 top-1.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-sky-400 ring-4 ring-[#050505]" />
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors hover:border-sky-400/25">
                  <p className="text-accent-cobalt font-mono text-sm mb-1">{edu.period}</p>
                  <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                  <p className="text-gray-400 font-medium mb-4">{edu.institution}</p>
                  <ul className="space-y-2">
                    {edu.highlights.map((item, j) => (
                      <li key={j} className="text-gray-400 text-sm sm:text-base flex gap-2">
                        <span className="text-accent-cobalt mt-1.5 shrink-0">▹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
