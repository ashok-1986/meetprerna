import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: "/#portfolio", label: "Portfolio" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Contact" },
  ];

  const socialLinks = [
    { href: "https://instagram.com", label: "Instagram" },
    { href: "https://pinterest.com", label: "Pinterest" },
    { href: "https://facebook.com", label: "Facebook" },
    { href: "https://youtube.com", label: "Youtube" },
  ];

  return (
    <footer className="bg-[#0D0D0D] border-t border-[rgba(253,255,233,0.06)]">
      <div className="px-6 md:px-16 pt-15 pb-10">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
          {/* Logo */}
          <div className="md:text-left">
            <Image
              src="/logo/meetprerna_logo_100525_1@2x.png"
              alt="meet prerna"
              width={176}
              height={36}
              className="h-9 w-auto"
            />
          </div>

          {/* Nav links */}
          <div className="md:text-center">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-lato text-xs text-[#FDFFE9] opacity-50 hover:opacity-100 transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div className="md:text-right">
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-lato text-xs text-[#C4FF61] opacity-70 hover:opacity-100 transition-all duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Middle - Tagline */}
        <div className="my-12 text-center">
          <p className="font-serif italic text-sm text-[#FDFFE9] opacity-30">
            Ink rooted in story. Studio rooted in Mumbai.
          </p>
        </div>

        {/* Bottom row */}
        <div className="pt-6 border-t border-[rgba(253,255,233,0.04)] flex flex-col md:flex-row justify-between gap-4">
          <div className="font-lato text-xs text-[#FDFFE9] opacity-25">
            © {currentYear} meet prerna
          </div>
          <div className="font-lato text-xs text-[#FDFFE9] opacity-25">
            Powered by ALCHEMETRYX
          </div>
        </div>
      </div>
    </footer>
  );
}
