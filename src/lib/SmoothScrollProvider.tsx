"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScrollProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t: number) =>
                t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
            orientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.5,
            infinite: false,
        });

        // Bridge Lenis scroll position to Framer Motion
        lenis.on("scroll", () => {
            window.dispatchEvent(new Event("scroll"));
        });

        // Connect Lenis with GSAP ScrollTrigger
        ScrollTrigger.scrollerProxy(document.body, {
            scrollTop(value?: number) {
                if (arguments.length && value !== undefined) {
                    lenis.scrollTo(value);
                }
                return lenis.animatedScroll;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            pinType: document.body.style.transform ? "transform" : "fixed",
        });

        // Refresh ScrollTrigger when Lenis updates
        lenis.on("scroll", ScrollTrigger.update);

        // RAF loop — required for Lenis to function
        let rafId: number;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        // Initial refresh
        ScrollTrigger.refresh();

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return <>{children}</>;
}
