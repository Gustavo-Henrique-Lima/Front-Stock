import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { ProductRawMaterialInput } from '@/features/types/product-raw-material';

interface Props {
  materials: ProductRawMaterialInput[];
  onRemove: (rawMaterialId: number) => void;
}

export function ProductRawMaterialsList({ materials, onRemove }: Props) {
  if (materials.length === 0) {
    return <p className="text-sm text-muted-foreground">Nenhuma matéria-prima associada</p>;
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
              {m.rawMaterialCode} • Quantidade: {m.quantity}
            </p>
          </div>

          <Button size="icon" variant="ghost" onClick={() => onRemove(m.rawMaterialId)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
