"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import LineReveal from "@/components/ui/LineReveal";

export default function Statement() {
  return (
    <section style={{
      background: "#0D0D0D",
      padding: "140px 64px",
      textAlign: "center",
      borderTop: "1px solid rgba(253,255,233,0.05)",
    }}>

      {/* Section label */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        style={{
          fontFamily: "Lato, sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.25em",
          color: "#C4FF61",
          textTransform: "uppercase",
          marginBottom: "48px",
          opacity: 0.8,
        }}
      >
        · The Artist
      </motion.p>

      {/* Headline pair */}
      <LineReveal
        text="She was always an artist."
        tag="h2"
        delay={0.1}
        style={{
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: "clamp(2rem, 4.5vw, 4rem)",
          fontWeight: 700,
          color: "#FDFFE9",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          margin: "0 0 6px",
        }}
      />
      <LineReveal
        text="She just kept finding new ways to make that permanent."
        tag="h2"
        delay={0.22}
        style={{
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: "clamp(2rem, 4.5vw, 4rem)",
          fontWeight: 700,
          fontStyle: "italic",
          color: "#C4FF61",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          margin: "0 0 64px",
        }}
      />

      {/* Pull quote */}
      <motion.blockquote
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        style={{
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
          fontStyle: "italic",
          color: "rgba(253,255,233,0.3)",
          maxWidth: "580px",
          margin: "0 auto 48px",
          lineHeight: 1.6,
          border: "none",
          padding: 0,
        }}
      >
        "I don't tattoo skin. I tattoo what's underneath it."
      </motion.blockquote>

      {/* Link to Story page */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.8 }}
        viewport={{ once: true }}
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
            transition: "color 0.3s ease",
            display: "inline-block",
          }}
          onMouseEnter={e =>
            (e.currentTarget.style.color = "#C4FF61")
          }
          onMouseLeave={e =>
            (e.currentTarget.style.color = "rgba(253,255,233,0.35)")
          }
        >
          Her full story →
        </Link>
      </motion.div>

    </section>
  );
}
