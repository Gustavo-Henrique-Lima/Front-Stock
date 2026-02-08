import { Pencil, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Material } from '@/features/types/raw-material';

const mockData: Material[] = [
  {
    id: '1',
    name: 'Oak Wood Plank',
    code: 'OAK-PLK-001',
    costPerUnit: 25,
    unit: 'unit',
    stock: 150,
    status: 'IN_STOCK',
  },
];

export function MaterialsTable() {
  return (
    <div className="rounded-xl border bg-background p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-medium">Material Registry</h2>
          <span className="text-sm text-muted-foreground">{mockData.length} materials</span>
        </div>

        <input
          type="text"
          placeholder="Search by name or code..."
          className="h-9 rounded-md border px-3 text-sm"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Material</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Cost / Unit</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {mockData.map((material) => (
            <TableRow key={material.id}>
              <TableCell className="font-medium">{material.name}</TableCell>

              <TableCell>
                <Badge variant="secondary">{material.code}</Badge>
              </TableCell>

              <TableCell>
                ${material.costPerUnit}/{material.unit}
              </TableCell>

              <TableCell>
                {material.stock} {material.unit}
              </TableCell>

              <TableCell>
                <Badge variant="default">In Stock</Badge>
              </TableCell>

              <TableCell className="flex justify-end gap-2">
                <button aria-label="Edit material">
                  <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
                <button aria-label="Delete material">
                  <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
