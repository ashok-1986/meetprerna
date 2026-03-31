'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const STORY_BEATS = [
    {
        id: 1,
        label: '01',
        headline: 'She started scared.\nThen she performed anyway.',
        body: 'Shy, quiet, terrified of stages. But somewhere between the fear and the performance was a version of herself she wanted to meet. She kept showing up — organising events, planning performances, winning awards she never chased. The trophies were never the point. Learning that courage lives on the other side of discomfort was.',
        image: '/portfolio/tattoo-01.jpg',
    },
    {
        id: 2,
        label: '02',
        headline: 'She left. Twice.\nAnd meant it both times.',
        body: 'At 17, she packed her life and moved to a new city alone. The pandemic arrived shortly after — and she navigated it by herself. Not just surviving it, but finding that mastering small, everyday things can be life\'s greatest achievement. Bravery over comfort. Every time.',
        image: '/portfolio/tattoo-02.jpg',
    },
    {
        id: 3,
        label: '03',
        headline: 'She became a tattoo artist\nto beat her fear of needles.',
        body: 'She could have chosen safety. A salary. A clear path. Instead she chose commission, uncertainty, and a needle she was afraid of. What pulled her through was never the business. It was the stories. Every client carried one. She wanted to give those stories a permanent shape.',
        image: '/portfolio/tattoo-03.jpg',
    },
    {
        id: 4,
        label: '04',
        headline: 'She turns what people\ncarry into what they wear.',
        body: 'Today she is a creative and tattoo artist based in Mumbai. What she actually does is listen — until she understands what someone means, not just what they say. Then she translates it. Into something permanent. A scar into art. A chapter into a symbol. A feeling into a form that stays.',
        image: '/portfolio/tattoo-04.jpg',
    },
];

export default function StoryScroll() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    return (
        <section
            ref={containerRef}
            style={{
                position: 'relative',
                height: '500vh',
                background: '#0D0D0D',
                borderTop: '1px solid rgba(253,255,233,0.05)',
            }}
        >
            <div style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                overflow: 'hidden',
            }}>

                {/* ── LEFT: Sticky text column ── */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '0 64px 0 64px',
                    borderRight: '1px solid rgba(253,255,233,0.05)',
                    position: 'relative',
                }}>

                    {/* Section label */}
                    <p style={{
                        fontFamily: 'Lato, sans-serif',
                        fontSize: '0.65rem',
                        letterSpacing: '0.25em',
                        color: '#C4FF61',
                        textTransform: 'uppercase',
                        marginBottom: '64px',
                        opacity: 0.8,
                    }}>
                        · The Work
                    </p>

                    {/* Story beats — each fades in/out based on scroll */}
                    <div style={{ position: 'relative', minHeight: '280px' }}>
                        {STORY_BEATS.map((beat, i) => {
                            // Each beat active for 1/4 of scroll
                            const start = i / STORY_BEATS.length;
                            const end = (i + 1) / STORY_BEATS.length;

                            const opacity = useTransform(
                                scrollYProgress,
                                [
                                    Math.max(0, start - 0.05),
                                    start + 0.05,
                                    end - 0.05,
                                    Math.min(1, end + 0.05),
                                ],
                                [0, 1, 1, 0]
                            );

                            const y = useTransform(
                                scrollYProgress,
                                [start, end],
                                ['20px', '-20px']
                            );

                            return (
                                <motion.div
                                    key={beat.id}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        opacity,
                                        y,
                                    }}
                                >
                                    {/* Beat number */}
                                    <p style={{
                                        fontFamily: 'Lato, sans-serif',
                                        fontSize: '0.7rem',
                                        letterSpacing: '0.15em',
                                        color: 'rgba(196,255,97,0.5)',
                                        marginBottom: '24px',
                                    }}>
                                        {beat.label}
                                    </p>

                                    {/* Headline — line breaks preserved */}
                                    <h2 style={{
                                        fontFamily: "'Times New Roman', serif",
                                        fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                                        fontWeight: 700,
                                        color: '#FDFFE9',
                                        lineHeight: 1.1,
                                        letterSpacing: '-0.02em',
                                        marginBottom: '32px',
                                        whiteSpace: 'pre-line',
                                    }}>
                                        {beat.headline}
                                    </h2>

                                    {/* Body */}
                                    <p style={{
                                        fontFamily: 'Lato, sans-serif',
                                        fontSize: '1rem',
                                        lineHeight: 1.8,
                                        color: 'rgba(253,255,233,0.55)',
                                        maxWidth: '380px',
                                    }}>
                                        {beat.body}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Progress dots — bottom left */}
                    <div style={{
                        position: 'absolute',
                        bottom: '48px',
                        left: '64px',
                        display: 'flex',
                        gap: '8px',
                    }}>
                        {STORY_BEATS.map((_, i) => {
                            const isActive = Math.round(
                                scrollYProgress.get() * (STORY_BEATS.length - 1)
                            ) === i;
                            return (
                                <div
                                    key={i}
                                    style={{
                                        width: isActive ? '24px' : '6px',
                                        height: '6px',
                                        borderRadius: '3px',
                                        background: isActive
                                            ? '#C4FF61'
                                            : 'rgba(253,255,233,0.15)',
                                        transition: 'width 0.4s ease, background 0.3s ease',
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* ── RIGHT: Scrolling images column ── */}
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                    {STORY_BEATS.map((beat, i) => {
                        // Each image scrolls through its own quarter of the section
                        const start = i / STORY_BEATS.length;
                        const end = (i + 1) / STORY_BEATS.length;

                        const imageY = useTransform(
                            scrollYProgress,
                            [start, end],
                            ['5%', '-5%']
                        );

                        const imageOpacity = useTransform(
                            scrollYProgress,
                            [
                                Math.max(0, start - 0.02),
                                start + 0.08,
                                end - 0.08,
                                Math.min(1, end + 0.02),
                            ],
                            [0, 1, 1, 0]
                        );

                        const imageScale = useTransform(
                            scrollYProgress,
                            [start, end],
                            [1.05, 1]
                        );

                        return (
                            <motion.div
                                key={beat.id}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    opacity: imageOpacity,
                                }}
                            >
                                <motion.img
                                    src={beat.image}
                                    alt={beat.headline}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        y: imageY,
                                        scale: imageScale,
                                        filter: 'grayscale(10%) contrast(1.05) brightness(0.85)',
                                        willChange: 'transform',
                                    }}
                                />
                                {/* Subtle left gradient — blends into sticky column */}
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to right, rgba(13,13,13,0.3) 0%, transparent 30%)',
                                    pointerEvents: 'none',
                                }} />
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
