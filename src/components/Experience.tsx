"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    period: "2023 – 2025",
    title: "Software Engineer",
    company: "LexisNexis",
    highlights: [
      "Built and maintained CI/CD pipelines using Jenkins, GitLab CI, and Azure DevOps, reducing deployment time by 40% and improving release stability by 35%.",
      "Automated cloud infrastructure using Infrastructure as Code (Terraform / CloudFormation / ARM), cutting manual errors by 60% and ensuring regulatory compliance.",
      "Supported and optimized AWS / Azure environments, achieving 99.9% system availability and reducing infrastructure costs by 20%.",
      "Implemented Docker and Kubernetes, increasing deployment frequency by 45% and improving application scalability and resilience.",
      "Embedded security and compliance best practices into CI/CD pipelines, reducing vulnerabilities by 40% in line with banking standards.",
      "Monitored production systems and resolved incidents, reducing MTTR by 35% through proactive monitoring and root cause analysis.",
      "Mature Bash and Python automation scripts, reducing functional manual effort by 50% across Linux-based systems.",
      "Participated in incident response and troubleshooting to ensure application availability and reliability."
    ],
    
  },
  {
    period: "2021 – 2023",
    title: "Junior Software Engineer",
    company: "Kotak",
    highlights: [
      "Built and maintained CI/CD pipelines using Jenkins and GitLab CI, cutting manual deployments by 45% and boosting release frequency.",
      "Automated cloud infrastructure with Terraform/IaC, enabling 60% quicker environment setup while ensuring compliance and scalability.",
      "Optimised AWS/Azure platforms, improving uptime by 30% via monitoring, auto scaling, and performance tuning.",
      "Streamlined deployment and release processes with development, security, and QA teams, reducing failures by 35%.",
      "Implemented Docker/Kubernetes orchestration, raising deployment efficiency by 40% and optimising resources. Integrated security and compliance controls into CI/CD pipelines, lowering incidents by 25%.",
      "Monitored systems and resolved production issues, achieving 20% quicker MTTR."
    ],
    
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-16"
        >
          Experience
        </motion.h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-400 via-cyan-500/60 to-transparent" />

          <ul className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.li
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-14 sm:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-indigo-400 ring-4 ring-[#1e1b4b]" />
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-indigo-400/30 transition-colors">
                  <p className="text-accent-cobalt font-mono text-sm mb-1">{exp.period}</p>
                  <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                  <p className="text-gray-400 font-medium mb-4">{exp.company}</p>
                  <ul className="space-y-2">
                    {exp.highlights.map((item, j) => (
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
