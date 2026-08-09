import Link from "next/link";

export default function InvestmentTeaser() {
  return (
    <section className="w-full bg-ivory text-ink py-24 md:py-32 border-t border-ink-300/30">
      <div className="px-6 md:px-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 max-w-[1440px] mx-auto">
        
        <div className="flex-1 opacity-0 gs-reveal">
          <h2 className="font-display text-[clamp(2.25rem,6vw,5rem)] font-[400] leading-tight max-w-2xl">
            Investment
          </h2>
          <p className="font-body text-lg md:text-xl text-ink-500 mt-6 max-w-lg leading-relaxed">
            Custom work starts at ₹[X,XXX]. See the full pricing and process guide to understand how we value art, time, and your skin.
          </p>
        </div>

        <div className="opacity-0 gs-reveal flex-none">
          <Link 
            href="/sanctuary" 
            className="inline-flex items-center gap-2 bg-transparent border border-ink text-ink hover:bg-ink hover:text-ivory px-8 py-3 rounded-full font-body text-[1rem] tracking-wide transition-colors"
          >
            Review the Guide
          </Link>
        </div>

      </div>
    </section>
  );
}
