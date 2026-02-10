import { z } from 'zod';

export const updateFormSchema = z.object({
  name: z
    .string()
    .min(3, 'O campo nome deve conter no mínimo 3 caracteres')
    .max(255, 'O campo nome deve conter no máximo 255 caracteres'),

  price: z
    .number({
      message: 'O campo valor é obrigatório',
    })
    .min(0, 'O valor deve ser maior ou igual a 0'),
});

export type ProductUpdateFormData = z.infer<typeof updateFormSchema>;
