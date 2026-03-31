'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function WorkingSection() {
    return (
        <section style={{
            background: '#1A1A1A',
            padding: '120px 64px',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
            gap: '80px',
        }}>

            {/* ── LEFT: Large working image ── */}
            <div style={{ position: 'relative', height: '600px' }}>
                <motion.div
                    initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                    whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '3px',
                        overflow: 'hidden',
                    }}
                >
                    <Image
                        src="/hero/prerna-hero.jpg"
                        alt="Prerna Working"
                        fill
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            filter: 'grayscale(15%) contrast(1.05)',
                        }}
                    />
                </motion.div>
            </div>

            {/* ── RIGHT: Text Blocks ── */}
            <div style={{ padding: '32px 0' }}>
                <p style={{
                    fontFamily: 'Lato, sans-serif',
                    fontSize: '0.65rem',
                    letterSpacing: '0.25em',
                    color: '#C4FF61',
                    textTransform: 'uppercase',
                    marginBottom: '48px',
                }}>
                    · The practice
                </p>

                {/* Block 1 */}
                <div style={{ marginBottom: '48px' }}>
                    <h3 style={{
                        fontFamily: "'Times New Roman', serif",
                        fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                        fontWeight: 700,
                        color: '#FDFFE9',
                        lineHeight: 1.1,
                        margin: '0 0 24px 0',
                        maxWidth: '400px',
                    }}>
                        She approaches every consultation as a practice.
                    </h3>
                    <p style={{
                        fontFamily: 'Lato, sans-serif',
                        fontSize: '0.95rem',
                        lineHeight: 1.8,
                        color: 'rgba(253,255,233,0.6)',
                        margin: 0,
                        maxWidth: '420px',
                    }}>
                        Not a sales conversation. Not a design brief. A conversation about what you've been through, what you're ready to say, and what shape it wants to take. She listens longer than most people expect. That's intentional.
                    </p>
                </div>

                <div style={{ height: '1px', background: 'rgba(253,255,233,0.07)', width: '100%', marginBottom: '48px' }} />

                {/* Block 2 */}
                <div style={{ marginBottom: '40px' }}>
                    <h3 style={{
                        fontFamily: "'Times New Roman', serif",
                        fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                        fontWeight: 700,
                        color: '#FDFFE9',
                        lineHeight: 1.1,
                        margin: '0 0 24px 0',
                        maxWidth: '400px',
                    }}>
                        And every needle as a form of meditation.
                    </h3>
                    <p style={{
                        fontFamily: 'Lato, sans-serif',
                        fontSize: '0.95rem',
                        lineHeight: 1.8,
                        color: 'rgba(253,255,233,0.6)',
                        margin: 0,
                        maxWidth: '420px',
                    }}>
                        The studio is quiet by design. The process is unhurried by choice. She works with precision and presence — because the quality of attention she brings is inseparable from the quality of the work itself.
                    </p>
                </div>

                {/* Detail List */}
                <div>
                    <DetailItem text="Mumbai · Studio appointments only" />
                    <DetailItem text="Custom design · No walk-ins" />
                    <DetailItem text="Fine line · Blackwork · Illustrative · Script" />
                    <DetailItem text="Consultations begin with conversation, not a price list" />
                </div>
            </div>

        </section>
    );
}

function DetailItem({ text }: { text: string }) {
    return (
        <p style={{
            fontFamily: 'Lato, sans-serif',
            fontSize: '0.75rem',
            color: 'rgba(253,255,233,0.35)',
            lineHeight: 2.2,
            margin: 0,
            display: 'flex',
            alignItems: 'center',
        }}>
            <span style={{ color: '#C4FF61', marginRight: '6px' }}>—</span> {text}
        </p>
    );
}
