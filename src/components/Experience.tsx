"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    period: "Mar 2023 – Feb 2025",
    title: "Application Deployment Team — LEXIS NEXIS",
    company: "Cognizant",
    client: "LexisNexis",
    highlights: [
      "Built and maintained CI/CD pipelines using Jenkins, GitLab CI, and Azure DevOps, enabling daily production deployments across dev, staging, and production environments for 4–5 microservices.",
      "Provisioned and managed cloud infrastructure using Terraform and CloudFormation across AWS and Azure, reducing environment setup time by ~60% through infrastructure-as-code practices.",
      "Managed containerised workloads using Docker and Kubernetes across all environments, handling rolling deployments, autoscaling policies, and resource limits for production-grade clusters.",
      "Implemented GitOps workflows using ArgoCD, improving deployment traceability and enabling the 4–5 person engineering team to self-serve releases with full audit trails.",
      "Embedded security and compliance checks into CI/CD pipelines in line with banking-sector standards, reducing pipeline-level vulnerabilities.",
      "Monitored production systems using Prometheus, Grafana, Datadog, and Splunk — establishing alerting thresholds and dashboards that reduced mean time to detection (MTTD) for incidents.",
      "Automated configuration and environment provisioning using Ansible and Bash/Python scripts, eliminating manual setup steps across Linux-based systems.",
      "Supported on-call rotations, incident triage, and root cause analysis to maintain SLA adherence across daily release cycles.",
    ],
  },
  {
    period: "Sep 2021 – Mar 2023",
    title: "Team DevOps — KOTAK MAHINDRA",
    company: "Cognizant",
    client: "Kotak Mahindra",
    highlights: [
      "Supported CI/CD pipeline setup and maintenance using Jenkins and GitLab CI, contributing to daily deployment workflows across multiple environments.",
      "Assisted in provisioning cloud infrastructure on AWS and Azure using Terraform and ARM templates, building foundational IaC skills in a production context.",
      "Contributed to containerisation efforts using Docker and Kubernetes, supporting migration of applications to container-based deployments.",
      "Automated repetitive operational tasks using Bash and Python scripts across Linux-based systems, reducing manual effort for the team.",
      "Participated in incident response, on-call rotations, and production monitoring using Prometheus — developing core SRE practices in a live environment.",
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
                  <p className="text-gray-400 font-medium mb-2">
                    {exp.company}{exp.client ? ` – Client: ${exp.client}` : ""}
                  </p>
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
