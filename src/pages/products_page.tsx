import { Plus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { CreateProductLoader } from '@/components/create_product_loader';
import { EditProductLoader } from '@/components/edit_product_loader';
import { ProductCard } from '@/components/product_card';
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import type { Product } from '@/features/types/product';
import { useDeleteProduct } from '@/hooks/products/use_delete_product';
import { useProducts } from '@/hooks/products/use_products';

export default function ProductsPage() {
  const [search] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const { data, isLoading } = useProducts(page, pageSize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const products = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;
  const deleteProductMutation = useDeleteProduct();

  const filtered = useMemo(() => {
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.code.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  function closeDialog() {
    setFormOpen(false);
    setEditingId(null);
  }

  function handleConfirmDelete() {
    if (!deleteTarget) return;

    deleteProductMutation.mutate(deleteTarget.id, {
      onSuccess: () => {
        toast.success('Produto excluído com sucesso');
        setDeleteTarget(null);
      },
      onError: () => {
        toast.error('Erro ao excluir produto');
      },
    });
  }

  useEffect(() => {
    setPage(0);
  }, [search]);

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
          {isLoading ? (
            <p className="p-4 text-sm text-muted-foreground">Carregando produtos...</p>
          ) : (
            <>
              {/* Mobile */}
              <div className="grid gap-4 sm:hidden">
                {filtered.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onEdit={() => setEditingId(p.id)}
                    onDelete={() => setDeleteTarget(p)}
                  />
                ))}
              </div>

              {/* Desktop */}
              <div className="hidden sm:block">
                <ProductsTable
                  products={filtered}
                  onEdit={(p) => setEditingId(p.id)}
                  onDelete={(p) => setDeleteTarget(p)}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                className={page === 0 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink isActive={page === i} onClick={() => setPage(i)}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                className={page === totalPages - 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* CREATE / EDIT */}
      <Dialog open={formOpen || editingId !== null} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent
          className="
      w-full
      max-w-lg
      max-h-[90vh]
      overflow-y-auto
    "
        >
          <DialogHeader>
            <DialogTitle>{editingId ? 'Editar produto' : 'Novo produto'}</DialogTitle>
          </DialogHeader>

          {editingId ? (
            <EditProductLoader productId={editingId} onClose={closeDialog} />
          ) : (
            <CreateProductLoader onClose={closeDialog} />
          )}
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
