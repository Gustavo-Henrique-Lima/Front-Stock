import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import { deleteRawMaterial } from '@/services/raw_material/raw-material.service';

export function useDeleteRawMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRawMaterial,

    onSuccess: () => {
      toast.success('Matéria-prima excluída com sucesso');
      queryClient.invalidateQueries({ queryKey: ['raw-materials'] });
    },

    onError: (error: AxiosError) => {
      if (error.response?.status === 500) {
        toast.error('Não é possível deletar uma matéria-prima que está associada a um produto');
        return;
      }

      toast.error('Erro ao excluir matéria-prima');
    },
  });
}
