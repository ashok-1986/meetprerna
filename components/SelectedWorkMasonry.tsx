"use client";

import { useRef } from "react";
import Image from "next/image";
import { siteImages } from "@/lib/data/site";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SelectedWorkMasonry() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const items = gsap.utils.toArray<HTMLElement>('.masonry-item');
      
      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            }
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative w-full bg-ink text-ivory py-24 md:py-48 overflow-hidden">
      
      <div className="flex flex-col w-full px-6 md:px-12 xl:px-24 max-w-[2000px] mx-auto">
        <div className="pb-16 md:pb-24 gs-header-reveal">
          <p className="font-mono text-xs md:text-sm tracking-[0.2em] text-ivory/50 uppercase mb-8">
            SELECTED WORK
          </p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-[400] leading-[1.1] max-w-[900px]">
            Explore The Most Beautiful<br className="hidden md:block" /> Tattoos In The World
          </h2>
        </div>

        {/* Masonry Grid via CSS Columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 lg:gap-12 w-full">
          {siteImages.home.scatter.map((src, imgIndex) => (
            <div 
              key={imgIndex} 
              className="masonry-item break-inside-avoid relative w-full mb-6 md:mb-8 lg:mb-12 rounded-[2px] overflow-hidden bg-white/5"
            >
              <Image 
                src={src}
                alt={`Tattoo Work ${imgIndex + 1}`}
                width={800}
                height={1200} // providing a high base dimension, Next.js handles aspect ratio with width/height auto
                className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={imgIndex < 3} // prioritize top row
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
