import { useMutation, useQueryClient } from '@tanstack/react-query';

import { removeRawMaterialFromProduct } from '@/services/product_raw_material/product-raw-material.service';

interface RemoveArgs {
  productId: number;
  rawMaterialId: number;
}

export function useRemoveProductRawMaterial() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, RemoveArgs>({
    mutationFn: ({ productId, rawMaterialId }) =>
      removeRawMaterialFromProduct(productId, rawMaterialId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['product-raw-materials', variables.productId],
      });
    },
  });
}
