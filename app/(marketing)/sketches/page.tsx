import { SKETCHES } from '@/data/portfolio';
import SketchesClient from './SketchesClient';

export default function SketchesPage() {
  return <SketchesClient items={SKETCHES} />;
}
