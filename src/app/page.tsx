import Navbar from "@/components/Navbar";
import HeroReveal from "@/components/HeroReveal";
import Statement from "@/components/Statement";
import Marquee from "@/components/Marquee";
import StoryScroll from "@/components/StoryScroll";
import VideoSection from "@/components/VideoSection";
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
        <HeroReveal />
        <Statement />
        <StoryScroll />
        <Marquee />
        <VideoSection />
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
