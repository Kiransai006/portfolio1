"use client";

import { motion } from "framer-motion";

const certifications = [
  { name: "AWS Certified Cloud Practitioner", file: "AWS Certified Cloud Practitioner.pdf" },
  { name: "AWS (UC)", file: "UC-AWS.pdf" },
  { name: "Azure AI Fundamentals (AI-900)", file: "UC-AI-900.pdf" },
  { name: "Azure Fundamentals (AZ-900)", file: "AZ-900 Certification.pdf" },
  { name: "Azure DevOps (AZ-400)", file: "AZ-400 Azure Devops.pdf" },
  { name: "Azure 0 to Hero", file: "AZURE 0toHero uc.pdf" },
  { name: "ADF Certification", file: "ADF Certification.pdf" },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-16"
        >
          Certifications
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certifications.map((cert, i) => (
            <motion.a
              key={cert.file}
              href={`/certifications/${encodeURIComponent(cert.file)}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-indigo-400/30 transition-colors group"
            >
              <span className="text-2xl" aria-hidden>📜</span>
              <span className="text-white font-medium group-hover:text-indigo-200 transition-colors">
                {cert.name}
              </span>
              <span className="ml-auto text-gray-500 text-sm group-hover:text-indigo-400">View PDF →</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
