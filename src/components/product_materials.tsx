import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { ProductMaterial } from '@/features/types/product-material';

interface Props {
  materials: ProductMaterial[];
}

export function ProductMaterials({ materials }: Props) {
  if (materials.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Nenhuma matéria-prima associada a este produto.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {materials.map((m) => (
        <div
          key={m.rawMaterialId}
          className="flex items-center justify-between rounded-md border px-3 py-2"
        >
          <div>
            <p className="text-sm font-medium">{m.rawMaterialName}</p>
            <p className="text-xs text-muted-foreground">
              Quantidade necessária: {m.quantityRequired}
            </p>
          </div>

          <Button size="icon" variant="ghost">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
