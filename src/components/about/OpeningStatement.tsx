'use client';

import LineReveal from '@/components/ui/LineReveal';
import WordReveal from '@/components/ui/WordReveal';

export default function OpeningStatement() {
    return (
        <section style={{
            background: '#0D0D0D',
            padding: '120px 64px',
        }}>
            <div style={{
                maxWidth: '780px',
                margin: '0 auto',
            }}>
                <WordReveal
                    text="She was always an artist. She just kept finding new ways to make that permanent."
                    delay={0.2}
                    stagger={0.03}
                    style={{
                        fontFamily: "'Times New Roman', serif",
                        fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                        fontWeight: 400,
                        color: "#FDFFE9",
                        lineHeight: 1.4,
                        marginBottom: '64px',
                    }}
                />

                <div style={{ textAlign: 'center' }}>
                    <LineReveal
                        text='"She was never just a tattoo artist.'
                        tag="p"
                        delay={0.6}
                        style={{
                            fontFamily: "'Times New Roman', serif",
                            fontStyle: 'italic',
                            fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
                            color: "rgba(253,255,233,0.3)",
                            margin: "0 0 8px 0",
                        }}
                    />
                    <LineReveal
                        text='She was always someone who listened first."'
                        tag="p"
                        delay={0.7}
                        style={{
                            fontFamily: "'Times New Roman', serif",
                            fontStyle: 'italic',
                            fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
                            color: "rgba(253,255,233,0.3)",
                            margin: 0,
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
