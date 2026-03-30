"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Consult",
    subtitle: "We begin with your story, not your reference image.",
    description:
      "Before any design happens, Prerna listens. What brought you here. What you're ready to wear permanently. What you've been carrying that deserves a shape.",
  },
  {
    number: "02",
    title: "Design",
    subtitle: "The sketch comes from you, not Pinterest.",
    description:
      "Every design is drawn from scratch. No templates. No recycled motifs. What emerges is yours alone — refined until it feels inevitable.",
  },
  {
    number: "03",
    title: "Ink",
    subtitle: "This part asks you to be still. So does meditation.",
    description:
      "In a clean, calm studio environment, the design becomes permanent. Prerna works with precision and patience. The process is part of the ritual.",
  },
  {
    number: "04",
    title: "Aftercare",
    subtitle: "The work doesn't end when the needle does.",
    description:
      "Healing is tended to with the same care as the design. You leave with guidance, a follow-up check-in, and a piece that ages with character.",
  },
];

export default function Process() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section
      style={{
        background: "#111111",
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
        · How it works
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
            gridTemplateColumns: "64px 1fr 1fr",
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
            <h3
              style={{
                fontFamily: "'Times New Roman', serif",
                fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                fontWeight: 700,
                color: hoveredStep === i ? "#C4FF61" : "#FDFFE9",
                margin: "0 0 12px 0",
                lineHeight: 1.1,
                transition: "color 0.3s",
              }}
            >
              {step.title}
            </h3>
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

          {/* Description */}
          <p
            style={{
              fontFamily: "Lato, sans-serif",
              fontSize: "0.9rem",
              lineHeight: 1.75,
              color: "rgba(253,255,233,0.5)",
              maxWidth: "400px",
              margin: "4px 0 0 auto",
            }}
          >
            {step.description}
          </p>
        </motion.div>
      ))}

      {/* Bottom border */}
      <div
        style={{ borderBottom: "1px solid rgba(253,255,233,0.07)" }}
      />
    </section>
  );
}
