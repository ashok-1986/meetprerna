"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

const TOTAL_FRAMES = 190;
const FRAME_BASE_URL = "https://rbbxjambmvhupuwegwls.supabase.co/storage/v1/object/public/meetprerna";
const INITIAL_LOAD = 20;
const CHUNK_SIZE = 30;
const IMAGE_TIMEOUT_MS = 8000;
const MAX_FAILURE_RATE = 0.15; // 15% failure threshold

function getFrameUrl(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `${FRAME_BASE_URL}/frame_${padded}_delay-0.041s.webp`;
}

interface FrameState {
  loaded: number;
  failed: number;
  failedUrls: string[];
}

export default function ScrollyCanvas() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [failedUrls, setFailedUrls] = useState<string[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1]
  ) as MotionValue<number>;

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;
    let failed = 0;
    const failedUrls: string[] = [];

    const loadChunk = (start: number, end: number) => {
      for (let i = start; i <= end; i++) {
        const url = getFrameUrl(i);
        const img = new Image();
        img.crossOrigin = "anonymous"; // Required for Supabase Storage CORS
        img.loading = "lazy";
        img.src = url;

        let timeoutId: ReturnType<typeof setTimeout>;
        let settled = false;

        const settle = (success: boolean) => {
          if (settled) return;
          settled = true;
          clearTimeout(timeoutId);
          
          if (success) {
            loaded++;
            setLoadedCount(loaded);
          } else {
            failed++;
            failedUrls.push(url);
            setFailedCount(failed);
            setFailedUrls([...failedUrls]);
            console.warn(`[ScrollyCanvas] Frame ${i} failed to load: ${url}`);
          }
          
          // Check failure rate
          const total = loaded + failed;
          if (total > 0 && failed / total > MAX_FAILURE_RATE && !showFallback) {
            console.error(`[ScrollyCanvas] Failure rate exceeded ${MAX_FAILURE_RATE * 100}%. Showing fallback.`);
            setShowFallback(true);
          }
          
          setLoadedCount(loaded); // Trigger re-render for progress
        };

        img.onload = () => settle(true);
        img.onerror = () => settle(false);
        
        // Per-image timeout - treat as failure if not loaded in time
        timeoutId = setTimeout(() => {
          if (!settled) {
            console.warn(`[ScrollyCanvas] Frame ${i} timed out after ${IMAGE_TIMEOUT_MS}ms: ${url}`);
            settle(false);
          }
        }, IMAGE_TIMEOUT_MS);

        images.push(img);
      }
    };

    const loadInitial = async () => {
      // Load first chunk with timeout per image
      loadChunk(1, INITIAL_LOAD);
      imagesRef.current = images;

      // Load remaining chunks with requestIdleCallback
      let chunk = 1;
      const loadNextChunk = () => {
        const start = INITIAL_LOAD + (chunk - 1) * CHUNK_SIZE + 1;
        const end = Math.min(start + CHUNK_SIZE - 1, TOTAL_FRAMES);
        if (start <= TOTAL_FRAMES) {
          loadChunk(start, end);
          chunk++;
          if (typeof requestIdleCallback !== "undefined") {
            requestIdleCallback(loadNextChunk, { timeout: 500 });
          } else {
            setTimeout(loadNextChunk, 100);
          }
        }
      };

      if (typeof requestIdleCallback !== "undefined") {
        requestIdleCallback(loadNextChunk, { timeout: 1000 });
      } else {
        setTimeout(loadNextChunk, 200);
      }
    };

    loadInitial();

    return () => {
      imagesRef.current.forEach(img => {
        img.src = "";
        img.onload = null;
        img.onerror = null;
      });
      imagesRef.current = [];
    };
  }, []);

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
    window.addEventListener("resize", resize, { passive: true });

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

  // Show fallback if too many failures or reduced motion
  if (reducedMotion || showFallback) {
    return (
      <div
        ref={sectionRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          background: "#0D0D0D",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        <img
          src={getFrameUrl(Math.ceil(TOTAL_FRAMES / 2))}
          alt="Prerna — Artist & Creator"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            filter: "grayscale(20%) contrast(1.05) brightness(0.55)",
          }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(13,13,13,0.6) 100%)",
        }} />
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        width: "100%",
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

      {loadedCount < TOTAL_FRAMES && !showFallback && (
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

      {showFallback && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            fontFamily: "Lato, sans-serif",
            fontSize: "0.8rem",
            letterSpacing: "0.2em",
            color: "#EAFF27",
            textTransform: "uppercase",
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          <p>Unable to load animation frames.</p>
          <p style={{ fontSize: "0.7rem", marginTop: "0.5rem", opacity: 0.7 }}>
            Showing static image instead.
          </p>
        </div>
      )}
    </div>
  );
}