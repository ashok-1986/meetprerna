import { PROCESS_VIDEOS } from '@/data/portfolio';
import ProcessClient from './ProcessClient';
import { buildMetadata } from '@/lib/seo';

export function generateMetadata() {
  return buildMetadata({ title: 'Process', path: '/process' });
}

export default function ProcessPage() {
  return <ProcessClient videos={PROCESS_VIDEOS} />;
}
