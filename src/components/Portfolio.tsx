"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "./Lightbox";

const PLACEHOLDER = "/hero/prerna-hero.jpg";

const portfolioItems = [
  { id: 1, image: PLACEHOLDER, style: "Blackwork", caption: "A story etched in dark lines." },
  { id: 2, image: PLACEHOLDER, style: "Fine Line", caption: "Delicate. Deliberate. Yours." },
  { id: 3, image: PLACEHOLDER, style: "Geometric", caption: "Structure found from within." },
  { id: 4, image: PLACEHOLDER, style: "Realism", caption: "What the eye remembers." },
  { id: 5, image: PLACEHOLDER, style: "Illustrative", caption: "Art that moves with you." },
  { id: 6, image: PLACEHOLDER, style: "Script", caption: "Words worth wearing forever." },
];

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    image: string;
    style: string;
    caption: string;
  }>({ isOpen: false, image: "", style: "", caption: "" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Horizontal scroll: map vertical scroll to horizontal movement
  // For 6 cards at 90vw + 32px gap each
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(portfolioItems.length - 1) * 92}vw`]
  );

  // Update active card based on scroll position
  scrollYProgress.on("change", (latest) => {
    setActiveCard(Math.round(latest * (portfolioItems.length - 1)));
  });

  return (
    <>
      <section
        ref={containerRef}
        style={{ height: "600vh", position: "relative" }}
      >
        {/* Sticky viewport */}
        <div
          data-lenis-prevent
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            background: "#0D0D0D",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Section header */}
          <div
            style={{
              position: "absolute",
              top: "40px",
              left: "64px",
              right: "64px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            <span
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                color: "#C4FF61",
                textTransform: "uppercase",
              }}
            >
              · Featured Work
            </span>
            <span
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                color: "rgba(253,255,233,0.3)",
              }}
            >
              {String(activeCard + 1).padStart(2, "0")} /{" "}
              {String(portfolioItems.length).padStart(2, "0")}
            </span>
          </div>

          {/* Horizontal track */}
          <motion.div
            style={{
              display: "flex",
              gap: "32px",
              paddingLeft: "5vw",
              x,
              willChange: "transform",
              alignItems: "center",
            }}
          >
            {portfolioItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true }}
                className="portfolio-card"
                onClick={() =>
                  setLightbox({
                    isOpen: true,
                    image: item.image,
                    style: item.style,
                    caption: item.caption,
                  })
                }
                data-cursor="hover"
                style={{
                  width: "90vw",
                  height: "90vh",
                  flexShrink: 0,
                  borderRadius: "4px",
                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  className="object-cover"
                  style={{
                    transition: "transform 0.7s ease",
                    filter: "grayscale(10%) contrast(1.05)",
                  }}
                />

                {/* Bottom overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "32px",
                    background:
                      "linear-gradient(to top, rgba(13,13,13,0.95) 0%, transparent 100%)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Lato, sans-serif",
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      color: "#C4FF61",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    {item.style}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Times New Roman', serif",
                      fontSize: "1.05rem",
                      fontStyle: "italic",
                      color: "rgba(253,255,233,0.85)",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Progress bar */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              left: "64px",
              right: "64px",
              display: "flex",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "rgba(253,255,233,0.08)",
                position: "relative",
                overflow: "hidden",
                borderRadius: "1px",
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  background: "#C4FF61",
                  scaleX: scrollYProgress,
                  transformOrigin: "left",
                }}
              />
            </div>
            <Link
              href="/portfolio"
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                color: "rgba(253,255,233,0.4)",
                textDecoration: "none",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                transition: "color 0.3s",
              }}
            >
              All work →
            </Link>
          </div>
        </div>
      </section>

      <Lightbox
        isOpen={lightbox.isOpen}
        onClose={() => setLightbox((prev) => ({ ...prev, isOpen: false }))}
        image={lightbox.image}
        style={lightbox.style}
        caption={lightbox.caption}
      />
    </>
  );
}
