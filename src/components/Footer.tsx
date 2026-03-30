export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-6 bg-[#1A1A1A] border-t border-[#3A3A3A]">
      <div className="max-w-7xl mx-auto">
        {/* Tagline */}
        <p
          className="text-center mb-8"
          style={{
            color: "#FDFFE9",
            fontFamily: "'Lato', sans-serif",
            fontSize: "0.9375rem",
            fontWeight: 400,
            fontStyle: "italic",
            opacity: 0.6,
          }}
        >
          Ink rooted in story. Studio rooted in Mumbai.
        </p>

        {/* Copyright and links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p
            className="text-[#FDFFE9]/40"
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "0.8125rem",
            }}
          >
            &copy; {currentYear} meet prerna. All rights reserved.
          </p>

          {/* Social links placeholder */}
          <div className="flex gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FDFFE9]/40 hover:text-[#C4FF61] transition-colors"
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.8125rem",
              }}
            >
              Instagram
            </a>
            <a
              href="mailto:hello@meetprerna.com"
              className="text-[#FDFFE9]/40 hover:text-[#C4FF61] transition-colors"
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.8125rem",
              }}
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
