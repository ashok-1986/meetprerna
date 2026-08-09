"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
        :root {
          --ease: cubic-bezier(0.32, 0.72, 0, 1);
          --dur: 280ms;
        }

        .header-wrapper[data-nav="0"] {
          --pill-w: 1; /* Initial scale */
          --pill-h: 84px;
          --pill-r: 0px;
          --pill-t: 0px;
          --pill-bg: transparent;
        }
        .header-wrapper[data-nav="1"] {
          --pill-w: 0.95;
          --pill-h: 68px;
          --pill-r: 16px;
          --pill-t: 10px;
          --pill-bg: var(--color-ink);
        }
        .header-wrapper[data-nav="2"] {
          --pill-w: 0.85; /* Settle scale */
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
          margin: var(--pill-t) auto 0;
          width: 100%;
          max-width: 1200px;
          height: var(--pill-h);
          border-radius: var(--pill-r);
          background-color: var(--pill-bg);
          transform: scaleX(var(--pill-w));
          transition: 
            height var(--dur) var(--ease),
            border-radius var(--dur) var(--ease),
            margin-top var(--dur) var(--ease),
            background-color var(--dur) var(--ease),
            transform var(--dur) var(--ease);
          pointer-events: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
        }

        @media (max-width: 720px) {
          .header-wrapper[data-nav] { --pill-w: 1; --pill-r: 0px; --pill-t: 0px; }
          .header-wrapper[data-nav="0"] { --pill-h: 68px; }
          .header-wrapper[data-nav="1"], .header-wrapper[data-nav="2"] { --pill-h: 56px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .header-pill { transition: none; }
        }
      `}} />

      <div className="header-wrapper" data-nav={navState}>
        <header className="header-band">
          <div className="header-pill">
          {/* We must apply inverse scale to children to avoid text stretching when using scaleX */}
          <div className="w-full flex justify-between items-center" style={{ transform: 'scaleX(calc(1 / var(--pill-w)))', transition: 'transform var(--dur) var(--ease)' }}>
            <Link href="/" className="font-display text-2xl tracking-wide text-ivory hover:text-ivory-dim transition-colors duration-[150ms] ease-out">
              MeetPrerna
            </Link>

            <nav className="hidden md:flex items-center gap-8 font-mono text-sm uppercase tracking-widest">
              <Link href="/portfolio" className="text-ivory/70 hover:text-inchworm transition-colors duration-[150ms] ease-out">
                Portfolio
              </Link>
              <Link href="/about" className="text-ivory/70 hover:text-inchworm transition-colors duration-[150ms] ease-out">
                About
              </Link>
              <Link href="/consultation" className="text-ivory/70 hover:text-inchworm transition-colors duration-[150ms] ease-out">
                Consultation
              </Link>
            </nav>

            <button 
              className="group flex flex-col justify-center items-center w-8 h-8 z-[200]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span className={`block w-6 h-0.5 bg-ivory transition-transform duration-[300ms] ease-[cubic-bezier(.43,.195,.02,1)] ${isMenuOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1"}`} />
              <span className={`block w-6 h-0.5 bg-ivory transition-transform duration-[300ms] ease-[cubic-bezier(.43,.195,.02,1)] ${isMenuOpen ? "-rotate-45 -translate-y-0.5" : "translate-y-1"}`} />
            </button>
            </div>
          </div>
        </header>
      </div>

      <FullscreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
