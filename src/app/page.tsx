import Navbar from "@/components/Navbar";
import HeroReveal from "@/components/HeroReveal";
import FeaturedWork from "@/components/FeaturedWork";
import Statement from "@/components/Statement";
import DisciplinesStrip from "@/components/DisciplinesStrip";
import Marquee from "@/components/Marquee";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ margin: 0, padding: 0 }}>
        <HeroReveal />           {/* Hook */}
        <FeaturedWork />         {/* Proof of work — Ashfall style */}
        <Statement />            {/* Identity — why she does it */}
        <DisciplinesStrip />     {/* Range — discovery moment */}
        <Marquee />              {/* Rhythm */}
        <Process />              {/* How — 4 steps */}
        <Testimonials />         {/* Social proof */}
        <CTA />                  {/* Conversion */}
      </main>
      <Footer />
    </>
  );
}
