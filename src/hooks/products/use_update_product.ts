import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Product } from '@/features/types/product';
import type { UpdateProduct } from '@/features/types/product/update_product';
import { updateProduct } from '@/services/product/product.service';

interface UpdateProductArgs {
  id: number;
  data: UpdateProduct;
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation<Product, unknown, UpdateProductArgs>({
    mutationFn: ({ id, data }) => updateProduct(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
    },
  });
}
