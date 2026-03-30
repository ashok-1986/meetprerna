import Navbar from "@/components/Navbar";
import HeroZoom from "@/components/HeroZoom";
import Statement from "@/components/Statement";
import Marquee from "@/components/Marquee";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ margin: 0, padding: 0 }}>
        <HeroZoom />
        <Statement />
        <Marquee />
        <Portfolio />
        <Process />
        <Stats />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
