"use client";

import { useState } from "react";
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
        title: "Hand-drawn worlds.",
        description: "Original illustrations that live on paper, walls, and skin.",
        image: "/work/featured-illustration.jpg",
        tags: ["Original", "Hand-drawn", "Commission"],
    },
    {
        id: 3,
        category: "Vitiligo & Restoration",
        title: "Beauty in difference.",
        description: "Vitiligo art, scar cover, and tattoo restoration — healing through art.",
        image: "/work/featured-restoration.jpg",
        tags: ["Vitiligo Art", "Restoration", "Scar Cover"],
    },
    {
        id: 4,
        category: "Permanent Art",
        title: "Every medium. One vision.",
        description: "Painting, wall art, permanent makeup — art in every form.",
        image: "/work/featured-permanent.jpg",
        tags: ["Painting", "Wall Art", "Permanent Makeup"],
    },
];

export default function FeaturedWork() {
    return (
        <section
            style={{
                background: "#0D0D0D",
                padding: "120px 0 80px",
                borderTop: "none",
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    padding: "0 64px",
                    marginBottom: "64px",
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
                        data-cursor="view"
                    >
                        All work →
                    </Link>
                </motion.div>
            </div>

            {/* Stacked cards — Ashfall style */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                }}
            >
                {FEATURED.map((item, i) => (
                    <FeaturedCard key={item.id} item={item} index={i} />
                ))}
            </div>

            {/* Show more link */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
                style={{
                    padding: "48px 64px 0",
                    display: "flex",
                    justifyContent: "center",
                }}
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
                        padding: "16px 40px",
                        borderRadius: "100px",
                        transition: "border-color 0.3s, color 0.3s",
                    }}
                    data-cursor="view"
                >
                    See all work
                </Link>
            </motion.div>

            {/* Story teaser */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                viewport={{ once: true }}
                style={{
                    textAlign: "center",
                    marginTop: "24px",
                    paddingBottom: "16px",
                }}
            >
                <p
                    style={{
                        fontFamily: "'Times New Roman', Times, serif",
                        fontSize: "0.95rem",
                        fontStyle: "italic",
                        color: "rgba(253,255,233,0.2)",
                        margin: "0 0 12px",
                    }}
                >
                    Want to know the artist behind the work?
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
                    Her story →
                </Link>
            </motion.div>
        </section>
    );
}

// ── Individual card component ─────────────────────────────────
function FeaturedCard({
    item,
    index,
}: {
    item: (typeof FEATURED)[0];
    index: number;
}) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.9,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
            }}
            viewport={{ once: true, margin: "-80px" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ position: "relative", overflow: "hidden" }}
            data-cursor="view"
        >
            <Link href="/work" style={{ display: "block", textDecoration: "none" }}>
                {/* Image */}
                <div
                    style={{
                        position: "relative",
                        height: "60vh",
                        overflow: "hidden",
                    }}
                >
                    <motion.div
                        style={{
                            position: "absolute",
                            inset: 0,
                        }}
                        animate={{ scale: hovered ? 1.04 : 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="100vw"
                            style={{
                                objectFit: "cover",
                                objectPosition: "center",
                                filter: hovered
                                    ? "grayscale(0%) brightness(0.7)"
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
                                "linear-gradient(to top, rgba(13,13,13,0.9) 0%, rgba(13,13,13,0.2) 60%, transparent 100%)",
                            pointerEvents: "none",
                        }}
                    />

                    {/* Card content — bottom left */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: "40px",
                            left: "64px",
                            right: "64px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                        }}
                    >
                        {/* Left: category + title + tags */}
                        <div>
                            <p
                                style={{
                                    fontFamily: "Lato, sans-serif",
                                    fontSize: "0.65rem",
                                    letterSpacing: "0.25em",
                                    color: "#C4FF61",
                                    textTransform: "uppercase",
                                    margin: "0 0 12px",
                                    opacity: 0.9,
                                }}
                            >
                                {item.category}
                            </p>
                            <h3
                                style={{
                                    fontFamily: "'Times New Roman', Times, serif",
                                    fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                                    fontWeight: 700,
                                    fontStyle: "italic",
                                    color: "#FDFFE9",
                                    margin: "0 0 16px",
                                    lineHeight: 1.1,
                                }}
                            >
                                {item.title}
                            </h3>

                            {/* Tags */}
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                {item.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        style={{
                                            fontFamily: "Lato, sans-serif",
                                            fontSize: "0.6rem",
                                            letterSpacing: "0.12em",
                                            color: "rgba(253,255,233,0.4)",
                                            border: "1px solid rgba(253,255,233,0.12)",
                                            padding: "4px 12px",
                                            borderRadius: "100px",
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Right: View arrow — appears on hover */}
                        <motion.div
                            animate={{
                                opacity: hovered ? 1 : 0,
                                x: hovered ? 0 : 16,
                            }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                flexShrink: 0,
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "Lato, sans-serif",
                                    fontSize: "0.65rem",
                                    letterSpacing: "0.2em",
                                    color: "#C4FF61",
                                    textTransform: "uppercase",
                                }}
                            >
                                View work
                            </span>
                            <div
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    border: "1px solid #C4FF61",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path
                                        d="M2 10L10 2M10 2H4M10 2V8"
                                        stroke="#C4FF61"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
