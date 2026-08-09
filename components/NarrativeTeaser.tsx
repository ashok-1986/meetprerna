import Link from "next/link";

export default function NarrativeTeaser() {
  return (
    <section className="w-full bg-ink text-ivory py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 md:gap-32">
        {/* Left Anchor: Section Title */}
        <div className="flex-none max-w-sm">
          <p className="font-mono text-sm uppercase text-ivory-dim tracking-widest mb-6">
            From sketchbook margins to skin
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            The Needle &<br />The North Star
          </h2>
        </div>

        {/* Right Anchor: Narrative Text */}
        <div className="flex-1 max-w-2xl font-body text-lg md:text-xl leading-relaxed space-y-6 text-ivory/90">
          <p>
            I kept stepping into the light because the fear was proof that the art mattered. I learned early on that if something scares you that deeply, it is because it has the power to transform you.
          </p>
          <p>
            At just seventeen years old, in February 2020, I packed two suitcases and boarded a train to Mumbai. My chest was heavy with what I can only describe as a &quot;loud&quot; feeling—loud hope, loud fear, loud everything. I stood at the crowded railway station, watching the fast, indifferent, thrilling current of the city, and thought: <em>This is either going to make me or break me, and I don&apos;t yet know which.</em>
          </p>
          <div className="pt-8">
            <Link 
              href="/about" 
              className="group inline-flex items-center gap-4 font-mono uppercase text-sm tracking-wider text-inchworm hover:text-inchworm-deep transition-colors"
            >
              <span>Read the full story</span>
              <span className="transform group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
