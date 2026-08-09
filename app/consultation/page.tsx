import ConsultationHero from "@/components/ConsultationHero";
import ConsultationProcess from "@/components/ConsultationProcess";
import ConsultationFAQ from "@/components/ConsultationFAQ";
import ClosingCTA from "@/components/ClosingCTA";
import PageWrapper from "@/components/PageWrapper";
import FloatingCTA from "@/components/FloatingCTA";

export const metadata = {
  title: "Consultation | MeetPrerna",
  description: "The process of bringing your tattoo vision to life.",
};

export default function ConsultationPage() {
  return (
    <PageWrapper>
      <ConsultationHero />
      <ConsultationProcess />
      <ConsultationFAQ />
      <ClosingCTA />
      <FloatingCTA />
    </PageWrapper>
  );
}
