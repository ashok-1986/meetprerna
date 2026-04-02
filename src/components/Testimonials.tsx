"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WordReveal from "@/components/ui/WordReveal";
import LineReveal from "@/components/ui/LineReveal";

const testimonials = [
    {
        id: 1,
        quote: "Totally indecisive, yet the experience was still a 10. I could not have asked for a better artist for my first tattoo. Great precision and attention to detail.",
        name: "Pramayee Bhaware",
        detail: "First tattoo · Custom design",
    },
    {
        id: 2,
        quote: "Couldn't be happier with the result. Prerna's attention to detail and artistic skill truly shine through. The entire process was comfortable — she took the time to understand exactly what I wanted.",
        name: "Sambhav Chathly",
        detail: "Custom sleeve · Mumbai",
    },
    {
        id: 3,
        quote: "This was my first tattoo and I was super nervous. But Prerna did a great job — it came out exactly how I wanted. This beautiful art was perfectly done.",
        name: "Amala James",
        detail: "First tattoo · Fine line",
    },
    {
        id: 4,
        quote: "The place was well sanitised and professional. Prerna is welcoming, precise, and the result was exactly what I had in mind.",
        name: "Prisha Nayak",
        detail: "Custom design · Mumbai",
    },
    {
        id: 5,
        quote: "I had a really great experience. The place was very hygienic. Prerna went through the entire process with me and I got the exact tattoo I asked for. It turned out beautiful.",
        name: "Rutuja Babar",
        detail: "Custom design · Studio visit",
    },
];

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1); // 1=forward, -1=backward

    const goTo = useCallback((index: number) => {
        setDirection(index > current ? 1 : -1);
        setCurrent(index);
    }, [current]);

    const next = () => goTo((current + 1) % testimonials.length);
    const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length);

    const t = testimonials[current];

    // Slide variants — quote slides in from direction of navigation
    const variants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 80 : -80,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        },
        exit: (dir: number) => ({
            x: dir > 0 ? -80 : 80,
            opacity: 0,
            transition: { duration: 0.4, ease: [0.4, 0, 1, 1] },
        }),
    };

    return (
        <section style={{
            background: "#111111",
            padding: "140px 64px",
            borderTop: "1px solid rgba(253,255,233,0.05)",
            position: "relative",
            overflow: "hidden",
        }}>

            {/* Section label */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                style={{
                    fontFamily: "Lato, sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.25em",
                    color: "#C4FF61",
                    textTransform: "uppercase",
                    marginBottom: "80px",
                    opacity: 0.8,
                }}
            >
                · Voices
            </motion.p>

            {/* Quote display area */}
            <div style={{
                maxWidth: "900px",
                minHeight: "280px", // prevents layout shift between quotes
                position: "relative",
            }}>
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={t.id}
                        custom={direction}
                        variants={variants as any}
                        initial="enter"
                        animate="center"
                        exit="exit"
                    >
                        {/* Opening mark */}
                        <p style={{
                            fontFamily: "'Times New Roman', serif",
                            fontSize: "clamp(3rem, 6vw, 5rem)",
                            color: "#C4FF61",
                            opacity: 0.3,
                            lineHeight: 0.8,
                            marginBottom: "16px",
                            userSelect: "none",
                        }}>
                            "
                        </p>

                        {/* Quote — WordReveal */}
                        <WordReveal
                            text={t.quote}
                            delay={0.1}
                            stagger={0.025}
                            duration={0.5}
                            style={{
                                fontFamily: "'Times New Roman', serif",
                                fontSize: "clamp(1.3rem, 2.2vw, 1.8rem)",
                                fontStyle: "italic",
                                color: "rgba(253,255,233,0.85)",
                                lineHeight: 1.55,
                                maxWidth: "820px",
                            }}
                        />

                        {/* Attribution */}
                        <div style={{
                            marginTop: "40px",
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                        }}>
                            {/* Thin line */}
                            <div style={{
                                width: "32px",
                                height: "1px",
                                background: "#C4FF61",
                                opacity: 0.5,
                                flexShrink: 0,
                            }} />

                            {/* Name — LineReveal */}
                            <div>
                                <LineReveal
                                    text={t.name}
                                    tag="p"
                                    delay={0.3}
                                    duration={0.7}
                                    style={{
                                        fontFamily: "Lato, sans-serif",
                                        fontWeight: 500,
                                        fontSize: "0.85rem",
                                        letterSpacing: "0.1em",
                                        color: "#FDFFE9",
                                        margin: 0,
                                    }}
                                />
                                <LineReveal
                                    text={t.detail}
                                    tag="p"
                                    delay={0.4}
                                    duration={0.6}
                                    style={{
                                        fontFamily: "Lato, sans-serif",
                                        fontSize: "0.75rem",
                                        letterSpacing: "0.08em",
                                        color: "rgba(253,255,233,0.35)",
                                        margin: "4px 0 0",
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation row */}
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "32px",
                marginTop: "64px",
            }}>

                {/* Prev button */}
                <button
                    onClick={prev}
                    aria-label="Previous testimonial"
                    style={{
                        background: "none",
                        border: "1px solid rgba(253,255,233,0.15)",
                        borderRadius: "100px",
                        width: "48px",
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "border-color 0.3s, background 0.3s",
                        flexShrink: 0,
                        // hover: border-color #C4FF61, background rgba(196,255,97,0.08)
                    }}
                >
                    {/* Left arrow SVG */}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M9 2L4 7L9 12" stroke="#FDFFE9" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {/* Dot indicators */}
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            aria-label={`Go to testimonial ${i + 1}`}
                            style={{
                                background: i === current ? "#C4FF61" : "rgba(253,255,233,0.2)",
                                border: "none",
                                borderRadius: "100px",
                                width: i === current ? "24px" : "6px",
                                height: "6px",
                                cursor: "pointer",
                                padding: 0,
                                transition: "width 0.4s ease, background 0.3s ease",
                            }}
                        />
                    ))}
                </div>

                {/* Next button */}
                <button
                    onClick={next}
                    aria-label="Next testimonial"
                    style={{
                        background: "none",
                        border: "1px solid rgba(253,255,233,0.15)",
                        borderRadius: "100px",
                        width: "48px",
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "border-color 0.3s, background 0.3s",
                        flexShrink: 0,
                    }}
                >
                    {/* Right arrow SVG */}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M5 2L10 7L5 12" stroke="#FDFFE9" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {/* Counter — right side */}
                <p style={{
                    fontFamily: "Lato, sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    color: "rgba(253,255,233,0.25)",
                    marginLeft: "auto",
                }}>
                    {String(current + 1).padStart(2, "0")} /
                    {String(testimonials.length).padStart(2, "0")}
                </p>
            </div>

            {/* Decorative large number — background */}
            <div style={{
                position: "absolute",
                right: "64px",
                top: "50%",
                transform: "translateY(-50%)",
                fontFamily: "'Times New Roman', serif",
                fontSize: "clamp(8rem, 15vw, 14rem)",
                fontWeight: 500,
                color: "rgba(196,255,97,0.03)",
                userSelect: "none",
                pointerEvents: "none",
                lineHeight: 1,
            }}>
                {String(current + 1).padStart(2, "0")}
            </div>

        </section>
    );
}
