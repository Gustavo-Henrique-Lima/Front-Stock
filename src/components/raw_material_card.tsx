import { Pencil, Trash2, Boxes } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Material } from '@/features/types/raw-material';

interface Props {
  material: Material;
  onEdit: () => void;
  onDelete: () => void;
}

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) {
    return <Badge variant="destructive">Out of Stock</Badge>;
  }
  if (stock < 20) {
    return <Badge className="bg-warning text-warning-foreground">Low Stock</Badge>;
  }
  return <Badge className="bg-success text-success-foreground">In Stock</Badge>;
}

export function RawMaterialCard({ material, onEdit, onDelete }: Props) {
  return (
    <div className="rounded-lg border p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{material.name}</h3>
        <Boxes className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Code */}
      <p className="text-xs text-muted-foreground">
        Código: <span className="font-mono">{material.code}</span>
      </p>

      {/* Stock */}
      <div className="flex items-center justify-between">
        <span className="text-sm">
          Estoque: <span className="font-medium">{material.stockQuantity}</span>
        </span>

        <StockBadge stock={material.stockQuantity} />
      </div>

      {/* Actions */}
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
