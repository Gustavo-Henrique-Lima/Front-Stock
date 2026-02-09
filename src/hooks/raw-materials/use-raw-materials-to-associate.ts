import { useQuery } from '@tanstack/react-query';

import type { RawMaterialAssociate } from '@/features/types/raw_material_associate';
import { listRawMaterialsToAssociate } from '@/services/raw_material/raw-material.service';

export function useRawMaterialsToAssociate() {
  return useQuery<RawMaterialAssociate[]>({
    queryKey: ['raw-materials-to-associate'],
    queryFn: listRawMaterialsToAssociate,
    staleTime: 5 * 60 * 1000,
  });
}
