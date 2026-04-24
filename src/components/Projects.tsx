"use client";

import { motion } from "framer-motion";

const projects = [
  {
    period: "Feb 2025 – Apr 2025",
    title: "Multi-User Task Management System",
    institution: "Griffith College Dublin",
    degree: "College Project",
    description:
      "Built a multi-user task management platform on Google App Engine (GCP) with Firebase authentication, supporting board creation, user invitations, and role-based access control (owner vs. member).",
    details: [
      "Designed Firestore parent-child data models (User → TaskBoard → Task) without composite indexes, implementing real-time task assignment and state management across multiple users.",
      "Enforced board-level permissions — only board owners can add/remove users, rename boards, and delete boards; deletion enforced only after all tasks and members are removed.",
      "Built task lifecycle management including completion timestamps, active/complete/total task counters, unassigned task highlighting, and edit/delete workflows for all board members.",
      "Implemented edge case handling throughout — duplicate task prevention, permission enforcement for non-owners, and cascading state updates when users are removed from boards.",
    ],
    skills: [
      "Python",
      "Google App Engine",
      "GCP",
      "Firebase Auth",
      "Firestore",
      "Role-Based Access Control",
      "NoSQL",
      "Cloud Architecture",
    ],
  },
  {
    period: "Feb 2025 – May 2025",
    title: "Instagram Replica — Social Platform on GCP",
    institution: "Griffith College Dublin",
    degree: "College Project",
    description:
      "Built a full-stack social media platform on Google App Engine integrating dual GCP storage — Cloud Storage Bucket for image management (PNG/JPG validation enforced), Firestore for all structured data.",
    details: [
      "Implemented Firebase authentication with full user model initialisation on first login, follower/following system, and reverse-chronological post timelines.",
      "Built a merged timeline aggregating the last 50 posts from the current user and all followed users in reverse chronological order using Firestore composite indexes.",
      "Implemented profile search by name prefix, clickable follower/following counts with dedicated list pages, and follow/unfollow functionality across user profiles.",
      "Added comment system with 200-character limit, reverse-chronological ordering, progressive disclosure (5 visible by default, expand for full thread), and per-comment username attribution.",
    ],
    skills: [
      "Python",
      "Google App Engine",
      "GCP",
      "Firebase Auth",
      "Firestore",
      "Cloud Storage",
      "NoSQL",
      "Cloud Architecture",
    ],
  },
  {
    period: "Feb 2025 – Mar 2025",
    title: "F1 Data Management Platform",
    institution: "Griffith College Dublin",
    degree: "College Project",
    description:
      "Built a cloud-native PaaS application on Google App Engine (GCP) with Firebase authentication implementing role-based access — authenticated users can create, edit, delete, and compare records; unauthenticated users have read-only access.",
    details: [
      "Designed Firestore NoSQL data models for F1 drivers and teams, implementing attribute-level filtering and querying without composite indexes.",
      "Built a driver and team comparison engine displaying side-by-side stat tables with conditional highlighting based on performance logic (higher/lower stat rules per attribute).",
      "Implemented full CRUD operations with input validation to prevent duplicate entries and handle all major edge cases.",
    ],
    skills: [
      "Python",
      "Google App Engine",
      "GCP",
      "Firebase Auth",
      "Firestore",
      "NoSQL",
    ],
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
          A mix of professional deployment projects and college work demonstrating cloud engineering, DevOps automation, and GCP application development.
        </motion.p>

        <div className="space-y-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8 hover:border-indigo-400/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <p className="text-accent-cobalt font-mono text-sm mb-2">{project.period}</p>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">{project.title}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-400">
                    <span className="text-sm">{project.institution}</span>
                    <span className="hidden sm:inline text-gray-600">•</span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-purple-400/10 text-purple-300 text-xs font-medium">
                      {project.degree}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="mb-4">
                <p className="text-gray-400 text-sm font-medium mb-2">Key Highlights:</p>
                <ul className="space-y-2">
                  {project.details.map((detail, j) => (
                    <li key={j} className="text-gray-400 text-sm flex gap-2">
                      <span className="text-cyan-400 shrink-0">▹</span>
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
