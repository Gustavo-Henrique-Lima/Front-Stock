import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function MaterialsHeader() {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Raw Materials</h1>
        <p className="text-sm text-muted-foreground">Track inventory levels and material costs</p>
      </div>

      <Button>
        <Plus className="mr-2 h-4 w-4" />
        New Material
      </Button>
    </header>
  );
}
