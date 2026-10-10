"use client";

import { motion } from "framer-motion";

const services = [
  {
    icon: "⚙️",
    title: "CI/CD Automation",
    description: "Build and maintain industry-grade pipelines using Jenkins, GitLab CI, and Azure DevOps. Reduce deployment time and boost release frequency.",
  },
  {
    icon: "☁️",
    title: "Cloud Architecture",
    description: "Design and optimize cloud infrastructure on AWS, Azure, and GCP. Achieve 99.9% uptime while reducing infrastructure costs.",
  },
  {
    icon: "📦",
    title: "Containerization & Orchestration",
    description: "Docker and Kubernetes expertise for scalable, resilient applications. Ship faster and manage deployments with confidence.",
  },
  {
    icon: "🔒",
    title: "Security & Compliance",
    description: "Embed security into every pipeline. Implement best practices for banking-grade systems and regulatory compliance.",
  },
];

export default function WhatIDo() {
  return (
    <section id="what-i-do" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What I Do</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            I specialize in building robust DevOps solutions that streamline software delivery, enhance system reliability, and scale with your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors hover:border-sky-400/30"
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-400/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative z-10">
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
              </div>

              {/* Accent line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 bg-sky-400 transition-transform duration-300 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
