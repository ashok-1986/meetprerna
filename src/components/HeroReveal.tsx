"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroReveal() {
    const [revealed, setRevealed] = useState(false);
    const parallaxRef = useRef<HTMLDivElement>(null);

    // Clip-path reveal on load
    useEffect(() => {
        const timer = setTimeout(() => setRevealed(true), 200);
        return () => clearTimeout(timer);
    }, []);

    // CSS parallax — passive scroll listener, no Framer Motion scroll hooks
    useEffect(() => {
        const handleScroll = () => {
            if (!parallaxRef.current) return;
            parallaxRef.current.style.transform =
                `translateY(${window.scrollY * 0.25}px)`;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section
            style={{
                position: "relative",
                height: "100vh",
                overflow: "hidden",
                background: "#0D0D0D",
            }}
        >
            {/* ── FULL BLEED PORTRAIT IMAGE ── */}
            <motion.div
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                animate={revealed
                    ? { clipPath: "inset(0% 0% 0% 0%)" }
                    : { clipPath: "inset(100% 0% 0% 0%)" }
                }
                transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
                style={{
                    position: "absolute",
                    inset: "-15% 0",
                    zIndex: 1,
                }}
            >
                <div ref={parallaxRef} style={{ position: "absolute", inset: 0 }}>
                    <Image
                        src="/hero/prerna-hero.jpg"
                        alt="Prerna — Artist & Creator"
                        fill
                        priority
                        sizes="100vw"
                        style={{
                            objectFit: "cover",
                            objectPosition: "center top",
                            // Dark treatment — text must be legible over image
                            filter: "grayscale(20%) contrast(1.05) brightness(0.55)",
                        }}
                    />
                </div>
            </motion.div>

            {/* ── GRADIENT OVERLAYS — ensures text legibility ── */}
            {/* Left gradient — text lives here */}
            <div style={{
                position: "absolute", inset: 0, zIndex: 2,
                pointerEvents: "none",
                background: "linear-gradient(to right, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.4) 50%, transparent 100%)",
            }} />
            {/* Bottom gradient */}
            <div style={{
                position: "absolute", inset: 0, zIndex: 2,
                pointerEvents: "none",
                background: "linear-gradient(to top, rgba(13,13,13,0.9) 0%, transparent 50%)",
            }} />
            {/* Top gradient — behind navbar */}
            <div style={{
                position: "absolute", inset: 0, zIndex: 2,
                pointerEvents: "none",
                background: "linear-gradient(to bottom, rgba(13,13,13,0.6) 0%, transparent 25%)",
            }} />

            {/* ── GRAIN OVERLAY ── */}
            <div style={{
                position: "absolute", inset: 0, zIndex: 3,
                pointerEvents: "none",
                opacity: 0.04,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }} />

            {/* ── TEXT OVERLAY — bottom left, Ashfall style ── */}
            <div style={{
                position: "absolute",
                bottom: "80px",
                left: "64px",
                right: "40%", // text stays in left 60%
                zIndex: 10,
            }}>

                {/* City / title label */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 0.7, y: 0 }}
                    transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontFamily: "Lato, sans-serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.3em",
                        color: "#C4FF61",
                        textTransform: "uppercase",
                        marginBottom: "24px",
                        display: "block",
                    }}
                >
                    Navi Mumbai · Mumbai · Artist & Creator · Itinerant
                </motion.p>

                {/* Main tagline — NOT the brand name */}
                {/* Brand name is in the logo. Hero carries the idea. */}
                <div style={{ overflow: "hidden", marginBottom: "8px" }}>
                    <motion.h1
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            fontFamily: "'Times New Roman', Times, serif",
                            fontSize: "clamp(3rem, 6vw, 5.5rem)",
                            fontWeight: 500,
                            color: "rgba(253,255,233,0.92)",
                            lineHeight: 1.0,
                            letterSpacing: "-0.02em",
                            margin: 0,
                        }}
                    >
                        She carries no studio.
                    </motion.h1>
                </div>

                <div style={{ overflow: "hidden", marginBottom: "8px" }}>
                    <motion.h1
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{ delay: 0.65, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            fontFamily: "'Times New Roman', Times, serif",
                            fontSize: "clamp(3rem, 6vw, 5.5rem)",
                            fontWeight: 500,
                            color: "rgba(253,255,233,0.92)",
                            lineHeight: 1.0,
                            letterSpacing: "-0.02em",
                            margin: 0,
                        }}
                    >
                        Only a needle
                    </motion.h1>
                </div>

                <div style={{ overflow: "hidden", marginBottom: "40px" }}>
                    <motion.h1
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            fontFamily: "'Times New Roman', Times, serif",
                            fontSize: "clamp(3rem, 6vw, 5.5rem)",
                            fontWeight: 500,
                            fontStyle: "italic",
                            color: "#C4FF61",
                            lineHeight: 1.0,
                            letterSpacing: "-0.02em",
                            margin: 0,
                        }}
                    >
                        and everything she knows.
                    </motion.h1>
                </div>

                {/* Tagline below headline */}
                <div style={{ overflow: "hidden", marginBottom: "40px" }}>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 0.75, y: 0 }}
                        transition={{ delay: 1.0, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            fontFamily: "'Times New Roman', Times, serif",
                            fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
                            fontStyle: "italic",
                            color: "rgba(253,255,233,0.55)",
                            margin: 0,
                            letterSpacing: "0.01em",
                        }}
                    >
                        Every city. Every skin. Every story — permanent.
                    </motion.p>
                </div>

                {/* CTA button */}
                <motion.a
                    href="https://meetprerna.fillout.com/book"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        display: "inline-block",
                        fontFamily: "Lato, sans-serif",
                        fontWeight: 700,
                        fontSize: "0.72rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#1A1A1A",
                        background: "#C4FF61",
                        padding: "14px 32px",
                        borderRadius: "100px",
                        textDecoration: "none",
                        transition: "background 0.3s ease, transform 0.2s ease",
                    }}
                    data-cursor="book"
                >
                    Start a commission
                </motion.a>

            </div>

            {/* ── SCROLL INDICATOR — bottom right ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                style={{
                    position: "absolute",
                    bottom: "40px",
                    right: "48px",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                }}
            >
                <p style={{
                    fontFamily: "Lato, sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.25em",
                    color: "rgba(253,255,233,0.3)",
                    textTransform: "uppercase",
                    margin: 0,
                    writingMode: "vertical-rl",
                }}>
                    Scroll
                </p>
                {/* Animated line */}
                <motion.div
                    animate={{ scaleY: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        width: "1px",
                        height: "48px",
                        background: "linear-gradient(to bottom, #C4FF61, transparent)",
                        transformOrigin: "top",
                    }}
                />
            </motion.div>

            {/* ── OM SYMBOL — atmospheric, bottom centre ── */}
            <div style={{
                position: "absolute",
                bottom: "24px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 10,
                fontFamily: "'Times New Roman', serif",
                fontSize: "1.2rem",
                color: "rgba(196,255,97,0.12)",
                userSelect: "none",
                pointerEvents: "none",
            }}>
                ॐ
            </div>

        </section>
    );
}
