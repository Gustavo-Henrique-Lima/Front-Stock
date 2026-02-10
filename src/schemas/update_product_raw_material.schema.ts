import { z } from 'zod';

export const updateProductRawMaterialSchema = z.object({
  requiredQuantity: z.number().min(0),
});

export type UpdateProductRawMaterialInput = z.infer<typeof updateProductRawMaterialSchema>;
