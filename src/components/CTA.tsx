"use client";

import { motion } from "framer-motion";
import LineReveal from "@/components/ui/LineReveal";

export default function CTA() {
  return (
    <section
      style={{
        background: "#0D0D0D",
        padding: "160px 64px",
        textAlign: "center",
        borderTop: "1px solid rgba(253,255,233,0.05)",
      }}
    >
      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        style={{
          fontFamily: "Lato, sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.3em",
          color: "#C4FF61",
          textTransform: "uppercase",
          marginBottom: "48px",
          opacity: 0.8,
        }}
      >
        · Ready to wear your story?
      </motion.p>

      {/* Massive CTA headline */}
      <div style={{ margin: "0 auto 64px", maxWidth: "900px" }}>
        <LineReveal
          text="Begin the"
          tag="h2"
          delay={0}
          style={{
            fontFamily: "'Times New Roman', serif",
            fontSize: "clamp(3rem, 7vw, 7.5rem)",
            fontWeight: 700,
            color: "#FDFFE9",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
          }}
        />
        <LineReveal
          text="conversation."
          tag="h2"
          delay={0.15}
          style={{
            fontFamily: "'Times New Roman', serif",
            fontSize: "clamp(3rem, 7vw, 7.5rem)",
            fontWeight: 700,
            fontStyle: "italic",
            color: "#C4FF61",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
          }}
        />
      </div>

      {/* Body text */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        style={{
          fontFamily: "Lato, sans-serif",
          fontSize: "1rem",
          lineHeight: 1.75,
          color: "rgba(253,255,233,0.45)",
          maxWidth: "420px",
          margin: "0 auto 64px",
        }}
      >
        Prerna takes limited appointments each month. Each one begins with a
        conversation, not a price list.
      </motion.p>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Primary */}
        <a
          href="https://meetprerna.fillout.com/book"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button-primary"
          style={{
            fontFamily: "Lato, sans-serif",
            fontWeight: 700,
            fontSize: "0.75rem",
            letterSpacing: "0.12em",
            color: "#1A1A1A",
            background: "#C4FF61",
            padding: "16px 40px",
            borderRadius: "100px",
            textDecoration: "none",
            textTransform: "uppercase",
            transition: "background 0.3s, transform 0.2s",
            display: "inline-block",
          }}
        >
          Book a consultation
        </a>

        {/* Secondary */}
        <a
          href="#portfolio"
          className="cta-button-secondary"
          style={{
            fontFamily: "Lato, sans-serif",
            fontWeight: 400,
            fontSize: "0.75rem",
            letterSpacing: "0.12em",
            color: "rgba(253,255,233,0.6)",
            background: "transparent",
            padding: "16px 40px",
            borderRadius: "100px",
            border: "1px solid rgba(253,255,233,0.2)",
            textDecoration: "none",
            textTransform: "uppercase",
            transition: "border-color 0.3s, color 0.3s",
            display: "inline-block",
          }}
        >
          See the work
        </a>
      </div>
    </section>
  );
}
