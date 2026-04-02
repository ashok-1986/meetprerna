"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import LineReveal from "@/components/ui/LineReveal";
import Link from "next/link";

export default function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="statement-grid"
      style={{
        background: "#0D0D0D",
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "45% 55%",
        overflow: "hidden",
        borderTop: "none", // seamless join from hero
      }}
    >
      {/* ── LEFT: Text column ── */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px 64px",
        position: "relative",
      }}>

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 0.8, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: "Lato, sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            color: "#C4FF61",
            textTransform: "uppercase",
            marginBottom: "48px",
          }}
        >
          · The Artist
        </motion.p>

        {/* Main statement */}
        <LineReveal
          text="In the space between"
          tag="h2"
          delay={0.2}
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
            fontWeight: 500,
            color: "#FDFFE9",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: "0 0 4px",
          }}
        />
        <LineReveal
          text="needle and skin,"
          tag="h2"
          delay={0.32}
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
            fontWeight: 500,
            color: "#FDFFE9",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: "0 0 4px",
          }}
        />
        <LineReveal
          text="transformation happens."
          tag="h2"
          delay={0.44}
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
            fontWeight: 500,
            fontStyle: "italic",
            color: "#C4FF61",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: "0 0 48px",
          }}
        />

        {/* Sub-text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.6 }}
          style={{
            fontFamily: "Lato, sans-serif",
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "rgba(253,255,233,0.5)",
            maxWidth: "400px",
            marginBottom: "48px",
          }}
        >
          Not just on the surface. Deep within.
          Every piece is a collaboration — a dialogue between
          artist and client, pain and beauty, memory and art.
        </motion.p>

        {/* Link to Story */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          <Link
            href="/story"
            style={{
              fontFamily: "Lato, sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              color: "rgba(253,255,233,0.35)",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "color 0.3s ease",
            }}
          >
            Her full story →
          </Link>
        </motion.div>

      </div>

      {/* ── RIGHT: Portrait image ── */}
      <motion.div
        className="statement-image"
        initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
        animate={inView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh",
        }}
      >
        <Image
          src="/hero/prerna-portrait.jpg"
          alt="Prerna — Artist & Creator"
          fill
          sizes="55vw"
          style={{
            objectFit: "cover",
            objectPosition: "center top",
            filter: "grayscale(15%) contrast(1.05) brightness(0.8)",
          }}
        />
        {/* Left edge fade — blends into text column */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(13,13,13,0.4) 0%, transparent 30%)",
          pointerEvents: "none",
        }} />
      </motion.div>

    </section>
  );
}
