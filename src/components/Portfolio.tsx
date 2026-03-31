"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Lightbox from "./Lightbox";

const CARD_COUNT = 6;
const portfolioItems = [
  { id: 1, image: "/hero/prerna-hero.jpg", style: "Blackwork", caption: "A story etched in dark lines." },
  { id: 2, image: "/hero/prerna-hero.jpg", style: "Fine Line", caption: "Delicate. Deliberate. Yours." },
  { id: 3, image: "/hero/prerna-hero.jpg", style: "Geometric", caption: "Structure found from within." },
  { id: 4, image: "/hero/prerna-hero.jpg", style: "Realism", caption: "What the eye remembers." },
  { id: 5, image: "/hero/prerna-hero.jpg", style: "Illustrative", caption: "Art that moves with you." },
  { id: 6, image: "/hero/prerna-hero.jpg", style: "Script", caption: "Words worth wearing forever." },
];

export default function Portfolio() {
  const stickyRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    image: "",
    style: "",
    caption: "",
  });

  // Motion value for horizontal position
  const x = useMotionValue(0);
  // Spring for smooth movement
  const xSpring = useSpring(x, {
    stiffness: 80,
    damping: 20,
    mass: 0.5,
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const getMaxScroll = () => {
      const vw = window.innerWidth;
      return (CARD_COUNT - 1) * (vw * 0.9 + 32);
    };

    let currentX = 0;
    let isInSection = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInSection = entry.isIntersecting &&
          entry.intersectionRatio >= 0.9;
      },
      { threshold: 0.9 }
    );
    observer.observe(section);

    const handleWheel = (e: WheelEvent) => {
      // Only act when section is 90% visible
      if (!isInSection) return;

      const maxScroll = getMaxScroll();
      const newX = currentX - e.deltaY;

      // At start boundary — let Lenis handle upward scroll
      if (newX > 0 && currentX === 0) return;

      // At end boundary — let Lenis handle downward scroll
      if (newX < -maxScroll && currentX === -maxScroll) return;

      // Clamp within bounds
      const clampedX = Math.min(0, Math.max(-maxScroll, newX));

      // Intercept — prevent Lenis from seeing this event
      e.preventDefault();
      e.stopImmediatePropagation();

      currentX = clampedX;
      x.set(currentX);

      // Update active index
      const vw = window.innerWidth;
      const cardWidth = vw * 0.9 + 32;
      const index = Math.min(
        Math.round(Math.abs(currentX) / cardWidth),
        CARD_COUNT - 1
      );
      setActiveIndex(index);
    };

    // capture: true — fires before Lenis bubble listener
    // passive: false — allows preventDefault
    window.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel, {
        capture: true,
      } as EventListenerOptions);
      observer.disconnect();
    };
  }, [x]);

  return (
    <>
      <section
        ref={sectionRef}
        style={{
          position: "relative",
          height: "100vh", // section is just viewport height
          background: "#0D0D0D",
          borderTop: "1px solid rgba(253,255,233,0.05)",
        }}
      >
        {/* Sticky container */}
        <div
          ref={stickyRef}
          // Removed data-lenis-prevent as per new architecture
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: "100%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Section label + counter */}
          <div
            style={{
              position: "absolute",
              top: "40px",
              left: "64px",
              right: "64px",
              display: "flex",
              justifyContent: "space-between",
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
              {String(activeIndex + 1).padStart(2, "0")} /
              {String(CARD_COUNT).padStart(2, "0")}
            </span>
          </div>

          {/* Horizontal track */}
          <motion.div
            style={{
              display: "flex",
              gap: "32px",
              paddingLeft: "5vw",
              paddingRight: "5vw",
              x: xSpring,
              willChange: "transform",
              alignItems: "center",
              height: "100%",
            }}
          >
            {portfolioItems.map((item, i) => (
              <div
                key={item.id}
                onClick={() =>
                  setLightbox({
                    isOpen: true,
                    image: item.image,
                    style: item.style,
                    caption: item.caption,
                  })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setLightbox({
                      isOpen: true,
                      image: item.image,
                      style: item.style,
                      caption: item.caption,
                    });
                  }
                }}
                role="button"
                tabIndex={0}
                data-cursor="hover"
                className="portfolio-card"
                style={{
                  width: "90vw",
                  minWidth: "90vw",
                  height: "90vh",
                  flexShrink: 0,
                  borderRadius: "4px",
                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                {/* Notice: since Image component syntax changes might need layout imports, using the user's explicit img here */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.caption}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    filter: "grayscale(15%) contrast(1.05)",
                    transition: "transform 0.7s ease, filter 0.5s ease",
                    display: "block",
                  }}
                />
                {/* Bottom overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "40px",
                    background:
                      "linear-gradient(to top, rgba(13,13,13,0.95), transparent)",
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
                      fontSize: "1.1rem",
                      fontStyle: "italic",
                      color: "rgba(253,255,233,0.85)",
                      margin: 0,
                    }}
                  >
                    {item.caption}
                  </p>
                </div>
              </div>
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
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  background: "#C4FF61",
                  width: `${(activeIndex / (CARD_COUNT - 1)) * 100}%`,
                  transition: "width 0.4s ease",
                }}
              />
            </div>
            <a
              href="/portfolio"
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                color: "rgba(253,255,233,0.4)",
                textDecoration: "none",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              All work →
            </a>
          </div>
        </div>
      </section>

      <Lightbox
        isOpen={lightbox.isOpen}
        onClose={() => setLightbox((p) => ({ ...p, isOpen: false }))}
        image={lightbox.image}
        style={lightbox.style}
        caption={lightbox.caption}
      />
    </>
  );
}
