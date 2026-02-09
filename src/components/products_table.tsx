import { Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Product } from '@/features/types/product';

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductsTable({ products, onEdit, onDelete }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Produto</TableHead>
          <TableHead>Código</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id} className="odd:bg-gray-100 even:bg-muted/40 hover:bg-muted">
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium">{product.name}</span>
                {product.description && (
                  <span className="text-xs text-muted-foreground line-clamp-1">
                    {product.description}
                  </span>
                )}
              </div>
            </TableCell>

            <TableCell>
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{product.code}</code>
            </TableCell>

            <TableCell>R$ {product.price.toFixed(2)}</TableCell>

            <TableCell className="text-right">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onEdit(product)}
                className="cursor-pointer"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onDelete(product)}
                className="cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
