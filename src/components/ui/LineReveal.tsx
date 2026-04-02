// File: src/components/ui/LineReveal.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface LineRevealProps {
    text: string;           // the text to animate
    tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span"; // HTML element
    delay?: number;         // seconds before animation starts
    duration?: number;      // animation duration (default 0.9)
    className?: string;
    style?: React.CSSProperties;
}

export default function LineReveal({
    text,
    tag: Tag = "p",
    delay = 0,
    duration = 0.9,
    className,
    style,
}: LineRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    // Trigger when 80px of element enters viewport
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        // Outer div: clips the inner motion div
        // overflow hidden is what creates the "slide from behind" effect
        <div
            ref={ref}
            style={{ overflow: "hidden", display: "block", paddingBottom: "0.15em", marginBottom: "-0.15em", ...style }}
            className={className}
        >
            <motion.div
                initial={{ y: "105%" }}           // starts below clip boundary
                animate={isInView ? { y: "0%" } : { y: "105%" }}
                transition={{
                    duration,
                    delay,
                    ease: [0.16, 1, 0.3, 1],        // expo-out — fast start, slow settle
                }}
            >
                <Tag style={{ margin: 0, display: "block" }}>
                    {text}
                </Tag>
            </motion.div>
        </div>
    );
}
