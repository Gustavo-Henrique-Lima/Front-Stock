import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { ProductForm } from '@/components/product_form';
import { useAddRawMaterialToProduct } from '@/hooks/product_raw_material/use_add_raw_material_to_product';
import { useCreateProduct } from '@/hooks/products/use_create_product';

export function CreateProductLoader({ onClose }: { onClose: () => void }) {
  const createProduct = useCreateProduct();
  const addMaterial = useAddRawMaterialToProduct();

  async function handleSubmit(data: {
    code: string;
    name: string;
    price: number;
    materials: {
      rawMaterialId: number;
      quantityRequired: number;
    }[];
  }) {
    try {
      // 1️⃣ cria o produto
      const product = await createProduct.mutateAsync({
        code: data.code,
        name: data.name,
        price: data.price,
      });

      for (const material of data.materials) {
        await addMaterial.mutateAsync({
          productId: product.id,
          data: {
            rawMaterialId: material.rawMaterialId,
            requiredQuantity: material.quantityRequired,
          },
        });
      }

      toast.success('Produto cadastrado com sucesso');
      onClose();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message ?? 'Erro ao cadastrar produto';

        toast.error(message);
        return;
      }

      toast.error('Erro inesperado ao cadastrar produto');
    }
  }

  return <ProductForm mode="create" onSubmit={handleSubmit} onCancel={onClose} />;
}
