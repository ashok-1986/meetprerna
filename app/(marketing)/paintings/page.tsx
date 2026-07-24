import { PAINTINGS } from '@/data/portfolio';
import PaintingsClient from './PaintingsClient';

export default function PaintingsPage() {
  return <PaintingsClient items={PAINTINGS} />;
}
