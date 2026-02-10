import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { ProductMaterial } from '@/features/types/product-material';

interface Props {
  materials: ProductMaterial[];
  onRemove: (rawMaterialId: number) => void;
  onChangeQuantity: (rawMaterialId: number, quantity: number) => void;
}

export function ProductMaterialsList({ materials, onRemove, onChangeQuantity }: Props) {
  if (materials.length === 0) {
    return <p className="text-sm text-muted-foreground">Nenhuma matéria-prima associada.</p>;
  }

  return (
    <div
      className="
        max-h-[60px]
        overflow-y-auto
        space-y-2
        pr-2
      "
    >
      {materials.map((m) => (
        <div key={m.rawMaterialId} className="flex items-center gap-3 rounded-md border px-3 py-2">
          <div className="flex-1">
            <p className="text-sm font-medium">{m.rawMaterialName}</p>
          </div>

          <Input
            type="number"
            min={1}
            className="w-24"
            value={m.quantityRequired}
            onChange={(e) => onChangeQuantity(m.rawMaterialId, Number(e.target.value))}
          />

          <Button size="icon" variant="ghost" onClick={() => onRemove(m.rawMaterialId)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
