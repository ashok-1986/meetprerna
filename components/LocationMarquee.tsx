export default function LocationMarquee() {
  const text = "Mumbai · Traveling Artist ·";

  return (
    <section className="w-full bg-ink py-4 overflow-hidden flex items-center border-b border-ink-300">
      <div className="flex w-full whitespace-nowrap overflow-hidden group">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
          <span className="text-ivory-dim font-mono text-sm tracking-widest px-4">
            {text}
          </span>
          <span className="text-ivory-dim font-mono text-sm tracking-widest px-4" aria-hidden="true">
            {text}
          </span>
        </div>
      </div>
    </section>
  );
}
