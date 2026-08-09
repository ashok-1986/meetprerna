import PageWrapper from "@/components/PageWrapper";
import AboutHero from "@/components/AboutHero";
import AboutStory from "@/components/AboutStory";
import AboutShift from "@/components/AboutShift";
import AboutSanctuary from "@/components/AboutSanctuary";

export default function About() {
  return (
    <PageWrapper>
      <AboutHero />
      <AboutStory />
      <AboutShift />
      <AboutSanctuary />
    </PageWrapper>
  );
}
