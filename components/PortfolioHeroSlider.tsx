"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const slides = [
  { id: 1, src: "/images/portfolio/prerna-hero-port 1.jpeg", alt: "Portfolio Hero 1", title: "Permanent", subtitle: "Art on skin" },
  { id: 2, src: "/images/portfolio/prerna-hero-port 2.jpg", alt: "Portfolio Hero 2", title: "Deliberate", subtitle: "Mindful process" },
  { id: 3, src: "/images/portfolio/prerna-hero-port 3.jpg", alt: "Portfolio Hero 3", title: "Narrative", subtitle: "Every piece tells a story" },
];

export default function PortfolioHeroSlider() {
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Use a ref to track if a transition is currently happening to prevent overlapping animations
  const isAnimating = useRef(false);

  useEffect(() => {
    // Autoplay logic
    const timer = setInterval(() => {
      handleNext();
    }, 6000); // 6 seconds per slide

    return () => clearInterval(timer);
  }, [current]);

  const transitionSlide = (nextIndex: number) => {
    if (nextIndex === current || isAnimating.current) return;
    
    isAnimating.current = true;

    const currentSlide = slideRefs.current[current];
    const nextSlide = slideRefs.current[nextIndex];

    if (!currentSlide || !nextSlide) return;

    // Cinematic GSAP Transition (Clip Path Wipe + Scale)
    gsap.set(nextSlide, { 
      zIndex: 10, 
      clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", 
      visibility: "visible" 
    });
    
    // Scale the image inside the next slide up slightly to zoom out
    const nextImg = nextSlide.querySelector('img');
    if (nextImg) gsap.set(nextImg, { scale: 1.1 });

    // Reset typography state for the incoming slide
    const nextSubtitle = nextSlide.querySelector('.slide-subtitle');
    const nextTitle = nextSlide.querySelector('.slide-title');
    if (nextSubtitle) gsap.set(nextSubtitle, { y: 20, opacity: 0 });
    if (nextTitle) gsap.set(nextTitle, { y: 30, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(currentSlide, { visibility: "hidden", zIndex: 0 });
        gsap.set(nextSlide, { zIndex: 1 });
        setCurrent(nextIndex);
        isAnimating.current = false;
      }
    });

    // The Clip-Path Wipe
    tl.to(nextSlide, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.4,
      ease: "power3.inOut"
    }, 0);

    // The slow cinematic zoom-out
    if (nextImg) {
      tl.to(nextImg, {
        scale: 1,
        duration: 2.0,
        ease: "power2.out"
      }, 0.2);
    }

    // The Impeccable Typography Reveal
    if (nextSubtitle) {
      tl.to(nextSubtitle, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }, 0.8);
    }
    
    if (nextTitle) {
      tl.to(nextTitle, {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: "power3.out"
      }, 0.9);
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

  // Run entrance animation on first load
  useEffect(() => {
    const firstSlide = slideRefs.current[0];
    if (firstSlide) {
      const title = firstSlide.querySelector('.slide-title');
      const subtitle = firstSlide.querySelector('.slide-subtitle');
      const tl = gsap.timeline();
      
      if (subtitle) {
        gsap.set(subtitle, { y: 20, opacity: 0 });
        tl.to(subtitle, { y: 0, opacity: 1, duration: 1.0, ease: "power3.out", delay: 0.2 }, 0);
      }
      if (title) {
        gsap.set(title, { y: 30, opacity: 0 });
        tl.to(title, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }, 0);
      }
    }
  }, []);

  return (
    <div ref={sliderRef} className="relative w-full h-[100vh] overflow-hidden bg-ink">
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          ref={(el) => { slideRefs.current[index] = el; }}
          className="absolute inset-0 w-full h-full"
          style={{ 
            visibility: index === 0 ? "visible" : "hidden",
            zIndex: index === 0 ? 1 : 0
          }}
        >
          <div className="absolute inset-0 bg-ink/40 z-10" />
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Typography overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 z-20 pointer-events-none">
            <span className="slide-subtitle font-mono text-ivory-dim tracking-[0.2em] uppercase text-sm mb-4">
              {slide.subtitle}
            </span>
            <h2 className="slide-title font-display text-5xl md:text-8xl text-ivory drop-shadow-lg">
              {slide.title}
            </h2>
          </div>
        </div>
      ))}
      
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
