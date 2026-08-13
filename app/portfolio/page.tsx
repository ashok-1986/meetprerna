"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TextMotion from "@/components/ui/TextMotion";
import dynamic from "next/dynamic";
import { getPortfolioItems, Medium } from "@/lib/data/portfolio";

const OGLDistortionSlider = dynamic(() => import("@/components/OGLDistortionSlider"), { ssr: false });

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Medium | "All">("All");

  const portfolioItems = getPortfolioItems(activeCategory);

  return (
    <main className="w-full min-h-screen text-ivory bg-ink">
      
      {/* Hero Slider */}
      <OGLDistortionSlider />

      <div className="w-full flex flex-col gap-12 pt-24 pb-24 px-6 md:px-8 max-w-[1600px] mx-auto">
        
        {/* Header & Filter */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-ivory/20 pb-8">
          <div>
            <h1 className="font-display text-5xl md:text-6xl leading-none">
              <TextMotion text="Portfolio" preset="liquid" duration={1.5} trigger="onView" />
            </h1>
            <p className="font-mono text-sm text-ivory-dim mt-4 uppercase tracking-widest">
              Selected Works
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 font-mono text-sm uppercase">
            {(["All", "Tattoo", "Painting", "Sketch"] as (Medium | "All")[]).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`transition-colors px-4 py-2 rounded-full border ${
                  activeCategory === cat 
                    ? "border-inchworm text-ink bg-inchworm" 
                    : "border-ivory/30 text-ivory/70 hover:border-ivory hover:text-ivory"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {portfolioItems.map((item, index) => (
            <Link
              href={`/portfolio/${item.slug}`}
              key={item.slug} 
              className="group block break-inside-avoid cursor-pointer"
            >
              <div className="relative w-full bg-ink-100 overflow-hidden mb-4 rounded-sm">
                <div className="absolute inset-0 bg-ink-200" />
                <Image
                  src={item.coverImage}
                  alt={item.title}
                  width={800}
                  height={1000}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 4}
                  className="object-cover w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
                />
                
                {/* Hover Metadata Overlay */}
                <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="font-mono text-xs text-inchworm uppercase tracking-widest mb-1">
                    {item.motif}
                  </span>
                  <span className="font-mono text-xs text-ivory/80 uppercase tracking-widest">
                    {item.medium === 'Tattoo' ? item.placement : item.size}
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <h3 className="font-display text-2xl group-hover:italic group-hover:text-inchworm transition-all duration-300">
                  {item.title}
                </h3>
                <span className="font-mono text-xs text-ivory-dim uppercase tracking-widest mt-1">
                  {item.medium}
                </span>
              </div>
            </Link>
          ))}
        </div>
        
        {portfolioItems.length === 0 && (
          <div className="text-center py-32 text-ivory-dim font-mono">
            No pieces found for this category.
          </div>
        )}
      </div>
    </main>
  );
}
