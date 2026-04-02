'use client';

import { motion } from 'framer-motion';
import LineReveal from '@/components/ui/LineReveal';
import WordReveal from '@/components/ui/WordReveal';

export default function AboutCTA() {
    return (
        <section style={{
            background: '#0D0D0D',
            padding: '160px 64px',
            textAlign: 'center',
        }}>

            <p style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                color: '#C4FF61',
                textTransform: 'uppercase',
                marginBottom: '48px',
            }}>
                · Ready?
            </p>

            <div style={{ marginBottom: '32px' }}>
                <LineReveal text="If something in this" tag="h2" delay={0.2} style={headlineStyle} />
                <LineReveal text="page felt familiar —" tag="h2" delay={0.3} style={headlineStyle} />
                <LineReveal text="that's enough to start." tag="h2" delay={0.4} style={headlineStyle} />
            </div>

            <div style={{
                maxWidth: '460px',
                margin: '0 auto 48px',
                fontFamily: 'Lato, sans-serif',
                fontSize: '1rem',
                lineHeight: 1.8,
                color: 'rgba(253,255,233,0.5)',
            }}>
                <WordReveal text="She takes a small number of appointments each month. Not because of demand — because of what each one requires." delay={0.6} stagger={0.02} />
                <br /><br />
                <WordReveal text="If you've been carrying something that deserves a shape, she would like to hear about it." delay={0.8} stagger={0.02} />
            </div>

            <div style={{ marginBottom: '48px' }}>
                <p style={{
                    fontFamily: "'Times New Roman', serif",
                    fontStyle: 'italic',
                    fontSize: '1.3rem',
                    color: 'rgba(253,255,233,0.35)',
                    margin: '0 0 8px 0',
                }}>
                    She turns scars into art.
                </p>
                <p style={{
                    fontFamily: "'Times New Roman', serif",
                    fontStyle: 'italic',
                    fontSize: '1.3rem',
                    color: 'rgba(253,255,233,0.35)',
                    margin: 0,
                }}>
                    Yours is next, if you're ready.
                </p>
            </div>

            {/* Buttons */}
            <div
                style={{
                    display: "flex",
                    gap: "16px",
                    justifyContent: "center",
                    flexWrap: "wrap",
                }}
            >
                <a
                    href="/#portfolio"
                    className="cta-button-primary"
                    style={{
                        fontFamily: "Lato, sans-serif",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        letterSpacing: "0.12em",
                        color: "#1A1A1A",
                        background: "#C4FF61",
                        padding: "16px 40px",
                        borderRadius: "100px",
                        textDecoration: "none",
                        textTransform: "uppercase",
                        transition: "background 0.3s, transform 0.2s",
                        display: "inline-block",
                    }}
                >
                    See the work →
                </a>

                <a
                    href="https://meetprerna.fillout.com/book"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-button-secondary"
                    data-cursor="book"
                    style={{
                        fontFamily: "Lato, sans-serif",
                        fontWeight: 400,
                        fontSize: "0.75rem",
                        letterSpacing: "0.12em",
                        color: "rgba(253,255,233,0.6)",
                        background: "transparent",
                        padding: "16px 40px",
                        borderRadius: "100px",
                        border: "1px solid rgba(253,255,233,0.2)",
                        textDecoration: "none",
                        textTransform: "uppercase",
                        transition: "border-color 0.3s, color 0.3s",
                        display: "inline-block",
                    }}
                >
                    Begin the conversation
                </a>
            </div>

        </section>
    );
}

const headlineStyle = {
    fontFamily: "'Times New Roman', serif",
    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
    fontWeight: 500,
    color: "#FDFFE9",
    margin: "0 0 4px 0",
};
