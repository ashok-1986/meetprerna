import Link from "next/link";

export default function CTA() {
  return (
    <section id="contact" className="relative py-24 px-6 bg-[#1A1A1A] border-t border-[#3A3A3A]">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Headline */}
        <h2
          className="text-[#FDFFE9]"
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          Your story deserves a shape.
        </h2>

        {/* Sub-headline */}
        <p
          className="max-w-[500px] mx-auto text-[#FDFFE9]"
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: "1rem",
            fontWeight: 400,
            lineHeight: 1.6,
          }}
        >
          Prerna takes limited appointments each month.
          Each one begins with a conversation, not a price list.
          If you&apos;re ready to wear something real — start here.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          {/* Primary CTA */}
          <Link
            href="https://meetprerna.fillout.com/book"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#C4FF61] text-[#1A1A1A] font-lato font-medium text-base rounded-full transition-colors duration-300 hover:bg-[#EAFF27]"
          >
            Begin the conversation
          </Link>

          {/* Secondary CTA */}
          <Link
            href="#portfolio"
            className="inline-flex items-center justify-center px-8 py-4 border border-[#C4FF61] text-[#C4FF61] font-lato font-medium text-base rounded-full transition-colors duration-300 hover:bg-[#C4FF61]/10"
          >
            See the work first
          </Link>
        </div>
      </div>
    </section>
  );
}
