"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { number: "500+", label: "Stories Inked", sublabel: "Each one original" },
  { number: "99%", label: "Come Back", sublabel: "Referrals and repeat clients" },
  { number: "5+", label: "Years of Practice", sublabel: "Rooted in Mumbai" },
  { number: "0", label: "Templates Used", sublabel: "Ever" },
];

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section className="bg-[#1A1A1A] py-25 md:py-25 border-t border-[rgba(253,255,233,0.06)]">
      <div className="px-6 md:px-16">
        <div 
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '2rem' 
          }}
        >
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="relative"
              style={{ position: 'relative' }}
            >
              {/* Dividers between stats on desktop */}
              {index > 0 && (
                <div 
                  className="absolute left-0 top-0 bottom-0 w-px bg-[rgba(253,255,233,0.06)] -translate-x-1/2 hidden md:block"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '1px',
                    backgroundColor: 'rgba(253,255,233,0.06)',
                    transform: 'translateX(-50%)',
                    display: 'none'
                  }}
                ></div>
              )}
              
              <div className="text-center">
                {/* Number */}
                <motion.div
                  className="font-serif text-[clamp(3rem,6vw,5.5rem)] text-[#C4FF61] leading-[1]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1.5, delay: index * 0.1 }}
                >
                  {stat.number}
                </motion.div>
                
                {/* Label */}
                <div 
                  className="font-lato text-xs tracking-[0.12em] text-[#FDFFE9] opacity-50 uppercase mt-3"
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    color: '#FDFFE9',
                    opacity: 0.5,
                    textTransform: 'uppercase',
                    marginTop: '12px'
                  }}
                >
                  {stat.label}
                </div>
                
                {/* Sub-label */}
                <div 
                  className="font-lato text-xs italic text-[#FDFFE9] opacity-30 mt-1"
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: '0.75rem',
                    fontStyle: 'italic',
                    color: '#FDFFE9',
                    opacity: 0.3,
                    marginTop: '4px'
                  }}
                >
                  {stat.sublabel}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
