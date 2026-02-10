import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Product } from '@/features/types/product';
import type { CreateProduct } from '@/features/types/product/create_product';
import { createProduct } from '@/services/product/product.service';

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation<Product, unknown, CreateProduct>({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
