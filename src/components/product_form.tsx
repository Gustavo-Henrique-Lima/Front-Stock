import { useEffect, useState } from 'react';

import { ProductMaterialSelect } from './product_material_select';
import { ProductMaterialsList } from './product_materials_list';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { Product } from '@/features/types/product';
import type { ProductMaterial } from '@/features/types/product-material';
import { useRawMaterialsToAssociate } from '@/hooks/raw-materials/use-raw-materials-to-associate';
interface Props {
  mode: 'create' | 'edit';
  product?: Product;
  initialMaterials?: ProductMaterial[];
  onSubmit: (data: {
    code: string;
    name: string;
    price: number;
    materials: ProductMaterial[];
  }) => void | Promise<void>;
  onCancel: () => void;
}

export function ProductForm({ mode, product, initialMaterials = [], onSubmit, onCancel }: Props) {
  const { data: rawMaterials, isLoading } = useRawMaterialsToAssociate();

  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [materials, setMaterials] = useState<ProductMaterial[]>([]);

  useEffect(() => {
    if (mode === 'edit' && product) {
      setCode(product.code);
      setName(product.name);
      setPrice(product.price);
      setMaterials(initialMaterials);
      return;
    }

    if (mode === 'create') {
      setCode('');
      setName('');
      setPrice('');
      setMaterials([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, product?.id]);

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
    if (quantity < 0) return;

    setMaterials((prev) =>
      prev.map((m) =>
        m.rawMaterialId === rawMaterialId ? { ...m, quantityRequired: quantity } : m,
      ),
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({
      code,
      name,
      price: price === '' ? 0 : price,
      materials,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ===== PRODUCT DATA ===== */}
      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2">
        <Input
          placeholder="Código"
          value={code}
          disabled={mode === 'edit'}
          onChange={(e) => setCode(e.target.value)}
        />

        <Input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />

        <Input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => {
            const value = e.target.value;
            setPrice(value === '' ? '' : Number(value));
          }}
          className="sm:col-span-2"
        />
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Matérias-primas</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <ProductMaterialSelect
            availableMaterials={rawMaterials ?? []}
            selectedMaterials={materials}
            loading={isLoading}
            onAdd={handleAddMaterial}
          />

          <ProductMaterialsList
            materials={materials}
            onRemove={handleRemoveMaterial}
            onChangeQuantity={handleChangeQuantity}
          />
        </CardContent>
      </Card>

      {/* ===== ACTIONS ===== */}
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
