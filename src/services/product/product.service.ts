import { httpClient } from '../client';

import type { PageResponse } from '@/features/types/page_response';
import type { Product } from '@/features/types/product';
import type { CreateProduct } from '@/features/types/product/create_product';
import type { UpdateProduct } from '@/features/types/product/update_product';

export async function createProduct(payload: CreateProduct): Promise<Product> {
  const response = await httpClient.post<Product>('/api/products', payload);
  return response.data;
}

export async function updateProduct(id: number, payload: UpdateProduct): Promise<Product> {
  const response = await httpClient.put<Product>(`/api/products/${id}`, payload);
  return response.data;
}

export async function getProductById(id: number): Promise<Product> {
  const response = await httpClient.get<Product>(`/api/products/${id}`);
  return response.data;
}

export async function listProducts(page: number, size: number): Promise<PageResponse<Product>> {
  const response = await httpClient.get<PageResponse<Product>>('/api/products/all', {
    params: { page, size },
  });
  return response.data;
}

export async function deleteProduct(id: number): Promise<void> {
  await httpClient.delete(`/api/products/${id}`);
}
