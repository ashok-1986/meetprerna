"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

const TOTAL_FRAMES = 190;
const FRAME_BASE_URL = "https://rbbxjambmvhupuwegwls.supabase.co/storage/v1/object/public/meetprerna";
const INITIAL_LOAD = 20;
const CHUNK_SIZE = 30;
const IMAGE_TIMEOUT_MS = 8000;
const MAX_FAILURE_RATE = 0.15;
const CONCURRENCY = 12;
const MAX_RETRIES = 1;

function getFrameUrl(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `${FRAME_BASE_URL}/frame_${padded}_delay-0.041s.webp`;
}

function loadImageWithTimeout(
  url: string,
  timeoutMs: number
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    let settled = false;

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      img.src = "";
      reject(new Error(`timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    img.onload = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(img);
    };

    img.onerror = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      reject(new Error("failed to load"));
    };

    img.src = url;
  });
}

async function loadFrameWithRetry(
  index: number,
  url: string,
  timeoutMs: number,
  maxRetries: number,
  onFrameFailed?: (index: number, url: string, reason: string) => void
): Promise<{ index: number; status: "success" | "failed"; image?: HTMLImageElement }> {
  let lastError: string = "unknown";

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const image = await loadImageWithTimeout(url, IMAGE_TIMEOUT_MS);
      return { index, status: "success", image };
    } catch (err) {
      lastError = err instanceof Error ? err.message : "unknown error";
      if (attempt === MAX_RETRIES) {
        console.warn(`[ScrollyCanvas] Frame ${index} failed after ${MAX_RETRIES + 1} attempts: ${url} - ${lastError}`);
      }
    }
  }

  return { index, status: "failed" };
}

async function preloadFrames(
  urls: string[],
  {
    concurrency = CONCURRENCY,
    timeoutMs = IMAGE_TIMEOUT_MS,
    maxRetries = MAX_RETRIES,
    failureThreshold = MAX_FAILURE_RATE,
    onProgress,
    onFrameFailed,
  }: {
    concurrency?: number;
    timeoutMs?: number;
    maxRetries?: number;
    failureThreshold?: number;
    onProgress?: (loaded: number, total: number) => void;
    onFrameFailed?: (index: number, url: string, reason: string) => void;
  } = {}
): Promise<{
  images: (HTMLImageElement | null)[];
  failedCount: number;
  fallback: boolean;
}> {
  const total = urls.length;
  const images: (HTMLImageElement | null)[] = new Array(total).fill(null);
  let loadedCount = 0;
  let failedCount = 0;

  for (let start = 0; start < total; start += concurrency) {
    const batch = urls.slice(start, start + concurrency);

    const results = await Promise.all(
      batch.map((url, i) =>
        loadFrameWithRetry(start + i, url, timeoutMs, maxRetries, onFrameFailed)
      )
    );

    for (const result of results) {
      loadedCount++;
      if (result.status === "success" && result.image) {
        images[result.index] = result.image;
      } else {
        failedCount++;
      }
      onProgress?.(loadedCount, total);
    }

    if (failedCount / total > failureThreshold) {
      break;
    }
  }

  const fallback = failedCount / total > failureThreshold;

  return { images, failedCount, fallback };
}

export default function ScrollyCanvas({ sectionRef }: { sectionRef: React.RefObject<HTMLDivElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
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
    const urls = Array.from({ length: TOTAL_FRAMES }, (_, i) => getFrameUrl(i + 1));

    preloadFrames(urls, {
      concurrency: CONCURRENCY,
      timeoutMs: IMAGE_TIMEOUT_MS,
      maxRetries: MAX_RETRIES,
      failureThreshold: MAX_FAILURE_RATE,
      onProgress: (loaded, total) => {
        setLoadedCount(loaded);
        if (loaded / total > 0.85 && !showFallback) {
          // Check failure rate implicitly via loaded count
        }
      },
      onFrameFailed: (index, url, reason) => {
        console.warn(`[ScrollyCanvas] Frame ${index + 1} failed: ${url} - ${reason}`);
      },
    }).then(({ images, failedCount, fallback }) => {
      imagesRef.current = images;
      setLoadedCount(TOTAL_FRAMES - images.filter((img) => img === null).length);
      if (fallback) {
        setShowFallback(true);
      }
    });

    return () => {
      imagesRef.current.forEach((img) => {
        if (img) {
          img.src = "";
          img.onload = null;
          img.onerror = null;
        }
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
  }, [frameIndex, showFallback]);

  if (reducedMotion || showFallback) {
    return (
      <div
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(13,13,13,0.6) 100%)",
          }}
        />
      </div>
    );
  }

  return (
    <div
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

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(13,13,13,0.6) 100%)",
          zIndex: 2,
        }}
      />

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