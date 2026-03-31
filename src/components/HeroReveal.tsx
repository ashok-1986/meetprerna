"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function HeroReveal() {
    const [revealed, setRevealed] = useState(false);
    const parallaxRef = useRef<HTMLDivElement>(null);

    // Trigger reveal after mount (slight delay for drama)
    useEffect(() => {
        const timer = setTimeout(() => setRevealed(true), 200);
        return () => clearTimeout(timer);
    }, []);

    // CSS parallax — runs outside Framer Motion, no useScroll
    useEffect(() => {
        const handleScroll = () => {
            if (!parallaxRef.current) return;
            const scrolled = window.scrollY;
            // Image moves at 40% of scroll speed — creates depth
            parallaxRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        // Hero is 100vh — no sticky scroll zone
        // Lenis scrolls PAST this section naturally
        <section
            style={{
                position: "relative",
                height: "100vh",
                overflow: "hidden",
                background: "#0D0D0D",
            }}
        >
            {/* ── IMAGE LAYER — clip-path reveal ── */}
            <motion.div
                initial={{ clipPath: "inset(45% 0% 45% 0%)" }}
                animate={revealed
                    ? { clipPath: "inset(0% 0% 0% 0%)" }
                    : { clipPath: "inset(45% 0% 45% 0%)" }
                }
                transition={{
                    duration: 1.6,
                    ease: [0.76, 0, 0.24, 1],  // expo-in-out — dramatic
                }}
                style={{
                    position: "absolute",
                    inset: "-20% 0",  // oversized for parallax room
                    zIndex: 1,
                }}
            >
                {/* Parallax wrapper — moves independently of clip */}
                <div
                    ref={parallaxRef}
                    style={{
                        position: "absolute",
                        inset: 0,
                        willChange: "transform",
                    }}
                >
                    <img
                        src="/hero/prerna-hero.jpg"
                        alt="Prerna — Custom Tattoo Artist Mumbai"
                        style={{
                            width: "100%",
                            height: "130%",  // extra height absorbs parallax travel
                            objectFit: "cover",
                            objectPosition: "center top",
                            filter: "grayscale(15%) contrast(1.1) brightness(0.65)",
                            display: "block",
                        }}
                    />
                </div>
            </motion.div>

            {/* ── ATMOSPHERIC VIGNETTES (CSS only — no scroll) ── */}
            {/* Top */}
            <div style={{
                position: "absolute", inset: 0, zIndex: 2,
                pointerEvents: "none",
                background: "linear-gradient(to bottom, rgba(13,13,13,0.8) 0%, transparent 25%)",
            }} />
            {/* Bottom */}
            <div style={{
                position: "absolute", inset: 0, zIndex: 2,
                pointerEvents: "none",
                background: "linear-gradient(to top, rgba(13,13,13,1) 0%, rgba(13,13,13,0.6) 30%, transparent 60%)",
            }} />
            {/* Radial */}
            <div style={{
                position: "absolute", inset: 0, zIndex: 2,
                pointerEvents: "none",
                background: "radial-gradient(ellipse at center, transparent 30%, rgba(13,13,13,0.5) 100%)",
            }} />

            {/* ── GRAIN OVERLAY ── */}
            <div style={{
                position: "absolute", inset: 0, zIndex: 3,
                pointerEvents: "none",
                opacity: 0.04,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }} />

            {/* ── TEXT LAYER — staggered entrance, no scroll ── */}
            <div style={{
                position: "absolute", inset: 0, zIndex: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "80px",  // navbar offset
            }}>
                {/* City label */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 0.7, y: 0 }}
                    transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontFamily: "Lato, sans-serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.3em",
                        color: "#C4FF61",
                        textTransform: "uppercase",
                        marginBottom: "32px",
                    }}
                >
                    Mumbai · Tattoo Artist
                </motion.p>

                <h1 style={{ margin: 0, padding: 0 }}>
                    {/* H1 "meet" */}
                    <div style={{ overflow: "hidden" }}>
                        <motion.span
                            initial={{ y: "110%" }}
                            animate={{ y: "0%" }}
                            transition={{
                                delay: 0.5,
                                duration: 1.2,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{
                                fontFamily: "'Times New Roman', Times, serif",
                                fontSize: "clamp(4.5rem, 11vw, 10rem)",
                                fontWeight: 700,
                                color: "rgba(253,255,233,0.85)",
                                lineHeight: 0.88,
                                letterSpacing: "-0.03em",
                                margin: 0,
                                display: "block",
                            }}
                        >
                            meet
                        </motion.span>
                    </div>

                    {/* H1 "prerna" — offset right */}
                    <div style={{ overflow: "hidden" }}>
                        <motion.span
                            initial={{ y: "110%" }}
                            animate={{ y: "0%" }}
                            transition={{
                                delay: 0.65,
                                duration: 1.2,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{
                                fontFamily: "'Times New Roman', Times, serif",
                                fontSize: "clamp(4.5rem, 11vw, 10rem)",
                                fontWeight: 700,
                                color: "rgba(253,255,233,0.85)",
                                lineHeight: 0.88,
                                letterSpacing: "-0.03em",
                                marginLeft: "clamp(2rem, 5vw, 6rem)",
                                marginRight: 0,
                                marginTop: 0,
                                marginBottom: 0,
                                display: "block",
                            }}
                        >
                            prerna
                        </motion.span>
                    </div>
                </h1>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 1.5 }}
                    style={{
                        fontFamily: "'Times New Roman', Times, serif",
                        fontSize: "clamp(0.9rem, 1.5vw, 1.3rem)",
                        fontStyle: "italic",
                        color: "rgba(253,255,233,0.4)",
                        marginTop: "40px",
                        letterSpacing: "0.02em",
                        textAlign: "center",
                    }}
                >
                    Ink drawn from the inside out.
                </motion.p>
            </div>

            {/* ── SCROLL INDICATOR ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                style={{
                    position: "absolute",
                    bottom: "40px",
                    left: "64px",
                    zIndex: 10,
                }}
            >
                <p style={{
                    fontFamily: "Lato, sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.25em",
                    color: "rgba(253,255,233,0.35)",
                    textTransform: "uppercase",
                    margin: 0,
                }}>
                    + Scroll down
                </p>
            </motion.div>

            {/* ── OM SYMBOL ── */}
            <div style={{
                position: "absolute",
                bottom: "24px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 10,
                fontFamily: "'Times New Roman', serif",
                fontSize: "1.4rem",
                color: "rgba(196,255,97,0.15)",
                userSelect: "none",
                pointerEvents: "none",
            }}>
                ॐ
            </div>

        </section>
    );
}
