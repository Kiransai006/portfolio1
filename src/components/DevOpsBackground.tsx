"use client";

/**
 * Full-page background of subtle DevOps logos (GitHub, AWS, Kubernetes, Docker, ArgoCD, Jenkins, Azure, Azure DevOps).
 * Fixed behind all content, low opacity, gentle float animation.
 */

const LOGOS = [
  // GitHub (mark: octocat silhouette simplified)
  {
    id: "github",
    viewBox: "0 0 24 24",
    path: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.545 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.92 1.23 3.225 0 4.59-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z",
  },
  // AWS (cloud)
  {
    id: "aws",
    viewBox: "0 0 24 24",
    path: "M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z",
  },
  // Kubernetes (hexagon)
  {
    id: "k8s",
    viewBox: "0 0 24 24",
    path: "M12 2L3 7v10l9 5 9-5V7L12 2zm0 2.18l6.9 3.45v6.9L12 19.82l-6.9-3.45v-6.9L12 4.18z",
  },
  // Docker (stacked boxes)
  {
    id: "docker",
    viewBox: "0 0 24 24",
    path: "M4.5 10h2v2h-2v-2zm0 3h2v2h-2v-2zm2.5-6h2v2H7V7zm2.5 3h2v2h-2v-2zm2.5-3h2v2h-2V7zm2.5 3h2v2h-2v-2zm-7.5 3h2v2H7v-2zm2.5 0h2v2h-2v-2zm2.5 0h2v2h-2v-2z",
  },
  // ArgoCD (ship wheel / helm)
  {
    id: "argocd",
    viewBox: "0 0 24 24",
    path: "M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 2a8 8 0 110 16 8 8 0 010-16zm0 2a6 6 0 000 12 6 6 0 000-12zm0 2v8l5.2-4L12 8z",
  },
  // Jenkins (gear)
  {
    id: "jenkins",
    viewBox: "0 0 24 24",
    path: "M12 15.5A3.5 3.5 0 018.5 12 3.5 3.5 0 0112 8.5a3.5 3.5 0 013.5 3.5 3.5 3.5 0 01-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0014 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z",
  },
  // Azure (triangle)
  {
    id: "azure",
    viewBox: "0 0 24 24",
    path: "M13.05 4.24L6.56 18.05 2 18l5.05-13.76 6 0zM22 18l-4.56-.05L11.5 4.24l6 13.71L22 18z",
  },
  // Azure DevOps (pipeline / branching)
  {
    id: "azure-devops",
    viewBox: "0 0 24 24",
    path: "M0 0v24h24V0H0zm10.5 5.5h3v13h-3V5.5zm-6 5.5h3v7.5h-3V11zm12 0h3v7.5h-3V11z",
  },
];

/** Grid positions (percent) for logos so they spread across viewport */
const POSITIONS: { top: string; left: string; size: number; delay: number }[] = [
  { top: "8%", left: "5%", size: 56, delay: 0 },
  { top: "12%", left: "22%", size: 44, delay: 0.5 },
  { top: "6%", left: "42%", size: 52, delay: 1 },
  { top: "15%", left: "58%", size: 40, delay: 0.2 },
  { top: "5%", left: "78%", size: 48, delay: 0.8 },
  { top: "18%", left: "88%", size: 42, delay: 0.3 },
  { top: "28%", left: "8%", size: 50, delay: 0.6 },
  { top: "35%", left: "28%", size: 38, delay: 0.1 },
  { top: "32%", left: "52%", size: 46, delay: 0.4 },
  { top: "38%", left: "75%", size: 44, delay: 0.9 },
  { top: "42%", left: "92%", size: 40, delay: 0.2 },
  { top: "52%", left: "4%", size: 54, delay: 0.7 },
  { top: "58%", left: "18%", size: 42, delay: 0.3 },
  { top: "55%", left: "38%", size: 48, delay: 0.5 },
  { top: "62%", left: "62%", size: 44, delay: 0.1 },
  { top: "58%", left: "85%", size: 46, delay: 0.6 },
  { top: "72%", left: "12%", size: 40, delay: 0.4 },
  { top: "78%", left: "35%", size: 52, delay: 0.8 },
  { top: "75%", left: "58%", size: 42, delay: 0.2 },
  { top: "82%", left: "78%", size: 48, delay: 0.5 },
  { top: "88%", left: "22%", size: 44, delay: 0.3 },
  { top: "92%", left: "48%", size: 50, delay: 0.7 },
  { top: "88%", left: "72%", size: 42, delay: 0 },
  { top: "92%", left: "90%", size: 38, delay: 0.4 },
];

export default function DevOpsBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-transparent" />
      {POSITIONS.map((pos, i) => {
        const logo = LOGOS[i % LOGOS.length];
        return (
          <div
            key={`${logo.id}-${i}`}
            className="absolute text-white/[0.06] transition-colors duration-300"
            style={{
              top: pos.top,
              left: pos.left,
              width: pos.size,
              height: pos.size,
              animation: "float 12s ease-in-out infinite",
              animationDelay: `${pos.delay}s`,
            }}
          >
            <svg
              viewBox={logo.viewBox}
              className="h-full w-full"
              fill="currentColor"
              preserveAspectRatio="xMidYMid meet"
            >
              <path d={logo.path} />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
