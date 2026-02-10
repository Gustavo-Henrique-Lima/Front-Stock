import { Plus, Pencil, Trash2, Boxes } from 'lucide-react';
import { useState } from 'react';

import { MaterialForm } from '@/components/MaterialForm';
import { RawMaterialCard } from '@/components/raw_material_card';
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
import { Badge } from '@/components/ui/badge';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Material } from '@/features/types/raw-material';
import { useCreateRawMaterial } from '@/hooks/raw-materials/use_create_raw_material';
import { useDeleteRawMaterial } from '@/hooks/raw-materials/use_delete_raw_material';
import { useRawMaterials } from '@/hooks/raw-materials/use_raw_materials';
import { useUpdateRawMaterial } from '@/hooks/raw-materials/use_update_raw_material';
import type { MaterialFormData } from '@/schemas/material.schema';

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) {
    return <Badge variant="destructive">Out of Stock</Badge>;
  }
  if (stock < 20) {
    return <Badge className="bg-warning text-warning-foreground">Estoque baixo</Badge>;
  }
  return <Badge className="bg-success text-success-foreground">Em estoque</Badge>;
}

export function MaterialsPage() {
  const [page, setPage] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Material | null>(null);

  const pageSize = 5;

  const { data, isLoading } = useRawMaterials(page, pageSize);
  const createMutation = useCreateRawMaterial();
  const updateMutation = useUpdateRawMaterial();
  const deleteMutation = useDeleteRawMaterial();

  const materials = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;

  async function handleCreate(data: MaterialFormData) {
    await createMutation.mutateAsync(data);
    setOpenForm(false);
  }

  async function handleUpdate(data: MaterialFormData) {
    if (!editingMaterial) return;

    await updateMutation.mutateAsync({
      id: editingMaterial.id,
      data,
    });

    setEditingMaterial(null);
    setOpenForm(false);
  }

  function handleDelete() {
    if (!deleteTarget) return;

    deleteMutation.mutate(deleteTarget.id);
    setDeleteTarget(null);
  }

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Matéria-prima</h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe os níveis de estoque da suas matérias-primas
          </p>
        </div>

        <Button onClick={() => setOpenForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nova matéria
        </Button>
      </div>

      <Card className="flex flex-1 flex-col overflow-hidden">
        <CardHeader className="gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Estoque de matérias-primas</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto p-2">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">Carregando...</div>
          ) : materials.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <Boxes className="h-10 w-10 text-muted-foreground/50" />
              <p>Nenhuma matéria encontrada</p>
            </div>
          ) : (
            <>
              {/* Mobile */}
              <div className="grid gap-4 sm:hidden">
                {materials.map((material) => (
                  <RawMaterialCard
                    key={material.id}
                    material={material}
                    onEdit={() => {
                      setEditingMaterial(material);
                      setOpenForm(true);
                    }}
                    onDelete={() => setDeleteTarget(material)}
                  />
                ))}
              </div>

              {/* Desktop */}
              <div className="hidden sm:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="px-4 py-3">Matéria</TableHead>
                      <TableHead className="hidden md:table-cell">Código</TableHead>
                      <TableHead>Estoque</TableHead>
                      <TableHead className="hidden sm:table-cell">Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {materials.map((material) => (
                      <TableRow
                        key={material.id}
                        className="odd:bg-gray-200 even:bg-muted/40 hover:bg-muted"
                      >
                        <TableCell className="px-4 py-3">{material.name}</TableCell>
                        <TableCell className="hidden md:table-cell">{material.code}</TableCell>
                        <TableCell>{material.stockQuantity}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <StockBadge stock={material.stockQuantity} />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingMaterial(material);
                              setOpenForm(true);
                            }}
                            className="cursor-pointer"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteTarget(material)}
                            className="cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* PAGINATION */}
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

      {/* FORM */}
      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingMaterial ? 'Editar matéria-prima' : 'Nova matéria-prima'}
            </DialogTitle>
          </DialogHeader>

          <MaterialForm
            defaultValues={
              editingMaterial
                ? {
                    code: editingMaterial.code,
                    name: editingMaterial.name,
                    stockQuantity: editingMaterial.stockQuantity,
                  }
                : undefined
            }
            onSubmit={editingMaterial ? handleUpdate : handleCreate}
            onCancel={() => setOpenForm(false)}
          />
        </DialogContent>
      </Dialog>

      {/* DELETE */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir matéria-prima</AlertDialogTitle>
            <AlertDialogDescription>
              Deseja excluir <strong>{deleteTarget?.name}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
