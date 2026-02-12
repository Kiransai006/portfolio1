"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const contactLinks = [
  {
    href: "mailto:kiransai2312@gmail.com",
    label: "kiransai2312@gmail.com",
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "tel:+35383813050",
    label: "+35383 813 050",
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/kiransai006",
    label: "LinkedIn",
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    external: true,
  },
  {
    href: "#",
    label: "Dublin, Ireland",
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    external: false,
  },
];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Failed to send.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Get In Touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-400 mb-12 max-w-xl mx-auto"
        >
          I&apos;m open to new opportunities and happy to connect. Drop me a message below, or reach out via email, phone, or LinkedIn.
        </motion.p>

        {/* Contact form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          onSubmit={handleSubmit}
          className="mb-12 mx-auto max-w-lg text-left rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8 shadow-xl"
        >
          <div className="grid gap-4 sm:gap-5">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-gray-300 mb-1.5">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/30"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-gray-300 mb-1.5">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                placeholder="Your message..."
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 resize-y min-h-[100px]"
              />
            </div>
            {status === "success" && (
              <p className="text-sm text-emerald-400">Message sent. I&apos;ll get back to you soon.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400">{errorMessage}</p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 py-3 px-4 font-medium text-white shadow-lg hover:opacity-95 disabled:opacity-70 disabled:cursor-not-allowed transition-opacity"
            >
              {status === "sending" ? "Sending..." : "Send message"}
            </button>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center items-center"
        >
          {contactLinks.map((item) =>
            item.href === "#" ? (
              <div
                key={item.label}
                className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300"
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-indigo-400/50 hover:text-indigo-300 transition-colors text-gray-300"
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
