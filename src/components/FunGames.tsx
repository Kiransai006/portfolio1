"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

type GameStatus = "idle" | "playing" | "gameover";

const GRAVITY = 0.35;
const FLAP = -7;
const PIPE_GAP = 140;
const PIPE_WIDTH = 56;
const PIPE_SPEED = 3;
const DRAGON_SIZE = 36;

// ——— DevOps-style icons (simple SVG paths) for background ———
const devOpsLogos = [
  // Docker (whale / container)
  { path: "M4.5 10h2v2h-2v-2zm0 3h2v2h-2v-2zm2.5-6h2v2H7V7zm2.5 3h2v2h-2v-2zm2.5-3h2v2h-2V7zm2.5 3h2v2h-2v-2zm-7.5 3h2v2H7v-2zm2.5 0h2v2h-2v-2zm2.5 0h2v2h-2v-2z" },
  // Kubernetes (hexagon)
  { path: "M12 2L3 7v10l9 5 9-5V7L12 2zm0 2.18l6.9 3.45v6.9L12 19.82l-6.9-3.45v-6.9L12 4.18z" },
  // Jenkins (gear)
  { path: "M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z" },
  // AWS (cloud)
  { path: "M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" },
  // Azure (triangle)
  { path: "M13.05 4.24L6.56 18.05 2 18l5.05-13.76 6 0zM22 18l-4.56-.05L11.5 4.24l6 13.71L22 18z" },
  // Terraform (layers)
  { path: "M2 4l10 6 10-6-10-6L2 4zm10 6l10 6v4l-10-6v-4zm-2 4v4L0 14v-4l10 6zm12 0l10 6v4l-10-6v-4z" },
  // GitHub (octocat)
  { path: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.545 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.92 1.23 3.225 0 4.59-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" },
];

// ——— Dragon Game ———
function DragonGame() {
  const [status, setStatus] = useState<GameStatus>("idle");
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragonY = useRef(200);
  const dragonVel = useRef(0);
  const pipesRef = useRef<{ x: number; top: number; bottom: number; passed: boolean }[]>([]);
  const pipeSpawnRef = useRef(0);
  const animationRef = useRef<number>(0);

  const resetGame = useCallback(() => {
    dragonY.current = 200;
    dragonVel.current = 0;
    pipesRef.current = [];
    pipeSpawnRef.current = 0;
    setScore(0);
    setStatus("playing");
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = 0, h = 0;
    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const drawDragon = (x: number, y: number) => {
      const s = DRAGON_SIZE / 2;
      ctx.fillStyle = "#c2410c";
      ctx.beginPath();
      ctx.ellipse(x, y, s * 0.9, s * 1.2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ea580c";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "#f97316";
      ctx.beginPath();
      ctx.arc(x + s * 0.6, y - s * 0.3, s * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#1c1917";
      ctx.beginPath();
      ctx.arc(x + s * 0.75, y - s * 0.35, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(194, 65, 12, 0.8)";
      ctx.beginPath();
      ctx.ellipse(x - s * 0.5, y, s * 0.6, s * 0.35, -0.3, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawPipe = (x: number, top: number, bottom: number) => {
      const gradient = ctx.createLinearGradient(x, 0, x + PIPE_WIDTH, 0);
      gradient.addColorStop(0, "#166534");
      gradient.addColorStop(1, "#15803d");
      ctx.fillStyle = gradient;
      ctx.fillRect(x, 0, PIPE_WIDTH, top);
      ctx.fillRect(x, bottom, PIPE_WIDTH, h - bottom);
      ctx.strokeStyle = "#14532d";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, 0, PIPE_WIDTH, top);
      ctx.strokeRect(x, bottom, PIPE_WIDTH, h - bottom);
      ctx.fillStyle = "#15803d";
      ctx.fillRect(x - 2, 0, PIPE_WIDTH + 4, 18);
      ctx.fillRect(x - 2, bottom - 18, PIPE_WIDTH + 4, 18);
    };

    const hitTest = (dx: number, dy: number) => {
      const dragonLeft = dx - DRAGON_SIZE / 2 + 8;
      const dragonRight = dx + DRAGON_SIZE / 2 - 8;
      const dragonTop = dy - DRAGON_SIZE / 2 + 8;
      const dragonBottom = dy + DRAGON_SIZE / 2 - 8;
      for (const pipe of pipesRef.current) {
        if (dragonRight > pipe.x && dragonLeft < pipe.x + PIPE_WIDTH) {
          if (dragonTop < pipe.top || dragonBottom > pipe.bottom) return true;
        }
      }
      return dy - DRAGON_SIZE / 2 < 0 || dy + DRAGON_SIZE / 2 > h;
    };

    const gameLoop = () => {
      if (!ctx || w <= 0 || h <= 0) {
        animationRef.current = requestAnimationFrame(gameLoop);
        return;
      }
      ctx.fillStyle = "#0c0a09";
      ctx.fillRect(0, 0, w, h);

      if (status === "idle") {
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.font = "14px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("SPACE or tap to start", w / 2, h / 2 + 50);
        drawDragon(w * 0.3, dragonY.current);
        animationRef.current = requestAnimationFrame(gameLoop);
        return;
      }
      if (status === "gameover") {
        pipesRef.current.forEach((p) => drawPipe(p.x, p.top, p.bottom));
        drawDragon(w * 0.3, dragonY.current);
        ctx.fillStyle = "rgba(0,0,0,0.65)";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#fff";
        ctx.font = "bold 18px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", w / 2, h / 2 - 16);
        ctx.font = "14px system-ui, sans-serif";
        ctx.fillText(`Score: ${score}`, w / 2, h / 2 + 8);
        ctx.fillText("SPACE or tap to replay", w / 2, h / 2 + 40);
        animationRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      dragonVel.current += GRAVITY;
      dragonY.current += dragonVel.current;
      pipeSpawnRef.current += 1;
      if (pipeSpawnRef.current > 80) {
        pipeSpawnRef.current = 0;
        const minTop = 60;
        const maxTop = h - PIPE_GAP - 60;
        const top = minTop + Math.random() * (maxTop - minTop);
        pipesRef.current.push({ x: w, top, bottom: top + PIPE_GAP, passed: false });
      }
      pipesRef.current = pipesRef.current.map((p) => ({ ...p, x: p.x - PIPE_SPEED })).filter((p) => p.x + PIPE_WIDTH > 0);
      for (const p of pipesRef.current) {
        if (!p.passed && p.x + PIPE_WIDTH < w * 0.3 - DRAGON_SIZE / 2) {
          p.passed = true;
          setScore((s) => {
            const next = s + 1;
            setBestScore((b) => Math.max(b, next));
            return next;
          });
        }
      }
      if (hitTest(w * 0.3, dragonY.current)) setStatus("gameover");
      pipesRef.current.forEach((p) => drawPipe(p.x, p.top, p.bottom));
      drawDragon(w * 0.3, dragonY.current);
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.font = "bold 16px system-ui, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`${score}`, 14, 24);
      animationRef.current = requestAnimationFrame(gameLoop);
    };
    gameLoop();
    return () => {
      window.removeEventListener("resize", setSize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [status, score]);

  const flap = useCallback(() => {
    if (status === "idle" || status === "gameover") resetGame();
    else if (status === "playing") dragonVel.current = FLAP;
  }, [status, resetGame]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        flap();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flap]);

  return (
    <div className="relative flex flex-col h-full min-h-[400px] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:border-white/20 hover:shadow-indigo-500/5 transition-all duration-300">
      <div className="relative flex-1 min-h-0 w-full bg-stone-950 cursor-pointer select-none touch-none" onClick={flap} role="button" tabIndex={0} onKeyDown={(e) => e.key === " " && flap()} aria-label="Tap or press space to flap">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ touchAction: "none" }} />
      </div>
      <div className="px-4 py-2.5 flex items-center justify-between text-sm text-gray-400 border-t border-white/10 bg-black/20 flex-shrink-0">
        <span className="font-medium text-white/90">Dragon Fly</span>
        <span>Score: <span className="text-white font-semibold">{score}</span> · Best: <span className="text-amber-400 font-semibold">{bestScore}</span></span>
      </div>
    </div>
  );
}

// ——— Brain Game: Sequence Memory ———
type BrainPhase = "idle" | "show" | "input" | "success" | "fail";

function BrainGame() {
  const [phase, setPhase] = useState<BrainPhase>("idle");
  const [level, setLevel] = useState(1);
  const [bestLevel, setBestLevel] = useState(0);
  const [sequence, setSequence] = useState<number[]>([]);
  const [userInput, setUserInput] = useState<number[]>([]);
  const [highlight, setHighlight] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const startGame = useCallback(() => {
    const seq = [Math.floor(Math.random() * 9)];
    for (let i = 1; i < 1 + level; i++) seq.push(Math.floor(Math.random() * 9));
    setSequence(seq);
    setUserInput([]);
    setPhase("show");
    setMessage("Watch the sequence…");
  }, [level]);

  useEffect(() => {
    if (phase !== "show" || sequence.length === 0) return;
    let i = 0;
    const showNext = () => {
      if (i >= sequence.length) {
        setHighlight(null);
        setPhase("input");
        setMessage("Your turn! Repeat the sequence.");
        return;
      }
      setHighlight(sequence[i]);
      const t = setTimeout(() => {
        setHighlight(null);
        i++;
        if (i < sequence.length) setTimeout(showNext, 220);
        else setTimeout(() => { setHighlight(null); setPhase("input"); setMessage("Your turn! Repeat the sequence."); }, 220);
      }, 450);
      return () => clearTimeout(t);
    };
    const t = setTimeout(showNext, 600);
    return () => clearTimeout(t);
  }, [phase, sequence]);

  const handleTileClick = (idx: number) => {
    if (phase !== "input") return;
    const next = [...userInput, idx];
    setUserInput(next);
    if (next.length !== sequence.length) return;
    if (next.every((v, i) => v === sequence[i])) {
      setPhase("success");
      setBestLevel((b) => Math.max(b, level + 1));
      setMessage(`Level ${level} complete!`);
      setTimeout(() => {
        setLevel((l) => l + 1);
        setPhase("idle");
        setMessage("Next level — tap Start when ready.");
      }, 800);
    } else {
      setPhase("fail");
      setMessage("Wrong sequence. Tap Start to try again.");
    }
  };

  const resetBrain = () => {
    setLevel(1);
    setPhase("idle");
    setSequence([]);
    setUserInput([]);
    setHighlight(null);
    setMessage("Remember the sequence and repeat it. Tap Start.");
  };

  const isCorrectSoFar = userInput.length <= sequence.length && userInput.every((v, i) => v === sequence[i]);

  return (
    <div className="relative flex flex-col h-full min-h-[400px] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:border-white/20 hover:shadow-violet-500/5 transition-all duration-300">
      <div className="flex flex-col flex-1 min-h-0 p-4">
        <div className="flex items-center justify-between mb-3 flex-shrink-0">
          <span className="font-medium text-white/90">Brain Sequence</span>
          <span className="text-sm text-gray-400">Level <span className="text-white font-semibold">{phase === "idle" ? level : level}</span> · Best: <span className="text-violet-400 font-semibold">{bestLevel}</span></span>
        </div>
        <p className="text-xs text-gray-400 mb-3 min-h-[2rem] flex-shrink-0">{message}</p>
        <div className="grid grid-cols-3 gap-2 flex-1 min-h-0 max-w-[240px] mx-auto w-full">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <button
              key={idx}
              type="button"
              disabled={phase !== "input"}
              onClick={() => handleTileClick(idx)}
              className={`
                aspect-square rounded-xl border-2 transition-all duration-200 w-full max-w-[72px] mx-auto
                ${highlight === idx ? "bg-amber-400 border-amber-300 scale-105 shadow-lg shadow-amber-500/40" : "bg-white/10 border-white/20 hover:border-white/40"}
                ${phase === "input" ? "cursor-pointer hover:bg-white/20" : "cursor-default"}
                ${phase === "fail" && userInput.includes(idx) && !isCorrectSoFar ? "border-red-400 bg-red-500/30" : ""}
              `}
            />
          ))}
        </div>
        <div className="flex gap-2 mt-4 flex-shrink-0">
          <button
            type="button"
            onClick={phase === "idle" ? startGame : resetBrain}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-semibold shadow-lg hover:scale-[1.02] hover:shadow-violet-500/30 transition-all"
          >
            {phase === "idle" ? "Start" : "Reset"}
          </button>
          {phase === "idle" && level > 1 && (
            <button type="button" onClick={startGame} className="px-4 py-2.5 rounded-xl border border-white/20 text-gray-300 text-sm font-medium hover:border-violet-400 hover:text-violet-300 transition-colors">
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FunGames() {
  return (
    <section id="fun" className="relative py-24 px-6 overflow-hidden">
      {/* DevOps logos background — subtle floating icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute inset-0 opacity-[0.06]">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="absolute w-12 h-12 sm:w-14 sm:h-14 text-white"
              style={{
                left: `${(i * 17 + 3) % 98}%`,
                top: `${(i * 23 + 2) % 98}%`,
                animation: `float ${9 + (i % 6)}s ease-in-out infinite`,
                animationDelay: `${i * 0.25}s`,
              }}
            >
              <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-sm" fill="currentColor">
                <path d={devOpsLogos[i % devOpsLogos.length].path} />
              </svg>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-2 text-center"
        >
          Let&apos;s Have Some Fun
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-400 mb-10 max-w-2xl mx-auto text-center text-sm"
        >
          Take a break — play the dragon game or train your brain with the sequence memory game.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch"
        >
          <DragonGame />
          <BrainGame />
        </motion.div>
      </div>

    </section>
  );
}
