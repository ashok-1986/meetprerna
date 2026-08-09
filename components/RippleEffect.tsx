"use client";

import React, { useEffect, useRef } from "react";

interface RippleEffectProps {
  image: string;
  intensity?: number;
  rippleCount?: number;
  rippleInterval?: number;
  rippleSize?: number;
  className?: string;
}

export default function RippleEffect({
  image,
  intensity = 3,
  rippleCount = 2,
  rippleInterval = 4000,
  rippleSize = 30,
  className = "",
}: RippleEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;

    const loadRippleScript = (callback: () => void) => {
      // @ts-ignore
      if (!window.$) {
        const jq = document.createElement("script");
        jq.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js";
        jq.async = true;
        jq.onload = () => {
          const rp = document.createElement("script");
          rp.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery.ripples/0.5.3/jquery.ripples.min.js";
          rp.async = true;
          rp.onload = callback;
          document.body.appendChild(rp);
        };
        document.body.appendChild(jq);
      // @ts-ignore
      } else if (!window.$.fn?.ripples) {
        const rp = document.createElement("script");
        rp.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery.ripples/0.5.3/jquery.ripples.min.js";
        rp.async = true;
        rp.onload = callback;
        document.body.appendChild(rp);
      } else {
        callback();
      }
    };

    loadRippleScript(() => {
      if (!active || !containerRef.current) return;
      // @ts-ignore
      if (!window.$ || typeof window.$.fn?.ripples !== "function") {
        console.error("Ripples.js failed to load.");
        return;
      }

      // @ts-ignore
      const $el = window.$(containerRef.current);
      try {
        $el.ripples("destroy");
      } catch (_) {}

      $el.ripples({
        resolution: 512,
        perturbance: 0.04, // Slightly increased perturbance for better cursor visibility
        interactive: true,
      });
    });

    return () => {
      active = false;
      // @ts-ignore
      if (containerRef.current && window.$?.fn?.ripples) {
        try {
          // @ts-ignore
          window.$(containerRef.current).ripples("destroy");
        } catch (_) {}
      }
    };
  }, [intensity, rippleCount, rippleInterval, rippleSize, image]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
