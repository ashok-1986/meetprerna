import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-inchworm text-ink px-6 md:px-8 pt-16 md:pt-32 pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-[calc(8rem+env(safe-area-inset-bottom))] flex flex-col items-center">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
        <div className="flex flex-col space-y-8">
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
            <Image 
              src="/images/logo_black.png" 
              alt="MeetPrerna" 
              width={140} 
              height={40} 
              className="h-10 md:h-12 w-auto object-contain" 
            />
          </Link>
          <div className="font-mono text-sm max-w-xs uppercase">
            Multidisciplinary Visual Artist based in Mumbai
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50">Links</h4>
            <nav className="flex flex-col font-body text-sm">
              <Link href="/" className="hover:underline py-2 -my-2 inline-block mt-2">Home</Link>
              <Link href="/portfolio" className="hover:underline py-2 -my-2 inline-block mt-2">Portfolio</Link>
              <Link href="/about" className="hover:underline py-2 -my-2 inline-block mt-2">About</Link>
              <a href="https://meetprerna.fillout.com/book" target="_blank" rel="noopener noreferrer" className="hover:underline py-2 -my-2 inline-block mt-2">Consultation</a>
              <Link href="/connect" className="hover:underline py-2 -my-2 inline-block mt-2">Connect</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50">Social</h4>
            <nav className="flex flex-col font-body text-sm">
              <a href="https://instagram.com/meetprerna" target="_blank" rel="noopener noreferrer" className="hover:underline py-2 -my-2 inline-block mt-2">Instagram</a>
              <a href="https://wa.link/sdsmge" target="_blank" rel="noopener noreferrer" className="hover:underline py-2 -my-2 inline-block mt-2">WhatsApp</a>
              <a href="mailto:prerna@meetprerna.com" className="hover:underline py-2 -my-2 inline-block mt-2">prerna@meetprerna.com</a>
            </nav>
          </div>
        </div>
      </div>
      <div className="w-full max-w-7xl mt-24 pt-8 border-t border-ink/20 flex flex-col md:flex-row justify-between text-xs font-mono uppercase gap-4 md:gap-0">
        <p>© {new Date().getFullYear()} MeetPrerna. All rights reserved.</p>
        <div className="flex flex-wrap gap-4 items-center">
          <Link href="/privacy" className="hover:underline py-2 inline-block">Privacy Policy</Link>
          <Link href="/terms" className="hover:underline py-2 inline-block">Terms of Service</Link>
          <p className="py-2">Site by <a href="#" className="underline hover:text-inchworm-deep py-2 -my-2 inline-block">ALCHEMETRYX</a></p>
        </div>
      </div>
    </footer>
  );
}
