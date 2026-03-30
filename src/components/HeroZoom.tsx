"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function HeroZoom() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Clamp scrollYProgress to prevent values > 1.0
  const clampedProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 1],
    { clamp: true }
  );

  // ── LAYER 1: Image (slowest) — upward drift + zoom ──────────────────
  const imageScale = useTransform(clampedProgress, [0, 1.05], [1, 2.8]);
  const imageY = useTransform(clampedProgress, [0, 1], ["0%", "-15%"]);

  // ── LAYER 2: Vignette (static — no movement) ───────────────────────
  const vignetteOpacity = useTransform(
    clampedProgress,
    [0, 0.5, 0.9, 1.05],
    [0, 0.3, 1, 1]
  );

  // ── LAYER 3: Text (fastest — exits first) ──────────────────────────
  const textOpacity = useTransform(clampedProgress, [0, 0.3, 0.45, 1.05], [1, 1, 0, 0]);
  const textY = useTransform(clampedProgress, [0, 0.45, 1.05], ["0%", "-8%", "-8%"]);

  // ── Scroll indicator ───────────────────────────────────────────────
  const scrollIndicatorOpacity = useTransform(
    clampedProgress,
    [0, 0.06, 0.08],
    [1, 1, 0]
  );

  return (
    <section
      ref={containerRef}
      style={{ height: "300vh", position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          background: "#0D0D0D",
        }}
      >
        {/* ── LAYER 1: Image (slowest) ── */}
        <motion.div
          style={{
            position: "absolute",
            inset: "-20% 0",
            scale: imageScale,
            y: imageY,
            transformOrigin: "50% 30%",
            willChange: "transform",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <Image
            src="/hero/prerna-hero.jpg"
            alt="Prerna — Custom Tattoo Artist Mumbai"
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center top",
              filter: "grayscale(15%) contrast(1.1) brightness(0.7)",
            }}
          />
        </motion.div>

        {/* ── LAYER 2: Atmospheric vignettes (static) ── */}
        {/* Top vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none" as const,
            zIndex: 2,
            background:
              "linear-gradient(to bottom, rgba(13,13,13,0.75) 0%, transparent 30%)",
          }}
        />
        {/* Bottom vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none" as const,
            zIndex: 2,
            background:
              "linear-gradient(to top, rgba(13,13,13,0.95) 0%, transparent 45%)",
          }}
        />
        {/* Radial edge vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none" as const,
            zIndex: 2,
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(13,13,13,0.65) 100%)",
          }}
        />

        {/* ── SCROLL-LINKED vignette (goes to full black) ── */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none" as const,
            background: "#0D0D0D",
            opacity: vignetteOpacity,
            zIndex: 3,
          }}
        />

        {/* ── LAYER 3: Text (fastest — exits first) ── */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: textOpacity,
            y: textY,
            willChange: "transform, opacity",
          }}
        >
          {/* City label */}
          <p
            style={{
              fontFamily: "Lato, sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              color: "#C4FF61",
              opacity: 0.7,
              marginBottom: "32px",
              textTransform: "uppercase",
            }}
          >
            Mumbai · Tattoo Artist
          </p>

          {/* H1 line 1 */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: "clamp(4.5rem, 11vw, 10rem)",
              fontWeight: 700,
              color: "rgba(253,255,233,0.85)",
              lineHeight: 0.88,
              letterSpacing: "-0.03em",
              margin: 0,
              textAlign: "center" as const,
            }}
          >
            meet
          </motion.h1>

          {/* H1 line 2 — offset right */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: "clamp(4.5rem, 11vw, 10rem)",
              fontWeight: 700,
              color: "rgba(253,255,233,0.85)",
              lineHeight: 0.88,
              letterSpacing: "-0.03em",
              marginLeft: "clamp(2rem, 5vw, 6rem)",
              textAlign: "center" as const,
            }}
          >
            prerna
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.5 }}
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: "clamp(0.9rem, 1.5vw, 1.3rem)",
              fontStyle: "italic",
              color: "rgba(253,255,233,0.4)",
              marginTop: "40px",
              letterSpacing: "0.02em",
              textAlign: "center" as const,
            }}
          >
            Ink drawn from the inside out.
          </motion.p>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "64px",
            zIndex: 10,
            opacity: scrollIndicatorOpacity,
          }}
        >
          <p
            style={{
              fontFamily: "Lato",
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              color: "rgba(253,255,233,0.4)",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            + Scroll down
          </p>
        </motion.div>

        {/* ── Om symbol ── */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            fontFamily: "'Times New Roman', serif",
            fontSize: "1.4rem",
            color: "rgba(196,255,97,0.15)",
            userSelect: "none" as const,
            pointerEvents: "none" as const,
          }}
        >
          ॐ
        </div>

        {/* ── Grain overlay (topmost, z-index 20) ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            pointerEvents: "none" as const,
            opacity: 0.04,
            mixBlendMode: "overlay" as const,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </section>
  );
}
