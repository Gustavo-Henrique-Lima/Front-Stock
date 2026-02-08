export type MaterialStatus = 'IN_STOCK' | 'OUT_OF_STOCK';

export interface Material {
  id: string;
  name: string;
  code: string;
  stockQuantity: number;
}
