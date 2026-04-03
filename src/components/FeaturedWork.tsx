"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const FEATURED = [
    {
        id: 1,
        category: "Tattoo",
        title: "Permanent stories on skin.",
        description: "Custom tattoos designed from your story — not from a catalogue.",
        image: "/work/featured-tattoo.jpg",
        tags: ["Custom", "Fine Line", "Blackwork", "Geometric"],
    },
    {
        id: 2,
        category: "Illustration",
        title: "Drawn by hand. Felt in the chest.",
        description: "Original illustrations that live on paper, walls, and skin.",
        image: "/work/featured-illustration.jpg",
        tags: ["Original", "Commission", "Hand-drawn", "Narrative"],
    },
    {
        id: 3,
        category: "Vitiligo & Restoration",
        title: "She finds beauty where others looked away.",
        description: "Vitiligo art, scar cover, and tattoo restoration — healing through art.",
        image: "/work/featured-restoration.jpg",
        tags: ["Vitiligo Art", "Restoration", "Scar Cover", "Healing"],
    },
    {
        id: 4,
        category: "Permanent Art",
        title: "Every surface. One restless vision.",
        description: "Painting, wall art, permanent makeup — art in every form.",
        image: "/work/featured-permanent.jpg",
        tags: ["Painting", "Wall Art", "Permanent Makeup", "Mixed Media"],
    },
];

export default function FeaturedWork() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: "left" | "right") => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: dir === "right" ? 560 : -560,
            behavior: "smooth",
        });
    };

    return (
        <section
            style={{
                background: "#0D0D0D",
                padding: "120px 0 80px",
                borderTop: "none",
                overflow: "hidden",
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    padding: "0 64px",
                    marginBottom: "48px",
                }}
            >
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
                    · Featured Work · {FEATURED.length} categories
                </motion.p>

                <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                    {/* Arrow controls */}
                    <div style={{ display: "flex", gap: "8px" }}>
                        <button
                            onClick={() => scroll("left")}
                            aria-label="Scroll left"
                            style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "50%",
                                border: "1px solid rgba(253,255,233,0.15)",
                                background: "transparent",
                                color: "rgba(253,255,233,0.5)",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "border-color 0.3s, color 0.3s",
                            }}
                        >
                            ←
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            aria-label="Scroll right"
                            style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "50%",
                                border: "1px solid rgba(253,255,233,0.15)",
                                background: "transparent",
                                color: "rgba(253,255,233,0.5)",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "border-color 0.3s, color 0.3s",
                            }}
                        >
                            →
                        </button>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            href="/work"
                            style={{
                                fontFamily: "Lato, sans-serif",
                                fontSize: "0.65rem",
                                letterSpacing: "0.2em",
                                color: "rgba(253,255,233,0.35)",
                                textDecoration: "none",
                                textTransform: "uppercase",
                                transition: "color 0.3s",
                            }}
                        >
                            All work →
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Horizontal scroll track */}
            <div
                ref={scrollRef}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "2px",
                    overflowX: "auto",
                    overflowY: "hidden",
                    scrollSnapType: "x mandatory",
                    WebkitOverflowScrolling: "touch",
                    paddingLeft: "64px",
                    paddingRight: "64px",
                    paddingBottom: "8px",
                    // Hide scrollbar visually
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                } as React.CSSProperties}
            >
                {FEATURED.map((item, i) => (
                    <FeaturedCard key={item.id} item={item} index={i} />
                ))}
            </div>

            {/* Footer links */}
            <div
                style={{
                    padding: "40px 64px 0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <p
                        style={{
                            fontFamily: "'Times New Roman', Times, serif",
                            fontSize: "0.95rem",
                            fontStyle: "italic",
                            color: "rgba(253,255,233,0.2)",
                            margin: "0 0 8px",
                        }}
                    >
                        She has lived in three cities and left her mark on all of them.
                    </p>
                    <Link
                        href="/story"
                        style={{
                            fontFamily: "Lato, sans-serif",
                            fontSize: "0.65rem",
                            letterSpacing: "0.2em",
                            color: "rgba(253,255,233,0.35)",
                            textDecoration: "none",
                            textTransform: "uppercase",
                            transition: "color 0.3s",
                        }}
                    >
                        Read how she got here →
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <Link
                        href="/work"
                        style={{
                            fontFamily: "Lato, sans-serif",
                            fontSize: "0.7rem",
                            letterSpacing: "0.2em",
                            color: "rgba(253,255,233,0.4)",
                            textDecoration: "none",
                            textTransform: "uppercase",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "12px",
                            border: "1px solid rgba(253,255,233,0.1)",
                            padding: "14px 32px",
                            borderRadius: "100px",
                            transition: "border-color 0.3s, color 0.3s",
                        }}
                    >
                        See all work
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

// ── Hide scrollbar for webkit browsers ──────────────────────────
// Injected as a style tag since we can't use CSS modules here
const hideScrollbarStyle = `
  .featured-scroll::-webkit-scrollbar { display: none; }
`;

// ── Individual card component ────────────────────────────────────
function FeaturedCard({
    item,
    index,
}: {
    item: (typeof FEATURED)[0];
    index: number;
}) {
    const [hovered, setHovered] = useState(false);

    return (
        <>
            <style>{hideScrollbarStyle}</style>
            <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                    duration: 0.9,
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true, margin: "-60px" }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    position: "relative",
                    flexShrink: 0,
                    width: "clamp(320px, 38vw, 520px)",
                    height: "60vh",
                    overflow: "hidden",
                    scrollSnapAlign: "start",
                    borderRadius: "2px",
                    cursor: "pointer",
                }}
            >
                <Link href="/work" style={{ display: "block", height: "100%", textDecoration: "none" }}>
                    {/* Image */}
                    <motion.div
                        style={{ position: "absolute", inset: 0 }}
                        animate={{ scale: hovered ? 1.05 : 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Image
                            src={item.image}
                            alt={item.category}
                            fill
                            sizes="(max-width: 768px) 90vw, 40vw"
                            priority={index === 0}
                            style={{
                                objectFit: "cover",
                                objectPosition: "center",
                                filter: hovered
                                    ? "grayscale(0%) brightness(0.75)"
                                    : "grayscale(20%) brightness(0.55)",
                                transition: "filter 0.8s ease",
                            }}
                        />
                    </motion.div>

                    {/* Gradient overlay */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.2) 55%, transparent 100%)",
                            pointerEvents: "none",
                        }}
                    />

                    {/* Card content — bottom */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: "32px",
                            left: "28px",
                            right: "28px",
                        }}
                    >
                        <p
                            style={{
                                fontFamily: "Lato, sans-serif",
                                fontSize: "0.6rem",
                                letterSpacing: "0.25em",
                                color: "#C4FF61",
                                textTransform: "uppercase",
                                margin: "0 0 10px",
                                opacity: 0.9,
                            }}
                        >
                            {item.category}
                        </p>
                        <h3
                            style={{
                                fontFamily: "'Times New Roman', Times, serif",
                                fontSize: "clamp(1.2rem, 2.2vw, 1.8rem)",
                                fontWeight: 700,
                                fontStyle: "italic",
                                color: "#FDFFE9",
                                margin: "0 0 14px",
                                lineHeight: 1.15,
                            }}
                        >
                            {item.title}
                        </h3>

                        {/* Tags */}
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                            {item.tags.map((tag) => (
                                <span
                                    key={tag}
                                    style={{
                                        fontFamily: "Lato, sans-serif",
                                        fontSize: "0.55rem",
                                        letterSpacing: "0.12em",
                                        color: "rgba(253,255,233,0.4)",
                                        border: "1px solid rgba(253,255,233,0.12)",
                                        padding: "3px 10px",
                                        borderRadius: "100px",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Hover arrow */}
                    <motion.div
                        animate={{
                            opacity: hovered ? 1 : 0,
                            x: hovered ? 0 : 12,
                        }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            position: "absolute",
                            top: "24px",
                            right: "24px",
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            border: "1px solid #C4FF61",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                            <path
                                d="M2 10L10 2M10 2H4M10 2V8"
                                stroke="#C4FF61"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </motion.div>
                </Link>
            </motion.div>
        </>
    );
}
