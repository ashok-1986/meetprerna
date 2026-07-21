"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import LineReveal from "@/components/ui/LineReveal";

const steps = [
  {
    number: "01",
    title: "The Conversation",
    subtitle: "She listens until she hears what you actually mean.",
    image: "/work/featured-tattoo.jpg",
  },
  {
    number: "02",
    title: "The Translation",
    subtitle: "Your story, drawn from scratch. Nothing borrowed.",
    image: "/hero/prerna-portrait.jpg",
  },
  {
    number: "03",
    title: "The Ritual",
    subtitle: "An hour of absolute stillness. Some people cry. That's fine.",
    image: "/work/featured-illustration.jpg",
  },
  {
    number: "04",
    title: "The Tending",
    subtitle: "She doesn't disappear when the session ends.",
    image: "/work/featured-restoration.jpg",
  },
];

const CELL_HEIGHT = "380px";

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
          marginBottom: "48px",
        }}
      >
        · The ritual, in four movements
      </motion.p>

      {/* Zigzag bento grid — image / card alternate sides each row */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {steps.map((step, i) => {
          const cardOnRight = i % 2 === 0;

          const imageCell = (
            <motion.div
              key={`image-${step.number}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "relative",
                height: CELL_HEIGHT,
                overflow: "hidden",
                borderRadius: "2px",
              }}
            >
              <Image
                src={step.image}
                alt={step.title}
                fill
                sizes="(max-width: 900px) 90vw, 33vw"
                style={{
                  objectFit: "cover",
                  objectPosition: "center top",
                  filter: "grayscale(10%) contrast(1.05) brightness(0.85)",
                }}
              />
            </motion.div>
          );

          const cardCell = (
            <motion.div
              key={`card-${step.number}`}
              onHoverStart={() => setHoveredStep(i)}
              onHoverEnd={() => setHoveredStep(null)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: CELL_HEIGHT,
                border: "1px solid rgba(253,255,233,0.12)",
                borderRadius: "2px",
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                cursor: "default",
              }}
            >
              <span
                style={{
                  fontFamily: "Lato, sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  color: "rgba(196,255,97,0.5)",
                  marginBottom: "16px",
                  display: "block",
                }}
              >
                {step.number}
              </span>

              <LineReveal
                text={step.title}
                tag="h3"
                delay={0.15}
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
            </motion.div>
          );

          return (
            <div
              key={step.number}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "24px",
              }}
              className="process-row"
            >
              {cardOnRight ? (
                <>
                  <div />
                  {imageCell}
                  {cardCell}
                </>
              ) : (
                <>
                  {cardCell}
                  {imageCell}
                  <div />
                </>
              )}
            </div>
          );
        })}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 900px) {
              .process-row {
                grid-template-columns: 1fr !important;
              }
              .process-row > div:empty {
                display: none;
              }
            }
          `,
        }}
      />
    </section>
  );
}
