"use client";

import { motion } from "framer-motion";

const disciplines = [
    {
        name: "Tattoo",
        descriptor: "Permanent stories on skin",
        accent: true, // highlights the entry point
    },
    {
        name: "Illustration",
        descriptor: "Hand-drawn worlds",
        accent: false,
    },
    {
        name: "Painting",
        descriptor: "Colour as language",
        accent: false,
    },
    {
        name: "Wall Art",
        descriptor: "Art at scale",
        accent: false,
    },
    {
        name: "Vitiligo Art",
        descriptor: "Beauty in difference",
        accent: false,
    },
    {
        name: "Permanent Makeup",
        descriptor: "Precision as art form",
        accent: false,
    },
    {
        name: "Restoration",
        descriptor: "Second chances in ink",
        accent: false,
    },
];

export default function DisciplinesStrip() {
    return (
        <section style={{
            background: "#111111",
            padding: "100px 64px",
            borderTop: "1px solid rgba(253,255,233,0.05)",
            borderBottom: "1px solid rgba(253,255,233,0.05)",
        }}>

            {/* Header row */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "72px",
            }}>
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    style={{
                        fontFamily: "Lato, sans-serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.25em",
                        color: "#C4FF61",
                        textTransform: "uppercase",
                        opacity: 0.8,
                        margin: 0,
                    }}
                >
                    · What she creates
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    style={{
                        fontFamily: "'Times New Roman', Times, serif",
                        fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
                        fontStyle: "italic",
                        color: "rgba(253,255,233,0.2)",
                        margin: 0,
                    }}
                >
                    Every medium. One creative vision.
                </motion.p>
            </div>

            {/* Disciplines grid */}
            <div
                className="disciplines-grid"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: "1px",
                    background: "rgba(253,255,233,0.06)",
                    // On mobile: repeat(2, 1fr) — handle via CSS or responsive logic
                }}>
                {disciplines.map((d, i) => (
                    <motion.div
                        key={d.name}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.7,
                            delay: i * 0.07,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        viewport={{ once: true }}
                        style={{
                            background: "#111111",
                            padding: "40px 24px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                            cursor: "default",
                            transition: "background 0.3s ease",
                            position: "relative",
                            overflow: "hidden",
                        }}
                        whileHover={{
                            background: d.accent
                                ? "rgba(196,255,97,0.06)"
                                : "rgba(253,255,233,0.02)",
                        }}
                    >
                        {/* Accent dot for tattoo — the entry point */}
                        {d.accent && (
                            <div style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                background: "#C4FF61",
                                marginBottom: "4px",
                            }} />
                        )}

                        {/* Discipline name */}
                        <p style={{
                            fontFamily: "'Times New Roman', Times, serif",
                            fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                            fontWeight: 700,
                            color: d.accent ? "#C4FF61" : "#FDFFE9",
                            margin: 0,
                            lineHeight: 1.2,
                        }}>
                            {d.name}
                        </p>

                        {/* Descriptor */}
                        <p style={{
                            fontFamily: "Lato, sans-serif",
                            fontSize: "0.72rem",
                            color: "rgba(253,255,233,0.3)",
                            margin: 0,
                            lineHeight: 1.5,
                            letterSpacing: "0.02em",
                        }}>
                            {d.descriptor}
                        </p>
                    </motion.div>
                ))}
            </div>

        </section>
    );
}
