"use client";

import { motion } from "framer-motion";

const projects = [
  {
    period: "Jan 2025 – Mar 2025",
    title: "Building an Instagram Replica (Social Media Application)",
    institution: "Griffith College Dublin",
    degree: "Master's Degree",
    description:
      "Developed a social media web application inspired by Instagram using Python and Google App Engine. Implemented core features including user registration and authentication, image upload functionality, post creation, user profiles, follower/following system, and personalized timeline feed.",
    details: [
      "Designed backend logic to support comments, user search functionality, and content display in reverse chronological order.",
      "Implemented secure session management and optimized data storage for handling user-generated content.",
      "Focused on scalable architecture and clean UI design for improved user experience."
    ],
    skills: ["Python", "Google Cloud Platform (GCP)", "Web Development", "Database Design"],
  },
  {
    period: "Apr 2025 – Nov 2025",
    title: "Building a Database to Store and Display Formula 1 Data",
    institution: "Griffith College Dublin",
    degree: "Master's Degree",
    description:
      "Created a cloud-based web application to store, manage, and display Formula 1 drivers and teams data using Python and Google App Engine. Implemented user authentication (login/logout) with role-based access control for authorized data management.",
    details: [
      "Implemented CRUD operations, data filtering, search functionality, and comparison features to enhance data accessibility.",
      "Designed structured database schemas and optimized queries for efficient data retrieval.",
      "Built user-friendly interfaces supporting both authenticated and non-authenticated user interactions."
    ],
    skills: ["Python", "Google Cloud Platform (GCP)", "Database Design", "Web Development"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-gradient-to-b from-black/30 to-black/50">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Academic Projects
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-400 text-lg mb-16 max-w-2xl"
        >
          Projects completed during my Master’s Degree at Griffith College Dublin (Jan 2025 – Jun 2026)
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
