import { z } from 'zod';

export const materialFormSchema = z.object({
  code: z
    .string()
    .min(3, 'O código deve conter no mínimo 3 caracteres')
    .max(50, 'O código deve conter no máximo 50 caracteres'),

  name: z
    .string()
    .min(3, 'O nome deve conter no mínimo 3 caracteres')
    .max(255, 'O nome deve conter no máximo 255 caracteres'),

  stockQuantity: z.coerce
    .number({
      message: 'Informe um número válido',
    })
    .min(0, 'A quantidade deve ser maior ou igual a 0'),
});

export type MaterialFormData = z.infer<typeof materialFormSchema>;
