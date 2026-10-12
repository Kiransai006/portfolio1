"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const FRAME_COUNT = 20;
const FRAME_DIRECTORY = "/ezgif-397f8797a0b6e8a2-jpg";

function getFramePath(index: number) {
  const frameNumber = String(index + 1).padStart(3, "0");
  return `${FRAME_DIRECTORY}/ezgif-frame-${frameNumber}.jpg`;
}

export default function DevOpsBackground() {
  const imageRef = useRef<HTMLImageElement>(null);
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    for (let index = 0; index < FRAME_COUNT; index += 1) {
      const frame = new window.Image();
      frame.src = getFramePath(index);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    let animationFrame = 0;
    let activeFrame = 0;

    const updateFrame = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const scrollableHeight = Math.max(
          root.scrollHeight - window.innerHeight,
          1,
        );
        const progress = Math.min(
          Math.max(window.scrollY / scrollableHeight, 0),
          1,
        );
        const nextFrame = Math.round(progress * (FRAME_COUNT - 1));

        imageRef.current?.style.setProperty(
          "--scroll-offset",
          `${progress * -18}px`,
        );

        if (nextFrame !== activeFrame) {
          activeFrame = nextFrame;
          setFrameIndex(nextFrame);
        }
      });
    };

    window.addEventListener("scroll", updateFrame, { passive: true });
    window.addEventListener("resize", updateFrame);
    updateFrame();

    return () => {
      window.removeEventListener("scroll", updateFrame);
      window.removeEventListener("resize", updateFrame);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#080304]"
      aria-hidden="true"
    >
      <Image
        key={frameIndex}
        ref={imageRef}
        src={getFramePath(frameIndex)}
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="portfolio-background-frame absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-[#100507]/15 to-[#080304]/75" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.48)_100%)]" />
    </div>
  );
}
