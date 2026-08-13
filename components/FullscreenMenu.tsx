"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "01. Portfolio", href: "/portfolio", image: "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/menu/menu-portfolio.jpg" },
  { label: "02. About", href: "/about", image: "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/menu/menu-about.jpg" },
  { label: "03. Consultation", href: "https://meetprerna.fillout.com/book", image: "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/menu/menu-consultation.jpg", external: true },
  { label: "04. Connect", href: "/connect", image: "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/menu/menu-connect.jpg" },
];

export default function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovering, setIsHovering] = useState(false);

  // Keyboard accessibility: Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Intro/Outro animation & Focus Management
  useGSAP(() => {
    if (!containerRef.current) return;
    
    if (isOpen) {
      document.body.style.overflow = "hidden";
      
      gsap.to(containerRef.current, {
        y: "0%",
        duration: 0.8,
        ease: "power4.inOut",
        onComplete: () => {
          closeBtnRef.current?.focus();
        }
      });
      
      gsap.fromTo(
        ".menu-link-item",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.3 }
      );
    } else {
      document.body.style.overflow = "";
      
      gsap.to(containerRef.current, {
        y: "-100%",
        duration: 0.8,
        ease: "power4.inOut",
      });
    }
  }, [isOpen]);

  // Image mask animation with matchMedia for responsive behavior
  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (isHovering && maskRef.current) {
        gsap.to(maskRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.8,
          ease: "power3.out",
        });
      } else if (maskRef.current) {
        gsap.to(maskRef.current, {
          clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
          duration: 0.8,
          ease: "power3.out",
        });
      }
    });

    mm.add("(max-width: 767px)", () => {
      if (maskRef.current) {
        gsap.set(maskRef.current, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" });
      }
    });

    return () => mm.revert();
  }, [isHovering]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-ink flex flex-col justify-center items-start px-6 md:px-24"
      style={{ transform: "translateY(-100%)" }}
      role="dialog"
      aria-modal="true"
    >
      <button 
        ref={closeBtnRef}
        onClick={onClose}
        className="absolute top-8 right-6 md:right-12 font-mono text-sm tracking-[0.2em] uppercase text-ivory/70 hover:text-inchworm transition-colors z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inchworm focus-visible:outline-offset-4 rounded"
        aria-label="Close menu"
      >
        Close
      </button>

      <nav className="relative z-10 flex flex-col gap-6 md:gap-12 w-full md:w-1/2">
        {navItems.map((item, index) => (
          <div key={index} className="overflow-hidden">
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                onMouseEnter={() => {
                  setActiveIndex(index);
                  setIsHovering(true);
                }}
                onMouseLeave={() => setIsHovering(false)}
                className="menu-link-item block whitespace-nowrap font-display text-5xl md:text-[clamp(4rem,6vw,7rem)] leading-none text-ivory hover:text-inchworm hover:italic transition-all duration-300 transform-gpu focus-visible:outline focus-visible:outline-2 focus-visible:outline-inchworm focus-visible:outline-offset-4 rounded"
              >
                {item.label}
              </a>
            ) : (
              <Link
                href={item.href}
                onClick={onClose}
                onMouseEnter={() => {
                  setActiveIndex(index);
                  setIsHovering(true);
                }}
                onMouseLeave={() => setIsHovering(false)}
                className="menu-link-item block whitespace-nowrap font-display text-5xl md:text-[clamp(4rem,6vw,7rem)] leading-none text-ivory hover:text-inchworm hover:italic transition-all duration-300 transform-gpu focus-visible:outline focus-visible:outline-2 focus-visible:outline-inchworm focus-visible:outline-offset-4 rounded"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>

      <div 
        ref={maskRef}
        className="absolute inset-0 md:left-1/2 w-full md:w-1/2 pointer-events-none z-0 bg-ink"
      >
        {navItems.map((item, index) => (
          <Image 
            key={index}
            src={item.image}
            alt={item.label}
            fill
            className={`object-cover object-center transition-opacity duration-700 ${
              activeIndex === index ? "opacity-100" : "opacity-0"
            }`}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ))}
        <div className="absolute inset-0 bg-ink/60 md:bg-ink/20 mix-blend-multiply md:mix-blend-normal" />
      </div>
    </div>
  );
}
