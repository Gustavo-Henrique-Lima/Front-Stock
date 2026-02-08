import { useQuery } from '@tanstack/react-query';

import { simulateProduction } from '@/services/production/production.service';

export function useProductionSimulation() {
  return useQuery({
    queryKey: ['production-simulation'],
    queryFn: simulateProduction,
    staleTime: 1000 * 60,
  });
}
