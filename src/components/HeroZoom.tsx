"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";

export default function HeroZoom() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const prefersReducedMotion = useReducedMotion();

  // Zoom scale: 1 → 3.5
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 3.5]
  );

  // Vignette opacity: 0 → 1 between scroll 0.3 and 0.85
  const vignetteOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.85],
    [0, 1]
  );

  // Text fade out: 1 → 0 between scroll 0 and 0.35
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.35],
    [1, 0]
  );

  if (prefersReducedMotion) {
    return (
      <section ref={containerRef} className="relative h-screen w-full bg-[#1A1A1A]">
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src="/hero/prerna-hero.png"
            alt="Prerna - Custom Tattoo Artist"
            fill
            className="object-cover"
            priority
            style={{ transformOrigin: "40% 65%" }}
          />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#1A1A1A]">
        {/* Zoom Image */}
        <motion.div
          style={{
            scale,
            transformOrigin: "40% 65%",
            willChange: "transform",
          }}
          className="absolute inset-0"
        >
          <Image
            src="/hero/prerna-hero.png"
            alt="Prerna - Custom Tattoo Artist"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Vignette Overlay */}
        <motion.div
          style={{ opacity: vignetteOpacity }}
          className="absolute inset-0 bg-[#1A1A1A] pointer-events-none"
        />

        {/* Text Overlay */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#FDFFE9] mb-4">
            meet prerna
          </h1>
          <p className="font-lato text-lg md:text-xl lg:text-2xl text-[#C4FF61]">
            Ink that resonates
          </p>
        </motion.div>
      </div>
    </section>
  );
}
