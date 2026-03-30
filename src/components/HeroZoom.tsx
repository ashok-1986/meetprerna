"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

export default function HeroZoom() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Clamp scrollYProgress to prevent values > 1.0 causing snap-back
  const clampedProgress = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });

  // Scale: 1x at top → 3.5x at bottom, extended to 1.05 to absorb scroll overshoot
  const scale = useTransform(clampedProgress, [0, 1.05], [1, 3.5]);

  // Text overlay: fully visible until 40%, faded by 55%, held at 0 through 1.05
  const textOpacity = useTransform(clampedProgress, [0, 0.4, 0.55, 1.05], [1, 1, 0, 0]);
  const textY = useTransform(clampedProgress, [0, 0.55, 1.05], [0, -30, -30]);

  // Dark vignette: nearly invisible until 50%, then darkens to 85% by 90%, held through 1.05
  const vignetteOpacity = useTransform(clampedProgress, [0, 0.5, 0.9, 1.05], [0, 0.3, 0.85, 0.85]);

  return (
    // 300vh parent — creates the scroll distance
    <section ref={containerRef} className="relative h-[300vh]">

      {/* Sticky viewport-height container with GPU compositing and isolation */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden bg-[#1A1A1A]"
        style={{ transform: "translateZ(0)", isolation: "isolate" }}
      >

        {/* Zoom layer — image scales here */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{
            scale: prefersReducedMotion ? 1 : scale,
            transformOrigin: "50% 25%",
            willChange: "transform",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <Image
            src="/hero/prerna-hero.jpg"
            alt="Prerna - Custom Tattoo Artist Mumbai"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
            style={{ willChange: "transform" }}
          />
        </motion.div>

        {/* Dark vignette overlay — fades in as zoom progresses */}
        <motion.div
          className="absolute inset-0 bg-[#1A1A1A] pointer-events-none"
          style={{ opacity: vignetteOpacity }}
        />

        {/* Text overlay — fades and rises out on scroll */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-6"
          style={{
            opacity: textOpacity,
            y: textY,
          }}
        >
          <h1
            className="text-center"
            style={{
              color: "#FDFFE9",
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: "clamp(3.5rem, 8vw, 8rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            meet prerna
          </h1>
          <p
            className="text-center"
            style={{
              color: "#C4FF61",
              fontFamily: "'Lato', sans-serif",
              fontSize: "clamp(1rem, 2vw, 1.5rem)",
              fontWeight: 400,
              letterSpacing: "0.05em",
            }}
          >
            Ink that resonates
          </p>
        </motion.div>

      </div>
    </section>
  );
}
