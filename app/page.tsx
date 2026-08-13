import PageWrapper from "@/components/PageWrapper";
import Hero from "@/components/Hero";
import LocationMarquee from "@/components/LocationMarquee";
import StatsGrid from "@/components/StatsGrid";
import SelectedWork from "@/components/SelectedWork";
import Hinge from "@/components/Hinge";
import Philosophy from "@/components/Philosophy";
import ClientVoices from "@/components/ClientVoices";
import ClosingCTA from "@/components/ClosingCTA";
import { fetchSenjaTestimonials } from "@/lib/api/senja";

export default async function Home() {
  const testimonials = await fetchSenjaTestimonials();

  return (
    <PageWrapper>
      <Hero />
      <LocationMarquee />
      <StatsGrid />
      <SelectedWork />
      <Hinge />
      <Philosophy />
      {testimonials.length > 0 && <ClientVoices testimonials={testimonials} />}
      <ClosingCTA />
    </PageWrapper>
  );
}
