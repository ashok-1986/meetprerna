'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function IndexBlock() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // M3 Scroll Reveal & M4 Stagger
      gsap.fromTo('.gs-reveal', 
        { opacity: 0, y: 12 }, 
        {
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: 'cubic-bezier(0.23, 1, 0.32, 1)', // Mandatory 'out' easing
          stagger: 0.04, // M4 Cap
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%', // Trigger Discipline: Do not start at bottom
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-30 w-full bg-[#f4f4f4] text-black py-32 md:py-48 px-4 md:px-12 rounded-t-[2rem] md:rounded-t-[4rem] shadow-2xl index-wrapper">
      
      <ul className="flex flex-col w-full border-t border-gray-300">
        
        {/* Item 01: Portfolio */}
        <li className="gs-reveal border-b border-gray-300 py-10 md:py-16 group cursor-pointer">
          <Link href="/portfolio" className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-16 outline-none">
            <span className="text-sm md:text-lg font-mono text-gray-500">01</span>
            {/* M19: Italic on hover (Handled via Tailwind group-hover) */}
            <h2 className="text-[12vw] md:text-[8vw] leading-[0.85] tracking-tight group-hover:italic transition-all duration-300 m-0">
              Portfolio
            </h2>
          </Link>
        </li>

        {/* Item 02: Sanctuary */}
        <li className="gs-reveal border-b border-gray-300 py-10 md:py-16 group cursor-pointer">
          <Link href="/sanctuary" className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-16 outline-none">
            <span className="text-sm md:text-lg font-mono text-gray-500">02</span>
            <h2 className="text-[12vw] md:text-[8vw] leading-[0.85] tracking-tight group-hover:italic transition-all duration-300 m-0">
              Sanctuary
            </h2>
          </Link>
        </li>

        {/* Item 03: About */}
        <li className="gs-reveal border-b border-gray-300 py-10 md:py-16 group cursor-pointer">
          <Link href="/about" className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-16 outline-none">
            <span className="text-sm md:text-lg font-mono text-gray-500">03</span>
            <h2 className="text-[12vw] md:text-[8vw] leading-[0.85] tracking-tight group-hover:italic transition-all duration-300 m-0">
              About
            </h2>
          </Link>
        </li>

        {/* Item 04: Contact */}
        <li className="gs-reveal border-b border-gray-300 py-10 md:py-16 group cursor-pointer">
          <Link href="/contact" className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-16 outline-none">
            <span className="text-sm md:text-lg font-mono text-gray-500">04</span>
            <h2 className="text-[12vw] md:text-[8vw] leading-[0.85] tracking-tight group-hover:italic transition-all duration-300 m-0">
              Contact
            </h2>
          </Link>
        </li>
        
      </ul>
    </section>
  );
}
