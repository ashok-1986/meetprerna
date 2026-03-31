'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import LineReveal from '@/components/ui/LineReveal';
import WordReveal from '@/components/ui/WordReveal';

interface StoryBeatProps {
    beat: "01" | "03";
    imageRight?: boolean;
    imageLeft?: boolean;
}

export default function StoryBeat({ beat, imageRight, imageLeft }: StoryBeatProps) {

    const isO1 = beat === "01";
    const numLabel = isO1 ? "· 01  Origin" : "· 03  The Irony";
    const h1 = isO1 ? "She started scared." : "She became a tattoo artist";
    const h2 = isO1 ? "Then she performed anyway." : "to beat her fear of needles.";

    const textColumn = (
        <div style={{
            padding: '80px 64px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        }}>
            <p style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.25em',
                color: '#C4FF61',
                textTransform: 'uppercase',
                marginBottom: '48px',
            }}>
                {numLabel}
            </p>

            <div style={{ marginBottom: '48px' }}>
                <LineReveal
                    text={h1}
                    tag="h2"
                    delay={0.2}
                    style={{
                        fontFamily: "'Times New Roman', serif",
                        fontSize: "clamp(2rem, 4vw, 3.5rem)",
                        fontWeight: 700,
                        color: "#FDFFE9",
                        margin: "0 0 8px 0",
                        lineHeight: 1.1,
                    }}
                />
                <LineReveal
                    text={h2}
                    tag="h2"
                    delay={0.32}
                    style={{
                        fontFamily: "'Times New Roman', serif",
                        fontSize: "clamp(2rem, 4vw, 3.5rem)",
                        fontWeight: 700,
                        color: "#FDFFE9",
                        margin: 0,
                        lineHeight: 1.1,
                    }}
                />
            </div>

            <div style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: '1rem',
                lineHeight: 1.85,
                color: 'rgba(253,255,233,0.65)',
                maxWidth: '460px',
            }}>
                {isO1 ? (
                    <>
                        <WordReveal text="Shy. Quiet. Terrified of stages." delay={0.4} stagger={0.028} />
                        <br />
                        <WordReveal text="But somewhere between the fear and the first performance was a version of herself she wanted to meet. So she kept showing up. She planned school events. Organised dance performances. Won awards she never chased." delay={0.5} stagger={0.028} />
                        <br />
                        <WordReveal text="The trophies were never the point." delay={0.6} stagger={0.028} />
                        <br />
                        <WordReveal text="Learning that courage lives on the other side of discomfort — that was the lesson that stayed. It still is." delay={0.7} stagger={0.028} />
                    </>
                ) : (
                    <>
                        <WordReveal text="She could have chosen safety. A salary. A clear path." delay={0.4} stagger={0.028} />
                        <br />
                        <WordReveal text="Instead she chose commission. Uncertainty. And a needle she was genuinely afraid of." delay={0.5} stagger={0.028} />
                        <br />
                        <WordReveal text="She built a studio from scratch — learning client management, marketing, and operations as she went. Building confidence not from training, but from the daily decision to keep going anyway." delay={0.6} stagger={0.028} />

                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            style={{
                                borderLeft: '2px solid #C4FF61',
                                paddingLeft: '20px',
                                margin: '32px 0',
                                display: 'block',
                            }}
                        >
                            <p style={{
                                fontFamily: "'Times New Roman', serif",
                                fontStyle: 'italic',
                                fontSize: '1.1rem',
                                color: '#C4FF61',
                                margin: 0,
                            }}>
                                "She was afraid of needles. Now she uses one to help people stop being afraid of their stories."
                            </p>
                        </motion.div>

                        <WordReveal text="What pulled her through was never the business." delay={0.9} stagger={0.028} />
                        <br />
                        <WordReveal text="It was the stories. Every client carried one. She wanted to give those stories the only thing she had ever found truly permanent." delay={1.0} stagger={0.028} />
                    </>
                )}
            </div>

            {isO1 && (
                <div style={{
                    position: 'absolute',
                    right: '24px',
                    top: '50%',
                    transform: 'translateY(-50%) rotate(90deg)',
                    transformOrigin: 'center right',
                    whiteSpace: 'nowrap',
                }}>
                    <p style={{
                        fontFamily: 'Lato, sans-serif',
                        fontSize: '0.55rem',
                        fontWeight: 700,
                        letterSpacing: '0.3em',
                        color: 'rgba(196,255,97,0.15)',
                        margin: 0,
                    }}>
                        BRAVERY OVER COMFORT
                    </p>
                </div>
            )}
        </div>
    );

    const imageColumn = (
        <div style={{ position: 'relative', minHeight: '85vh' }}>
            <motion.div
                initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                style={{ position: 'absolute', inset: 0 }}
            >
                <Image
                    src="/hero/prerna-hero.jpg"
                    alt="Prerna Story Beat"
                    fill
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        filter: isO1 ? 'grayscale(15%) contrast(1.05) brightness(0.8)' : 'grayscale(10%) brightness(0.75)',
                    }}
                />
            </motion.div>
        </div>
    );

    return (
        <section style={{
            background: isO1 ? '#1A1A1A' : '#111111',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            minHeight: '85vh',
        }}>
            {imageLeft ? (
                <>
                    {imageColumn}
                    {textColumn}
                </>
            ) : (
                <>
                    {textColumn}
                    {imageColumn}
                </>
            )}
        </section>
    );
}
