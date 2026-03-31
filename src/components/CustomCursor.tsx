"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // mobile detection to hide cursor
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      const dot = document.querySelector(".cursor-dot") as HTMLElement;
      const ring = document.querySelector(".cursor-ring") as HTMLElement;
      if (dot && ring) {
        dot.style.display = "none";
        ring.style.display = "none";
      }
      return;
    }

    const dot = document.querySelector(".cursor-dot") as HTMLElement;
    const ring = document.querySelector(".cursor-ring") as HTMLElement;

    if (!dot || !ring) return;

    let ringX = 0, ringY = 0;
    let mouseX = 0, mouseY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows instantly
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    };

    // Ring follows with lag via RAF
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      rafId = requestAnimationFrame(animateRing);
    };

    // Hover effect on interactive elements
    const onEnter = () => {
      dot.style.transform = "translate(-50%, -50%) scale(0)";
      ring.style.transform = "translate(-50%, -50%) scale(2)";
      ring.style.background = "rgba(196,255,97,0.1)";
    };
    const onLeave = () => {
      dot.style.transform = "translate(-50%, -50%) scale(1)";
      ring.style.transform = "translate(-50%, -50%) scale(1)";
      ring.style.background = "transparent";
    };

    const interactives = document.querySelectorAll(
      "a, button, [data-cursor='hover']"
    );

    window.addEventListener("mousemove", onMove);
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <>
      <div
        className="cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          background: "#C4FF61",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 2147483647, // maximum possible z-index
          transform: "translate(-50%, -50%)",
          transition: "transform 0.1s ease, width 0.3s ease, height 0.3s ease",
          willChange: "transform",
        }}
      />
      <div
        className="cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "32px",
          height: "32px",
          border: "1px solid rgba(196,255,97,0.6)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 2147483647,
          transform: "translate(-50%, -50%)",
          transition: "transform 0.08s linear",
          willChange: "transform",
        }}
      />
    </>,
    document.body // renders directly into body — escapes all stacking contexts
  );
}