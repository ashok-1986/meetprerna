"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import LineReveal from "@/components/ui/LineReveal";
import WordReveal from "@/components/ui/WordReveal";

export default function Statement() {
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInView = useInView(imageRef, { once: true, margin: "-100px" });

  return (
    <section
      style={{
        background: "#0D0D0D",
        padding: "0 64px 140px",
        margin: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Fade-in gradient at the very top of Statement */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "200px",
          background: "linear-gradient(to bottom, #0D0D0D 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* All content: position relative, zIndex 2 */}
      <div style={{ position: "relative", zIndex: 2, paddingTop: "160px" }}>
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-60px" }}
          style={{
            fontFamily: "Lato, sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            color: "#C4FF61",
            opacity: 0.8,
            textTransform: "uppercase",
            marginBottom: "64px",
          }}
        >
          · The Artist
        </motion.p>

        {/* Two-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "55% 45%",
            gap: "64px",
            alignItems: "start",
          }}
        >
          {/* LEFT — Headline */}
          <div>
            <LineReveal
              text="She didn't plan to"
              tag="h2"
              delay={0}
              style={{
                fontFamily: "'Times New Roman', serif",
                fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
                fontWeight: 700,
                color: "#FDFFE9",
                lineHeight: 1.05,
                margin: "0 0 4px 0",
              }}
            />
            <LineReveal
              text="become a tattoo artist."
              tag="h2"
              delay={0.12}
              style={{
                fontFamily: "'Times New Roman', serif",
                fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
                fontWeight: 700,
                color: "#FDFFE9",
                lineHeight: 1.05,
                margin: "0 0 4px 0",
              }}
            />
            <LineReveal
              text="She became one anyway."
              tag="h2"
              delay={0.24}
              style={{
                fontFamily: "'Times New Roman', serif",
                fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
                fontWeight: 700,
                fontStyle: "italic",
                color: "#C4FF61",
                lineHeight: 1.05,
                margin: "0 0 4px 0",
              }}
            />

            <motion.hr
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 0.6 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true }}
              style={{
                width: "48px",
                border: "none",
                borderTop: "1px solid #C4FF61",
                margin: "48px 0 0",
                transformOrigin: "left",
              }}
            />
          </div>

          {/* RIGHT — Body text */}
          <div style={{ paddingTop: "8px" }}>
            <WordReveal
              text="Prerna grew up making things with her hands — sketching at margins, filling notebooks, watching the world like it owed her an explanation."
              delay={0.35}
              stagger={0.028}
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: "1rem",
                lineHeight: 1.85,
                color: "rgba(253,255,233,0.6)",
                maxWidth: "420px",
                marginBottom: "28px",
              }}
            />
            <WordReveal
              text="She left familiar ground to follow something she couldn't name yet. What she found was a needle, ink, and the realisation that the body is the oldest canvas there is."
              delay={0.5}
              stagger={0.028}
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: "1rem",
                lineHeight: 1.85,
                color: "rgba(253,255,233,0.6)",
                maxWidth: "420px",
                marginBottom: "28px",
              }}
            />
            <WordReveal
              text="Her practice is rooted in stillness. Every consultation begins with listening — not to what you want, but to what you're carrying."
              delay={0.65}
              stagger={0.028}
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: "1rem",
                lineHeight: 1.85,
                color: "rgba(253,255,233,0.6)",
                maxWidth: "420px",
                marginBottom: "28px",
              }}
            />

            {/* Image reveal block */}
            <div ref={imageRef} style={{ marginTop: "48px" }}>
              <motion.div
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                animate={imageInView
                  ? { clipPath: "inset(0% 0% 0% 0%)" }
                  : { clipPath: "inset(100% 0% 0% 0%)" }
                }
                transition={{
                  duration: 1.2,
                  ease: [0.76, 0, 0.24, 1],
                  delay: 0.5,
                }}
                style={{
                  overflow: "hidden",
                  borderRadius: "3px",
                }}
              >
                <img
                  src="/hero/prerna-hero.jpg"
                  alt="Prerna at work"
                  style={{
                    width: "100%",
                    height: "360px",
                    objectFit: "cover",
                    objectPosition: "center top",
                    display: "block",
                    filter: "grayscale(20%) contrast(1.05)",
                  }}
                />
              </motion.div>

              {/* Caption below image */}
              <p style={{
                fontFamily: "Lato, sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                color: "rgba(253,255,233,0.25)",
                marginTop: "12px",
                textTransform: "uppercase",
              }}>
                Mumbai Studio · By appointment only
              </p>
            </div>
          </div>
        </div>

        {/* Pull quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'Times New Roman', serif",
            fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)",
            fontStyle: "italic",
            color: "rgba(253,255,233,0.3)",
            textAlign: "center",
            maxWidth: "800px",
            margin: "100px auto 0",
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
            border: "none",
            padding: 0,
          }}
        >
          &ldquo;I don&apos;t tattoo skin. I tattoo what&apos;s underneath it.&rdquo;
        </motion.blockquote>
      </div>
    </section>
  );
}
