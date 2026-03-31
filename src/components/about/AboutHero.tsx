'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import LineReveal from '@/components/ui/LineReveal';

export default function AboutHero() {
    return (
        <section style={{ height: '100vh', display: 'flex', background: '#0D0D0D', position: 'relative' }}>

            {/* ── LEFT COLUMN: Text ── */}
            <div style={{
                width: '40%',
                padding: '120px 64px 80px 64px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                zIndex: 2,
            }}>

                {/* Top Label */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    style={{
                        fontFamily: 'Lato, sans-serif',
                        fontSize: '0.65rem',
                        letterSpacing: '0.25em',
                        color: '#C4FF61',
                        textTransform: 'uppercase',
                        margin: 0,
                    }}
                >
                    meet prerna<br />
                    Creative & Tattoo Artist · Mumbai
                </motion.p>

                {/* Bottom Headline & Callout */}
                <div>
                    <div style={{ marginBottom: '48px' }}>
                        <LineReveal
                            text="She started scared."
                            tag="h1"
                            delay={0.4}
                            style={{
                                fontFamily: "'Times New Roman', serif",
                                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                                fontWeight: 700,
                                color: "#FDFFE9",
                                lineHeight: 1.05,
                                margin: "0 0 8px 0",
                            }}
                        />
                        <LineReveal
                            text="She showed up anyway."
                            tag="h1"
                            delay={0.5}
                            style={{
                                fontFamily: "'Times New Roman', serif",
                                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                                fontWeight: 700,
                                color: "#FDFFE9",
                                lineHeight: 1.05,
                                margin: "0 0 8px 0",
                            }}
                        />
                        <LineReveal
                            text="That's the whole story."
                            tag="h1"
                            delay={0.6}
                            style={{
                                fontFamily: "'Times New Roman', serif",
                                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                                fontWeight: 700,
                                color: "#FDFFE9",
                                lineHeight: 1.05,
                                margin: 0,
                            }}
                        />
                    </div>

                    <motion.p
                        animate={{ y: [0, 6, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        style={{
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '0.7rem',
                            letterSpacing: '0.15em',
                            color: 'rgba(253,255,233,0.35)',
                            textTransform: 'uppercase',
                            margin: 0,
                        }}
                    >
                        ↓ Read it below
                    </motion.p>
                </div>
            </div>

            {/* ── RIGHT COLUMN: Image ── */}
            <div style={{ width: '60%', position: 'relative' }}>
                <motion.div
                    initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                    animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                    transition={{ duration: 1.4, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                    style={{ position: 'absolute', inset: 0 }}
                >
                    <Image
                        src="/hero/prerna-hero.jpg"
                        alt="Prerna - Creative & Tattoo Artist"
                        fill
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center top',
                            filter: 'grayscale(10%) contrast(1.05) brightness(0.75)',
                        }}
                        priority
                    />
                </motion.div>
            </div>

        </section>
    );
}
