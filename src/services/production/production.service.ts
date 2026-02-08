import { httpClient } from '../client';

import type { ProductionSimulationResult } from '@/features/types/production-simulation';

export async function simulateProduction(): Promise<ProductionSimulationResult> {
  const response = await httpClient.get<ProductionSimulationResult>('/api/production/simulation');

  return response.data;
}
