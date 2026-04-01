'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import LineReveal from '@/components/ui/LineReveal';
import WordReveal from '@/components/ui/WordReveal';

interface StoryBeatFullProps {
    beat: "02" | "04";
    fullBleedImage?: boolean;
}

export default function StoryBeatFull({ beat, fullBleedImage }: StoryBeatFullProps) {

    if (beat === "02") {
        return (
            <section style={{
                position: 'relative',
                background: '#0D0D0D',
                padding: '160px 64px',
                textAlign: 'center',
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontFamily: "'Times New Roman', serif",
                    fontWeight: 700,
                    fontSize: '22rem',
                    color: 'rgba(196,255,97,0.025)',
                    lineHeight: 1,
                    userSelect: 'none',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}>
                    17
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <p style={{
                        fontFamily: 'Lato, sans-serif',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: '0.25em',
                        color: '#C4FF61',
                        textTransform: 'uppercase',
                        marginBottom: '48px',
                    }}>
                        · 02  The Leaving
                    </p>

                    <div style={{ marginBottom: '64px' }}>
                        <LineReveal
                            text="She left home twice."
                            tag="h2"
                            delay={0.2}
                            style={{
                                fontFamily: "'Times New Roman', serif",
                                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                                fontWeight: 700,
                                color: "#FDFFE9",
                                margin: "0 0 8px 0",
                            }}
                        />
                        <LineReveal
                            text="And meant it both times."
                            tag="h2"
                            delay={0.35}
                            style={{
                                fontFamily: "'Times New Roman', serif",
                                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                                fontWeight: 700,
                                color: "#FDFFE9",
                                margin: 0,
                            }}
                        />
                    </div>

                    <div style={{
                        fontFamily: 'Lato, sans-serif',
                        fontSize: '1.05rem',
                        lineHeight: 1.9,
                        color: 'rgba(253,255,233,0.6)',
                        maxWidth: '600px',
                        margin: '0 auto',
                    }}>
                        <WordReveal text="At 17, she packed her life and moved to a new city alone." delay={0.5} stagger={0.02} />
                        <br /><br />
                        <WordReveal text="She navigated the pandemic by herself, finding that mastering small, everyday things can be life's greatest achievement." delay={0.65} stagger={0.02} />
                    </div>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 1, ease: [0.76, 0, 0.24, 1] }}
                        style={{
                            width: '48px',
                            height: '1px',
                            background: '#C4FF61',
                            opacity: 0.4,
                            margin: '64px auto 0',
                        }}
                    />
                </div>
            </section>
        );
    }

    // Beat 04
    return (
        <section style={{
            position: 'relative',
            height: '100vh',
            background: '#0D0D0D',
        }}>
            <Image
                src="/hero/prerna-hero.jpg"
                alt="Prerna Working"
                fill
                style={{
                    objectFit: 'cover',
                    objectPosition: 'center center',
                    filter: 'grayscale(15%) brightness(0.55)',
                }}
            />
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(13,13,13,0.95) 0%, transparent 100%)',
            }} />

            <div style={{
                position: 'absolute',
                bottom: '80px',
                left: '64px',
                maxWidth: '560px',
                zIndex: 2,
            }}>
                <p style={{
                    fontFamily: 'Lato, sans-serif',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.25em',
                    color: '#C4FF61',
                    textTransform: 'uppercase',
                    marginBottom: '32px',
                }}>
                    · 04  Now
                </p>

                <div style={{ marginBottom: '24px' }}>
                    <LineReveal text="Today she works in" tag="h2" delay={0.2} style={{ fontFamily: "'Times New Roman', serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 700, color: "#FDFFE9", margin: "0 0 4px 0", lineHeight: 1.0 }} />
                    <LineReveal text="every medium that" tag="h2" delay={0.3} style={{ fontFamily: "'Times New Roman', serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 700, color: "#FDFFE9", margin: "0 0 4px 0", lineHeight: 1.0 }} />
                    <LineReveal text="matters to her." tag="h2" delay={0.4} style={{ fontFamily: "'Times New Roman', serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 700, color: "#FDFFE9", margin: 0, lineHeight: 1.0 }} />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontFamily: 'Lato, sans-serif',
                        fontSize: '1rem',
                        lineHeight: 1.8,
                        color: 'rgba(253,255,233,0.7)',
                        maxWidth: '480px',
                    }}
                >
                    <p style={{ margin: '0 0 16px 0' }}>Tattoo. Illustration. Painting. Wall art. Vitiligo art. Permanent makeup. Restoration.</p>
                    <p style={{ margin: 0 }}>
                        Whatever the story calls for — she finds the right surface for it.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
