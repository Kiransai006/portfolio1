"use client";

import { motion } from "framer-motion";

const projects = [
  {
    period: "Independent Project",
    title: "OmniShop Enterprise Platform",
    institution: "Personal Project",
    degree: "DevSecOps",
    description:
      "Created a cloud-native e-commerce reference platform with a React dashboard, Python/Flask microservices for orders and products, and an end-to-end DevSecOps workflow.",
    details: [
      "Containerised the application with Docker and Docker Compose, with a local setup that includes Prometheus, Grafana, and synthetic traffic for live metrics.",
      "Provisioned AWS cloud infrastructure, including an EKS-based Kubernetes environment, using Terraform.",
      "Automated build, test, and deployment workflows with GitHub Actions and ArgoCD GitOps.",
      "Integrated Trivy container vulnerability scanning and Cosign image signing, with Prometheus metrics and Grafana dashboards for observability.",
    ],
    skills: [
      "React",
      "Python",
      "Flask",
      "Docker",
      "Kubernetes",
      "AWS",
      "Terraform",
      "GitHub Actions",
      "ArgoCD",
      "Trivy",
      "Cosign",
      "Prometheus",
      "Grafana",
    ],
    githubUrl: "https://github.com/Kiransai006/OmniShop-Enterprise-Platform-main",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Projects
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-400 text-lg mb-16 max-w-2xl"
        >
          Selected cloud and DevSecOps work, with a focus on secure delivery, infrastructure automation, and observability.
        </motion.p>

        <div className="space-y-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors hover:border-sky-400/30 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <p className="text-accent-cobalt font-mono text-sm mb-2">{project.period}</p>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">{project.title}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-400">
                    <span className="text-sm">{project.institution}</span>
                    <span className="hidden sm:inline text-gray-600">•</span>
                    <span className="inline-flex items-center gap-1 rounded-md border border-sky-400/20 bg-sky-400/10 px-2 py-1 text-xs font-medium text-sky-300">
                      {project.degree}
                    </span>
                  </div>
                </div>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1 text-sm text-sky-300 transition-colors hover:text-sky-200"
                  >
                    View on GitHub <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>

              <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="mb-4">
                <p className="text-gray-400 text-sm font-medium mb-2">Key Highlights:</p>
                <ul className="space-y-2">
                  {project.details.map((detail, j) => (
                    <li key={j} className="text-gray-400 text-sm flex gap-2">
                      <span className="shrink-0 text-sky-400">▹</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span key={skill} className="inline-block px-2 py-1 rounded-md bg-white/10 text-gray-300 text-xs border border-white/10">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
