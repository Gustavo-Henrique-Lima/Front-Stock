import { ProductMaterials } from './product_materials';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Product } from '@/features/types/product';
import type { ProductMaterial } from '@/features/types/product-material';

interface Props {
  product?: Product;
  onSubmit: (data: Omit<Product, 'id'>) => void;
  onCancel: () => void;
}

const mockMaterials: ProductMaterial[] = [];

export function ProductForm({ product, onSubmit, onCancel }: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          code: 'P001',
          name: 'Produto Exemplo',
          price: 100,
          description: 'Descrição do produto',
        });
      }}
      className="space-y-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Input placeholder="Código" defaultValue={product?.code} />
        <Input placeholder="Nome" defaultValue={product?.name} />
        <Input type="number" placeholder="Preço" defaultValue={product?.price} />
      </div>

      <Textarea placeholder="Descrição" defaultValue={product?.description} />

      <Card>
        <CardHeader>
          <CardTitle>Matérias-primas (BOM)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ProductMaterials materials={mockMaterials} />
          <Button type="button" variant="outline">
            Adicionar matéria-prima
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}
