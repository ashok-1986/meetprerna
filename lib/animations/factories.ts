import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register ScrollTrigger, making sure it only happens on the client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hero Scrub Factory
 * Pins the hero container and scrubs the H1 text from y: 100% to 0
 */
export const createHeroScrub = (
  containerRef: React.RefObject<HTMLElement | null>,
  textRef: React.RefObject<HTMLElement | null>
) => {
  if (!containerRef.current || !textRef.current) return;

  const mm = gsap.matchMedia();
  const words = textRef.current.querySelectorAll(".word-inner");

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    // Set initial hidden state dynamically (not in SSR markup)
    gsap.set(words, { y: "100%" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: true,
      },
    });

    tl.to(words, { y: "0%", ease: "none", stagger: 0.1 });

    return () => tl.kill();
  });

  mm.add("(prefers-reduced-motion: reduce)", () => {
    // Ensure text is fully visible
    gsap.set(words, { y: "0%" });
  });

  return mm;
};


/**
 * Standard GSAP Fade Up Reveal
 */
export const createFadeUpReveal = (elements: NodeListOf<Element> | Element[]) => {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });
  });

  mm.add("(prefers-reduced-motion: reduce)", () => {
    // Instant reveal fallback
    elements.forEach((el) => gsap.set(el, { opacity: 1, y: 0 }));
  });

  return mm;
};

/**
 * Image Slide-In Reveal (fiddle.digital)
 * clip-path wipe with slight scale down
 */
export const createImageReveal = (elements: NodeListOf<Element> | Element[]) => {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", scale: 1.1 },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });
  });

  mm.add("(prefers-reduced-motion: reduce)", () => {
    elements.forEach((el) => gsap.set(el, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", scale: 1, opacity: 1 }));
  });

  return mm;
};

/**
 * Sticky Stacking Transition (athleticsnyc)
 * Incoming section wipes over the outgoing section which scales down and darkens
 */
export const createStickyStack = (outgoingRef: React.RefObject<HTMLElement | null>) => {
  if (!outgoingRef.current) return;

  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    // We assume the outgoing section is position: sticky, top: 0
    // As we scroll past it, it scales down. 
    // Wait, typical Athletics sticky scroll has the section sticky, 
    // and the *next* section scrolls *over* it.
    
    const tl = gsap.to(outgoingRef.current, {
      scale: 0.95,
      filter: "brightness(0.5)",
      ease: "none",
      scrollTrigger: {
        trigger: outgoingRef.current,
        start: "top top", // when it becomes sticky
        end: "bottom top", // until the next section completely covers it
        scrub: true,
      },
    });

    return () => tl.kill();
  });

  return mm;
};

/**
 * Standard Section Transition (Slide-Up Fade)
 * Fades and slides a section up as it enters the viewport.
 */
export const createSectionTransition = (elements: NodeListOf<Element> | Element[]) => {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });
  });

  mm.add("(prefers-reduced-motion: reduce)", () => {
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          ease: "power1.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });
  });

  return mm;
};

/**
 * Double Exposure Section Transition
 * Scrubs a linear gradient mask and mix-blend-mode opacity to bleed sections together.
 * Best used when incoming section overlaps a sticky outgoing section.
 */
export const createDoubleExposureTransition = (incomingRef: React.RefObject<HTMLElement | null>) => {
  if (!incomingRef.current) return;
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    // Initial state: mask hides top, fully transparent
    gsap.set(incomingRef.current, { 
      opacity: 0,
    });

    // We animate the opacity while mix-blend-mode is active in CSS
    const tl = gsap.fromTo(incomingRef.current, 
      { opacity: 0 },
      {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: incomingRef.current,
          start: "top 90%",
          end: "top 30%",
          scrub: true,
        },
      }
    );

    return () => tl.kill();
  });

  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(incomingRef.current, { opacity: 1 });
  });

  return mm;
};
