import { Package, Boxes } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useProductionSimulation } from '@/hooks/production/use_production_simulation';

export function ProductionSimulationPage() {
  const { data, isLoading } = useProductionSimulation();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Calculando simulação de produção...
      </div>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-12">
        <Boxes className="h-10 w-10 text-muted-foreground/50" />
        <p className="text-sm text-muted-foreground">
          Não há produtos possíveis com o estoque atual.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Simulação de Produção</h1>
        <p className="text-sm text-muted-foreground">
          Com o estoque atual de matérias-primas, é possível produzir os seguintes produtos
        </p>
      </div>

      {/* TOTAL VALUE */}
      <Card className="bg-muted/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground">
            Valor total estimado de produção
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-3xl font-bold">R$ {data.totalProductionValue.toFixed(2)}</span>
        </CardContent>
      </Card>

      {/* MOBILE: CARDS */}
      <div className="grid gap-4 sm:hidden">
        {data.items.map((item) => (
          <Card key={item.productId}>
            <CardContent className="flex flex-col gap-3 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{item.productName}</h3>
                  <span className="text-xs text-muted-foreground">Código: {item.productCode}</span>
                </div>
                <Package className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{item.producibleQuantity} un.</Badge>
                <Badge variant="outline">R$ {item.unitPrice.toFixed(2)} / un</Badge>
              </div>

              <div className="flex justify-between border-t pt-2 text-sm">
                <span className="text-muted-foreground">Valor total</span>
                <span className="font-medium">R$ {item.totalValue.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* DESKTOP: TABLE */}
      <Card className="hidden sm:block">
        <CardHeader>
          <CardTitle className="text-sm">Produtos possíveis de fabricar</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Código</TableHead>
                <TableHead className="text-right">Qtd. possível</TableHead>
                <TableHead className="text-right">Preço unitário</TableHead>
                <TableHead className="text-right">Valor total</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.items.map((item) => (
                <TableRow
                  key={item.productId}
                  className="odd:bg-gray-100 even:bg-muted/40 hover:bg-muted"
                >
                  <TableCell className="font-medium">{item.productName}</TableCell>
                  <TableCell>
                    <code className="rounded bg-muted px-2 py-0.5 text-xs">{item.productCode}</code>
                  </TableCell>
                  <TableCell className="text-right">{item.producibleQuantity}</TableCell>
                  <TableCell className="text-right">R$ {item.unitPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-semibold">
                    R$ {item.totalValue.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
