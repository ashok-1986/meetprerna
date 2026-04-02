import Navbar from "@/components/Navbar";
import HeroReveal from "@/components/HeroReveal";
import Statement from "@/components/Statement";
import Marquee from "@/components/Marquee";
import DisciplinesStrip from "@/components/DisciplinesStrip";
import VideoMarquee from "@/components/VideoMarquee";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ margin: 0, padding: 0 }}>
        <HeroReveal />
        <Statement />
        <VideoMarquee />
        <DisciplinesStrip />
        <Marquee />
        <Portfolio />
        <Process />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
