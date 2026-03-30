import Navbar from "@/components/Navbar";
import HeroZoom from "@/components/HeroZoom";
import About from "@/components/About";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroZoom />
      <About />
      <Process />
      <Stats />
      <CTA />
      <Footer />
    </>
  );
}
