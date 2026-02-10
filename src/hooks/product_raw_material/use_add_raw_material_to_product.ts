import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { AddRawMaterialToProduct } from '@/features/types/product_raw/add_raw_material_product';
import { addRawMaterialToProduct } from '@/services/product_raw_material/product-raw-material.service';

interface AddArgs {
  productId: number;
  data: AddRawMaterialToProduct;
}

export function useAddRawMaterialToProduct() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, AddArgs>({
    mutationFn: ({ productId, data }) => addRawMaterialToProduct(productId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['product-raw-materials', variables.productId],
      });
    },
  });
}
