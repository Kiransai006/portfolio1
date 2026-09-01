"use client";

import { motion } from "framer-motion";

const certifications = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2023",
    links: [{ label: "View Certificate", href: "https://ude.my/UC-9579085d-e8bd-403d-baa5-3add7e1920a0" }],
  },
  {
    name: "AWS (UC)",
    issuer: "Coursera / UC",
    date: "2022",
    links: [{ label: "View Certificate", href: "https://ude.my/UC-e8f5f502-6cfb-41ee-a9e6-437a8969f676" }],
  },
  {
    name: "Azure AI Fundamentals (AI-900)",
    issuer: "Microsoft",
    date: "2023",
    links: [{ label: "View Certificate", href: "https://ude.my/UC-a24c6f79-ba4b-4d84-90d2-c94d85aa7f6f" }],
  },
  {
    name: "Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
    date: "2022",
    links: [{ label: "View Certificate", href: "https://ude.my/UC-0596aa78-0483-401f-8ffc-e53638c3a5е3" }],
  },
  {
    name: "Azure DevOps (AZ-400)",
    issuer: "Microsoft",
    date: "2024",
    links: [{ label: "View Certificate", href: "https://ude.my/UC-994ef11a-c69a-4512-9086-79b7968baЗа0" }],
  },
  {
    name: "Azure 0 to Hero",
    issuer: "Coursera / UC",
    date: "2021",
    links: [{ label: "View Certificate", href: "https://ude.my/UC-44f04988-8be8-4d5c-b261-ac4fa41f675e" }],
  },
  {
    name: "ADF Certification",
    issuer: "Internal / Training",
    date: "2021",
    links: [
      { label: "Credly Share", href: "https://www.credly.com/earner/earned/share/acd62d5e-08e0-4fe7-b60d-73667ca84bef" },
      { label: "Credly Public", href: "https://www.credly.com/badges/acd62d5e-08e0-4fe7-b60d-73667ca84bef/public_url" },
    ],
  },
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
              key={cert.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className="flex flex-col h-full p-5 rounded-xl bg-gradient-to-br from-white/3 to-white/2 border border-white/8 shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-white text-lg font-semibold">{cert.name}</h3>
                  <p className="text-gray-300 text-sm mt-1">{cert.issuer} · <span className="text-gray-400">{cert.date}</span></p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/6 flex flex-wrap gap-3">
                {cert.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
