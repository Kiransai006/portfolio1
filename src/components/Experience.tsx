"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    period: "Mar 2023 – Feb 2025",
    title: "Application Deployment Team — LEXIS NEXIS",
    company: "Cognizant",
    client: "LexisNexis",
    highlights: [
      "Built and maintained CI/CD pipelines using Jenkins, GitLab CI, and Azure DevOps to support daily deployments across dev, staging, and production environments for multiple microservices.",
      "Provisioned and managed cloud infrastructure using Terraform and CloudFormation across AWS and Azure, reducing environment setup time through infrastructure-as-code automation.",
      "Managed containerized workloads with Docker and Kubernetes across environments, handling rolling deployments, autoscaling, and resource optimization for production-ready services.",
      "Implemented GitOps workflows using ArgoCD to improve deployment traceability, streamline release management, and enable self-service delivery with audit visibility.",
      "Integrated security and compliance checks into the delivery pipeline to align with enterprise banking standards and reduce vulnerabilities in deployment workflows.",
      "Monitored production systems with Prometheus, Grafana, Datadog, and Splunk, creating dashboards and alerting policies to reduce incident detection time and improve reliability.",
      "Automated configuration and environment provisioning using Ansible, Bash, and Python scripts to eliminate repetitive manual tasks and standardize Linux-based system setup.",
      "Supported incident response, on-call rotations, and root cause analysis to maintain service continuity and meet production support requirements.",
    ],
  },
  {
    period: "Sep 2021 – Mar 2023",
    title: "Team DevOps — KOTAK MAHINDRA",
    company: "Cognizant",
    client: "Kotak Mahindra",
    highlights: [
      "Built and maintained CI/CD pipelines using Jenkins and GitLab CI to support daily deployments across multiple environments for application delivery workflows.",
      "Provisioned and managed cloud infrastructure using Terraform and Azure ARM templates across AWS and Azure, improving environment consistency through infrastructure-as-code practices.",
      "Managed containerized workloads with Docker and Kubernetes to support application deployment, scaling, and operational stability in production environments.",
      "Implemented GitOps practices with ArgoCD to improve deployment traceability, release coordination, and environment consistency across delivery stages.",
      "Integrated security and compliance checks into the release pipeline to reduce risks and align deployment practices with enterprise standards.",
      "Monitored production systems with Prometheus and Grafana, tracking application health and creating alerting mechanisms to improve uptime and incident awareness.",
      "Automated configuration and environment setup using Ansible, Bash, and Python scripts to reduce manual effort and improve team efficiency.",
      "Supported incident response, on-call support, and production troubleshooting to maintain service reliability and meet operational SLAs.",
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
          <div className="absolute left-[19px] sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-sky-400/70 via-sky-500/30 to-transparent" />

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
                <div className="absolute left-0 top-1.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-sky-400 ring-4 ring-[#050505]" />
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors hover:border-sky-400/25">
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
