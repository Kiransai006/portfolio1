"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type GameStatus = "ready" | "running" | "over";
type ObjectKind = "barrier" | "crate" | "token";

type TrackObject = {
  lane: number;
  depth: number;
  kind: ObjectKind;
  collected?: boolean;
};

type RunnerGame = {
  status: GameStatus;
  lane: number;
  score: number;
  distance: number;
  spawnTimer: number;
  jumpTime: number;
  objects: TrackObject[];
};

const createGame = (status: GameStatus = "ready"): RunnerGame => ({
  status,
  lane: 1,
  score: 0,
  distance: 0,
  spawnTimer: 0.6,
  jumpTime: 0,
  objects: [],
});

function drawRunner(ctx: CanvasRenderingContext2D, x: number, y: number, jump: number) {
  const lift = Math.sin(Math.min(jump / 520, 1) * Math.PI) * 48;
  const groundY = y - lift;
  const stride = jump > 0 ? 0 : Math.sin(performance.now() / 85) * 7;

  ctx.save();
  ctx.globalAlpha = 0.28;
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.ellipse(x, y + 4, 25 + lift * 0.15, 7, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.strokeStyle = "#ffe4e6";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(x - 5, groundY - 24);
  ctx.lineTo(x - 9 + stride, groundY - 5);
  ctx.lineTo(x - 14 + stride, groundY + 1);
  ctx.moveTo(x + 5, groundY - 24);
  ctx.lineTo(x + 10 - stride, groundY - 7);
  ctx.lineTo(x + 15 - stride, groundY + 1);
  ctx.stroke();

  ctx.fillStyle = "#f43f5e";
  ctx.beginPath();
  ctx.roundRect(x - 15, groundY - 53, 30, 34, 9);
  ctx.fill();
  ctx.strokeStyle = "#fecdd3";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(x - 12, groundY - 45);
  ctx.lineTo(x - 22, groundY - 30 + stride * 0.4);
  ctx.moveTo(x + 12, groundY - 45);
  ctx.lineTo(x + 22, groundY - 34 - stride * 0.4);
  ctx.stroke();

  ctx.fillStyle = "#f1c7a5";
  ctx.beginPath();
  ctx.arc(x, groundY - 64, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#3f0b16";
  ctx.beginPath();
  ctx.arc(x, groundY - 68, 11, Math.PI, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ff735c";
  ctx.beginPath();
  ctx.roundRect(x + 10, groundY - 45, 9, 23, 4);
  ctx.fill();

  ctx.fillStyle = "#0f172a";
  ctx.beginPath();
  ctx.arc(x - 4, groundY - 64, 1.4, 0, Math.PI * 2);
  ctx.arc(x + 4, groundY - 64, 1.4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#f8fafc";
  ctx.beginPath();
  ctx.roundRect(x - 19 + stride, groundY - 3, 12, 5, 2);
  ctx.roundRect(x + 10 - stride, groundY - 3, 12, 5, 2);
  ctx.fill();
}

function drawTrack(ctx: CanvasRenderingContext2D, width: number, height: number, distance: number) {
  const horizonY = height * 0.2;
  const centerX = width / 2;
  const topHalf = width * 0.055;
  const bottomHalf = width * 0.43;

  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, "#13070a");
  sky.addColorStop(0.55, "#1d0b10");
  sky.addColorStop(1, "#05080d");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  const glow = ctx.createRadialGradient(centerX, horizonY, 2, centerX, horizonY, width * 0.42);
  glow.addColorStop(0, "rgba(244, 63, 94, 0.18)");
  glow.addColorStop(1, "rgba(244, 63, 94, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height * 0.72);

  const moonX = width * 0.78;
  const moonY = height * 0.13;
  ctx.save();
  ctx.shadowColor = "#fda4af";
  ctx.shadowBlur = 24;
  ctx.fillStyle = "rgba(255, 228, 230, 0.75)";
  ctx.beginPath();
  ctx.arc(moonX, moonY, Math.max(10, width * 0.018), 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  ctx.fillStyle = "#1d0b10";
  ctx.beginPath();
  ctx.arc(moonX + width * 0.008, moonY - height * 0.008, Math.max(8, width * 0.016), 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < 32; i++) {
    const starX = ((i * 83 + 29) % 997) / 997 * width;
    const starY = ((i * 47 + 17) % 179) / 179 * horizonY;
    const twinkle = 0.25 + (Math.sin(distance * 2 + i) + 1) * 0.2;
    ctx.fillStyle = `rgba(253, 164, 175, ${twinkle})`;
    ctx.beginPath();
    ctx.arc(starX, starY, i % 7 === 0 ? 1.7 : 1, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < 3; i++) {
    const cloudX = ((i * 0.38 + distance * 0.008) % 1.3) * width - width * 0.15;
    const cloudY = height * (0.09 + i * 0.045);
    ctx.fillStyle = "rgba(148, 163, 184, 0.08)";
    ctx.beginPath();
    ctx.ellipse(cloudX, cloudY, width * 0.045, height * 0.018, 0, 0, Math.PI * 2);
    ctx.ellipse(cloudX - width * 0.022, cloudY + height * 0.004, width * 0.022, height * 0.015, 0, 0, Math.PI * 2);
    ctx.ellipse(cloudX + width * 0.019, cloudY + height * 0.003, width * 0.026, height * 0.016, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < 16; i++) {
    const buildingWidth = width * (0.025 + ((i * 13) % 9) * 0.004);
    const buildingHeight = height * (0.08 + ((i * 19) % 13) * 0.012);
    const side = i % 2 === 0 ? -1 : 1;
    const x = side < 0
      ? centerX - topHalf - (i + 1) * width * 0.035
      : centerX + topHalf + i * width * 0.035;
    ctx.fillStyle = i % 3 === 0 ? "#1e0a0e" : "#100609";
    ctx.fillRect(x, horizonY - buildingHeight, buildingWidth, buildingHeight);
    ctx.fillStyle = "rgba(251, 113, 133, 0.22)";
    const columns = Math.max(1, Math.floor(buildingWidth / 8));
    const rows = Math.max(1, Math.floor(buildingHeight / 12));
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const lit = (i * 7 + row * 3 + column * 5) % 4 !== 0;
        ctx.fillStyle = lit ? "rgba(251, 113, 133, 0.26)" : "rgba(148, 163, 184, 0.08)";
        ctx.fillRect(x + 4 + column * 7, horizonY - buildingHeight + 8 + row * 10, 3, 4);
      }
    }
  }

  ctx.beginPath();
  ctx.moveTo(centerX - topHalf, horizonY);
  ctx.lineTo(centerX + topHalf, horizonY);
  ctx.lineTo(centerX + bottomHalf, height);
  ctx.lineTo(centerX - bottomHalf, height);
  ctx.closePath();
  const road = ctx.createLinearGradient(0, horizonY, 0, height);
  road.addColorStop(0, "#321318");
  road.addColorStop(1, "#16090d");
  ctx.fillStyle = road;
  ctx.fill();
  ctx.strokeStyle = "rgba(251, 113, 133, 0.45)";
  ctx.lineWidth = 2;
  ctx.stroke();

  const decorationOffset = (distance * 0.38) % 1;
  for (let i = 0; i < 7; i++) {
    const progress = ((i / 7 + decorationOffset) % 1);
    const perspective = progress * progress;
    const roadHalf = topHalf + perspective * (bottomHalf - topHalf);
    const decorationSize = 0.18 + perspective * 1.2;
    const y = horizonY + perspective * (height - horizonY);

    for (const side of [-1, 1]) {
      const x = centerX + side * (roadHalf + width * (0.025 + perspective * 0.08));
      if (i % 2 === 0) {
        const treeHeight = height * 0.13 * decorationSize;
        ctx.fillStyle = "#49351f";
        ctx.fillRect(x - 2 * decorationSize, y - treeHeight * 0.38, 4 * decorationSize, treeHeight * 0.4);
        ctx.fillStyle = "#0b493d";
        for (let layer = 0; layer < 3; layer++) {
          const layerY = y - treeHeight + layer * treeHeight * 0.24;
          const layerWidth = treeHeight * (0.28 - layer * 0.045);
          ctx.beginPath();
          ctx.moveTo(x, layerY);
          ctx.lineTo(x - layerWidth, layerY + treeHeight * 0.34);
          ctx.lineTo(x + layerWidth, layerY + treeHeight * 0.34);
          ctx.closePath();
          ctx.fill();
        }
        ctx.fillStyle = "rgba(52, 211, 153, 0.4)";
        ctx.beginPath();
        ctx.arc(x - treeHeight * 0.08, y - treeHeight * 0.6, treeHeight * 0.055, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const poleHeight = height * 0.16 * decorationSize;
        ctx.strokeStyle = "rgba(148, 163, 184, 0.7)";
        ctx.lineWidth = Math.max(1, decorationSize * 2);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - poleHeight);
        ctx.lineTo(x + side * poleHeight * 0.16, y - poleHeight);
        ctx.stroke();
        ctx.save();
        ctx.shadowColor = "#fb7185";
        ctx.shadowBlur = poleHeight * 0.15;
        ctx.fillStyle = "rgba(253, 164, 175, 0.9)";
        ctx.beginPath();
        ctx.ellipse(x + side * poleHeight * 0.16, y - poleHeight, 4 * decorationSize, 2.5 * decorationSize, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
  }

  for (const marker of [1, 2]) {
    const topX = centerX - topHalf + (topHalf * 2 * marker) / 3;
    const bottomX = centerX - bottomHalf + (bottomHalf * 2 * marker) / 3;
    ctx.strokeStyle = "rgba(203, 213, 225, 0.22)";
    ctx.lineWidth = 2;
    ctx.setLineDash([14, 16]);
    ctx.lineDashOffset = -distance * 35;
    ctx.beginPath();
    ctx.moveTo(topX, horizonY);
    ctx.lineTo(bottomX, height);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  const stripeOffset = (distance * 0.75) % 1;
  for (let i = 0; i < 9; i++) {
    const progress = ((i / 9 + stripeOffset) % 1);
    const perspective = progress * progress;
    const y = horizonY + perspective * (height - horizonY);
    const halfWidth = topHalf + perspective * (bottomHalf - topHalf);
    ctx.fillStyle = `rgba(148, 163, 184, ${0.04 + perspective * 0.1})`;
    ctx.fillRect(centerX - halfWidth, y, halfWidth * 2, 2 + perspective * 2);
  }
}

function drawTrackObject(
  ctx: CanvasRenderingContext2D,
  object: TrackObject,
  width: number,
  height: number
) {
  const progress = Math.max(0, Math.min(object.depth, 1));
  const perspective = progress * progress;
  const centerX = width / 2;
  const halfRoad = width * (0.055 + perspective * 0.375);
  const x = centerX + ((object.lane - 1) * halfRoad * 2) / 3;
  const y = height * (0.2 + perspective * 0.8);
  const scale = 0.22 + perspective * 0.9;

  if (object.kind === "token") {
    const radius = 10 * scale;
    ctx.save();
    ctx.shadowColor = "#fbbf24";
    ctx.shadowBlur = 12 * scale;
    ctx.fillStyle = object.collected ? "rgba(251, 191, 36, 0.25)" : "#fbbf24";
    ctx.beginPath();
    ctx.ellipse(x, y - 27 * scale, radius, radius * 1.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = "#fff1a6";
    ctx.lineWidth = Math.max(1, 2 * scale);
    ctx.beginPath();
    ctx.ellipse(x, y - 27 * scale, radius * 0.56, radius * 0.76, 0, 0, Math.PI * 2);
    ctx.stroke();
    return;
  }

  const objectWidth = (object.kind === "crate" ? 38 : 50) * scale;
  const objectHeight = (object.kind === "crate" ? 40 : 26) * scale;
  const objectY = y - objectHeight;
  ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
  ctx.fillRect(x - objectWidth * 0.65, y - 2 * scale, objectWidth * 1.3, 5 * scale);

  if (object.kind === "crate") {
    ctx.fillStyle = "#78350f";
    ctx.beginPath();
    ctx.moveTo(x - objectWidth / 2, objectY);
    ctx.lineTo(x - objectWidth / 2 + objectWidth * 0.18, objectY - objectHeight * 0.16);
    ctx.lineTo(x + objectWidth / 2 + objectWidth * 0.18, objectY - objectHeight * 0.16);
    ctx.lineTo(x + objectWidth / 2, objectY);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#b45309";
    ctx.fillRect(x - objectWidth / 2, objectY, objectWidth, objectHeight);
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = Math.max(1, 2 * scale);
    ctx.strokeRect(x - objectWidth / 2, objectY, objectWidth, objectHeight);
    ctx.beginPath();
    ctx.moveTo(x - objectWidth / 2, objectY);
    ctx.lineTo(x + objectWidth / 2, y);
    ctx.moveTo(x + objectWidth / 2, objectY);
    ctx.lineTo(x - objectWidth / 2, y);
    ctx.stroke();
  } else {
    ctx.fillStyle = "#991b1b";
    ctx.beginPath();
    ctx.moveTo(x - objectWidth / 2, objectY);
    ctx.lineTo(x - objectWidth / 2 + objectWidth * 0.12, objectY - objectHeight * 0.26);
    ctx.lineTo(x + objectWidth / 2 + objectWidth * 0.12, objectY - objectHeight * 0.26);
    ctx.lineTo(x + objectWidth / 2, objectY);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#dc3545";
    ctx.fillRect(x - objectWidth / 2, objectY, objectWidth, objectHeight);
    ctx.fillStyle = "#fecaca";
    ctx.fillRect(x - objectWidth / 2, objectY, objectWidth, objectHeight * 0.28);
    ctx.fillStyle = "#7f1d1d";
    ctx.fillRect(x - objectWidth * 0.38, objectY + objectHeight, objectWidth * 0.16, 8 * scale);
    ctx.fillRect(x + objectWidth * 0.22, objectY + objectHeight, objectWidth * 0.16, 8 * scale);
  }
}

export default function FunGames() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<RunnerGame>(createGame());
  const lastFrameRef = useRef(0);
  const scoreUpdateRef = useRef(0);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const [status, setStatus] = useState<GameStatus>("ready");
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const startGame = useCallback(() => {
    gameRef.current = createGame("running");
    setScore(0);
    setStatus("running");
    canvasRef.current?.focus();
  }, []);

  const moveLane = useCallback((direction: -1 | 1) => {
    if (gameRef.current.status !== "running") return;
    gameRef.current.lane = Math.max(0, Math.min(2, gameRef.current.lane + direction));
  }, []);

  const jump = useCallback(() => {
    if (gameRef.current.status === "running") gameRef.current.jumpTime = 520;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let animationId = 0;
    let width = 0;
    let height = 0;
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const frame = (timestamp: number) => {
      const delta = Math.min((timestamp - (lastFrameRef.current || timestamp)) / 1000, 0.05);
      lastFrameRef.current = timestamp;
      const game = gameRef.current;

      if (game.status === "running") {
        game.distance += delta;
        game.jumpTime = Math.max(0, game.jumpTime - delta * 1000);
        game.spawnTimer -= delta;

        if (game.spawnTimer <= 0) {
          const lane = Math.floor(Math.random() * 3);
          const kind: ObjectKind = Math.random() < 0.52 ? "token" : Math.random() < 0.5 ? "crate" : "barrier";
          game.objects.push({ lane, depth: 0.02, kind });
          if (kind !== "token" && Math.random() < 0.25) {
            const secondLane = (lane + 1 + Math.floor(Math.random() * 2)) % 3;
            game.objects.push({ lane: secondLane, depth: 0.02, kind: "token" });
          }
          game.spawnTimer = Math.max(0.48, 0.95 - game.distance * 0.003) + Math.random() * 0.35;
        }

        const speed = Math.min(0.42 + game.distance * 0.004, 0.72);
        for (const object of game.objects) {
          object.depth += delta * speed;
          if (object.depth >= 0.83 && object.depth <= 0.83 + delta * speed + 0.015 && object.lane === game.lane) {
            if (object.kind === "token") {
              object.collected = true;
              game.score += 10;
            } else if (game.jumpTime <= 0) {
              game.status = "over";
              const finalScore = game.score + Math.floor(game.distance * 2);
              setScore(finalScore);
              setStatus("over");
              setBestScore((best) => Math.max(best, finalScore));
              break;
            }
          }
        }
        game.objects = game.objects.filter((object) => object.depth < 1.04 && !object.collected);
        scoreUpdateRef.current += delta;
        if (scoreUpdateRef.current > 0.12) {
          setScore(game.score + Math.floor(game.distance * 2));
          scoreUpdateRef.current = 0;
        }
      }

      drawTrack(ctx, width, height, game.distance);
      game.objects
        .slice()
        .sort((a, b) => a.depth - b.depth)
        .forEach((object) => drawTrackObject(ctx, object, width, height));

      const halfRoad = width * 0.43;
      const playerX = width / 2 + ((game.lane - 1) * halfRoad * 2) / 3;
      drawRunner(ctx, playerX, height * 0.87, game.jumpTime);
      animationId = requestAnimationFrame(frame);
    };

    animationId = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
      event.preventDefault();
      moveLane(-1);
    } else if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
      event.preventDefault();
      moveLane(1);
    } else if (event.key === "ArrowUp" || event.key === " ") {
      event.preventDefault();
      jump();
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (status !== "running") return;
    swipeStartRef.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const start = swipeStartRef.current;
    swipeStartRef.current = null;
    if (!start || status !== "running") return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    const minimumSwipe = 28;
    if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < minimumSwipe) return;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      moveLane(deltaX < 0 ? -1 : 1);
    } else if (deltaY < 0) {
      jump();
    }
  };

  const displayedScore = status === "running"
    ? score
    : status === "over"
      ? score
      : 0;

  return (
    <section id="fun" className="relative overflow-hidden px-6 py-24">
      <div className="relative mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-2 text-center text-3xl font-bold text-white sm:text-4xl"
        >
          Cloud Runner
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mb-8 max-w-2xl text-center text-sm text-gray-400"
        >
          Swipe left or right to change lanes and swipe up to jump. Dodge the barriers and collect energy tokens.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b111a] shadow-2xl shadow-black/30"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <p className="font-semibold text-white">Skyline Sprint</p>
              <p className="text-xs text-gray-500">A small portfolio arcade game</p>
            </div>
            <div className="text-right text-sm text-gray-400">
              <p>Score <span className="font-semibold text-sky-300">{displayedScore}</span></p>
              <p>Best <span className="font-semibold text-amber-300">{bestScore}</span></p>
            </div>
          </div>

          <div className="relative">
            <canvas
              ref={canvasRef}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={() => { swipeStartRef.current = null; }}
              aria-label="Skyline Sprint game. Swipe left or right to change lanes and swipe up to jump. Keyboard: arrow keys or A and D to change lanes, up arrow or space to jump."
              className={`block aspect-[16/10] w-full outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-400 ${
                status === "running" ? "touch-none cursor-grab active:cursor-grabbing" : ""
              }`}
            />

            {status !== "running" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/45 px-5 text-center backdrop-blur-[2px]">
                <p className="mb-2 text-xl font-bold text-white">
                  {status === "over" ? "Run complete" : "Ready to run?"}
                </p>
                <p className="mb-5 max-w-sm text-sm text-gray-300">
                  {status === "over"
                    ? "Nice run. Jump over crates and change lanes to avoid barriers."
                    : "Collect glowing tokens and stay clear of the roadblocks."}
                </p>
                <button
                  type="button"
                  onClick={startGame}
                  className="rounded-lg bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  {status === "over" ? "Run again" : "Start running"}
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3">
            <p className="text-xs text-gray-400">
              Swipe ← → to switch lanes · swipe ↑ to jump · Keyboard: arrows / Space
            </p>
            <span className="inline-flex items-center gap-2 text-xs text-sky-300/80" aria-hidden="true">
              <span className="text-lg leading-none">↔</span>
              <span>Swipe to play</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
