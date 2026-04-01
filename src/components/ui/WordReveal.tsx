"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface WordRevealProps {
    text: string;
    delay?: number;
    stagger?: number;
    duration?: number;
    className?: string;
    style?: React.CSSProperties;
    as?: React.ElementType;
}

export default function WordReveal({
    text,
    delay = 0,
    stagger = 0.04,
    duration = 0.5,
    className,
    style,
    as: Tag = "p",
}: WordRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const words = text.split(" ");

    return (
        <Tag
            ref={ref as any}
            className={className}
            style={{ display: "block", ...style }}
        >
            {words.map((word, i) => (
                <span
                    key={i}
                    style={{
                        display: "inline-block",
                        overflow: "hidden",
                        verticalAlign: "bottom",
                        marginRight: i < words.length - 1 ? "0.28em" : 0,
                    }}
                >
                    <motion.span
                        initial={{ y: "110%", opacity: 0 }}
                        animate={isInView ? { y: "0%", opacity: 1 } : {}}
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
        </Tag>
    );
}
