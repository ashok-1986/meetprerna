"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,           // how long the momentum lasts (seconds)
            // 1.4 = Ashfall-level glide. Don't go above 2.
            easing: (t: number) =>   // custom easing — expo-out feel
                t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
            orientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 0.9,    // slightly slower than native — more control
            touchMultiplier: 1.5,    // faster on touch — mobile feels natural
            infinite: false,
        });

        // ── CRITICAL: Bridge Lenis → Framer Motion ──────────────────
        // Framer Motion's useScroll reads window.scrollY by default.
        // Lenis uses its own virtual scroll position.
        // This bridge keeps them in sync so useScroll hooks still work.
        lenis.on("scroll", () => {
            // Dispatch a native scroll event so Framer Motion picks it up
            window.dispatchEvent(new Event("scroll"));
        });

        // ── RAF loop — Lenis requires this to run ───────────────────
        let rafId: number;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        // ── Cleanup ─────────────────────────────────────────────────
        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
