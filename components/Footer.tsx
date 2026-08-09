import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-inchworm text-ink px-6 md:px-8 py-16 md:py-32 flex flex-col items-center">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
        <div className="flex flex-col space-y-8">
          <Link href="/" className="font-display text-4xl tracking-wide">
            meetprerna
          </Link>
          <div className="font-mono text-sm max-w-xs uppercase">
            Multidisciplinary Visual Artist based in Mumbai
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50">Links</h4>
            <nav className="flex flex-col gap-2 font-body text-sm">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/portfolio" className="hover:underline">Portfolio</Link>
              <Link href="/about" className="hover:underline">About</Link>
              <a href="https://meetprerna.fillout.com/book" target="_blank" rel="noopener noreferrer" className="hover:underline">Consultation</a>
              <Link href="/connect" className="hover:underline">Connect</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50">Social</h4>
            <nav className="flex flex-col gap-2 font-body text-sm">
              <a href="https://instagram.com/meetprerna" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
              <a href="https://wa.link/sdsmge" target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp</a>
              <a href="mailto:prerna@meetprerna.com" className="hover:underline">prerna@meetprerna.com</a>
            </nav>
          </div>
        </div>
      </div>
      <div className="w-full max-w-7xl mt-24 pt-8 border-t border-ink/20 flex flex-col md:flex-row justify-between text-xs font-mono uppercase gap-4 md:gap-0">
        <p>© {new Date().getFullYear()} MeetPrerna. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="hover:underline">Terms of Service</Link>
          <p>Site by <a href="#" className="underline hover:text-inchworm-deep">ALCHEMETRYX</a></p>
        </div>
      </div>
    </footer>
  );
}
