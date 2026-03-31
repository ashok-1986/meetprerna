'use client';

import LineReveal from '@/components/ui/LineReveal';

export default function PhilosophyStrip() {
    return (
        <section style={{
            background: '#0D0D0D',
            padding: '120px 64px',
            borderTop: '1px solid rgba(253,255,233,0.06)',
            borderBottom: '1px solid rgba(253,255,233,0.06)',
        }}>
            <p style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                color: '#C4FF61',
                textTransform: 'uppercase',
                marginBottom: '64px',
            }}>
                · What she believes
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '48px',
            }}>

                {/* Column 1 */}
                <div style={{ paddingRight: '48px', borderRight: '1px solid rgba(253,255,233,0.06)' }}>
                    <p style={{
                        fontFamily: 'Lato, sans-serif',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        color: '#C4FF61',
                        textTransform: 'uppercase',
                        marginBottom: '24px',
                    }}>
                        On stories
                    </p>
                    <LineReveal text="Every person carries something" tag="p" delay={0.2} style={quoteStyle} />
                    <LineReveal text="that deserves a shape." tag="p" delay={0.3} style={quoteStyle} />
                    <LineReveal text="Her job is to find it." tag="p" delay={0.4} style={quoteStyle} />
                </div>

                {/* Column 2 */}
                <div style={{ paddingRight: '48px', borderRight: '1px solid rgba(253,255,233,0.06)' }}>
                    <p style={{
                        fontFamily: 'Lato, sans-serif',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        color: '#C4FF61',
                        textTransform: 'uppercase',
                        marginBottom: '24px',
                    }}>
                        On permanence
                    </p>
                    <LineReveal text="She doesn't think of tattoos" tag="p" delay={0.3} style={quoteStyle} />
                    <LineReveal text="as permanent." tag="p" delay={0.4} style={quoteStyle} />
                    <LineReveal text="She thinks of them as finally honest." tag="p" delay={0.5} style={quoteStyle} />
                </div>

                {/* Column 3 */}
                <div>
                    <p style={{
                        fontFamily: 'Lato, sans-serif',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        color: '#C4FF61',
                        textTransform: 'uppercase',
                        marginBottom: '24px',
                    }}>
                        On the work
                    </p>
                    <LineReveal text="The best sessions don't feel" tag="p" delay={0.4} style={quoteStyle} />
                    <LineReveal text="like appointments." tag="p" delay={0.5} style={quoteStyle} />
                    <LineReveal text="They feel like conversations" tag="p" delay={0.6} style={quoteStyle} />
                    <LineReveal text="that happened to end in ink." tag="p" delay={0.7} style={quoteStyle} />
                </div>

            </div>
        </section>
    );
}

const quoteStyle = {
    fontFamily: "'Times New Roman', serif",
    fontStyle: 'italic',
    fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
    color: 'rgba(253,255,233,0.75)',
    lineHeight: 1.6,
    margin: '0 0 4px 0',
};
