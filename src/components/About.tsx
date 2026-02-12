"use client";

import { motion } from "framer-motion";
import { FaTools, FaTachometerAlt, FaGraduationCap, FaShieldAlt } from "react-icons/fa";


export default function About() {
  return (
    <section id="about" className="py-24 px-6">

<div className="max-w-4xl mx-auto space-y-16">

  {/* About Me Section */}
  <div>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="text-3xl sm:text-4xl font-bold text-white mb-6"
    >
      About Me
    </motion.h2>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="space-y-4 text-gray-400 leading-relaxed"
    >

      <p>
        I turn chaos into code. With 3.5 years as a DevOps Engineer at Cognizant, I’ve mastered the art of automating deployments, optimizing cloud environments, and making software delivery seamless. What started as a career quickly became a hobby—I genuinely enjoy building pipelines, architecting AWS solutions, and seeing systems run flawlessly.
      </p>

      <p className="font-semibold">The "Kiran" Edge</p>

      <ul className="list-none space-y-4">
        <li className="flex items-start space-x-3">
          <FaTools className="mt-1 text-accent-cobalt" />
          <span>
            <strong>Automation Enthusiast:</strong> CI/CD pipelines, Terraform, Ansible—you name it. I love making complex systems simple and reliable.
          </span>
        </li>
        <li className="flex items-start space-x-3">
          <FaTachometerAlt className="mt-1 text-accent-cobalt" />
          <span>
            <strong>Efficiency-Obsessed:</strong> Reduced deployment times by 40% and cut manual errors by 60% for enterprise clients like Kotak and LexisNexis.
          </span>
        </li>
        <li className="flex items-start space-x-3">
          <FaGraduationCap className="mt-1 text-accent-cobalt" />
          <span>
            <strong>Learner & Explorer:</strong> Currently pursuing a Master’s in Computing Science at Griffith College, Dublin, diving deeper into distributed systems and cloud-native architectures.
          </span>
        </li>
        <li className="flex items-start space-x-3">
          <FaShieldAlt className="mt-1 text-accent-cobalt" />
          <span>
            <strong>Reliability First:</strong> Maintaining 99.9% uptime in banking-grade systems proves that my hobby produces professional-grade results.
          </span>
        </li>
      </ul>

      <p className="italic mt-4">
        "DevOps isn’t just tools—it’s the art of making software delivery invisible, seamless, and unstoppable."
      </p>
    </motion.div>
  </div>

</div>



 
  
    </section>
  );
}
