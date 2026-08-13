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

  // Split the 9 images exactly into 2, 4, 3 distribution as requested
  const columns = useMemo(() => {
    const images = siteImages.home.scatter;
    return [
      // Column 1: 2 images
      [images[0], images[1]],
      // Column 2: 4 images
      [images[2], images[3], images[4], images[5]],
      // Column 3: 3 images
      [images[6], images[7], images[8]]
    ];
  }, []);

  // Predefine beautiful, varied aspect ratios for each image index to create 
  // the ultimate editorial masonry feel, ignoring the source image crop.
  const aspectRatios = [
    // Column 1 (2 images) - Updated 2nd image to 4:5
    ["aspect-[3/4]", "aspect-[4/5]"],
    // Column 2 (4 images)
    ["aspect-[4/3]", "aspect-[4/5]", "aspect-square", "aspect-[3/2]"],
    // Column 3 (3 images)
    ["aspect-[4/5]", "aspect-square", "aspect-[3/4]"]
  ];

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

      // Enhanced vertical scroll parallax on ALL columns
      const colElements = gsap.utils.toArray<HTMLElement>('.masonry-column');
      colElements.forEach((col, index) => {
        // Significantly amplified speeds for maximum visual impact
        let ySpeed = -15; // Col 1 (slow, but now visible)
        if (index === 1) ySpeed = -40; // Col 2 (fast)
        if (index === 2) ySpeed = -25; // Col 3 (medium)

        gsap.to(col, {
          yPercent: ySpeed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5, // Silky smooth 1.5s scrub duration
          }
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative w-full bg-ink text-ivory py-24 md:py-48 overflow-hidden">
      
      <div className="flex flex-col w-full px-6 md:px-12 xl:px-24 max-w-[2000px] mx-auto">
        <div className="pb-16 md:pb-32 gs-header-reveal flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="font-mono text-xs md:text-sm tracking-[0.2em] text-ivory/50 uppercase mb-8">
              SELECTED WORK
            </p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-[400] leading-[1.1] max-w-[900px]">
              Discover A Mindful Approach<br className="hidden md:block" /> To Art & Healing
            </h2>
          </div>
        </div>

        {/* Staggered Masonry Grid via Flex Columns */}
        {/* Massive horizontal gaps for gallery-like negative space */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-24 w-full items-start">
          {columns.map((colImages, colIndex) => (
            <div 
              key={colIndex} 
              // Massive vertical gaps so images don't feel crowded together
              // Col 1 gets mt-12 so it has room to parallax upwards without hitting the title immediately
              className={`masonry-column flex flex-col gap-16 md:gap-24 lg:gap-32 w-full md:w-1/3
                ${colIndex === 0 ? 'md:mt-12 lg:mt-16' : ''}
                ${colIndex === 1 ? 'md:mt-64 lg:mt-80' : ''} 
                ${colIndex === 2 ? 'md:mt-32 lg:mt-48' : ''}
              `}
            >
              {colImages.map((src, imgIndex) => (
                <div 
                  key={imgIndex} 
                  className={`masonry-item relative w-full rounded-[2px] overflow-hidden bg-white/5 ${aspectRatios[colIndex][imgIndex]}`}
                >
                  <Image 
                    src={src}
                    alt={`Tattoo Work ${colIndex}-${imgIndex}`}
                    fill
                    className="object-cover hover:scale-[1.03] transition-transform duration-700 ease-out"
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
