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
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-indigo-400/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl" aria-hidden>{category.icon}</span>
                <h3 className="text-lg font-semibold text-white">{category.title}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {category.items.map((skill) => {
                  const url = getSkillUrl(skill);
                  const content = (
                    <span className="inline-block px-3 py-1.5 rounded-md bg-white/10 text-gray-300 text-sm border border-white/10 hover:border-indigo-400/40 hover:text-indigo-200 transition-colors">
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
