import dynamic from 'next/dynamic';
import PageWrapper from "@/components/PageWrapper";
import Hero from "@/components/Hero";
import LocationMarquee from "@/components/LocationMarquee";
import StatsGrid from "@/components/StatsGrid";
import { fetchSenjaTestimonials } from "@/lib/api/senja";

const SelectedWorkMasonry = dynamic(() => import("@/components/SelectedWorkMasonry"), { ssr: true });
const Hinge = dynamic(() => import("@/components/Hinge"), { ssr: true });
const Philosophy = dynamic(() => import("@/components/Philosophy"), { ssr: true });
const ClientVoices = dynamic(() => import("@/components/ClientVoices"), { ssr: true });
const ClosingCTA = dynamic(() => import("@/components/ClosingCTA"), { ssr: true });

export default async function Home() {
  const testimonials = await fetchSenjaTestimonials();

  return (
    <PageWrapper>
      <Hero />
      <LocationMarquee />
      <StatsGrid />
      <SelectedWorkMasonry />
      <Hinge />
      <Philosophy />
      {testimonials.length > 0 && <ClientVoices testimonials={testimonials} />}
      <ClosingCTA />
    </PageWrapper>
  );
}
