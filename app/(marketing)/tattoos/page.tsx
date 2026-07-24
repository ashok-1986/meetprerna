import { TATTOOS } from '@/data/portfolio';
import TattoosClient from './TattoosClient';

export default function TattoosPage() {
  return <TattoosClient items={TATTOOS} />;
}
