export interface ProductionSimulationItem {
  productId: number;
  productCode: string;
  productName: string;
  unitPrice: number;
  producibleQuantity: number;
  totalValue: number;
}

export interface ProductionSimulationResult {
  items: ProductionSimulationItem[];
  totalProductionValue: number;
}
