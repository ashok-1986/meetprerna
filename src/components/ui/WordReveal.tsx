// File: src/components/ui/WordReveal.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface WordRevealProps {
    text: string;
    delay?: number;          // delay before first word animates
    stagger?: number;        // delay between each word (default 0.04s)
    duration?: number;       // per-word duration (default 0.5)
    className?: string;
    style?: React.CSSProperties;
}

export default function WordReveal({
    text,
    delay = 0,
    stagger = 0.04,
    duration = 0.5,
    className,
    style,
}: WordRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    const words = text.split(" ");

    return (
        <div
            ref={ref}
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.25em",  // word spacing
                ...style,
            }}
            className={className}
        >
            {words.map((word, i) => (
                // Each word is clipped independently
                <span
                    key={i}
                    style={{ overflow: "hidden", display: "inline-block" }}
                >
                    <motion.span
                        initial={{ y: "110%", opacity: 0 }}
                        animate={
                            isInView
                                ? { y: "0%", opacity: 1 }
                                : { y: "110%", opacity: 0 }
                        }
                        transition={{
                            duration,
                            delay: delay + i * stagger,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{ display: "inline-block" }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </div>
    );
}
