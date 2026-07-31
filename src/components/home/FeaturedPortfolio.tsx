'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useInView, MotionValue } from 'framer-motion';
import Image from 'next/image';

// --- Data: Mapped to actual assets ---
const pieces = [
  {
    id: 'serpentine-spine',
    title: 'Serpentine Spine',
    category: 'Fine Line Tattoo',
    year: '2025',
    image: '/images/portfolio/peony-back.jpg',
    magnets: [
      { x: 5, y: 30, size: 16 }, { x: 10, y: 42, size: 10 }, { x: 80, y: 70, size: 14 }, { x: 85, y: 82, size: 9 }
    ]
  },
  {
    id: 'abstract-flora',
    title: 'Abstract Flora',
    category: 'Watercolour Botanical',
    year: '2025',
    image: '/images/portfolio/brushstroke-butterfly.jpg',
    magnets: [
      { x: 82, y: 55, size: 16 }, { x: 88, y: 68, size: 10 }, { x: 78, y: 72, size: 7 }, { x: 90, y: 80, size: 8 }
    ]
  },
  {
    id: 'geometric-panther',
    title: 'Geometric Panther',
    category: 'Dotwork & Blackwork',
    year: '2024',
    image: '/images/portfolio/geometric-wolf.jpg',
    magnets: [
      { x: 4, y: 24, size: 16 }, { x: 10, y: 36, size: 10 }, { x: 78, y: 78, size: 14 }, { x: 84, y: 88, size: 8 }
    ]
  },
  {
    id: 'botanical-sleeve',
    title: 'Botanical Sleeve',
    category: 'Custom Design',
    year: '2024',
    image: '/images/portfolio/lion-and-birds.jpg',
    magnets: [
      { x: 82, y: 26, size: 14 }, { x: 88, y: 38, size: 10 }, { x: 78, y: 44, size: 7 }, { x: 90, y: 60, size: 8 }
    ]
  },
];

// --- Pixel Grid Config ---
const GRID_COLS = 6;
const GRID_ROWS = 4;

const bgSquares = [
  { x: 6, y: 20, size: 12 }, { x: 12, y: 32, size: 8 }, { x: 8, y: 44, size: 6 }, { x: 88, y: 18, size: 10 },
  { x: 92, y: 30, size: 14 }, { x: 85, y: 42, size: 7 }, { x: 90, y: 52, size: 5 }, { x: 14, y: 56, size: 5 }
];

function BgSquare({ sq, i, scrollYProgress }: { sq: typeof bgSquares[0]; i: number; scrollYProgress: MotionValue<number> }) {
  const yProgress = useTransform(scrollYProgress, [0, 1], [0, -(80 + i * 30)]);
  const smoothY = useSpring(yProgress, { stiffness: 40, damping: 20 });
  
  return (
    <motion.div
      style={{ 
        left: `${sq.x}%`, 
        top: `${sq.y}%`, 
        width: sq.size, 
        height: sq.size, 
        y: smoothY 
      }}
      animate={{ y: [0, -10, 0] }}
      transition={{ 
        duration: 3 + i * 0.4, 
        repeat: Infinity, 
        ease: 'easeInOut', 
        delay: i * 0.3 
      }}
      className="absolute bg-[#FDFFE9]/5 rounded-[1px]"
    />
  );
}

export function FeaturedPortfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Parallax background squares
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-[100svh] bg-[#1A1A1A] text-[#FDFFE9] overflow-hidden font-sans"
    >
      {/* --- 1. Floating Parallax Background Squares --- */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {bgSquares.map((sq, i) => (
          <BgSquare key={i} sq={sq} i={i} scrollYProgress={scrollYProgress} />
        ))}
      </div>

      {/* --- 2. Header Area --- */}
      <div className="relative px-6 pt-32 pb-16 sm:px-10 lg:px-16 lg:pt-40">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-7xl text-center"
        >
          <span className="mb-5 inline-block bg-[#C4FF61] px-4 py-1.5 text-[13px] font-medium tracking-wide text-[#1A1A1A]">
            Selected Work
          </span>
          <h2 className="text-[clamp(1.8rem,3.2vw,2.8rem)] font-serif font-[400] leading-[1.25] tracking-tight text-[#FDFFE9]">
            Custom ink crafted for your <span className="text-[#C9CBB6]">unique contours.</span>
            <br />
            <span className="text-[#C9CBB6]">Made in conversation, never in a rush.</span>
          </h2>
        </motion.div>
      </div>

      {/* --- 3. Case Study Cards (2x2 Grid) --- */}
      <div className="mx-auto max-w-7xl px-6 pb-16 sm:px-10 lg:px-16">
        <div className="grid gap-4 md:grid-cols-2">
          {pieces.map((piece, index) => (
            <PortfolioCard key={piece.id} piece={piece} index={index} />
          ))}
        </div>
      </div>

      {/* --- 4. Footer Area & Marquee --- */}
      <div className="mx-auto max-w-7xl px-6 pb-6 sm:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between border-t border-[#FDFFE9]/10 pt-8">
          
          {/* Left: Statement */}
          <div className="max-w-md mb-8 md:mb-0">
            <p className="text-[14px] leading-[1.7] text-[#C9CBB6] font-sans">
              Every piece begins with a quiet conversation. No pressure, no rushed sketches. 
              We listen to your story until the vision is clear enough to translate.
            </p>
            <motion.a 
              href="/portfolio"
              className="mt-6 group inline-flex items-center gap-[10px] border border-[#FDFFE9]/20 bg-[#1A1A1A] px-4 py-2.5 text-base font-medium text-[#FDFFE9] hover:bg-[#FDFFE9] hover:text-[#1A1A1A] transition-colors duration-300 font-sans"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              View full archive
              <span className="h-6 w-6 bg-[#C4FF61] flex items-center justify-center text-[#1A1A1A] transition-all duration-300 group-hover:-translate-y-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </motion.a>
          </div>

          {/* Right: Infinite Marquee */}
          <div className="flex-1 overflow-hidden md:ml-12">
            <div className="overflow-hidden py-5">
              <motion.div 
                className="flex w-max"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                style={{ willChange: 'transform' }}
              >
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex shrink-0 items-center gap-2.5 px-8">
                    <span className="whitespace-nowrap text-sm font-mono font-medium tracking-wide text-[#C9CBB6]">
                      Mumbai · Navi Mumbai · Travelling Artist · Custom Ink · Fine Art · 
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom spacer */}
      <div className="h-12" />
    </section>
  );
}

// --- Sub-Component: Individual Portfolio Card ---
function PortfolioCard({ piece, index }: { piece: typeof pieces[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 18, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 18, mass: 0.6 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    // Normalize to -1 to 1
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(x * 40); // Shift magnitude
    mouseY.set(y * 40);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Generate pixel grid blocks
  const gridBlocks = Array.from({ length: GRID_ROWS * GRID_COLS });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-[#212121]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Background Image */}
      <Image
        src={piece.image}
        alt={piece.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={index < 2}
      />

      {/* 2. Pixel-Block Hover Overlay */}
      <div className="absolute inset-0 z-10 grid" style={{ gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`, gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)` }}>
        {gridBlocks.map((_, i) => {
          const row = Math.floor(i / GRID_COLS);
          const col = i % GRID_COLS;
          const delayIn = (row + col) * 0.018;
          const delayOut = ((GRID_ROWS - 1 - row) + (GRID_COLS - 1 - col)) * 0.012;

          return (
            <motion.div
              key={i}
              className="bg-[#1A1A1A]/90"
              initial={{ opacity: 1, scale: 1 }}
              animate={isHovered ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.25, 
                delay: isHovered ? delayIn : delayOut,
                ease: 'easeInOut' 
              }}
            />
          );
        })}
      </div>

      {/* 3. Magnetic Squares */}
      {piece.magnets.map((m, i) => (
        <motion.div
          key={i}
          style={{ 
            left: `${m.x}%`, 
            top: `${m.y}%`, 
            width: m.size, 
            height: m.size,
            x: springX,
            y: springY
          }}
          className="absolute z-20 rounded-[1px] bg-[#C4FF61]/20 pointer-events-none"
        />
      ))}

      {/* 4. Plus Button (Top Right) */}
      <motion.div 
        className="absolute right-4 top-4 z-30 flex h-7 w-7 items-center justify-center border border-[#FDFFE9]/30 text-xs text-[#FDFFE9] opacity-0 transition-opacity duration-300 group-hover:opacity-100 font-sans"
        whileHover={{ scale: 1.1, backgroundColor: '#C4FF61', color: '#1A1A1A', borderColor: '#C4FF61' }}
      >
        +
      </motion.div>

      {/* 5. Info Plate (Bottom Left) */}
      <div className="absolute bottom-0 left-0 z-30 max-w-[70%] bg-[#FDFFE9] px-4 pb-3 pt-2.5 text-[#1A1A1A]">
        <h3 className="text-[clamp(1.2rem,2vw,1.6rem)] font-serif font-[400] leading-tight">
          {piece.title}
        </h3>
        <div className="mt-1.5 flex items-center gap-4 font-mono text-[11px] tracking-wide text-[#1A1A1A]/60">
          <span>{piece.category}</span>
          <span className="text-[#1A1A1A]/30">•</span>
          <span className="font-medium text-[#1A1A1A]">{piece.year}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default FeaturedPortfolio;
