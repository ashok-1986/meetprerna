"use client";


export default function Connect() {
  return (
    <main className="w-full min-h-[90vh] bg-ink text-ivory flex items-center justify-center px-6 md:px-12 py-32">
      <div className="max-w-4xl mx-auto flex flex-col gap-16 md:gap-24 w-full">
        
        <header className="flex flex-col gap-6 text-center">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-none tracking-tight">
            Let's talk.
          </h1>
          <p className="font-body text-xl text-ivory/70 max-w-xl mx-auto">
            Whether for a private tattoo commission, an abstract canvas, or a gallery exhibition.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 border-t border-ivory/10 pt-16">
          {/* Form */}
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-ivory/50">Consultation Form</h3>
            <a href="https://meetprerna.fillout.com/book" target="_blank" rel="noopener noreferrer" className="font-display text-2xl md:text-3xl hover:italic transition-all duration-300 flex items-center gap-2">
              Start a Request
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
          </div>

          {/* General Inquiries */}
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-ivory/50">Direct Mail</h3>
            <a href="mailto:prerna@meetprerna.com" className="font-display text-2xl md:text-3xl hover:italic transition-all duration-300">
              prerna@meetprerna.com
            </a>
          </div>

          {/* WhatsApp */}
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-ivory/50">WhatsApp</h3>
            <a href="https://wa.link/sdsmge" target="_blank" rel="noopener noreferrer" className="font-display text-2xl md:text-3xl hover:italic transition-all duration-300">
              Message Studio
            </a>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-ivory/50">Instagram</h3>
            <a href="https://instagram.com/meetprerna" target="_blank" rel="noopener noreferrer" className="font-display text-2xl md:text-3xl hover:italic transition-all duration-300">
              @meetprerna
            </a>
          </div>

          {/* Press Kit */}
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-ivory/50">Media & Press</h3>
            <span className="font-display text-2xl md:text-3xl text-ivory/40 cursor-not-allowed flex items-center gap-2 select-none">
              Press Kit (Coming Soon)
              <svg className="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            </span>
          </div>
        </div>
        
      </div>
    </main>
  );
}
