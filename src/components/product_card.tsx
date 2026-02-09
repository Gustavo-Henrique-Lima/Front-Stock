import { Pencil, Trash2, Package } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { Product } from '@/features/types/product';

interface Props {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

export function ProductCard({ product, onEdit, onDelete }: Props) {
  return (
    <div className="rounded-lg border p-4 space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{product.name}</h3>
        <Package className="h-4 w-4 text-muted-foreground" />
      </div>

      <p className="text-xs text-muted-foreground">{product.code}</p>

      <p className="text-sm font-medium">R$ {product.price.toFixed(2)}</p>

      <div className="flex justify-end gap-2 pt-2">
        <Button size="icon" variant="ghost" onClick={onEdit}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
