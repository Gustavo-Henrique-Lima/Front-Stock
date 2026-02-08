import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import { createRawMaterial } from '@/services/raw_material/raw-material.service';

export function useCreateRawMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRawMaterial,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['raw-materials'] });
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 422) {
        toast.error('Já existe uma matéria cadastrada com esse código');
        return;
      }

      toast.error('Erro ao cadastrar matéria-prima');
    },
  });
}
