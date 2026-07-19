"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function GSAPDemo() {
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.to(".box", {
        scrollTrigger: {
          trigger: ".box",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
        x: 300,
        rotation: 360,
        ease: "none",
      });

      gsap.from(".stagger-item", {
        scrollTrigger: {
          trigger: ".stagger-container",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "hop",
      });

      gsap.to(".progress-bar", {
        scrollTrigger: {
          trigger: ".progress-container",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
        scaleX: 1,
        transformOrigin: "left center",
        ease: "none",
      });
    }, document.querySelector(".gsap-demo") ?? undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section className="gsap-demo py-20 px-4 space-y-20">
      <h2 className="text-3xl font-serif text-center">GSAP + ScrollTrigger</h2>

      <div className="max-w-4xl mx-auto space-y-16">
        <div>
          <h3 className="text-lg mb-4">Scrubbed Animation</h3>
          <div className="h-32 relative">
            <div className="box w-20 h-20 bg-primary rounded-lg absolute top-1/2 left-0 -translate-y-1/2 flex items-center justify-center text-bg font-bold">
              SCRUB
            </div>
          </div>
        </div>

        <div className="stagger-container">
          <h3 className="text-lg mb-4">Staggered Reveal</h3>
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="stagger-item h-24 bg-muted rounded-lg" />
            ))}
          </div>
        </div>

        <div className="progress-container h-4 bg-muted rounded-full overflow-hidden">
          <div className="progress-bar h-full bg-primary rounded-full" style={{ transformOrigin: "left center", transform: "scaleX(0)" }} />
        </div>
        <p className="text-center text-sm text-muted-foreground">Scroll progress indicator</p>
      </div>
    </section>
  );
}