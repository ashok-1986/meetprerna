const stats = [
  { number: "500+", label: "Stories inked", sublabel: "Each one original" },
  { number: "99%", label: "Come back", sublabel: "Referrals and repeat clients" },
  { number: "5+", label: "Years of practice", sublabel: "Rooted in Mumbai" },
  { number: "0", label: "Templates used", sublabel: "Ever" },
];

export default function Stats() {
  return (
    <section className="relative py-24 px-6 bg-[#1A1A1A] border-t border-[#3A3A3A]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center space-y-2">
              {/* Number */}
              <div
                className="text-[#C4FF61]"
                style={{
                  fontFamily: "'Times New Roman', Times, serif",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {stat.number}
              </div>

              {/* Label */}
              <div
                className="text-[#FDFFE9]"
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "0.9375rem",
                  fontWeight: 400,
                  lineHeight: 1.4,
                }}
              >
                {stat.label}
              </div>

              {/* Sub-label */}
              <div
                className="text-[#FDFFE9]/60"
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "0.8125rem",
                  fontWeight: 400,
                  lineHeight: 1.4,
                }}
              >
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
