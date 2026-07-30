'use client';

import { useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  { id: 1, title: 'Brushstroke Butterfly', type: 'image', src: '/images/portfolio/brushstroke-butterfly.jpg', category: 'Fine Line / Butterfly' },
  { id: 2, title: 'Peony Back', type: 'image', src: '/images/portfolio/peony-back.jpg', category: 'Floral / Back' },
  { id: 3, title: 'Process Study 01', type: 'video', src: '/video/process-1.mp4', category: 'Motion / Study' },
  { id: 4, title: 'Geometric Wolf', type: 'image', src: '/images/portfolio/geometric-wolf.jpg', category: 'Geometric / Arm' },
  { id: 5, title: 'Buddha Lotus', type: 'image', src: '/images/portfolio/buddha-lotus.jpg', category: 'Spiritual / Back' },
  { id: 6, title: 'Needle Depth Test', type: 'video', src: '/video/process-2.mp4', category: 'Process / Technique' },
  { id: 7, title: 'Lion and Birds', type: 'image', src: '/images/portfolio/lion-and-birds.jpg', category: 'Custom / Ribs' },
  { id: 8, title: 'Wolf Red Geometric', type: 'image', src: '/images/portfolio/wolf-red-geometric.jpg', category: 'Geometric / Thigh' },
];

export function SelectedWorkRail() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useLayoutEffect(() => {
    let mm: gsap.MatchMedia;
    const ctx = gsap.context(() => {
      mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(sectionRef.current, { opacity: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(sectionRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            }
          }
        );
      });
    }, sectionRef);
    return () => {
      mm?.revert();
      ctx.revert();
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    if (sliderRef.current) {
      setStartX(e.pageX - sliderRef.current.offsetLeft);
      setScrollLeft(sliderRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section ref={sectionRef} className="w-full bg-[#111111] py-24 overflow-hidden">
      {/* Section Header with Two-Anchor gutter alignment */}
      <div className="px-6 md:px-8 max-w-[1800px] mx-auto mb-12 flex justify-between items-end">
        <div>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/60 block mb-4">
            Selected Work
          </span>
          <h2 className="font-serif text-[#FDFFE9] text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] font-normal">
            Permanent art, unhurried execution.
          </h2>
        </div>
        <div className="hidden md:block font-mono text-xs text-white/40 tracking-wider">
          [DRAG OR SCROLL TO NAVIGATE]
        </div>
      </div>

      {/* Edge-Bleed Horizontal Drag Rail */}
      <div 
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex gap-6 overflow-x-auto no-scrollbar px-6 md:px-8 cursor-grab active:cursor-grabbing select-none ${
          isDown ? 'cursor-grabbing' : ''
        }`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {portfolioItems.map((item) => (
          <div 
            key={item.id}
            className="flex-none w-[300px] md:w-[420px] group relative flex flex-col"
          >
            <div className="w-full h-[400px] md:h-[540px] bg-[#161618] overflow-hidden relative border border-white/10">
              {item.type === 'video' ? (
                <video 
                  src={item.src} 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <img 
                  src={item.src} 
                  alt={item.title}
                  draggable={false}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            {/* Metadata Description */}
            <div className="mt-4 flex justify-between items-baseline">
              <span className="font-serif text-lg text-[#FDFFE9]">{item.title}</span>
              <span className="font-mono text-[10px] tracking-[0.15em] text-white/50 uppercase">{item.category}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
