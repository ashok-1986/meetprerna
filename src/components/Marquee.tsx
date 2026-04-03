"use client";

// Two tracks moving in OPPOSITE directions — creates depth
// Track 1: left to right (slower)
// Track 2: right to left (faster)

const TRACK_1_WORDS = [
  "ITINERANT", "·", "WITNESSED", "·", "NAVI MUMBAI", "·",
  "NOMAD", "·", "PERMANENT", "·", "FEMININE", "·",
  "ITINERANT", "·", "WITNESSED", "·", "NAVI MUMBAI", "·",
  "NOMAD", "·", "PERMANENT", "·", "FEMININE", "·",
];

const TRACK_2_WORDS = [
  "HAND-DRAWN", "·", "MEDITATION", "·", "CUSTOM", "·",
  "SPIRITUAL", "·", "BOLD", "·", "INTENTIONAL", "·",
  "HAND-DRAWN", "·", "MEDITATION", "·", "CUSTOM", "·",
  "SPIRITUAL", "·", "BOLD", "·", "INTENTIONAL", "·",
];

export default function Marquee() {
  return (
    <section style={{
      background: "#111111",
      padding: "48px 0",
      overflow: "hidden",
      borderTop: "1px solid rgba(253,255,233,0.05)",
      borderBottom: "1px solid rgba(253,255,233,0.05)",
      position: "relative",
    }}>

      {/* ── TRACK 1: moves LEFT (standard direction) ── */}
      <div className="marquee-track-1" style={{
        display: "flex",
        gap: "0",
        marginBottom: "16px",
        // CSS animation — no JS, no Lenis conflict
        animation: "marqueeLeft 25s linear infinite",
        width: "max-content",
      }}>
        {TRACK_1_WORDS.map((word, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: "clamp(1rem, 2vw, 1.4rem)",
              fontWeight: word === "·" ? 400 : 700,
              fontStyle: word === "·" ? "normal" : "italic",
              color: word === "·"
                ? "rgba(196,255,97,0.4)"       // · in lime
                : "rgba(253,255,233,0.12)",     // words very subtle
              letterSpacing: "0.15em",
              paddingRight: "32px",
              whiteSpace: "nowrap",
              textTransform: "uppercase",
              transition: "color 0.3s",
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* ── TRACK 2: moves RIGHT (reverse) ── */}
      <div className="marquee-track-2" style={{
        display: "flex",
        gap: "0",
        // Reverse direction + slightly different speed
        animation: "marqueeRight 20s linear infinite",
        width: "max-content",
      }}>
        {TRACK_2_WORDS.map((word, i) => (
          <span
            key={i}
            style={{
              fontFamily: "Lato, sans-serif",
              fontSize: "clamp(0.65rem, 1.2vw, 0.85rem)",
              fontWeight: 700,
              color: word === "·"
                ? "rgba(196,255,97,0.25)"
                : "rgba(253,255,233,0.07)",
              letterSpacing: "0.3em",
              paddingRight: "40px",
              whiteSpace: "nowrap",
              textTransform: "uppercase",
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Left + right fade masks — creates depth at edges */}
      <div style={{
        position: "absolute",
        top: 0, bottom: 0, left: 0,
        width: "120px",
        background: "linear-gradient(to right, #111111, transparent)",
        zIndex: 2,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        top: 0, bottom: 0, right: 0,
        width: "120px",
        background: "linear-gradient(to left, #111111, transparent)",
        zIndex: 2,
        pointerEvents: "none",
      }} />

    </section>
  );
}
