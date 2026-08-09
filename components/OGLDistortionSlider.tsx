"use client";

import React, { useState, useEffect, useRef } from "react";
import { Renderer, Camera, Program, Mesh, Triangle, Texture } from "ogl";
import gsap from "gsap";

const vertexShader = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  
  uniform sampler2D tex1;
  uniform sampler2D tex2;
  uniform float u_progress;
  uniform vec2 u_res;
  uniform vec2 u_texRes1;
  uniform vec2 u_texRes2;
  
  varying vec2 vUv;

  vec2 coverUv(vec2 uv, vec2 res, vec2 texRes) {
    vec2 ratio = vec2(
      min((res.x / res.y) / (texRes.x / texRes.y), 1.0),
      min((res.y / res.x) / (texRes.y / texRes.x), 1.0)
    );
    return vec2(
      uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      uv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
  }

  void main() {
    vec2 uv = vUv;
    
    float p = u_progress;
    
    // Smooth, liquid-like procedural distortion
    float disp1 = sin(uv.y * 15.0 + p * 10.0) * 0.04 * p;
    float disp2 = sin(uv.x * 15.0 - (1.0 - p) * 10.0) * 0.04 * (1.0 - p);
    
    vec2 uv1 = coverUv(uv, u_res, u_texRes1) + vec2(disp1, disp1);
    vec2 uv2 = coverUv(uv, u_res, u_texRes2) + vec2(disp2, disp2);
    
    // Slight zoom effect based on progress
    uv1 = (uv1 - 0.5) * (1.0 - p * 0.1) + 0.5;
    uv2 = (uv2 - 0.5) * (1.0 + (1.0 - p) * 0.1) + 0.5;
    
    vec4 color1 = texture2D(tex1, uv1);
    vec4 color2 = texture2D(tex2, uv2);
    
    gl_FragColor = mix(color1, color2, p);
  }
`;

const slides = [
  { id: 1, src: "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/portfolio/prerna-hero-port 1.jpeg", alt: "Portfolio Hero 1", title: "Permanent", subtitle: "Art on skin" },
  { id: 2, src: "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/portfolio/prerna-hero-port 2.jpg", alt: "Portfolio Hero 2", title: "Deliberate", subtitle: "Mindful process" },
  { id: 3, src: "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/portfolio/prerna-hero-port 3.jpg", alt: "Portfolio Hero 3", title: "Narrative", subtitle: "Every piece tells a story" },
];

export default function OGLDistortionSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [webglFailed, setWebglFailed] = useState(false);
  const isAnimating = useRef(false);
  const programRef = useRef<Program | null>(null);
  const texturesRef = useRef<Texture[]>([]);

  // Text overlay refs for GSAP animation
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let rAF: number;
    let isVisible = true;
    let observer: IntersectionObserver;

    const renderer = new Renderer({ alpha: true, antialias: false, dpr: 1 });
    const gl = renderer.gl;
    containerRef.current.appendChild(gl.canvas);

    const camera = new Camera(gl);

    // Load textures
    const loadTexture = (src: string) => {
      const texture = new Texture(gl, { generateMipmaps: false });
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        texture.image = img;
        if (programRef.current) {
           programRef.current.uniforms.u_texRes1.value = [img.width, img.height];
           programRef.current.uniforms.u_texRes2.value = [img.width, img.height];
        }
      };
      img.onerror = () => {
        // Textures can't be loaded cross-origin (bucket missing CORS headers).
        // Fall back to plain DOM images so the section never renders black.
        setWebglFailed(true);
      };
      img.src = src;
      return texture;
    };

    texturesRef.current = slides.map(s => loadTexture(s.src));

    const geometry = new Triangle(gl);
    
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        u_progress: { value: 0 },
        tex1: { value: texturesRef.current[0] },
        tex2: { value: texturesRef.current[1] },
        u_res: { value: [gl.canvas.width, gl.canvas.height] },
        u_texRes1: { value: [1920, 1080] },
        u_texRes2: { value: [1920, 1080] },
      },
    });
    
    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (program) {
        program.uniforms.u_res.value = [gl.canvas.width, gl.canvas.height];
      }
    };
    window.addEventListener("resize", resize, false);
    resize();

    // Intersection Observer to pause when scrolled out of view
    observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    });
    observer.observe(containerRef.current);

    const update = () => {
      rAF = requestAnimationFrame(update);
      if (!isVisible) return;
      renderer.render({ scene: mesh, camera });
    };
    rAF = requestAnimationFrame(update);

    // Initial GSAP text animation
    if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, ease: "power3.out", delay: 0.2 });
    }
    if (titleRef.current) {
        gsap.fromTo(titleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 });
    }

    return () => {
      cancelAnimationFrame(rAF);
      window.removeEventListener("resize", resize);
      observer.disconnect();
      if (containerRef.current && gl.canvas.parentNode === containerRef.current) {
        containerRef.current.removeChild(gl.canvas);
      }
    };
  }, []);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const transitionSlide = (nextIndex: number) => {
    if (nextIndex === current || isAnimating.current || !programRef.current) return;
    
    isAnimating.current = true;

    // Set uniform textures
    programRef.current.uniforms.tex1.value = texturesRef.current[current];
    programRef.current.uniforms.tex2.value = texturesRef.current[nextIndex];
    
    // Update resolution uniforms if images are loaded
    const img1 = texturesRef.current[current].image as HTMLImageElement;
    const img2 = texturesRef.current[nextIndex].image as HTMLImageElement;
    if (img1 && img1.width) programRef.current.uniforms.u_texRes1.value = [img1.width, img1.height];
    if (img2 && img2.width) programRef.current.uniforms.u_texRes2.value = [img2.width, img2.height];

    // Reset progress
    programRef.current.uniforms.u_progress.value = 0;

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrent(nextIndex);
        isAnimating.current = false;
        // Swap tex1 so it displays the settled image without progress
        if (programRef.current) {
            programRef.current.uniforms.tex1.value = texturesRef.current[nextIndex];
            programRef.current.uniforms.u_progress.value = 0;
        }
      }
    });

    // Animate WebGL uniform
    tl.to(programRef.current.uniforms.u_progress, {
      value: 1,
      duration: 1.5,
      ease: "power2.inOut"
    }, 0);

    // Animate Text out
    if (subtitleRef.current) tl.to(subtitleRef.current, { y: -20, opacity: 0, duration: 0.5, ease: "power2.in" }, 0);
    if (titleRef.current) tl.to(titleRef.current, { y: -30, opacity: 0, duration: 0.6, ease: "power2.in" }, 0);

    // Animate Text in (new text)
    // We update the React state halfway through so the text changes smoothly
    tl.call(() => {
        setCurrent(nextIndex);
    }, undefined, 0.75);

    if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.8);
    }
    if (titleRef.current) {
        tl.fromTo(titleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, ease: "power3.out" }, 0.9);
    }
  };

  const handleNext = () => {
    const next = (current + 1) % slides.length;
    transitionSlide(next);
  };

  const handlePrev = () => {
    const next = (current - 1 + slides.length) % slides.length;
    transitionSlide(next);
  };

  return (
    <div
      className="relative w-full h-[100vh] overflow-hidden bg-ink"
      style={{
        backgroundImage: `url(${slides[current].src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* OGL Canvas Container (hidden if WebGL textures fail to load) */}
      {!webglFailed && <div ref={containerRef} className="absolute inset-0 w-full h-full" />}

      {/* Dark Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-ink/40 z-10 pointer-events-none" />
      
      {/* Typography overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 z-20 pointer-events-none">
        <span ref={subtitleRef} className="font-mono text-ivory-dim tracking-[0.2em] uppercase text-sm mb-4">
          {slides[current].subtitle}
        </span>
        <h2 ref={titleRef} className="font-display text-5xl md:text-8xl text-ivory drop-shadow-lg">
          {slides[current].title}
        </h2>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 right-8 md:bottom-16 md:right-16 z-30 flex gap-4">
        <button 
          onClick={handlePrev}
          className="w-12 h-12 flex items-center justify-center rounded-full border border-ivory/30 text-ivory hover:bg-ivory hover:text-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-inchworm"
          aria-label="Previous slide"
        >
          &#8592;
        </button>
        <button 
          onClick={handleNext}
          className="w-12 h-12 flex items-center justify-center rounded-full border border-ivory/30 text-ivory hover:bg-ivory hover:text-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-inchworm"
          aria-label="Next slide"
        >
          &#8594;
        </button>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 z-30 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => transitionSlide(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inchworm ${idx === current ? "bg-ivory w-8" : "bg-ivory/30"}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
