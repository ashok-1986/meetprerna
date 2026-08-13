"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Testimonial } from "@/lib/api/senja";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ClientVoicesProps {
  testimonials: Testimonial[];
}

// A helper to split text into words wrapped in hidden overflow spans
const SplitWords = ({ text }: { text: string }) => {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-flex overflow-hidden pb-[0.1em] -mb-[0.1em] mr-[0.25em] align-bottom">
          <span className="gs-word-reveal translate-y-[110%] inline-block opacity-0">
            {word}
          </span>
        </span>
      ))}
    </>
  );
};

// Extracted card component to manage active image state per testimonial
function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  return (
    <div 
      className={`testimonial-block flex flex-col w-full
        ${index === 1 ? 'md:mt-48' : ''} 
        ${index === 2 ? 'md:mt-24' : ''}
      `}
    >
      {testimonial.imageUrls && testimonial.imageUrls.length > 0 && (
        <div className="flex flex-col gap-2 mb-8">
          {/* Main Image */}
          <div className="relative w-full aspect-square overflow-hidden bg-ink/5 group">
            <Image 
              src={testimonial.imageUrls[activeImageIdx]} 
              alt={`Tattoo work for ${testimonial.name} - Photo ${activeImageIdx + 1}`} 
              fill 
              className="gs-parallax-image object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-125"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          
          {/* Thumbnails Row */}
          {testimonial.imageUrls.length > 1 && (
            <div className="flex gap-2 w-full overflow-x-auto scrollbar-hide py-1">
              {testimonial.imageUrls.map((url, imgIndex) => (
                <button
                  key={imgIndex}
                  onClick={() => setActiveImageIdx(imgIndex)}
                  className={`relative w-16 h-16 shrink-0 overflow-hidden transition-all duration-300 rounded-[2px] ${
                    imgIndex === activeImageIdx 
                      ? 'opacity-100 ring-2 ring-ink ring-offset-2 ring-offset-ivory grayscale-0' 
                      : 'opacity-40 hover:opacity-100 grayscale'
                  }`}
                  aria-label={`View photo ${imgIndex + 1}`}
                >
                  <Image src={url} alt="" fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      
      <div className="flex-grow flex flex-col gap-6">
        <p className="font-quote italic text-lg md:text-xl lg:text-2xl text-ink leading-snug">
          <SplitWords text={`"${testimonial.text}"`} />
        </p>
        
        <div className="gs-meta-reveal opacity-0 translate-y-4 font-mono text-xs tracking-[0.2em] uppercase text-ink/50 flex flex-col gap-2 mt-auto">
          <span className="text-ink font-bold">— {testimonial.name}</span>
          <a href={testimonial.sourceLink} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors underline decoration-ink/30 hover:decoration-ink/60 underline-offset-4 w-max">
            Via {testimonial.sourceName}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ClientVoices({ testimonials }: ClientVoicesProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        const words = gsap.utils.toArray('.gs-word-reveal');
        const meta = gsap.utils.toArray('.gs-meta-reveal');
        const images = gsap.utils.toArray('.gs-parallax-image');
        const headers = gsap.utils.toArray('.gs-header-reveal');
        
        gsap.set(words, { y: "0%", opacity: 1 });
        gsap.set(meta, { y: 0, opacity: 1 });
        gsap.set(images, { yPercent: 0 });
        gsap.set(headers, { y: 0, opacity: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1. Text Reveal Animation
        const testimonialBlocks = gsap.utils.toArray<HTMLElement>('.testimonial-block');
        
        testimonialBlocks.forEach((block) => {
          const words = block.querySelectorAll('.gs-word-reveal');
          const meta = block.querySelector('.gs-meta-reveal');
          
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          });

          if (words.length) {
            tl.to(words, {
              y: "0%",
              opacity: 1,
              duration: 0.8,
              stagger: 0.015,
              ease: "power3.out",
            });
          }
          
          if (meta) {
            tl.to(meta, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out"
            }, "-=0.4");
          }
        });

        // 2. Image Parallax
        const images = gsap.utils.toArray<HTMLElement>('.gs-parallax-image');
        images.forEach((img) => {
          gsap.fromTo(img, 
            { yPercent: -10 },
            {
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: img.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              }
            }
          );
        });
        
        // Header reveal
        gsap.fromTo('.gs-header-reveal', 
          { opacity: 0, y: 30 },
          {
            opacity: 1, 
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: '.gs-header-reveal',
              start: "top 90%",
            }
          }
        );
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-ivory text-ink py-24 md:py-48 overflow-hidden"
    >
      <div className="flex flex-col w-full px-6 md:px-12 xl:px-24 max-w-[2000px] mx-auto">
        
        <div className="pb-16 md:pb-32 gs-header-reveal border-b border-ink/20 mb-16 md:pb-0 md:border-b-0">
          <p className="font-mono text-xs md:text-sm tracking-[0.2em] text-ink/50 uppercase mb-8">
            IN THEIR OWN WORDS
          </p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-[400] leading-[1.1] max-w-[900px]">
            Some earlier clients<br className="hidden md:block" /> knew her as Alza.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 lg:gap-24 w-full items-start">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
