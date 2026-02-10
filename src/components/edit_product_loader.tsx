import { toast } from 'sonner';

import { ProductForm } from './product_form';

import type { ProductMaterial } from '@/features/types/product-material';
import { useAddRawMaterialToProduct } from '@/hooks/product_raw_material/use_add_raw_material_to_product';
import { useProductRawMaterials } from '@/hooks/product_raw_material/use_product_raw_materials';
import { useRemoveProductRawMaterial } from '@/hooks/product_raw_material/use_remove_product_raw_material';
import { useUpdateProductRawMaterial } from '@/hooks/product_raw_material/use_update_product_raw_material';
import { useProduct } from '@/hooks/products/use_product_by_id';
import { useUpdateProduct } from '@/hooks/products/use_update_product';

interface Props {
  productId: number;
  onClose: () => void;
}

export function EditProductLoader({ productId, onClose }: Props) {
  const { data: product, isLoading: loadingProduct } = useProduct(productId);
  const { data: rawMaterials, isLoading: loadingMaterials } = useProductRawMaterials(productId);

  const updateProduct = useUpdateProduct();
  const addMaterial = useAddRawMaterialToProduct();
  const updateMaterial = useUpdateProductRawMaterial();
  const removeMaterial = useRemoveProductRawMaterial();

  if (loadingProduct || loadingMaterials) {
    return <p className="text-sm text-muted-foreground">Carregando produto...</p>;
  }

  if (!product || !rawMaterials) return null;

  const initialMaterials: ProductMaterial[] = rawMaterials.map((m) => ({
    rawMaterialId: m.rawMaterialId,
    rawMaterialName: m.rawMaterialName,
    quantityRequired: m.requiredQuantity,
  }));

  async function handleSubmit(data: { name: string; price: number; materials: ProductMaterial[] }) {
    try {
      await updateProduct.mutateAsync({
        id: productId,
        data: {
          name: data.name,
          price: data.price,
        },
      });

      const initialMap = new Map(initialMaterials.map((m) => [m.rawMaterialId, m]));

      const currentMap = new Map(data.materials.map((m) => [m.rawMaterialId, m]));

      for (const m of data.materials) {
        if (!initialMap.has(m.rawMaterialId)) {
          await addMaterial.mutateAsync({
            productId,
            data: {
              rawMaterialId: m.rawMaterialId,
              requiredQuantity: m.quantityRequired,
            },
          });
        }
      }

      for (const m of data.materials) {
        const original = initialMap.get(m.rawMaterialId);
        if (original && original.quantityRequired !== m.quantityRequired) {
          await updateMaterial.mutateAsync({
            productId,
            rawMaterialId: m.rawMaterialId,
            data: { requiredQuantity: m.quantityRequired },
          });
        }
      }

      for (const m of initialMaterials) {
        if (!currentMap.has(m.rawMaterialId)) {
          await removeMaterial.mutateAsync({
            productId,
            rawMaterialId: m.rawMaterialId,
          });
        }
      }

      toast.success('Produto atualizado com sucesso');
      onClose();
    } catch {
      toast.error('Erro ao atualizar o produto');
    }
  }

  return (
    <ProductForm
      mode="edit"
      product={product}
      initialMaterials={initialMaterials}
      onSubmit={handleSubmit}
      onCancel={onClose}
    />
  );
}
