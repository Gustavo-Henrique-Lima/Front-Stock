import { z } from 'zod';

export const createProductSchema = z.object({
  code: z
    .string()
    .min(3, 'O código deve ter no mínimo 3 caracteres')
    .max(50, 'O código deve ter no máximo 50 caracteres')
    .trim(),

  name: z
    .string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .max(255, 'O nome deve ter no máximo 255 caracteres')
    .trim(),

  price: z
    .number({
      message: 'O preço é obrigatório',
    })
    .min(0, 'O preço deve ser maior ou igual a 0'),
});

export type CreateProductFormData = z.infer<typeof createProductSchema>;
