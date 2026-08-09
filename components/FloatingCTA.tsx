"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FloatingCTA() {
  const btnRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    if (!btnRef.current) return;

    gsap.fromTo(btnRef.current,
      { opacity: 0, y: 20, pointerEvents: "none" },
      {
        opacity: 1,
        y: 0,
        pointerEvents: "auto",
        duration: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: document.body,
          start: "top -800px", // appears after scrolling down 800px (past hero)
          endTrigger: "#inquiry-form", // the form container
          end: "top bottom", // when the top of the form hits the bottom of the viewport
          toggleActions: "play reverse play reverse"
        }
      }
    );
  }, []);

  return (
    <a
      ref={btnRef}
      href="#inquiry-form"
      className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-50 bg-inchworm text-ink font-mono text-xs md:text-sm tracking-widest uppercase px-6 py-4 rounded-full shadow-lg hover:bg-ivory transition-colors"
    >
      Start Inquiry
    </a>
  );
}
