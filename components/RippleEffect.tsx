"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

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
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    setIsDesktop(window.innerWidth > 768);
  }, []);

  useEffect(() => {
    if (isDesktop === false || isDesktop === null) return;

    let active = true;

    // Load the image with crossOrigin so it can be drawn to canvas without tainting.
    // Resolves null when the origin does not send CORS headers.
    const loadCorsImage = (url: string): Promise<HTMLImageElement | null> =>
      new Promise((resolve) => {
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = url;
      });

    const initRipples = (container: HTMLDivElement) => {
      // @ts-ignore
      if (!window.$ || typeof window.$.fn?.ripples !== "function") {
        console.error("Ripples.js failed to load.");
        return;
      }

      // @ts-ignore
      const $el = window.$(container);
      try {
        $el.ripples("destroy");
      } catch (_) {}

      $el.ripples({
        resolution: 512,
        perturbance: 0.04, // Slightly increased perturbance for better cursor visibility
        interactive: true,
      });
    };

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

      loadCorsImage(image).then((img) => {
        if (!active || !containerRef.current) return;

        // If the origin does not send CORS headers, keep the plain background image
        // instead of handing a tainted image to ripples.js (which renders black).
        if (!img) {
          containerRef.current.style.backgroundImage = `url(${image})`;
          return;
        }

        // Draw to a canvas and export a same-origin data URL so ripples.js can
        // read pixel data without the canvas being tainted by cross-origin data.
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);

        let dataUrl: string;
        try {
          dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        } catch (_) {
          containerRef.current.style.backgroundImage = `url(${image})`;
          return;
        }

        containerRef.current.style.backgroundImage = `url(${dataUrl})`;
        initRipples(containerRef.current);
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
  }, [intensity, rippleCount, rippleInterval, rippleSize, image, isDesktop]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...(isDesktop ? {
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        } : {})
      }}
    >
      {isDesktop !== true && (
        <Image 
          src={image} 
          alt="Background" 
          fill 
          priority 
          className="object-cover"
        />
      )}
    </div>
  );
}
