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
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '32px',
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
                    <LineReveal text="Every person she meets is" tag="p" delay={0.2} style={quoteStyle} />
                    <LineReveal text="carrying something." tag="p" delay={0.3} style={quoteStyle} />
                    <LineReveal text="She can usually tell what it is" tag="p" delay={0.4} style={quoteStyle} />
                    <LineReveal text="before they say it." tag="p" delay={0.5} style={quoteStyle} />
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
                    <LineReveal text="Permanent isn't the point." tag="p" delay={0.3} style={quoteStyle} />
                    <LineReveal text="Honest is." tag="p" delay={0.4} style={quoteStyle} />
                    <LineReveal text="The tattoo is just how honesty" tag="p" delay={0.5} style={quoteStyle} />
                    <LineReveal text="gets to stay." tag="p" delay={0.6} style={quoteStyle} />
                </div>

                {/* Column 3 */}
                <div style={{ paddingRight: '32px', borderRight: '1px solid rgba(253,255,233,0.06)' }}>
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
                    <LineReveal text="The best sessions —" tag="p" delay={0.4} style={quoteStyle} />
                    <LineReveal text="she forgets to watch the clock." tag="p" delay={0.5} style={quoteStyle} />
                    <LineReveal text="The client forgets it hurts." tag="p" delay={0.6} style={quoteStyle} />
                    <LineReveal text="That's when she knows it was right." tag="p" delay={0.7} style={quoteStyle} />
                </div>

                {/* Column 4 */}
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
                        On medium
                    </p>
                    <LineReveal text="She doesn't choose a medium" tag="p" delay={0.5} style={quoteStyle} />
                    <LineReveal text="because it's expected." tag="p" delay={0.6} style={quoteStyle} />
                    <LineReveal text="She chooses it because the" tag="p" delay={0.7} style={quoteStyle} />
                    <LineReveal text="story demands it." tag="p" delay={0.8} style={quoteStyle} />
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
