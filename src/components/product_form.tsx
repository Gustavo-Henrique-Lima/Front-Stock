import { useState } from 'react';

import { ProductMaterialSelect } from './product_material_select';
import { ProductMaterialsList } from './product_materials_list';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { Product } from '@/features/types/product';
import type { ProductMaterial } from '@/features/types/product-material';
import { useRawMaterialsToAssociate } from '@/hooks/raw-materials/use-raw-materials-to-associate';

interface Props {
  product?: Product;
  onSubmit: (data: Omit<Product, 'id'> & { materials: ProductMaterial[] }) => void;
  onCancel: () => void;
}
export function ProductForm({ product, onSubmit, onCancel }: Props) {
  const { data: rawMaterials, isLoading } = useRawMaterialsToAssociate();
  const [materials, setMaterials] = useState<ProductMaterial[]>([]);

  function handleAddMaterial(rawMaterialId: number) {
    const rawMaterial = rawMaterials?.find((m) => m.id === rawMaterialId);
    if (!rawMaterial) return;

    setMaterials((prev) => [
      ...prev,
      {
        rawMaterialId: rawMaterial.id,
        rawMaterialName: rawMaterial.name,
        quantityRequired: 1,
      },
    ]);
  }

  function handleRemoveMaterial(rawMaterialId: number) {
    setMaterials((prev) => prev.filter((m) => m.rawMaterialId !== rawMaterialId));
  }

  function handleChangeQuantity(rawMaterialId: number, quantity: number) {
    if (quantity <= 0) return;

    setMaterials((prev) =>
      prev.map((m) =>
        m.rawMaterialId === rawMaterialId ? { ...m, quantityRequired: quantity } : m,
      ),
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        onSubmit({
          code: 'P001',
          name: 'Produto Exemplo',
          price: 100,
          materials,
        });
      }}
      className="space-y-6"
    >
      {/* DADOS DO PRODUTO */}
      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2">
        <Input placeholder="Código" defaultValue={product?.code} />
        <Input placeholder="Nome" defaultValue={product?.name} />
        <Input
          type="number"
          placeholder="Preço"
          defaultValue={product?.price}
          className="sm:col-span-2"
        />
      </div>

      {/* BOM */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Matérias-primas</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {/* SELECT + BOTÃO */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <ProductMaterialSelect
              availableMaterials={rawMaterials ?? []}
              selectedMaterials={materials}
              loading={isLoading}
              onAdd={handleAddMaterial}
            />
          </div>

          {/* LISTA COM SCROLL */}
          <ProductMaterialsList
            materials={materials}
            onRemove={handleRemoveMaterial}
            onChangeQuantity={handleChangeQuantity}
          />
        </CardContent>
      </Card>

      {/* ACTIONS */}
      <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel} className="w-full sm:w-auto">
          Cancelar
        </Button>
        <Button type="submit" className="w-full sm:w-auto">
          Salvar
        </Button>
      </div>
    </form>
  );
}
