import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText"; // User confirmed this is available/free

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

/**
 * Standard GSAP Staggered Reveal
 * Enforces Spatial Rule: Enter from bottom/right.
 */
export const createStaggeredReveal = (elements: NodeListOf<Element> | Element[]) => {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    ScrollTrigger.batch(elements, {
      start: "top 90%",
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { opacity: 0, y: 40, x: 20 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
            overwrite: "auto",
          }
        );
      },
    });
  });

  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(elements, { opacity: 1, y: 0, x: 0 });
  });

  return mm;
};

/**
 * Image Slide-In Reveal
 * Uses left-to-right clip-path wipe and scale down (1.1 -> 1.0)
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
          duration: 0.8, // Using a slower duration for full page wipes
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
    elements.forEach((el) => gsap.set(el, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", scale: 1, opacity: 1 }));
  });

  return mm;
};

/**
 * Typography Reveal (Premium)
 * Uses SplitText to reveal words emerging from the baseline with a clip-path.
 */
export const createTextReveal = (elements: NodeListOf<Element> | Element[]) => {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    elements.forEach((el) => {
      // Split text into lines and words
      const split = new SplitText(el, { type: "lines,words", linesClass: "split-line overflow-hidden" });
      
      gsap.fromTo(
        split.words,
        { y: "100%" },
        {
          y: "0%",
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
        }
      );
    });
  });

  mm.add("(prefers-reduced-motion: reduce)", () => {
    elements.forEach((el) => gsap.set(el, { opacity: 1, y: 0 }));
  });

  return mm;
};

/**
 * Sticky Stacking Transition
 * Incoming section wipes over the outgoing section which scales down and darkens
 */
export const createStickyStack = (outgoingRef: React.RefObject<HTMLElement | null>) => {
  if (!outgoingRef.current) return;

  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const tl = gsap.to(outgoingRef.current, {
      scale: 0.95,
      filter: "brightness(0.5)",
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: outgoingRef.current,
        start: "top top", 
        end: "bottom top", 
        scrub: true,
      },
    });

    return () => tl.kill();
  });

  return mm;
};

/**
 * Double Exposure Section Transition
 */
export const createDoubleExposureTransition = (incomingRef: React.RefObject<HTMLElement | null>) => {
  if (!incomingRef.current) return;
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.set(incomingRef.current, { opacity: 0 });

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
