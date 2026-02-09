import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';

import { ProductCard } from '@/components/product_card';
import { ProductForm } from '@/components/product_form';
import { ProductsTable } from '@/components/products_table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Product } from '@/features/types/product';

const mockProducts: Product[] = [
  { id: 1, code: 'P001', name: 'Produto A', price: 120 },
  { id: 2, code: 'P002', name: 'Produto B', price: 45 },
];

export default function ProductsPage() {
  const [search] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | undefined>();
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    return mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.code.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  function closeDialog() {
    setFormOpen(false);
    setEditing(undefined);
  }

  function handleConfirmDelete() {
    if (!deleteTarget) return;

    setDeleteTarget(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Produtos</h1>
          <p className="text-sm text-muted-foreground">
            Com o estoque atual de matérias-primas, estes são os produtos que podem ser cadastrados
            e configurados.
          </p>
        </div>

        <Button onClick={() => setFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo produto
        </Button>
      </div>

      <Card>
        <CardHeader className="gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Estoque de produtos</CardTitle>
        </CardHeader>

        <CardContent>
          {/* Mobile */}
          <div className="grid gap-4 sm:hidden">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onEdit={() => setEditing(p)}
                onDelete={() => setDeleteTarget(p)}
              />
            ))}
          </div>

          {/* Desktop */}
          <div className="hidden sm:block">
            <ProductsTable
              products={filtered}
              onEdit={(p) => setEditing(p)}
              onDelete={(p) => setDeleteTarget(p)}
            />
          </div>
        </CardContent>
      </Card>

      {/* CREATE / EDIT */}
      <Dialog open={formOpen || !!editing} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent
          className="
            w-full
            max-w-lg
            max-h-[90vh]
            overflow-y-auto
          "
        >
          <DialogHeader>
            <DialogTitle>{editing ? 'Editar produto' : 'Novo produto'}</DialogTitle>
          </DialogHeader>

          <ProductForm
            product={editing}
            onSubmit={async () => {
              closeDialog();
            }}
            onCancel={closeDialog}
          />
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRM */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir produto</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir <strong>{deleteTarget?.name}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={handleConfirmDelete}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
