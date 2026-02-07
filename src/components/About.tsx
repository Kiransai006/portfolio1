"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-6"
        >
          About Me
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4 text-gray-400 leading-relaxed"
        >
          <p>
            I focus on improving system reliability, deployment speed, and cloud
            cost efficiency within enterprise environments. My work spans
            automating infrastructure, building robust CI/CD pipelines, and
            ensuring high availability for critical systems.
          </p>
          <p>
            I hold a{" "}
            <span className="text-accent-cobalt font-medium">
              Master of Computing Science from Griffith College, Dublin
            </span>
            , where I strengthened my foundation in software engineering and
            cloud technologies. Based in Dublin, Ireland, I bring a practical,
            results-driven approach to DevOps and cloud engineering.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
