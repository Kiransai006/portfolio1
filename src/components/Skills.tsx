"use client";

import { motion } from "framer-motion";

const skillLinks: Record<string, string> = {
  Jenkins: "https://www.jenkins.io/",
  "GitLab CI": "https://docs.gitlab.com/ee/ci/",
  "Azure DevOps": "https://azure.microsoft.com/en-us/products/devops",
  "GitHub Actions": "https://github.com/features/actions",
  AWS: "https://aws.amazon.com/",
  Azure: "https://azure.microsoft.com/",
  GCP: "https://cloud.google.com/",
  Terraform: "https://www.terraform.io/",
  Ansible: "https://www.ansible.com/",
  Docker: "https://www.docker.com/",
  Kubernetes: "https://kubernetes.io/",
  Prometheus: "https://prometheus.io/",
  Grafana: "https://grafana.com/",
  Bash: "https://www.gnu.org/software/bash/",
  Python: "https://www.python.org/",
  Java: "https://www.java.com/",
};

const skillCategories = [
  {
    title: "CI/CD",
    items: ["Jenkins", "GitLab CI", "Azure DevOps", "GitHub Actions"],
    icon: "⚙️",
  },
  {
    title: "Cloud",
    items: ["AWS (Certified Cloud Practitioner & DevOps Engineer)", "Azure", "GCP"],
    icon: "☁️",
  },
  {
    title: "IaC & Config",
    items: ["Terraform", "Ansible"],
    icon: "📋",
  },
  {
    title: "Containers",
    items: ["Docker", "Kubernetes"],
    icon: "📦",
  },
  {
    title: "Monitoring",
    items: ["Prometheus", "Grafana"],
    icon: "📊",
  },
  {
    title: "Scripting",
    items: ["Bash", "Python", "Java"],
    icon: "⌨️",
  },
];

function getSkillUrl(skill: string): string | undefined {
  // Try exact match first
  if (skillLinks[skill]) return skillLinks[skill];
  // Try matching start of string (e.g. "AWS (Certified...)" -> AWS)
  for (const key of Object.keys(skillLinks)) {
    if (skill.startsWith(key)) return skillLinks[key];
  }
  return undefined;
}

export default function Skills() {
  const highlight = ["AWS", "Terraform", "Kubernetes", "CI/CD", "Docker", "Ansible"];
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-16"
        >
          Skills
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors hover:border-sky-400/25"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-sky-400/20 bg-sky-400/10 text-xl text-sky-300">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">{category.title}</h3>
              </div>
              <ul className="flex flex-wrap gap-3">
                {category.items.map((skill) => {
                  const url = getSkillUrl(skill);
                  const content = (
                    <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm font-medium text-gray-200 transition-colors hover:border-sky-400/30 hover:text-sky-200">
                      {skill}
                    </span>
                  );
                  return (
                    <li key={skill}>
                      {url ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
