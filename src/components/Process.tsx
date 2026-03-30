const steps = [
  {
    number: "01",
    title: "Consult",
    subtitle: "We begin with your story, not your reference image.",
    description:
      "Before any design happens, Prerna listens. What brought you here. What you're ready to wear permanently. What you've been carrying that deserves a shape.",
  },
  {
    number: "02",
    title: "Design",
    subtitle: "The sketch comes from you, not Pinterest.",
    description:
      "Every design is drawn from scratch. No templates. No recycled motifs. What emerges is yours alone — refined until it feels inevitable.",
  },
  {
    number: "03",
    title: "Ink",
    subtitle: "This part asks you to be still. So does meditation.",
    description:
      "In a clean, calm studio environment, the design becomes permanent. Prerna works with precision and patience. The process is part of the ritual.",
  },
  {
    number: "04",
    title: "Aftercare",
    subtitle: "The work doesn't end when the needle does.",
    description:
      "Healing is tended to with the same care as the design. You leave with guidance, a follow-up check-in, and a piece that will age the way good things do — with character.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-24 px-6 bg-[#1A1A1A] border-t border-[#3A3A3A]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <h2
          className="text-center mb-16"
          style={{
            color: "#FDFFE9",
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
          }}
        >
          The Process
        </h2>

        {/* Steps grid */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {steps.map((step) => (
            <div key={step.number} className="space-y-4">
              {/* Step number */}
              <span
                className="block text-[#C4FF61]"
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                }}
              >
                {step.number}
              </span>

              {/* Title */}
              <h3
                className="text-[#FDFFE9]"
                style={{
                  fontFamily: "'Times New Roman', Times, serif",
                  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                  fontWeight: 700,
                }}
              >
                {step.title}
              </h3>

              {/* Subtitle */}
              <p
                className="text-[#C4FF61]"
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 400,
                  lineHeight: 1.5,
                }}
              >
                {step.subtitle}
              </p>

              {/* Description */}
              <p
                className="text-[#FDFFE9]/80"
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "0.9375rem",
                  lineHeight: 1.7,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
