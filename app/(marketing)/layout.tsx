import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollProgress />
      <ErrorBoundary>
        <Header />
        <main id="main" className="min-h-dvh pt-header">
          {children}
        </main>
        <Footer />
      </ErrorBoundary>
    </>
  );
}
