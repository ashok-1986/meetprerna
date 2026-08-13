"use client";

import { useRef, useMemo } from "react";
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

  // Split the 9 images into 3 arrays so we can physically stagger the columns.
  // This guarantees the staggered "Image 2" look even if the images have the exact same dimensions.
  const columns = useMemo(() => {
    const cols: string[][] = [[], [], []];
    siteImages.home.scatter.forEach((src, i) => {
      cols[i % 3].push(src);
    });
    return cols;
  }, []);

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

      // Subtle parallax effect on the columns to enhance the staggered feel
      const colElements = gsap.utils.toArray<HTMLElement>('.masonry-column');
      colElements.forEach((col, index) => {
        if (index > 0) {
           gsap.to(col, {
              yPercent: index === 1 ? -5 : -2,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              }
           });
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative w-full bg-ink text-ivory py-24 md:py-48 overflow-hidden">
      
      <div className="flex flex-col w-full px-6 md:px-12 xl:px-24 max-w-[2000px] mx-auto">
        <div className="pb-16 md:pb-24 gs-header-reveal flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="font-mono text-xs md:text-sm tracking-[0.2em] text-ivory/50 uppercase mb-8">
              SELECTED WORK
            </p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-[400] leading-[1.1] max-w-[900px]">
              Explore The Most Beautiful<br className="hidden md:block" /> Tattoos In The World
            </h2>
          </div>
        </div>

        {/* Staggered Masonry Grid via Flex Columns */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 w-full items-start">
          {columns.map((colImages, colIndex) => (
            <div 
              key={colIndex} 
              className={`masonry-column flex flex-col gap-6 md:gap-8 lg:gap-12 w-full md:w-1/3
                ${colIndex === 1 ? 'md:mt-24 lg:mt-32' : ''} 
                ${colIndex === 2 ? 'md:mt-12 lg:mt-16' : ''}
              `}
            >
              {colImages.map((src, imgIndex) => (
                <div 
                  key={imgIndex} 
                  className="masonry-item relative w-full rounded-[2px] overflow-hidden bg-white/5"
                >
                  <Image 
                    src={src}
                    alt={`Tattoo Work ${colIndex * 3 + imgIndex + 1}`}
                    width={800}
                    height={1200}
                    className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={colIndex === 0 && imgIndex === 0}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
