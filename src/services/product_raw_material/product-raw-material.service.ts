import { httpClient } from '../client';

import type { AddRawMaterialToProduct } from '@/features/types/product_raw/add_raw_material_product';
import type { ProductRawMaterial } from '@/features/types/product_raw/get_product_raw';
import type { UpdateProductRawMaterial } from '@/features/types/product_raw/update_raw_material_product';

export async function addRawMaterialToProduct(
  productId: number,
  payload: AddRawMaterialToProduct,
): Promise<void> {
  await httpClient.post(`/api/products/raw-materials/${productId}`, payload);
}

export async function updateProductRawMaterial(
  productId: number,
  rawMaterialId: number,
  payload: UpdateProductRawMaterial,
): Promise<void> {
  await httpClient.put(`/api/products/raw-materials/${productId}/${rawMaterialId}`, payload);
}

export async function listProductRawMaterials(productId: number): Promise<ProductRawMaterial[]> {
  const response = await httpClient.get<ProductRawMaterial[]>(
    `/api/products/raw-materials/${productId}`,
  );
  return response.data;
}

export async function removeRawMaterialFromProduct(
  productId: number,
  rawMaterialId: number,
): Promise<void> {
  await httpClient.delete(`/api/products/raw-materials/${productId}/${rawMaterialId}`);
}
