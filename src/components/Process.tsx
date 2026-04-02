"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LineReveal from "@/components/ui/LineReveal";
import WordReveal from "@/components/ui/WordReveal";

const steps = [
  {
    number: "01",
    title: "The Conversation",
    subtitle: "We begin with what you're carrying, not what you want.",
  },
  {
    number: "02",
    title: "The Translation",
    subtitle: "From feeling into form. From story into shape.",
  },
  {
    number: "03",
    title: "The Ritual",
    subtitle: "The needle asks you to be still. So does meditation.",
  },
  {
    number: "04",
    title: "The Tending",
    subtitle: "The work doesn't end when the needle does.",
  },
];

export default function Process() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section
      style={{
        background: "#1A1A1A",
        padding: "120px 64px",
        borderTop: "1px solid rgba(253,255,233,0.05)",
      }}
    >
      {/* Section label */}
      <motion.p
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        style={{
          fontFamily: "Lato, sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.25em",
          color: "#C4FF61",
          textTransform: "uppercase",
          marginBottom: "80px",
        }}
      >
        · The Process
      </motion.p>

      {/* Steps list */}
      {steps.map((step, i) => (
        <motion.div
          key={step.number}
          onHoverStart={() => setHoveredStep(i)}
          onHoverEnd={() => setHoveredStep(null)}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: i * 0.12,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          viewport={{ once: true }}
          style={{
            display: "grid",
            gridTemplateColumns: "64px 1fr",
            gap: "40px",
            padding: "40px 0",
            borderTop: "1px solid rgba(253,255,233,0.07)",
            alignItems: "start",
            cursor: "default",
          }}
        >
          {/* Number */}
          <span
            style={{
              fontFamily: "Lato, sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              color: "rgba(196,255,97,0.5)",
              paddingTop: "6px",
            }}
          >
            {step.number}
          </span>

          {/* Title + subtitle */}
          <div>
            <LineReveal
              text={step.title}
              tag="h3"
              delay={i * 0.12}
              style={{
                fontFamily: "'Times New Roman', serif",
                fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                fontWeight: 500,
                color: hoveredStep === i ? "#C4FF61" : "#FDFFE9",
                margin: "0 0 12px 0",
                lineHeight: 1.1,
                transition: "color 0.3s",
              }}
            />
            <p
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: "0.85rem",
                fontStyle: "italic",
                color: "#C4FF61",
                margin: 0,
                opacity: 0.8,
              }}
            >
              {step.subtitle}
            </p>
          </div>
        </motion.div>
      ))}

      {/* Bottom border */}
      <div
        style={{ borderBottom: "1px solid rgba(253,255,233,0.07)" }}
      />
    </section >
  );
}
