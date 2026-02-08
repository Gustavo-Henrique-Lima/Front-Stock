import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { PageResponse } from '@/features/types/page_response';
import type { Material } from '@/features/types/raw-material';
import { listRawMaterials } from '@/services/raw_material/raw-material.service';

export function useRawMaterials(page: number, size: number) {
  return useQuery<PageResponse<Material>>({
    queryKey: ['raw-materials', page, size],
    queryFn: () => listRawMaterials(page, size),
    placeholderData: keepPreviousData,
  });
}
