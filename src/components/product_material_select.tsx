import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { ProductMaterial } from '@/features/types/product-material';
import type { RawMaterialAssociate } from '@/features/types/raw_material_associate';

interface Props {
  availableMaterials: RawMaterialAssociate[];
  selectedMaterials: ProductMaterial[];
  loading?: boolean;
  onAdd: (rawMaterialId: number) => void;
}

export function ProductMaterialSelect({
  availableMaterials,
  selectedMaterials,
  loading,
  onAdd,
}: Props) {
  const [selectedId, setSelectedId] = useState<string>('');

  const canAdd = useMemo(() => {
    if (!selectedId) return false;
    const id = Number(selectedId);
    return !selectedMaterials.some((m) => m.rawMaterialId === id);
  }, [selectedId, selectedMaterials]);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Carregando matérias-primas...</p>;
  }

  return (
    <div className="flex w-full flex-col gap-2 sm:flex-row">
      <Select value={selectedId} onValueChange={setSelectedId}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione a matéria-prima" />
        </SelectTrigger>

        <SelectContent>
          {availableMaterials.map((material) => {
            const disabled = selectedMaterials.some((m) => m.rawMaterialId === material.id);

            return (
              <SelectItem key={material.id} value={String(material.id)} disabled={disabled}>
                {material.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <Button
        type="button"
        size="icon"
        variant="outline"
        className="self-start sm:self-end"
        disabled={!canAdd}
        onClick={() => {
          onAdd(Number(selectedId));
          setSelectedId('');
        }}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
