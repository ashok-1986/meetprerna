"use client";

import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 80 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
  viewport: { once: true, margin: "-100px" },
};

export default function About() {
  return (
    <section id="about" className="relative bg-[#1A1A1A]">
      <div
        className="max-w-[900px] mx-auto px-6"
        style={{ paddingTop: "120px", paddingBottom: "120px" }}
      >
        {/* Headline — two lines with staggered animation */}
        <motion.div
          initial={fadeInUp.initial}
          whileInView={fadeInUp.whileInView}
          transition={{ ...fadeInUp.transition, delay: 0 }}
          className="text-center space-y-4"
        >
          <h2
            className="text-[#FDFFE9]"
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 500,
              lineHeight: 1.2,
            }}
          >
            She didn&apos;t plan to become a tattoo artist.
          </h2>
          <h2
            className="text-[#C4FF61]"
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 500,
              fontStyle: "italic",
              lineHeight: 1.2,
            }}
          >
            She became one anyway.
          </h2>
        </motion.div>

        {/* Horizontal rule */}
        <motion.hr
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ ...fadeInUp.transition, delay: 0.3, scaleX: { duration: 0.6 } }}
          viewport={fadeInUp.viewport}
          style={{
            width: "60px",
            border: "none",
            borderTop: "1px solid #C4FF61",
            margin: "40px auto",
          }}
        />

        {/* Body text — centred editorial layout */}
        <motion.div
          initial={fadeInUp.initial}
          whileInView={fadeInUp.whileInView}
          transition={{ ...fadeInUp.transition, delay: 0.45 }}
          viewport={fadeInUp.viewport}
          className="max-w-[580px] mx-auto space-y-6 text-center"
        >
          <p
            className="text-[#FDFFE9]/80"
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "1.125rem",
              lineHeight: 1.8,
            }}
          >
            Prerna grew up making things with her hands — sketching at margins,
            filling notebooks, watching the world like it owed her an explanation.
          </p>

          <p
            className="text-[#FDFFE9]/80"
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "1.125rem",
              lineHeight: 1.8,
            }}
          >
            She left familiar ground to follow something she couldn&apos;t name yet.
            What she found was a needle, ink, and the realisation that the body
            is the oldest canvas there is.
          </p>

          <p
            className="text-[#FDFFE9]/80"
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "1.125rem",
              lineHeight: 1.8,
            }}
          >
            Her practice is rooted in stillness. Every consultation begins with
            listening — not to what you want, but to what you&apos;re carrying.
            The design comes after. The meaning was always already there.
          </p>
        </motion.div>

        {/* Pull quote — Times New Roman italic, no quotation marks */}
        <motion.blockquote
          initial={fadeInUp.initial}
          whileInView={fadeInUp.whileInView}
          transition={{ ...fadeInUp.transition, delay: 0.7 }}
          viewport={fadeInUp.viewport}
          className="max-w-[700px] mx-auto mt-[60px] px-6 text-center"
          style={{
            color: "#FDFFE9",
            fontFamily: "'Times New Roman', Times, serif",
            fontStyle: "italic",
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            lineHeight: 1.4,
          }}
        >
          I don&apos;t tattoo skin.
          <br />
          I tattoo what&apos;s underneath it.
        </motion.blockquote>
      </div>
    </section>
  );
}
