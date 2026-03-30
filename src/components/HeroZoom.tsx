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

  // Scale: 1x at top → 3.5x at bottom of scroll zone
  const scale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [1, 3.5]);

  // Text overlay: fully visible at top, gone by 35% scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.35], [0, -40]);

  // Dark vignette: starts fading in at 30% scroll, fully black by 85%
  const vignetteOpacity = useTransform(scrollYProgress, [0.3, 0.85], [0, 1]);

  return (
    // 300vh parent — creates the scroll distance
    <section ref={containerRef} className="relative h-[300vh]">

      {/* Sticky viewport-height container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#1A1A1A]">

        {/* Zoom layer — image scales here */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{
            scale: prefersReducedMotion ? 1 : scale,
            transformOrigin: "40% 65%", // ← TATTOO ZONE: adjust these % values
          }}
        >
          <Image
            src="/hero/prerna-hero.jpg"
            alt="Prerna - Custom Tattoo Artist Mumbai"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
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
            className="text-center text-[#FDFFE9]"
            style={{
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
              fontFamily: "'Lato', sans-serif",
              fontSize: "clamp(1rem, 2vw, 1.5rem)",
              fontWeight: 400,
              color: "#C4FF61",
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
