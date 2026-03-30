"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

export default function HeroZoom() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Track scroll progress for indicator fade
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress.current = latest;
  });

  // Clamp scrollYProgress to prevent values > 1.0 causing snap-back
  const clampedProgress = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });

  // Scale: 1x at top → 3.5x at bottom, extended to 1.05 to absorb scroll overshoot
  const scale = useTransform(clampedProgress, [0, 1.05], [1, 3.5]);

  // Text overlay: fully visible until 40%, faded by 55%, held at 0 through 1.05
  const textOpacity = useTransform(clampedProgress, [0, 0.4, 0.55, 1.05], [1, 1, 0, 0]);
  const textY = useTransform(clampedProgress, [0, 0.55, 1.05], [0, -30, -30]);

  // Dark vignette: reaches FULL opacity by 95% so hero bleeds seamlessly into about
  const vignetteOpacity = useTransform(clampedProgress, [0, 0.5, 0.95, 1.05], [0, 0.3, 1, 1]);

  // Scroll indicator opacity: fades out by 10% scroll
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

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

        {/* Dark vignette overlay — fades in as zoom progresses, reaches FULL black */}
        <motion.div
          className="absolute inset-0 bg-[#1A1A1A] pointer-events-none"
          style={{ opacity: vignetteOpacity }}
        />

        {/* Text overlay — editorial headline layout */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 px-6"
          style={{
            opacity: textOpacity,
            y: textY,
          }}
        >
          {/* H1 — Brand name */}
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

          {/* Editorial headline — two lines, Times New Roman italic */}
          <div
            className="text-center"
            style={{
              color: "#FDFFE9",
              fontFamily: "'Times New Roman', Times, serif",
              fontStyle: "italic",
              fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
              lineHeight: 1.4,
              fontWeight: 400,
            }}
          >
            Ink drawn from<br />the inside out.
          </div>

          {/* Thin horizontal rule */}
          <hr
            style={{
              width: "80px",
              border: "none",
              borderTop: "1px solid #C4FF61",
              margin: "0",
            }}
          />

          {/* Subtext — Lato, lime green */}
          <p
            className="text-center"
            style={{
              color: "#C4FF61",
              fontFamily: "'Lato', sans-serif",
              fontSize: "0.875rem",
              fontWeight: 400,
              letterSpacing: "0.08em",
              lineHeight: 1.6,
            }}
          >
            Every mark she makes began as something she lived through first.
          </p>
        </motion.div>

        {/* Scroll indicator — fades out by 10% scroll */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-[40px] left-1/2 -translate-x-1/2 z-10 pointer-events-none"
        >
          <div className="flex flex-col items-center gap-3">
            {/* SCROLL text */}
            <span
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.65rem",
                color: "#C4FF61",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                opacity: 0.7,
              }}
            >
              Scroll
            </span>
            {/* Animated bouncing line with dot */}
            <div className="relative w-[2px] h-[40px] bg-[#C4FF61]">
              <motion.div
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: [0, 12, 0], opacity: [1, 1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[6px] h-[6px] bg-[#C4FF61] rounded-full"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
