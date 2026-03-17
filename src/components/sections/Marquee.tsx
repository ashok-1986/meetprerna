'use client';

/**
 * Marquee Section Component
 * Infinite horizontal scrolling text band with brand keywords
 */
export function Marquee() {
  const marqueeContent =
    'Custom Tattoos · Navi Mumbai · Mumbai · By Appointment · Ink Your Journey · Female Artist · Story-Driven Design · ';

  return (
    <section className="relative py-8 md:py-12 border-y border-white/6 overflow-hidden">
      <div className="flex animate-marquee">
        {/* First Copy */}
        <div className="flex items-center gap-8 md:gap-12 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8 md:gap-12">
              <span className="text-2xl md:text-3xl font-serif italic text-ivory/60">
                {marqueeContent}
              </span>
            </span>
          ))}
        </div>

        {/* Second Copy for Seamless Loop */}
        <div className="flex items-center gap-8 md:gap-12 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8 md:gap-12">
              <span className="text-2xl md:text-3xl font-serif italic text-ivory/60">
                {marqueeContent}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Inline styles for marquee animation */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
