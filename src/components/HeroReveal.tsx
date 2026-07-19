"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const TOTAL_FRAMES = 190;
const FRAME_BASE_URL = "https://rbbxjambmvhupuwegwls.supabase.co/storage/v1/object/public/meetprerna";

function getFrameUrl(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `${FRAME_BASE_URL}/frame_${padded}_delay-0.041s.webp`;
}

export default function HeroReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const rafRef = useRef<number | undefined>(undefined);
  const targetFrameRef = useRef(0);

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = document.createElement("img");
      img.src = getFrameUrl(i);
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
      };
      img.onerror = () => {
        loaded++;
        setLoadedCount(loaded);
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    function resize() {
      const canvasEl = canvasRef.current!;
      const ctxEl = ctxRef.current!;
      const dpr = window.devicePixelRatio || 1;
      canvasEl.width = window.innerWidth * dpr;
      canvasEl.height = window.innerHeight * dpr;
      canvasEl.style.width = `${window.innerWidth}px`;
      canvasEl.style.height = `${window.innerHeight}px`;
      ctxEl.scale(dpr, dpr);
    }

    resize();
    window.addEventListener("resize", resize);

    function render() {
      if (!ctxRef.current || imagesRef.current.length === 0) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      const frameIndex = Math.min(Math.floor(targetFrameRef.current), TOTAL_FRAMES - 1);
      const img = imagesRef.current[frameIndex];

      if (img && img.complete) {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = ctxRef.current!;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const scale = Math.max(
          canvas.clientWidth / img.width,
          canvas.clientHeight / img.height
        );
        const drawWidth = img.width * scale;
        const drawHeight = img.height * scale;
        const x = (canvas.clientWidth - drawWidth) / 2;
        const y = (canvas.clientHeight - drawHeight) / 2;

        ctx.drawImage(img, x, y, drawWidth, drawHeight);
      }

      rafRef.current = requestAnimationFrame(render);
    }

    render();

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loadedCount]);

  // GSAP ScrollTrigger - drive frame progression on scroll
  useGSAP(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#hero-canvas",
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
        onUpdate: (self) => {
          targetFrameRef.current = self.progress * (TOTAL_FRAMES - 1);
        },
      });

      // Text reveal animations
      gsap.fromTo(
        ".hero-label",
        { opacity: 0, y: 20 },
        {
          opacity: 0.7,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.4,
          scrollTrigger: { trigger: "#hero-canvas", start: "top top" },
        }
      );

      gsap.fromTo(
        ".hero-headline",
        { opacity: 0, y: "110%" },
        {
          opacity: 1,
          y: "0%",
          duration: 1.4,
          ease: "expo.out",
          stagger: 0.15,
          delay: 0.6,
          scrollTrigger: { trigger: "#hero-canvas", start: "top top" },
        }
      );

      gsap.fromTo(
        ".hero-tagline",
        { opacity: 0, y: 20 },
        {
          opacity: 0.75,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 1.3,
          scrollTrigger: { trigger: "#hero-canvas", start: "top top" },
        }
      );

      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          delay: 1.7,
          scrollTrigger: { trigger: "#hero-canvas", start: "top top" },
        }
      );

      // Parallax for overlay gradients
      gsap.to(".hero-gradient-left", {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero-canvas",
          start: "top top",
          end: "bottom top",
          scrub: 0.3,
        },
      });

      gsap.to(".hero-gradient-bottom", {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero-canvas",
          start: "top center",
          end: "bottom top",
          scrub: 0.3,
        },
      });
    }, canvasRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── STICKY TEXT OVERLAY ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 20,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingBottom: "80px",
          paddingLeft: "64px",
          paddingRight: "40%",
        }}
      >
        {/* City / title label */}
        <p className="hero-label" style={{
          fontFamily: "Lato, sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.3em",
          color: "#C4FF61",
          textTransform: "uppercase",
          marginBottom: "24px",
          display: "block",
        }}>
          Navi Mumbai · Mumbai · Artist & Creator · Skin Illustrator
        </p>

        {/* Main tagline — NOT the brand name */}
        <div style={{ overflow: "hidden", marginBottom: "8px" }}>
          <h1 className="hero-headline" style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            fontWeight: 500,
            color: "rgba(253,255,233,0.92)",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            margin: 0,
          }}>
            She carries no studio.
          </h1>
        </div>

        <div style={{ overflow: "hidden", marginBottom: "8px" }}>
          <h1 className="hero-headline" style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            fontWeight: 500,
            color: "rgba(253,255,233,0.92)",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            margin: 0,
          }}>
            Only a needle
          </h1>
        </div>

        <div style={{ overflow: "hidden", marginBottom: "40px" }}>
          <h1 className="hero-headline" style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            fontWeight: 500,
            fontStyle: "italic",
            color: "#C4FF61",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            margin: 0,
          }}>
            and everything she knows.
          </h1>
        </div>

        {/* Tagline below headline */}
        <div style={{ overflow: "hidden", marginBottom: "40px" }}>
          <p className="hero-tagline" style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
            fontStyle: "italic",
            color: "rgba(253,255,233,0.55)",
            margin: 0,
            letterSpacing: "0.01em",
          }}>
            Every city. Every skin. Every story — permanent.
          </p>
        </div>

        {/* CTA button */}
        <a
          className="hero-cta"
          href="https://meetprerna.fillout.com/book"
          style={{
            display: "inline-block",
            fontFamily: "Lato, sans-serif",
            fontWeight: 700,
            fontSize: "0.72rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#1A1A1A",
            background: "#C4FF61",
            padding: "14px 32px",
            borderRadius: "100px",
            textDecoration: "none",
            transition: "background 0.3s ease, transform 0.2s ease",
          }}
          data-cursor="book"
        >
          Start your journey
        </a>
      </div>

      {/* ── CANVAS SECTION: 350vh tall for long scroll ── */}
      <section
        id="hero-canvas"
        style={{
          position: "relative",
          height: "350vh",
          background: "#0D0D0D",
        }}
      >
        {/* Canvas fills viewport, stays fixed via sticky parent context */}
        <canvas
          ref={canvasRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            zIndex: 1,
          }}
        />

        {/* Gradient overlays — ensures text legibility */}
        <div
          className="hero-gradient-left"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
            background: "linear-gradient(to right, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.4) 50%, transparent 100%)",
          }}
        />
        <div
          className="hero-gradient-bottom"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
            background: "linear-gradient(to top, rgba(13,13,13,0.9) 0%, transparent 50%)",
          }}
        />
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
            background: "linear-gradient(to bottom, rgba(13,13,13,0.6) 0%, transparent 25%)",
          }}
        />

        {/* Grain overlay */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 3,
            pointerEvents: "none",
            opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Loading indicator */}
        {loadedCount < TOTAL_FRAMES && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 5,
              fontFamily: "Lato, sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              color: "#C4FF61",
              textTransform: "uppercase",
              opacity: 0.6,
            }}
          >
            Loading {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
          </div>
        )}
      </section>
    </>
  );
}