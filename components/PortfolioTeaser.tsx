import Link from "next/link";
import Image from "next/image";

export default function PortfolioTeaser() {
  const categories = [
    {
      title: "Paper & Charcoal Sketches",
      href: "/portfolio?category=sketch",
      image: "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/category-sketch.jpg"
    },
    {
      title: "Canvas & Abstract Paintings",
      href: "/portfolio?category=canvas",
      image: "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/category-canvas.jpg"
    },
    {
      title: "Living Ink",
      href: "/portfolio?category=ink",
      image: "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/category-ink.jpg"
    }
  ];

  return (
    <section className="w-full bg-ink text-ivory py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <p className="font-mono text-sm uppercase text-ivory-dim tracking-widest">
            Paper, canvas, and permanence
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            Selected Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <Link key={i} href={cat.href} className="group flex flex-col gap-6">
              <div className="relative w-full aspect-[4/5] bg-ink-100 overflow-hidden">
                {/* Fallback color block if image is missing */}
                <div className="absolute inset-0 bg-ink-200" />
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-body text-xl md:text-2xl group-hover:italic transition-all">
                {cat.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
