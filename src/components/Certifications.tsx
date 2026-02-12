"use client";

import { motion } from "framer-motion";

const certifications = [
  { name: "AWS Certified Cloud Practitioner", file: "AWS Certified Cloud Practitioner.pdf", issuer: "Amazon Web Services", date: "2023" },
  { name: "AWS (UC)", file: "UC-AWS.pdf", issuer: "Coursera / UC", date: "2022" },
  { name: "Azure AI Fundamentals (AI-900)", file: "UC-AI-900.pdf", issuer: "Microsoft", date: "2023" },
  { name: "Azure Fundamentals (AZ-900)", file: "AZ-900 Certification.pdf", issuer: "Microsoft", date: "2022" },
  { name: "Azure DevOps (AZ-400)", file: "AZ-400 Azure Devops.pdf", issuer: "Microsoft", date: "2024" },
  { name: "Azure 0 to Hero", file: "AZURE 0toHero uc.pdf", issuer: "Coursera / UC", date: "2021" },
  { name: "ADF Certification", file: "ADF Certification.pdf", issuer: "Internal / Training", date: "2021" },
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <motion.article
              key={cert.file}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className="flex flex-col h-full p-5 rounded-xl bg-gradient-to-br from-white/3 to-white/2 border border-white/8 shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M21 8V21H3V8" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 8V5a5 5 0 0110 0v3" stroke="rgba(99,102,241,0.95)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 12v6" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="flex-1">
                  <h3 className="text-white text-lg font-semibold">{cert.name}</h3>
                  <p className="text-gray-300 text-sm mt-1">{cert.issuer} · <span className="text-gray-400">{cert.date}</span></p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/6 flex items-center gap-3">
                <a
                  href={`/certifications/${encodeURIComponent(cert.file)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
                >
                  View
                </a>

                <a
                  href={`/certifications/${encodeURIComponent(cert.file)}`}
                  download
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/6 text-gray-100 text-sm hover:bg-white/10 transition-colors"
                >
                  Download
                </a>

                <span className="ml-auto text-gray-400 text-xs">PDF</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
