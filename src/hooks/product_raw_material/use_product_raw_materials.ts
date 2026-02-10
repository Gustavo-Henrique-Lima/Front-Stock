import { useQuery } from '@tanstack/react-query';

import type { ProductRawMaterial } from '@/features/types/product_raw/get_product_raw';
import { listProductRawMaterials } from '@/services/product_raw_material/product-raw-material.service';

export function useProductRawMaterials(productId?: number) {
  return useQuery<ProductRawMaterial[]>({
    queryKey: ['product-raw-materials', productId],
    queryFn: () => listProductRawMaterials(productId as number),
    enabled: !!productId,
  });
}
