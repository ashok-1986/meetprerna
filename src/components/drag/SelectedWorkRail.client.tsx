'use client';

import { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  { id: 1, title: 'Serpentine Spine', type: 'image', src: '/images/portfolio/peony-back.jpg', category: 'Fine Line / Spine' },
  { id: 2, title: 'Abstract Flora', type: 'image', src: '/images/portfolio/brushstroke-butterfly.jpg', category: 'Abstract / Forearm' },
  { id: 3, title: 'Process Study 01', type: 'video', src: '/video/process-1.mp4', category: 'Motion / Study' },
  { id: 4, title: 'Geometric Panther', type: 'image', src: '/images/portfolio/geometric-wolf.jpg', category: 'Blackwork / Thigh' },
  { id: 5, title: 'Kharghar Study', type: 'image', src: '/images/portfolio/buddha-lotus.jpg', category: 'Minimalist / Wrist' },
  { id: 6, title: 'Needle Depth Test', type: 'video', src: '/video/process-2.mp4', category: 'Process / Technique' },
  { id: 7, title: 'Botanical Sleeve', type: 'image', src: '/images/portfolio/lion-and-birds.jpg', category: 'Custom / Full Sleeve' },
  { id: 8, title: 'Viper Contour', type: 'image', src: '/images/portfolio/wolf-red-geometric.jpg', category: 'Ornamental / Ribs' },
];

interface PortfolioCardProps {
  item: typeof portfolioItems[number];
  waveOffset: string;
}

// Sub-component to handle per-card Intersection Observer & GSAP Stagger
function PortfolioCard({ item, waveOffset }: PortfolioCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setShouldReduceMotion(event.matches);
    };
    mediaQuery.addEventListener('change', listener);

    if (mediaQuery.matches) {
      return () => mediaQuery.removeEventListener('change', listener);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && titleRef.current) {
            // Fire the extracted GSAP stagger animation
            gsap.to(titleRef.current.children, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.03,
              ease: "power3.out",
            });
            observer.disconnect(); // Only animate once
          }
        });
      },
      { threshold: 0.2 } // Triggers when 20% of the card is visible
    );

    if (cardRef.current) observer.observe(cardRef.current);
    
    return () => {
      mediaQuery.removeEventListener('change', listener);
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`flex-none w-[280px] md:w-[460px] group relative flex flex-col transition-transform duration-500 ${waveOffset}`}
    >
      <div className="w-full h-[380px] md:h-[580px] bg-[#161618] overflow-hidden relative border border-white/10">
        {item.type === 'video' ? (
          <video 
            src={item.src} 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
          />
        ) : (
          <img 
            src={item.src} 
            alt={item.title} 
            draggable={false}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
          />
        )}
        {/* Desktop hover state, disabled on mobile via opacity-0 to avoid sticky tap states */}
        <div className="hidden md:block absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
      </div>
      
      <div className="mt-4 flex justify-between items-baseline overflow-hidden">
        {/* Split Text for GSAP Target */}
        <span ref={titleRef} className="font-serif text-lg md:text-xl text-[#FDFFE9] flex">
          {!shouldReduceMotion ? (
            item.title.split('').map((char: string, i: number) => (
              <span 
                key={i} 
                className="inline-block opacity-0 translate-y-[20px]"
                style={{ whiteSpace: 'pre' }}
              >
                {char}
              </span>
            ))
          ) : (
            item.title
          )}
        </span>
        <span className="font-mono text-[9px] md:text-[10px] tracking-[0.15em] text-white/50 uppercase shrink-0 ml-4">
          {item.category}
        </span>
      </div>
    </div>
  );
}

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
          { opacity: 0, y: 40 },
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

  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section ref={sectionRef} className="w-full bg-[#111111] pt-20 md:pt-28 pb-[10vh] md:pb-[15vh] overflow-hidden">
      
      {/* Header */}
      <div className="pl-6 md:pl-8 pr-6 md:pr-8 mb-16 md:mb-[120px] flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/60 block mb-3">
            Selected Work
          </span>
          <h2 className="font-serif text-[#FDFFE9] text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] font-normal">
            Permanent art, unhurried execution.
          </h2>
        </div>
        <div className="hidden md:block font-mono text-[11px] text-white/40 tracking-widest mt-4 md:mt-0">
          [DRAG TO EXPLORE ARCHIVE]
        </div>
      </div>

      {/* Track with Native Touch + JS Mouse Drag */}
      <div 
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex gap-4 md:gap-8 overflow-x-auto touch-pan-x no-scrollbar pl-6 md:pl-8 pr-6 md:pr-8 py-12 md:py-[150px] cursor-grab active:cursor-grabbing select-none ${
          isDown ? 'cursor-grabbing' : ''
        }`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {portfolioItems.map((item, index) => {
          // RESPONSIVE WAVE LOGIC:
          // Mobile: Gentle 10% total wave (-5% / +5%)
          // Desktop: Aggressive 50% total wave (-25% / +25%)
          const waveOffset = index % 2 === 0 
            ? '-translate-y-[5%] md:-translate-y-[25%]' 
            : 'translate-y-[5%] md:translate-y-[25%]';

          return (
            <PortfolioCard 
              key={item.id} 
              item={item} 
              waveOffset={waveOffset} 
            />
          );
        })}
      </div>
    </section>
  );
}

export default SelectedWorkRail;
