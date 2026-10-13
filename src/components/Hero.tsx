"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const phrases = [
  "cloud infrastructure",
  "CI/CD pipelines",
  "Kubernetes & GitOps",
  "reliable releases",
];

const pipeline = [
  "git push origin main",
  "terraform apply · AWS / EKS",
  "docker build · Trivy scan",
  "GitHub Actions · tests pass",
  "ArgoCD sync · EKS",
  "Grafana · alerts green",
];

const technologies = [
  "Terraform",
  "Ansible",
  "Docker",
  "Kubernetes",
  "AKS",
  "EKS",
  "ArgoCD",
  "Jenkins",
  "GitHub Actions",
  "Azure DevOps",
  "Prometheus",
  "Grafana",
  "ELK",
  "Python",
  "Bash",
];

function CountUp({
  value,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (reduceMotion) {
      setCount(value);
      return;
    }

    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (latest) => setCount(latest),
    });
    return () => controls.stop();
  }, [isInView, reduceMotion, value]);

  return (
    <span ref={ref} aria-label={`${value.toFixed(decimals)}${suffix}`}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function Typewriter() {
  const reduceMotion = useReducedMotion();
  const [typed, setTyped] = useState(phrases[0]);

  useEffect(() => {
    if (reduceMotion) {
      setTyped(phrases[0]);
      return;
    }

    let phraseIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timeout = 0;

    const tick = () => {
      const phrase = phrases[phraseIndex];
      characterIndex += deleting ? -1 : 1;
      setTyped(phrase.slice(0, characterIndex));

      let delay = deleting ? 35 : 70;
      if (!deleting && characterIndex === phrase.length) {
        deleting = true;
        delay = 1500;
      } else if (deleting && characterIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 300;
      }

      timeout = window.setTimeout(tick, delay);
    };

    timeout = window.setTimeout(tick, 300);
    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  return (
    <p className="mt-5 min-h-7 font-mono text-sm text-rose-100 sm:text-base">
      <span className="text-rose-300">$ </span>
      I build <span className="text-white">{typed}</span>
      {!reduceMotion && (
        <span className="hero-type-caret ml-0.5 text-rose-300" aria-hidden="true">
          ▍
        </span>
      )}
    </p>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const interval = window.setInterval(() => {
      setActiveStep((step) => (step + 1) % pipeline.length);
    }, 1450);
    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  const updateSpotlight = (event: MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--spot-x",
      `${event.clientX - bounds.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--spot-y",
      `${event.clientY - bounds.top}px`,
    );
  };

  return (
    <section
      id="home"
      onMouseMove={updateSpotlight}
      className="hero-spotlight relative isolate flex min-h-[100svh] overflow-hidden px-5 pb-7 pt-24 sm:px-8 sm:pt-28"
      aria-labelledby="hero-title"
    >
      <div aria-hidden="true" className="hero-grid absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_16%_48%,rgba(255,46,99,0.14),transparent_40%),radial-gradient(ellipse_at_82%_20%,rgba(183,15,55,0.2),transparent_38%),linear-gradient(90deg,#080304_0%,rgba(8,3,4,0.9)_36%,rgba(8,3,4,0.35)_100%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-between">
        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:py-14">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <p className="mb-5 flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-rose-100 sm:text-sm">
              <span className="hero-availability-dot" aria-hidden="true" />
              Hey, I&apos;m Kiran Bandaru
              <span className="sr-only">, available for opportunities</span>
            </p>
            <h1
              id="hero-title"
              className="text-[clamp(3.7rem,9vw,7.6rem)] font-bold leading-[0.86] tracking-[-0.075em] text-white"
            >
              <span className="hero-title-line">
                <motion.span
                  initial={reduceMotion ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.75, delay: 0.08 }}
                >
                  DevOps
                </motion.span>
              </span>
              <span className="hero-title-line">
                <motion.span
                  initial={reduceMotion ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.75, delay: 0.18 }}
                  className="hero-engineer-gradient"
                >
                  Engineer
                </motion.span>
              </span>
            </h1>
            <Typewriter />
            <p className="mt-5 max-w-xl text-base leading-relaxed text-rose-50/90 sm:text-lg">
              I build cloud platforms that are secure, scalable, and dependable.
            </p>
            <p className="mt-4 text-sm font-medium text-rose-100/75">
              Dublin, Ireland <span className="px-2 text-rose-300/60">/</span>
              3.5 years
            </p>

            <div className="mt-7 grid max-w-xl grid-cols-3 gap-2.5 sm:gap-3">
              <div className="hero-stat-card">
                <p className="text-xl font-semibold text-white sm:text-2xl">
                  <CountUp value={3.5} suffix="+" decimals={1} />
                </p>
                <p className="mt-1 text-[10px] text-rose-100/70 sm:text-xs">
                  years in DevOps
                </p>
              </div>
              <div className="hero-stat-card">
                <p className="text-xl font-semibold text-white sm:text-2xl">
                  <CountUp value={2} />
                </p>
                <p className="mt-1 text-[10px] text-rose-100/70 sm:text-xs">
                  cloud platforms
                </p>
              </div>
              <div className="hero-stat-card">
                <p className="text-xl font-semibold text-white sm:text-2xl">
                  <CountUp value={15} suffix="+" />
                </p>
                <p className="mt-1 text-[10px] text-rose-100/70 sm:text-xs">
                  stack technologies
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="#projects"
                className="group inline-flex items-center gap-4 rounded-full bg-white py-2 pl-5 pr-2 text-sm font-semibold text-[#171012] transition-colors hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#100507]"
              >
                Explore my work
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-600 text-white">
                  <FaArrowRight
                    aria-hidden="true"
                    className="text-xs transition-transform duration-300 group-hover:rotate-[-35deg]"
                  />
                </span>
              </Link>
              <Link
                href="#contact"
                className="rounded-full border border-white/35 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-rose-200 hover:bg-rose-950/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#100507]"
              >
                Get in touch
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20, rotateX: 4, rotateY: -5 }}
            animate={{ opacity: 1, y: 0, rotateX: 3, rotateY: -3 }}
            whileHover={reduceMotion ? undefined : { rotateX: 0, rotateY: 0, y: -3 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, delay: 0.15 }}
            style={{ transformPerspective: 1200 }}
            className="hero-terminal-card w-full max-w-xl lg:ml-auto"
            aria-label="Example DevOps deployment pipeline"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>
              <p className="font-mono text-[10px] text-rose-100/70 sm:text-xs">
                production-deploy.sh
              </p>
              <span className="font-mono text-[10px] text-emerald-300 sm:text-xs">
                LIVE
              </span>
            </div>

            <div className="px-4 pb-4 pt-5 sm:px-5 sm:pb-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-mono text-xs text-gray-300 sm:text-sm">
                  <span className="text-rose-300">$</span> release --environment
                  production
                </p>
                <span className="font-mono text-[10px] text-gray-500">
                  pipeline
                </span>
              </div>
              <ol className="space-y-3" aria-live="off">
                {pipeline.map((step, index) => {
                  const complete = reduceMotion || index < activeStep;
                  const current = !reduceMotion && index === activeStep;

                  return (
                    <li
                      key={step}
                      className={`flex items-center gap-3 font-mono text-xs transition-colors sm:text-sm ${
                        complete
                          ? "text-emerald-200"
                          : current
                            ? "text-white"
                            : "text-gray-500"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] ${
                          complete
                            ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                            : current
                              ? "border-rose-300/50 bg-rose-400/15 text-rose-200"
                              : "border-white/10 text-gray-600"
                        }`}
                      >
                        {complete ? "✓" : String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{step}</span>
                      {current && (
                        <span className="ml-auto text-[10px] text-rose-200">
                          running
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
              <div
                className="mt-5 h-1 overflow-hidden rounded-full bg-white/10"
                role="progressbar"
                aria-label="Deployment pipeline progress"
                aria-valuemin={0}
                aria-valuemax={pipeline.length}
                aria-valuenow={reduceMotion ? pipeline.length : activeStep + 1}
              >
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-rose-600 to-rose-300"
                  animate={{
                    width: `${((reduceMotion ? pipeline.length : activeStep + 1) / pipeline.length) * 100}%`,
                  }}
                  transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-gray-400">
                <span>release status</span>
                <span className="text-emerald-300">
                  {reduceMotion ? "complete" : `${activeStep + 1} / ${pipeline.length} steps`}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-rose-100/55">
            Toolchain
          </p>
          <div className="hero-marquee-viewport" aria-label="DevOps technology stack">
            <div className="hero-marquee-track" aria-hidden="true">
              {[...technologies, ...technologies].map((technology, index) => (
                <span key={`${technology}-${index}`} className="hero-marquee-item">
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
