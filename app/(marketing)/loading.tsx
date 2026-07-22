import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { Skeleton } from '@/components/ui/Skeleton';

export default function MarketingLoading() {
  return (
    <Section spacing="hero" tone="default">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 relative z-10">
          <div className="lg:col-span-5">
            <Skeleton width={200} height={20} />
          </div>
          <div className="flex flex-col gap-8 lg:col-span-7">
            <Skeleton className="w-full max-w-[600px] h-[64px] sm:h-[80px]" />
            <Skeleton className="w-full max-w-[500px] h-[48px]" />
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Skeleton width={160} height={56} className="rounded-full" />
              <Skeleton width={160} height={56} className="rounded-full" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
