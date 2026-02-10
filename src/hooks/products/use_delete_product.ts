import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteProduct } from '@/services/product/product.service';

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, number>({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
