'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VIDEOS = [
    {
        id: 1,
        type: 'PROCESS',
        title: 'The needle finds its line.',
        description: 'Watch the work happen.',
        thumbnail: '/videos/process-thumb.jpg',
        src: '/videos/process.mp4',
        aspect: '9/16',
    },
    {
        id: 2,
        type: 'TRANSFORMATION',
        title: 'Before the ink. After the meaning.',
        description: 'Skin as canvas.',
        thumbnail: '/videos/beforeafter-thumb.jpg',
        src: '/videos/beforeafter.mp4',
        aspect: '9/16',
    },
    {
        id: 3,
        type: 'STUDIO',
        title: 'Where stillness becomes art.',
        description: 'The space. The ritual.',
        thumbnail: '/videos/studio-thumb.jpg',
        src: '/videos/studio.mp4',
        aspect: '16/9',
    },
];

export default function VideoSection() {
    const [fullscreen, setFullscreen] = useState<number | null>(null);
    const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

    const onCardEnter = useCallback((id: number) => {
        const vid = videoRefs.current[id];
        if (vid) {
            vid.currentTime = 0;
            vid.play().catch(() => { });
        }
    }, []);

    const onCardLeave = useCallback((id: number) => {
        const vid = videoRefs.current[id];
        if (vid) {
            vid.pause();
            vid.currentTime = 0;
        }
    }, []);

    const openFullscreen = (id: number) => setFullscreen(id);
    const closeFullscreen = () => setFullscreen(null);

    return (
        <>
            <section style={{
                background: '#111111',
                padding: '120px 64px',
                borderTop: '1px solid rgba(253,255,233,0.05)',
            }}>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginBottom: '64px',
                }}>
                    <p style={{
                        fontFamily: 'Lato, sans-serif',
                        fontSize: '0.65rem',
                        letterSpacing: '0.25em',
                        color: '#C4FF61',
                        textTransform: 'uppercase',
                        opacity: 0.8,
                    }}>
                        · In Motion
                    </p>
                    <p style={{
                        fontFamily: "'Times New Roman', serif",
                        fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
                        fontStyle: 'italic',
                        color: 'rgba(253,255,233,0.25)',
                    }}>
                        The work, moving.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '24px',
                    }}>
                        {VIDEOS.slice(0, 2).map(video => (
                            <VideoCard
                                key={video.id}
                                video={video}
                                videoRef={(el) => { videoRefs.current[video.id] = el; }}
                                onEnter={() => onCardEnter(video.id)}
                                onLeave={() => onCardLeave(video.id)}
                                onClick={() => openFullscreen(video.id)}
                            />
                        ))}
                    </div>

                    <VideoCard
                        video={VIDEOS[2]}
                        videoRef={(el) => { videoRefs.current[VIDEOS[2].id] = el; }}
                        onEnter={() => onCardEnter(VIDEOS[2].id)}
                        onLeave={() => onCardLeave(VIDEOS[2].id)}
                        onClick={() => openFullscreen(VIDEOS[2].id)}
                        landscape
                    />
                </div>
            </section>

            <AnimatePresence>
                {fullscreen !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        onClick={closeFullscreen}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(13,13,13,0.97)',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <motion.video
                            key={fullscreen}
                            src={VIDEOS.find(v => v.id === fullscreen)?.src}
                            autoPlay
                            controls
                            onClick={e => e.stopPropagation()}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                maxWidth: '90vw',
                                maxHeight: '85vh',
                                borderRadius: '4px',
                                outline: 'none',
                            }}
                        />
                        <button
                            onClick={closeFullscreen}
                            style={{
                                position: 'absolute',
                                top: '32px',
                                right: '40px',
                                background: 'none',
                                border: '1px solid rgba(253,255,233,0.2)',
                                borderRadius: '100px',
                                color: '#FDFFE9',
                                fontFamily: 'Lato, sans-serif',
                                fontSize: '0.65rem',
                                letterSpacing: '0.2em',
                                padding: '10px 20px',
                                cursor: 'none',
                            }}
                        >
                            CLOSE ✕
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function VideoCard({ video, videoRef, onEnter, onLeave, onClick, landscape = false }: {
    video: typeof VIDEOS[0];
    videoRef: (el: HTMLVideoElement | null) => void;
    onEnter: () => void;
    onLeave: () => void;
    onClick: () => void;
    landscape?: boolean;
}) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            data-cursor="play"
            onMouseEnter={() => { setHovered(true); onEnter(); }}
            onMouseLeave={() => { setHovered(false); onLeave(); }}
            onClick={onClick}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{
                position: 'relative',
                aspectRatio: landscape ? '16/9' : '9/16',
                borderRadius: '4px',
                overflow: 'hidden',
                cursor: 'none',
                background: '#1A1A1A',
            }}
        >
            <img
                src={video.thumbnail}
                alt={video.title}
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: hovered ? 0 : 1,
                    transition: 'opacity 0.5s ease',
                    filter: 'grayscale(20%) contrast(1.05) brightness(0.8)',
                }}
            />

            <video
                ref={videoRef}
                src={video.src}
                muted
                loop
                playsInline
                preload="none"
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: hovered ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                }}
            />

            <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                padding: '32px',
                background: 'linear-gradient(to top, rgba(13,13,13,0.9), transparent)',
                transform: hovered ? 'translateY(0)' : 'translateY(8px)',
                transition: 'transform 0.4s ease',
            }}>
                <p style={{
                    fontFamily: 'Lato, sans-serif',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    color: '#C4FF61',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                }}>
                    {video.type}
                </p>
                <p style={{
                    fontFamily: "'Times New Roman', serif",
                    fontSize: '1.1rem',
                    fontStyle: 'italic',
                    color: 'rgba(253,255,233,0.9)',
                    margin: 0,
                    lineHeight: 1.3,
                }}>
                    {video.title}
                </p>
            </div>

            <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.3s ease',
            }}>
                <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid rgba(253,255,233,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 1.5L8.5 5L2 8.5V1.5Z" fill="#FDFFE9" />
                    </svg>
                </div>
            </div>
        </motion.div>
    );
}
