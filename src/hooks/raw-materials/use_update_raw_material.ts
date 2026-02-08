import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import type { MaterialFormData } from '@/schemas/material.schema';
import { updateRawMaterial } from '@/services/raw_material/raw-material.service';

type UpdatePayload = {
  id: string;
  data: MaterialFormData;
};

export function useUpdateRawMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdatePayload) => updateRawMaterial(id, data),

    onSuccess: () => {
      toast.success('Matéria-prima atualizada com sucesso');
      queryClient.invalidateQueries({ queryKey: ['raw-materials'] });
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 422) {
        toast.error('Já existe uma matéria cadastrada com esse códigp');
        return;
      }

      toast.error('Erro ao cadastrar matéria-prima');
    },
  });
}
