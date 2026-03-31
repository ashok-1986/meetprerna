import Navbar from "@/components/Navbar";
import AboutHero from "@/components/about/AboutHero";
import OpeningStatement from "@/components/about/OpeningStatement";
import StoryBeat from "@/components/about/StoryBeat";
import StoryBeatFull from "@/components/about/StoryBeatFull";
import PhilosophyStrip from "@/components/about/PhilosophyStrip";
import WorkingSection from "@/components/about/WorkingSection";
import AboutTestimonials from "@/components/about/AboutTestimonials";
import AboutCTA from "@/components/about/AboutCTA";
import Footer from "@/components/Footer";

export const metadata = {
    title: "About Prerna | meet prerna — Creative & Tattoo Artist Mumbai",
    description:
        "The story of Prerna — a creative artist who left home twice, beat her fear of needles, and found her medium in permanent ink. Mumbai tattoo artist.",
};

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main style={{ margin: 0, padding: 0 }}>
                <AboutHero />
                <OpeningStatement />
                <StoryBeat beat="01" imageRight />
                <StoryBeatFull beat="02" />
                <StoryBeat beat="03" imageLeft />
                <StoryBeatFull beat="04" fullBleedImage />
                <PhilosophyStrip />
                <WorkingSection />
                <AboutTestimonials />
                <AboutCTA />
            </main>
            <Footer />
        </>
    );
}
