"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

const TOTAL_FRAMES = 190;
const FRAME_BASE_URL = "https://rbbxjambmvhupuwegwls.supabase.co/storage/v1/object/public/meetprerna";

function getFrameUrl(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `${FRAME_BASE_URL}/frame_${padded}_delay-0.041s.webp`;
}

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  // Track page scroll progress (0 to 1 over 350vh)
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
  });

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1]
  ) as MotionValue<number>;

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
      };
      img.onerror = () => {
        loaded++;
        setLoadedCount(loaded);
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      imagesRef.current = [];
    };
  }, []);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    function resize() {
      const canvasEl = canvasRef.current!;
      const ctxEl = ctxRef.current!;
      const dpr = window.devicePixelRatio || 1;
      canvasEl.width = window.innerWidth * dpr;
      canvasEl.height = window.innerHeight * dpr;
      canvasEl.style.width = `${window.innerWidth}px`;
      canvasEl.style.height = `${window.innerHeight}px`;
      ctxEl.scale(dpr, dpr);
    }

    resize();
    window.addEventListener("resize", resize);

    let rafId: number;

    function render() {
      if (!ctxRef.current || imagesRef.current.length === 0) {
        rafId = requestAnimationFrame(render);
        return;
      }

      const currentFrame = Math.min(Math.floor(frameIndex.get()), TOTAL_FRAMES - 1);
      const img = imagesRef.current[currentFrame];

      if (img && img.complete) {
        const canvasEl = canvasRef.current;
        if (!canvasEl) return;

        const ctx = ctxRef.current!;
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

        const scale = Math.max(
          canvasEl.clientWidth / img.width,
          canvasEl.clientHeight / img.height
        );
        const drawWidth = img.width * scale;
        const drawHeight = img.height * scale;
        const x = (canvasEl.clientWidth - drawWidth) / 2;
        const y = (canvasEl.clientHeight - drawHeight) / 2;

        ctx.drawImage(img, x, y, drawWidth, drawHeight);
      }

      rafId = requestAnimationFrame(render);
    }

    render();

    return () => {
      window.removeEventListener("resize", resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [frameIndex, loadedCount]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        background: "#0D0D0D",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {/* Subtle vignette for depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(13,13,13,0.6) 100%)",
          zIndex: 2,
        }}
      />

      {/* Film grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.03,
          zIndex: 3,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {loadedCount < TOTAL_FRAMES && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            fontFamily: "Lato, sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            color: "#C4FF61",
            textTransform: "uppercase",
            opacity: 0.5,
          }}
        >
          Loading {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
        </div>
      )}
    </div>
  );
}