export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <h2
          className="text-center mb-12"
          style={{
            color: "#FDFFE9",
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          She didn&apos;t plan to become a tattoo artist.
          <br />
          <span className="italic">She became one anyway.</span>
        </h2>

        {/* Body text */}
        <div className="max-w-[500px] mx-auto space-y-6">
          <p
            className="font-lato text-[#FDFFE9]/90"
            style={{
              fontSize: "1rem",
              lineHeight: 1.6,
            }}
          >
            Prerna grew up making things with her hands — sketching at margins,
            filling notebooks, watching the world like it owed her an explanation.
          </p>

          <p
            className="font-lato text-[#FDFFE9]/90"
            style={{
              fontSize: "1rem",
              lineHeight: 1.6,
            }}
          >
            She left familiar ground to follow something she couldn&apos;t name yet.
            What she found was a needle, ink, and the realisation that the body
            is the oldest canvas there is.
          </p>

          <p
            className="font-lato text-[#FDFFE9]/90"
            style={{
              fontSize: "1rem",
              lineHeight: 1.6,
            }}
          >
            Her practice is rooted in stillness. Every consultation begins with
            listening — not to what you want, but to what you&apos;re carrying.
            The design comes after. The meaning was always already there.
          </p>

          <p
            className="font-lato text-[#FDFFE9]/90"
            style={{
              fontSize: "1rem",
              lineHeight: 1.6,
            }}
          >
            She works from a place of intention, not trend. Her ink is made
            to last because the stories she&apos;s given are made to last.
          </p>
        </div>

        {/* Pull quote */}
        <blockquote
          className="max-w-3xl mx-auto mt-16 text-center"
          style={{
            color: "#FDFFE9",
            fontFamily: "'Times New Roman', Times, serif",
            fontStyle: "italic",
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            lineHeight: 1.4,
          }}
        >
          &ldquo;I don&apos;t tattoo skin. I tattoo what&apos;s underneath it.&rdquo;
        </blockquote>
      </div>
    </section>
  );
}
