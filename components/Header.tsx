"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import FullscreenMenu from "./FullscreenMenu";

export default function Header() {
  const [navState, setNavState] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const ENTER_1 = 80;
    const ENTER_2 = 220;
    const EXIT_1 = 50;
    const EXIT_2 = 170;

    let currentState = 0;
    let queued = false;

    const apply = () => {
      queued = false;
      const y = window.scrollY;
      let next = currentState;

      if (currentState === 0 && y >= ENTER_1) next = 1;
      else if (currentState === 1 && y >= ENTER_2) next = 2;
      else if (currentState === 1 && y < EXIT_1) next = 0;
      else if (currentState === 2 && y < EXIT_2) next = 1;

      if (next !== currentState) {
        currentState = next;
        setNavState(next);
      }
    };

    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(apply);
      }
    };

    // Initial check
    const y = window.scrollY;
    currentState = y >= ENTER_2 ? 2 : y >= ENTER_1 ? 1 : 0;
    setNavState(currentState);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        html[data-nav="0"] {
          --pill-w: 100%;
          --pill-h: 84px;
          --pill-r: 0px;
          --pill-t: 0px;
          --pill-bg: transparent;
        }
        html[data-nav="1"] {
          --pill-w: calc(100% - ((100% - 680px) * 0.5));
          --pill-h: 68px;
          --pill-r: 16px;
          --pill-t: 10px;
          --pill-bg: var(--color-ink);
        }
        html[data-nav="2"] {
          --pill-w: 680px;
          --pill-h: 56px;
          --pill-r: 22px;
          --pill-t: 14px;
          --pill-bg: var(--color-ink-100);
        }

        .header-band {
          position: fixed;
          inset: 0 0 auto 0;
          z-index: 100;
          padding-top: env(safe-area-inset-top, 0px);
          pointer-events: none;
        }

        .header-pill {
          pointer-events: auto;
          position: relative;
          margin-inline: auto;
          contain: layout paint style;

          width: var(--pill-w);
          height: var(--pill-h);
          border-radius: var(--pill-r);
          margin-top: var(--pill-t);
          background: var(--pill-bg);

          transition:
            width var(--duration-250) var(--ease-default),
            height var(--duration-250) var(--ease-default),
            border-radius var(--duration-250) var(--ease-default),
            margin-top var(--duration-250) var(--ease-default),
            background-color var(--duration-250) var(--ease-default);
        }

        /* Nav Grid */
        .nav-grid {
          height: 100%;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 1rem;
          padding-inline: var(--pill-px, 2rem);
          transition: padding-inline var(--duration-250) var(--ease-default);
        }

        .nav-brand {
          justify-self: start;
        }

        .nav-links {
          justify-self: center;
        }

        .nav-menu-btn {
          justify-self: end;
        }

        @media (max-width: 768px) {
          .nav-grid { grid-template-columns: 1fr auto; }
        }

        @media (prefers-reduced-motion: reduce) {
          .header-pill { transition: none; }
          .nav-grid { transition: none; }
        }
      `}} />

      {/* Force applying state to HTML so we can rely on standard media query logic without messy React inline styles */}
      <style dangerouslySetInnerHTML={{ __html: `
      html { 
        ${navState === 0 
          ? '--pill-w: 100%; --pill-h: 84px; --pill-r: 0px; --pill-t: 0px; --pill-bg: transparent; --pill-px: max(2rem, min(5vw, 4rem));' 
          : navState === 1 
          ? '--pill-w: calc(100% - ((100% - 680px) * 0.5)); --pill-h: 68px; --pill-r: 16px; --pill-t: 10px; --pill-bg: var(--color-ink); --pill-px: clamp(1rem, 3vw, 2rem);' 
          : '--pill-w: 680px; --pill-h: 56px; --pill-r: 22px; --pill-t: 14px; --pill-bg: var(--color-ink-100); --pill-px: clamp(1.25rem, 3vw, 1.5rem);'
        } 
      }
      
      @media (max-width: 768px) {
          html { 
            ${navState === 0 
              ? '--pill-w: 100%; --pill-h: 68px; --pill-r: 0px; --pill-t: 0px; --pill-bg: transparent; --pill-px: 2rem;' 
              : '--pill-w: 100%; --pill-h: 56px; --pill-r: 0px; --pill-t: 0px; --pill-bg: var(--color-ink); --pill-px: 1.5rem;'
            } 
          }
      }
      `}} />

      <header className="header-band">
        <div className="header-pill">
          <div className="nav-grid w-full">
            
            {/* Zone 1: Logo */}
            <div className="nav-brand flex items-center">
              <Link href="/" className="hover:opacity-80 transition-opacity duration-[150ms] ease-out flex items-center">
                <Image src={`https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/logo_main.png`} alt="MeetPrerna" width={140} height={40} className="h-[50px] w-auto object-contain" priority />
              </Link>
            </div>

            {/* Zone 2: Links */}
            <nav className="nav-links hidden md:flex items-center gap-4 font-mono text-sm uppercase tracking-widest">
              <Link href="/portfolio" className="text-ivory/70 hover:text-inchworm transition-colors duration-[150ms] ease-out p-3">
                Portfolio
              </Link>
              <Link href="/about" className="text-ivory/70 hover:text-inchworm transition-colors duration-[150ms] ease-out p-3">
                About
              </Link>
              <Link href="/consultation" className="text-ivory/70 hover:text-inchworm transition-colors duration-[150ms] ease-out p-3">
                Consultation
              </Link>
              <Link href="/connect" className="text-ivory/70 hover:text-inchworm transition-colors duration-[150ms] ease-out p-3">
                Connect
              </Link>
            </nav>

            {/* Zone 3: Mobile Menu / CTA (Currently just Hamburger) */}
            <div className="nav-menu-btn flex items-center justify-end">
              <button 
                className="group flex flex-col justify-center items-center w-12 h-12 -mr-2 z-[200]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
              >
                <span className={`block w-6 h-0.5 bg-ivory transition-transform duration-[300ms] ease-[cubic-bezier(.43,.195,.02,1)] ${isMenuOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1"}`} />
                <span className={`block w-6 h-0.5 bg-ivory transition-transform duration-[300ms] ease-[cubic-bezier(.43,.195,.02,1)] ${isMenuOpen ? "-rotate-45 -translate-y-0.5" : "translate-y-1"}`} />
              </button>
            </div>

          </div>
        </div>
      </header>

      <FullscreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
