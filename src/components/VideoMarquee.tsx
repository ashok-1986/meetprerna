"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── VIDEO DATA ──────────────────────────────────────────────
// Replace thumbnail and src when real videos are ready
// Place video files at: /public/videos/
// Place thumbnails at: /public/videos/thumbs/

const VIDEOS = [
    {
        id: 1,
        label: "Process",
        title: "The needle finds its line.",
        thumbnail: "/hero/prerna-hero.jpg", // replace with /videos/thumbs/process.jpg
        src: "/videos/process.mp4",        // replace when ready
        ready: false,                       // set to true when video exists
    },
    {
        id: 2,
        label: "Detail",
        title: "Precision as meditation.",
        thumbnail: "/hero/prerna-hero.jpg",
        src: "/videos/detail.mp4",
        ready: false,
    },
    {
        id: 3,
        label: "Creation",
        title: "From blank skin to story.",
        thumbnail: "/hero/prerna-hero.jpg",
        src: "/videos/creation.mp4",
        ready: false,
    },
    {
        id: 4,
        label: "Studio",
        title: "Where stillness becomes art.",
        thumbnail: "/hero/prerna-hero.jpg",
        src: "/videos/studio.mp4",
        ready: false,
    },
];

export default function VideoMarquee() {
    const [lightbox, setLightbox] = useState<typeof VIDEOS[0] | null>(null);

    return (
        <>
            <section style={{
                background: "#111111",
                padding: "80px 0",
                overflow: "hidden",
                borderTop: "1px solid rgba(253,255,233,0.05)",
                borderBottom: "1px solid rgba(253,255,233,0.05)",
            }}>

                {/* Header */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 64px",
                    marginBottom: "40px",
                }}>
                    <p style={{
                        fontFamily: "Lato, sans-serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.25em",
                        color: "#C4FF61",
                        textTransform: "uppercase",
                        opacity: 0.8,
                        margin: 0,
                    }}>
                        · In Motion
                    </p>
                    <p style={{
                        fontFamily: "'Times New Roman', Times, serif",
                        fontSize: "0.95rem",
                        fontStyle: "italic",
                        color: "rgba(253,255,233,0.2)",
                        margin: 0,
                    }}>
                        The work, moving.
                    </p>
                </div>

                {/* Video strip — auto-scrolling marquee */}
                <div
                    className="video-strip"
                    style={{
                        display: "flex",
                        gap: "20px",
                        paddingLeft: "64px",
                        // No animation needed for 4 items — show all visible
                        // If more videos added later, enable marquee animation
                        overflowX: "auto",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    {VIDEOS.map((video) => (
                        <motion.div
                            key={video.id}
                            data-cursor="play"
                            onClick={() => setLightbox(video)}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                flexShrink: 0,
                                width: "320px",
                                height: "420px",
                                borderRadius: "4px",
                                overflow: "hidden",
                                position: "relative",
                                cursor: "pointer", // fallback cursor if data-cursor fails
                                background: "#0D0D0D",
                            }}
                        >
                            {/* Thumbnail */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    objectPosition: "center top",
                                    filter: "grayscale(30%) brightness(0.6)",
                                    display: "block",
                                }}
                            />

                            {/* Play icon overlay */}
                            <div style={{
                                position: "absolute",
                                inset: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <div style={{
                                    width: "52px",
                                    height: "52px",
                                    borderRadius: "50%",
                                    border: "1px solid rgba(253,255,233,0.3)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "rgba(13,13,13,0.4)",
                                    backdropFilter: "blur(4px)",
                                }}>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M3 2L11.5 7L3 12V2Z" fill="#FDFFE9" />
                                    </svg>
                                </div>
                            </div>

                            {/* Bottom info */}
                            <div style={{
                                position: "absolute",
                                bottom: 0, left: 0, right: 0,
                                padding: "24px",
                                background: "linear-gradient(to top, rgba(13,13,13,0.9), transparent)",
                            }}>
                                <p style={{
                                    fontFamily: "Lato, sans-serif",
                                    fontSize: "0.6rem",
                                    letterSpacing: "0.2em",
                                    color: "#C4FF61",
                                    textTransform: "uppercase",
                                    margin: "0 0 6px",
                                }}>
                                    {video.label}
                                </p>
                                <p style={{
                                    fontFamily: "'Times New Roman', Times, serif",
                                    fontSize: "0.95rem",
                                    fontStyle: "italic",
                                    color: "rgba(253,255,233,0.85)",
                                    margin: 0,
                                    lineHeight: 1.3,
                                }}>
                                    {video.title}
                                </p>
                            </div>

                            {/* "Coming soon" badge for unready videos */}
                            {!video.ready && (
                                <div style={{
                                    position: "absolute",
                                    top: "16px",
                                    right: "16px",
                                    background: "rgba(13,13,13,0.7)",
                                    border: "1px solid rgba(253,255,233,0.1)",
                                    borderRadius: "100px",
                                    padding: "4px 12px",
                                    fontFamily: "Lato, sans-serif",
                                    fontSize: "0.55rem",
                                    letterSpacing: "0.15em",
                                    color: "rgba(253,255,233,0.3)",
                                    textTransform: "uppercase",
                                }}>
                                    Soon
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Hide scrollbar */}
                <style dangerouslySetInnerHTML={{
                    __html: `
          .video-strip::-webkit-scrollbar { display: none; }
        `}} />

            </section>

            {/* ── LIGHTBOX ── */}
            <AnimatePresence>
                {lightbox && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            onClick={() => setLightbox(null)}
                            style={{
                                position: "fixed",
                                inset: 0,
                                background: "rgba(13,13,13,0.97)",
                                zIndex: 1000,
                            }}
                        />

                        {/* Video or "coming soon" state */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                position: "fixed",
                                inset: 0,
                                zIndex: 1001,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "40px",
                                pointerEvents: "none",
                            }}
                        >
                            {lightbox.ready ? (
                                <video
                                    src={lightbox.src}
                                    autoPlay
                                    controls
                                    onClick={(e) => e.stopPropagation()}
                                    style={{
                                        maxWidth: "85vw",
                                        maxHeight: "80vh",
                                        borderRadius: "4px",
                                        outline: "none",
                                        pointerEvents: "auto",
                                    }}
                                />
                            ) : (
                                // Placeholder state for unready videos
                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    style={{
                                        pointerEvents: "auto",
                                        textAlign: "center",
                                    }}
                                >
                                    <p style={{
                                        fontFamily: "Lato, sans-serif",
                                        fontSize: "0.65rem",
                                        letterSpacing: "0.25em",
                                        color: "#C4FF61",
                                        textTransform: "uppercase",
                                        marginBottom: "24px",
                                        opacity: 0.8,
                                    }}>
                                        · {lightbox.label}
                                    </p>
                                    <p style={{
                                        fontFamily: "'Times New Roman', Times, serif",
                                        fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                                        fontStyle: "italic",
                                        color: "rgba(253,255,233,0.5)",
                                        marginBottom: "32px",
                                    }}>
                                        {lightbox.title}
                                    </p>
                                    <p style={{
                                        fontFamily: "Lato, sans-serif",
                                        fontSize: "0.8rem",
                                        color: "rgba(253,255,233,0.25)",
                                        letterSpacing: "0.1em",
                                    }}>
                                        Video coming soon
                                    </p>
                                </div>
                            )}
                        </motion.div>

                        {/* Close button */}
                        <button
                            onClick={() => setLightbox(null)}
                            style={{
                                position: "fixed",
                                top: "32px",
                                right: "40px",
                                background: "none",
                                border: "1px solid rgba(253,255,233,0.15)",
                                borderRadius: "100px",
                                color: "rgba(253,255,233,0.6)",
                                fontFamily: "Lato, sans-serif",
                                fontSize: "0.6rem",
                                letterSpacing: "0.2em",
                                padding: "10px 20px",
                                cursor: "pointer",
                                zIndex: 1002,
                                textTransform: "uppercase",
                                transition: "border-color 0.3s, color 0.3s",
                            }}
                            data-cursor="hover"
                        >
                            Close ✕
                        </button>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
