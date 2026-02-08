import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { materialFormSchema, type MaterialFormData } from '@/schemas/material.schema';

interface MaterialFormProps {
  defaultValues?: MaterialFormData;
  onSubmit: (data: MaterialFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function MaterialForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
}: MaterialFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(materialFormSchema),
    defaultValues: defaultValues ?? {
      code: '',
      name: '',
      stockQuantity: 0,
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <div className="flex justify-end gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Código */}
      <div className="space-y-1">
        <Label htmlFor="code">Código</Label>
        <Input id="code" placeholder="Ex: MAT-001" {...register('code')} />
        {errors.code && <p className="text-xs text-destructive">{errors.code.message as string}</p>}
      </div>

      {/* Nome */}
      <div className="space-y-1">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" placeholder="Nome da matéria-prima" {...register('name')} />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message as string}</p>}
      </div>

      {/* Quantidade */}
      <div className="space-y-1">
        <Label htmlFor="stockQuantity">Quantidade em estoque</Label>
        <Input id="stockQuantity" type="number" min={0} step="1" {...register('stockQuantity')} />
        {errors.stockQuantity && (
          <p className="text-xs text-destructive">{errors.stockQuantity.message as string}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}
