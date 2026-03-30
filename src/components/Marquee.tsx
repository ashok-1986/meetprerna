"use client";

import Image from "next/image";

const PLACEHOLDER = "/hero/prerna-hero.jpg";

const portfolioImages = Array(8).fill({
  src: PLACEHOLDER,
  alt: "Prerna tattoo work",
});

export default function Marquee() {
  return (
    <section
      style={{
        background: "#111111",
        padding: "0",
        overflow: "hidden",
        borderTop: "1px solid rgba(253,255,233,0.05)",
        borderBottom: "1px solid rgba(253,255,233,0.05)",
      }}
    >
      {/* Top label row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "32px 64px",
          borderBottom: "1px solid rgba(253,255,233,0.05)",
        }}
      >
        <span
          style={{
            fontFamily: "Lato, sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            color: "rgba(253,255,233,0.35)",
            textTransform: "uppercase",
          }}
        >
          · Selected Work
        </span>
        <span
          style={{
            fontFamily: "Lato, sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            color: "rgba(253,255,233,0.35)",
            textTransform: "uppercase",
          }}
        >
          Custom Tattoos · Mumbai
        </span>
      </div>

      {/* Scrolling track */}
      <div
        className="marquee-track"
        style={{
          display: "flex",
          gap: "16px",
          padding: "24px 0",
          width: "max-content",
          animation: "marqueeScroll 35s linear infinite",
        }}
      >
        {[...portfolioImages, ...portfolioImages].map((img, i) => (
          <div
            key={i}
            className="marquee-card"
            style={{
              width: "260px",
              height: "360px",
              flexShrink: 0,
              borderRadius: "3px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              style={{
                filter: "grayscale(20%) contrast(1.05)",
                transition: "filter 0.5s ease, transform 0.5s ease",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
