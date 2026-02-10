import { useQuery } from '@tanstack/react-query';

import type { Product } from '@/features/types/product';
import { getProductById } from '@/services/product/product.service';

export function useProduct(productId?: number) {
  return useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId as number),
    enabled: !!productId,
  });
}
