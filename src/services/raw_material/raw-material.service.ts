import { httpClient } from '../client';

import type { PageResponse } from '@/features/types/page_response';
import type { Material } from '@/features/types/raw-material';
import type { MaterialFormData } from '@/schemas/material.schema';

export async function listRawMaterials(
  page: number,
  size: number,
): Promise<PageResponse<Material>> {
  const { data } = await httpClient.get<PageResponse<Material>>('/api/raw-materials/all', {
    params: {
      page,
      size,
      sort: 'name,asc',
    },
  });

  return data;
}

export async function createRawMaterial(payload: MaterialFormData): Promise<Material> {
  const { data } = await httpClient.post<Material>('/api/raw-materials', payload);

  return data;
}

export async function updateRawMaterial(id: string, payload: MaterialFormData): Promise<Material> {
  const { data } = await httpClient.put<Material>(`/api/raw-materials/${id}`, payload);

  return data;
}

export async function deleteRawMaterial(id: string): Promise<void> {
  await httpClient.delete(`/api/raw-materials/${id}`);
}
