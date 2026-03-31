'use client';

import { motion } from 'framer-motion';
import WordReveal from '@/components/ui/WordReveal';

export default function AboutTestimonials() {
    return (
        <section style={{
            background: '#111111',
            padding: '120px 64px',
            borderTop: '1px solid rgba(253,255,233,0.05)',
        }}>

            <p style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                color: '#C4FF61',
                textTransform: 'uppercase',
                marginBottom: '64px',
            }}>
                · What they carried home
            </p>

            <div style={{ marginBottom: '80px' }}>
                <p style={{
                    fontFamily: "'Times New Roman', serif",
                    fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                    fontStyle: 'italic',
                    color: 'rgba(253,255,233,0.25)',
                    maxWidth: '700px',
                    margin: 0,
                }}>
                    They came with something to say.<br />
                    She helped them say it permanently.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '40px',
            }}>

                {/* Card 1 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={cardStyle}
                >
                    <span style={quoteMarkStyle}>"</span>
                    <WordReveal
                        text="Prerna went through the entire process with me and I got the exact tattoo I asked for. But more than that — she understood what I meant, not just what I said. It turned out more beautiful than I had imagined."
                        delay={0.3}
                        stagger={0.02}
                        style={quoteTextStyle}
                    />
                    <div style={{ marginTop: '40px' }}>
                        <p style={nameStyle}>Rutuja Babar</p>
                        <p style={detailStyle}>Custom design · Studio visit</p>
                    </div>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    style={cardStyle}
                >
                    <span style={quoteMarkStyle}>"</span>
                    <WordReveal
                        text="This was my first tattoo and I was nervous. But Prerna did a great job — it didn't hurt as much as I feared, and the tattoo came out exactly how I wanted. She created something I'll wear proudly for the rest of my life."
                        delay={0.45}
                        stagger={0.02}
                        style={quoteTextStyle}
                    />
                    <div style={{ marginTop: '40px' }}>
                        <p style={nameStyle}>Amala James</p>
                        <p style={detailStyle}>First tattoo · Fine line</p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

const cardStyle = {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(253,255,233,0.07)',
    borderRadius: '3px',
    padding: '48px',
    position: 'relative' as const,
};

const quoteMarkStyle = {
    fontFamily: "'Times New Roman', serif",
    fontSize: '4rem',
    color: '#C4FF61',
    opacity: 0.2,
    lineHeight: 1,
    position: 'absolute' as const,
    top: '24px',
    left: '32px',
};

const quoteTextStyle = {
    fontFamily: "'Times New Roman', serif",
    fontStyle: 'italic',
    fontSize: '1.15rem',
    color: 'rgba(253,255,233,0.85)',
    lineHeight: 1.65,
    position: 'relative' as const,
    zIndex: 1,
};

const nameStyle = {
    fontFamily: 'Lato, sans-serif',
    fontWeight: 700,
    fontSize: '0.8rem',
    letterSpacing: '0.1em',
    color: '#FDFFE9',
    margin: '0 0 4px 0',
    textTransform: 'uppercase' as const,
};

const detailStyle = {
    fontFamily: 'Lato, sans-serif',
    fontSize: '0.75rem',
    color: 'rgba(253,255,233,0.3)',
    margin: 0,
};
