import PageWrapper from "@/components/PageWrapper";
import Hero from "@/components/Hero";
import LocationMarquee from "@/components/LocationMarquee";
import StatsGrid from "@/components/StatsGrid";
import SelectedWorkScatter from "@/components/SelectedWorkScatter";
import Hinge from "@/components/Hinge";
import Philosophy from "@/components/Philosophy";
import ClientVoices from "@/components/ClientVoices";
import ClosingCTA from "@/components/ClosingCTA";

export default function Home() {
  return (
    <PageWrapper>
      <Hero />
      <LocationMarquee />
      <StatsGrid />
      <SelectedWorkScatter />
      <Hinge />
      <Philosophy />
      <ClientVoices />
      <ClosingCTA />
    </PageWrapper>
  );
}
