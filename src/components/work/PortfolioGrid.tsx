"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import LineReveal from "@/components/ui/LineReveal";

// Placeholder dummy data simulating the eventual real assets.
const MOCK_PORTFOLIO = [
    { id: 1, theme: "IDENTITY", medium: "Permanent Makeup", title: "Microblading Arch", desc: "Redefining facial framing.", img: "/hero/prerna-hero.jpg" },
    { id: 2, theme: "RITUAL", medium: "Tattoo", title: "Sacred Geometry", desc: "Mandala woven into forearm anatomy.", img: "/hero/prerna-hero.jpg" },
    { id: 3, theme: "MEMORY", medium: "Tattoo", title: "Mother's Script", desc: "Preserved handwriting from 1994.", img: "/hero/prerna-hero.jpg" },
    { id: 4, theme: "NATURE", medium: "Illustration", title: "Botanical Study", desc: "Charcoal on raw canvas.", img: "/hero/prerna-hero.jpg" },
    { id: 5, theme: "RESTORATION", medium: "Vitiligo Art", title: "Seamless Blending", desc: "Color matching for skin repigmentation.", img: "/hero/prerna-hero.jpg" },
    { id: 6, theme: "EXPRESSION", medium: "Painting", title: "Midnight Oil", desc: "Abstract thoughts in oil.", img: "/hero/prerna-hero.jpg" },
    { id: 7, theme: "IDENTITY", medium: "Tattoo", title: "Name in Devnagari", desc: "Scripting heritage into skin.", img: "/hero/prerna-hero.jpg" },
    { id: 8, theme: "NATURE", medium: "Wall Art", title: "Leaves on Concrete", desc: "Studio mural project.", img: "/hero/prerna-hero.jpg" },
];

const FILTERS = ["ALL", "IDENTITY", "RITUAL", "MEMORY", "NATURE", "RESTORATION", "EXPRESSION"];

export default function PortfolioGrid() {
    const [activeFilter, setActiveFilter] = useState("ALL");
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const filteredData = activeFilter === "ALL"
        ? MOCK_PORTFOLIO
        : MOCK_PORTFOLIO.filter(item => item.theme === activeFilter);

    // Close lightbox on escape key (handled via useEffect normally, simple overlay click works here)
    const closeLightbox = () => setLightboxIndex(null);

    return (
        <section
            style={{
                background: "#0D0D0D",
                minHeight: "100vh",
                padding: "160px 48px 120px",
                position: "relative",
            }}
        >
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "80px" }}>
                <LineReveal
                    text="The Work"
                    tag="h1"
                    delay={0.1}
                    style={{
                        fontFamily: "'Times New Roman', serif",
                        fontSize: "clamp(3rem, 6vw, 5rem)",
                        fontWeight: 500,
                        color: "#FDFFE9",
                        lineHeight: 1.1,
                        letterSpacing: "-0.02em",
                        margin: "0 0 16px 0",
                    }}
                />
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{
                        fontFamily: "Lato, sans-serif",
                        fontSize: "0.6rem",
                        letterSpacing: "0.15em",
                        color: "rgba(253,255,233,0.5)",
                        textTransform: "uppercase",
                        margin: 0,
                        lineHeight: 1.6,
                    }}
                >
                    Tattoo · Illustration · Painting · Wall Art <br /> Vitiligo · Permanent Art · Restoration
                </motion.p>
            </div>

            {/* Filter Bar */}
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "24px",
                justifyContent: "center",
                marginBottom: "80px"
            }}>
                {FILTERS.map((f, i) => (
                    <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            fontFamily: "Lato, sans-serif",
                            fontSize: "0.65rem",
                            letterSpacing: "0.15em",
                            color: activeFilter === f ? "#C4FF61" : "rgba(253,255,233,0.4)",
                            transition: "color 0.3s",
                            cursor: "pointer",
                            borderBottom: activeFilter === f ? "1px solid #C4FF61" : "1px solid transparent",
                        }}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* CSS-based Masonry approximation using columns */}
            <div style={{
                columnCount: 3,
                columnGap: "32px",
                width: "100%",
                maxWidth: "1400px",
                margin: "0 auto",
            }}
                className="portfolio-columns"
            >
                <AnimatePresence mode="popLayout">
                    {filteredData.map((item, i) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            onClick={() => setLightboxIndex(item.id)}
                            style={{
                                breakInside: "avoid",
                                marginBottom: "32px",
                                position: "relative",
                                cursor: "pointer",
                                borderRadius: "4px",
                                overflow: "hidden",
                                background: "#111111",
                            }}
                            className="portfolio-item-hover"
                        >
                            {/* Dummy aspect ratios to simulate masonry */}
                            <div style={{ position: "relative", width: "100%", height: i % 2 === 0 ? "400px" : "600px" }}>
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    fill
                                    style={{
                                        objectFit: "cover",
                                        filter: "grayscale(20%) brightness(0.8)",
                                        transition: "filter 0.5s, transform 3s ease",
                                    }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <style jsx>{`
        @media (max-width: 1024px) {
          .portfolio-columns { column-count: 2 !important; }
        }
        @media (max-width: 640px) {
          .portfolio-columns { column-count: 1 !important; }
        }
        .portfolio-item-hover img:hover {
          filter: grayscale(0%) brightness(1) !important;
          transform: scale(1.05);
        }
      `}</style>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <LightboxOverlay
                        item={filteredData.find(d => d.id === lightboxIndex)!}
                        onClose={closeLightbox}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

function LightboxOverlay({ item, onClose }: { item: any; onClose: () => void }) {
    const whatsappUrl = `https://api.whatsapp.com/send?phone=917738147935&text=Hi Prerna, I came across your work ${encodeURIComponent(item.title)} and would love to discuss a commission.`;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(13, 13, 13, 0.98)",
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px",
            }}
        >
            <button
                onClick={onClose}
                style={{
                    position: "absolute",
                    top: "40px",
                    right: "48px",
                    background: "none",
                    border: "none",
                    color: "rgba(253,255,233,0.5)",
                    fontFamily: "Lato, sans-serif",
                    fontSize: "2rem",
                    cursor: "pointer",
                    zIndex: 1001,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FDFFE9")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(253,255,233,0.5)")}
            >
                ×
            </button>

            <div style={{ maxWidth: "1200px", width: "100%", display: "flex", gap: "64px", alignItems: "center" }} className="lightbox-content">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    style={{ position: "relative", flex: "1 1 auto", height: "80vh" }}
                >
                    <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        style={{ objectFit: "contain", objectPosition: "center left" }}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{ flex: "0 0 320px", paddingRight: "24px" }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
                        <span style={{
                            fontFamily: "Lato, sans-serif",
                            fontSize: "0.6rem",
                            letterSpacing: "0.2em",
                            color: "#C4FF61",
                            background: "rgba(196, 255, 97, 0.1)",
                            padding: "4px 8px",
                            borderRadius: "2px",
                        }}>
                            {item.theme}
                        </span>
                        <span style={{
                            fontFamily: "Lato, sans-serif",
                            fontSize: "0.65rem",
                            letterSpacing: "0.1em",
                            color: "rgba(253,255,233,0.4)",
                            textTransform: "uppercase",
                        }}>
                            {item.medium}
                        </span>
                    </div>

                    <h3 style={{
                        fontFamily: "'Times New Roman', serif",
                        fontStyle: "italic",
                        fontSize: "2.5rem",
                        color: "#FDFFE9",
                        margin: "0 0 16px 0",
                        lineHeight: 1.1,
                    }}>
                        {item.title}
                    </h3>

                    <p style={{
                        fontFamily: "Lato, sans-serif",
                        fontSize: "0.95rem",
                        color: "rgba(253,255,233,0.6)",
                        lineHeight: 1.6,
                        marginBottom: "64px",
                    }}>
                        {item.desc}
                    </p>

                    <div>
                        <p style={{
                            fontFamily: "Lato, sans-serif",
                            fontSize: "0.75rem",
                            color: "rgba(253,255,233,0.4)",
                            marginBottom: "16px",
                        }}>
                            Interested in something like this?
                        </p>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cta-button-primary"
                            style={{
                                fontFamily: "Lato, sans-serif",
                                fontWeight: 700,
                                fontSize: "0.65rem",
                                letterSpacing: "0.12em",
                                color: "#1A1A1A",
                                background: "#C4FF61",
                                padding: "16px 32px",
                                borderRadius: "100px",
                                textDecoration: "none",
                                textTransform: "uppercase",
                                display: "inline-block",
                                transition: "background 0.3s, transform 0.2s",
                            }}
                        >
                            Start a commission
                        </a>
                    </div>
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @media (max-width: 900px) {
          .lightbox-content {
            flex-direction: column;
            overflow-y: auto;
            align-items: flex-start !important;
          }
          .lightbox-content > div:first-child {
            width: 100%;
            height: 50vh !important;
            min-height: 400px;
          }
          .lightbox-content > div:last-child {
            width: 100%;
            flex: 1 1 auto !important;
          }
        }
      `}} />
        </motion.div>
    );
}
