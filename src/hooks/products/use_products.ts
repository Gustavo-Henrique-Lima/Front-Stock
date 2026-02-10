import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { PageResponse } from '@/features/types/page_response';
import type { Product } from '@/features/types/product';
import { listProducts } from '@/services/product/product.service';

export function useProducts(page: number, size: number) {
  return useQuery<PageResponse<Product>>({
    queryKey: ['products', page, size],
    queryFn: () => listProducts(page, size),
    placeholderData: keepPreviousData,
  });
}
