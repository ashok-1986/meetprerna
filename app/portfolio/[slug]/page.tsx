import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPortfolioItemBySlug, portfolioData } from "@/lib/data/portfolio";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return portfolioData.map((item) => ({
    slug: item.slug,
  }));
}

export default function PortfolioDetail({ params }: PageProps) {
  const item = getPortfolioItemBySlug(params.slug);

  if (!item) {
    notFound();
  }

  const isLightMode = item.medium === "Painting" || item.medium === "Sketch";

  // Dynamic CSS classes based on medium mode
  const bgClass = isLightMode ? "bg-ivory" : "bg-ink";
  const textClass = isLightMode ? "text-ink" : "text-ivory";
  const dimTextClass = isLightMode ? "text-ink/60" : "text-ivory-dim";
  const borderClass = isLightMode ? "border-ink/20" : "border-ivory/20";
  const accentClass = isLightMode ? "text-inchworm-deep" : "text-inchworm";

  return (
    <main className={`w-full min-h-screen ${bgClass} ${textClass} transition-colors duration-700 pb-32`}>
      {/* Top Navigation */}
      <div className={`w-full px-6 md:px-12 py-8 flex justify-between items-center z-10 relative`}>
        <Link 
          href="/portfolio"
          className={`font-mono text-sm uppercase tracking-widest hover:${accentClass} transition-colors`}
        >
          ← Back to Archive
        </Link>
      </div>

      <article className="max-w-7xl mx-auto px-6 md:px-12 mt-8 md:mt-16 flex flex-col md:flex-row gap-16 items-start">
        {/* Left Side: Images */}
        <div className="w-full md:w-3/5 flex flex-col gap-8">
          {item.galleryImages.map((img, idx) => (
            <div key={idx} className="relative w-full">
              <Image 
                src={img}
                alt={`${item.title} - view ${idx + 1}`}
                width={1200}
                height={1600}
                sizes="(max-width: 768px) 100vw, 60vw"
                priority={idx === 0}
                className="w-full h-auto object-cover rounded-sm"
              />
            </div>
          ))}
        </div>

        {/* Right Side: Metadata and Story */}
        <div className="w-full md:w-2/5 sticky top-32 flex flex-col gap-12">
          
          <header className="flex flex-col gap-4">
            <h1 className="font-display text-5xl md:text-7xl leading-none">
              {item.title}
            </h1>
            
            <div className={`flex flex-col gap-2 font-mono text-sm uppercase tracking-widest ${dimTextClass} border-t ${borderClass} pt-6 mt-4`}>
              <div className="flex justify-between">
                <span>Medium</span>
                <span className={textClass}>{item.medium}</span>
              </div>
              <div className="flex justify-between">
                <span>Motif</span>
                <span className={textClass}>{item.motif}</span>
              </div>
              {item.medium === "Tattoo" && item.placement && (
                <div className="flex justify-between">
                  <span>Placement</span>
                  <span className={textClass}>{item.placement}</span>
                </div>
              )}
              {item.medium !== "Tattoo" && item.size && (
                <div className="flex justify-between">
                  <span>Size</span>
                  <span className={textClass}>{item.size}</span>
                </div>
              )}
            </div>
          </header>

          <div className={`font-body text-lg md:text-xl leading-relaxed ${textClass}`}>
            <p>{item.description}</p>
          </div>

          <div className={`border-t ${borderClass} pt-12 mt-8 flex flex-col gap-6`}>
            <h3 className="font-display text-3xl">Start your own piece.</h3>
            <p className={`font-body ${dimTextClass}`}>
              Every piece begins with a conversation. Let's discuss your vision.
            </p>
            <InteractiveHoverButton 
              className={`w-fit ${isLightMode ? 'text-ink border-inchworm-deep hover:bg-inchworm-deep hover:text-ivory' : ''}`}
            >
              <Link href="/connect">Book a Consultation</Link>
            </InteractiveHoverButton>
          </div>
          
        </div>
      </article>
    </main>
  );
}
