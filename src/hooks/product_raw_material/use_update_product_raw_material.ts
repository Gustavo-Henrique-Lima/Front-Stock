import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { UpdateProductRawMaterial } from '@/features/types/product_raw/update_raw_material_product';
import { updateProductRawMaterial } from '@/services/product_raw_material/product-raw-material.service';

interface UpdateArgs {
  productId: number;
  rawMaterialId: number;
  data: UpdateProductRawMaterial;
}

export function useUpdateProductRawMaterial() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, UpdateArgs>({
    mutationFn: ({ productId, rawMaterialId, data }) =>
      updateProductRawMaterial(productId, rawMaterialId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['product-raw-materials', variables.productId],
      });
    },
  });
}
