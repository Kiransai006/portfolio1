"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    period: "Mar 2023 – Feb 2025",
    client: "RELX",
    clientUrl: "https://www.relx.com/",
    company: "Cognizant Technology Solutions",
    companyUrl: "https://www.cognizant.com/",
    responsibilities: [
      "Automated end-to-end CI/CD pipelines using Jenkins, integrating Git version control and Maven for continuous build, testing, and deployment, reducing release time by 30%.",
      "Built and managed scalable infrastructure using Terraform, enabling consistent and automated provisioning of resources across AWS environments.",
      "Containerized applications using Docker, streamlining development workflows and supporting faster deployments in a microservices architecture.",
      "Deployed and managed containerized applications in Kubernetes clusters, supporting high availability and fault tolerance through pod scaling, ReplicaSets, and load balancing.",
      "Configured Prometheus monitoring and Grafana dashboards to track application performance and system metrics, reducing incident response time by 40%.",
      "Collaborated with development teams to implement Git branching strategies, streamline code integration, and support code reviews, merges, and conflict resolution.",
      "Implemented blue-green and canary deployment strategies on Kubernetes to minimize downtime during application upgrades and feature releases.",
      "Standardized development, staging, and production environments using Docker images and containers to improve deployment consistency.",
      "Integrated security checks and container vulnerability scanning into Jenkins CI/CD pipelines to identify potential security issues before deployment.",
      "Monitored Kubernetes cluster resource utilization using Prometheus and Grafana to identify performance bottlenecks and optimize infrastructure usage.",
    ],
  },
  {
    period: "Sep 2021 – Mar 2023",
    client: "Kotak",
    clientUrl: "https://www.kotak.com/",
    company: "Cognizant Technology Solutions",
    companyUrl: "https://www.cognizant.com/",
    responsibilities: [
      "Automated infrastructure provisioning using Terraform, enabling the rapid deployment of cloud resources across multi-region AWS environments.",
      "Developed and maintained Ansible playbooks for configuration management and automated application deployments, ensuring consistent environment setup across development, staging, and production.",
      "Integrated Jenkins pipelines with Git repositories to enable continuous integration and delivery (CI/CD), automating build processes with Maven for Java-based applications.",
      "Implemented Git branching strategies, such as feature branching and GitFlow, to ensure smooth version control and collaboration across multiple development teams.",
      "Automated the provisioning of application dependencies and configurations using Ansible, reducing manual setup time by 50% and eliminating configuration drift between environments.",
      "Created reusable Terraform modules for cloud infrastructure, reducing time spent on manual configurations and ensuring consistency across environments.",
      "Integrated Ansible with Jenkins to automate post-deployment configurations, improving deployment reliability and reducing downtime.",
      "Utilized Terraform for Infrastructure as Code (IaC) to manage and version AWS infrastructure, ensuring that environment changes are trackable and reversible.",
      "Streamlined build and test processes with Maven in Jenkins pipelines, automating unit testing and code quality checks before deployment to production.",
      "Collaborated with development and operations teams to implement infrastructure changes through Git version control, ensuring all updates were peer-reviewed and compliant with best practices.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-3xl font-bold text-white sm:text-4xl"
        >
          Experience
        </motion.h2>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[19px] top-0 w-px bg-gradient-to-b from-rose-400/70 via-rose-500/30 to-transparent sm:left-6"
          />

          <ul className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.li
                key={`${experience.period}-${experience.client}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-14 sm:pl-20"
              >
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-rose-400 ring-4 ring-[#080304] sm:h-4 sm:w-4"
                />
                <article className="rounded-xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors hover:border-rose-400/25">
                  <p className="mb-1 font-mono text-sm text-rose-300">
                    {experience.period}
                  </p>
                  <h3 className="text-xl font-semibold text-white">
                    DevOps Engineer
                  </h3>
                  <p className="mb-4 mt-1 text-sm font-medium text-gray-300">
                    <a
                      href={experience.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-sm underline decoration-white/30 underline-offset-4 transition-colors hover:text-rose-200 hover:decoration-rose-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                    >
                      {experience.company}
                    </a>
                    <span className="px-2 text-gray-500">·</span>
                    Client:{" "}
                    <a
                      href={experience.clientUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-sm text-rose-200 underline decoration-rose-300/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                    >
                      {experience.client}
                    </a>
                  </p>
                  <ul className="space-y-2.5">
                    {experience.responsibilities.map((responsibility) => (
                      <li
                        key={responsibility}
                        className="flex gap-2 text-sm text-gray-300 sm:text-base"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 shrink-0 text-rose-300"
                        >
                          ▹
                        </span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
