import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddMaterialDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar matéria-prima</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Aqui você poderá selecionar uma matéria-prima e definir a quantidade necessária para o
          produto.
        </p>
      </DialogContent>
    </Dialog>
  );
}
