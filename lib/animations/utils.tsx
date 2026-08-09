import React from "react";

/**
 * A lightweight utility to split text into words for GSAP scrub reveals.
 * It replaces the paid GSAP SplitText plugin.
 * Wraps each word in a hidden overflow container, and an inner span for translation.
 */
export const SplitTextWord = ({ text }: { text: string }) => {
  return (
    <span aria-label={text} className="inline-block">
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: "0.25em" }}
        >
          <span className="word-inner inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </span>
  );
};
