"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const sections = [
  {
    progress: 0,
    align: "center",
    className: "text-center",
    children: (
      <p style={{
        fontFamily: "Lato, sans-serif",
        fontSize: "clamp(0.6rem, 1.2vw, 0.8rem)",
        letterSpacing: "0.3em",
        color: "#C4FF61",
        textTransform: "uppercase",
        opacity: 0.7,
        marginBottom: "2rem",
      }}>
        Navi Mumbai · Mumbai · Artist & Creator · Skin Illustrator
      </p>
    ),
  },
  {
    progress: 0.3,
    align: "left",
    className: "text-left max-w-2xl",
    children: (
      <>
        <motion.h1
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 500,
            color: "rgba(253,255,233,0.95)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            margin: "0 0 1.5rem",
          }}
        >
          She carries no studio.
        </motion.h1>
        <motion.h1
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 500,
            fontStyle: "italic",
            color: "#C4FF61",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          Only a needle and everything she knows.
        </motion.h1>
      </>
    ),
  },
  {
    progress: 0.6,
    align: "left",
    className: "text-left max-w-xl",
    children: (
      <motion.p
        style={{
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: "clamp(1rem, 2vw, 1.3rem)",
          fontStyle: "italic",
          color: "rgba(253,255,233,0.6)",
          lineHeight: 1.6,
          letterSpacing: "0.01em",
          margin: 0,
        }}
      >
        Every city. Every skin. Every story — permanent.
      </motion.p>
    ),
  },
  {
    progress: 0.8,
    align: "right",
    className: "text-right max-w-md",
    children: (
      <motion.a
        href="https://meetprerna.fillout.com/book"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          fontFamily: "Lato, sans-serif",
          fontWeight: 700,
          fontSize: "0.72rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#1A1A1A",
          background: "#C4FF61",
          padding: "14px 32px",
          borderRadius: "100px",
          textDecoration: "none",
          transition: "background 0.3s ease, transform 0.2s ease",
        }}
        data-cursor="book"
        whileHover={{ background: "#EAFF27", scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Start your journey
      </motion.a>
    ),
  },
];

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "350vh",
        pointerEvents: "none",
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 64px",
      }}
    >
      {sections.map((section, i) => {
        const prevProgress = i > 0 ? sections[i - 1].progress : 0;
        const nextProgress = i < sections.length - 1 ? sections[i + 1].progress : 1;
        const startFade = prevProgress + (section.progress - prevProgress) * 0.3;
        const endFade = section.progress + (nextProgress - section.progress) * 0.3;

        const opacity = useTransform(scrollYProgress, [startFade, section.progress, endFade], [0, 1, 0]);
        const y = useTransform(scrollYProgress, [startFade, section.progress, endFade], [40, 0, -40]);

        return (
          <motion.div
            key={i}
            style={{
              opacity,
              y,
              width: "100%",
              display: "flex",
              justifyContent: section.align === "center" ? "center" : section.align === "right" ? "flex-end" : "flex-start",
              paddingBottom: i < sections.length - 1 ? "120vh" : 0,
            }}
          >
            <div style={{ maxWidth: "800px" }}>
              {section.children}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}