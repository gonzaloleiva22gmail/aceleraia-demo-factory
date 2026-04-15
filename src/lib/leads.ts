import type { LeadData } from '@/types/lead';

// Static imports — bundled by Next.js/webpack at build time.
// NO filesystem access at runtime, guaranteed to work on Vercel.
// When adding a new lead JSON, add one line here.
import sonrisaLima from '../../leads/sonrisa-lima.json';
import luminaLima from '../../leads/lumina-lima.json';
import pielBella from '../../leads/piel-bella.json';

const leadsMap: Record<string, LeadData> = {
  'sonrisa-lima': sonrisaLima as unknown as LeadData,
  'lumina-lima':  luminaLima  as unknown as LeadData,
  'piel-bella':   pielBella   as unknown as LeadData,
};

export function getLeadData(id: string): LeadData | null {
  return leadsMap[id] ?? null;
}
