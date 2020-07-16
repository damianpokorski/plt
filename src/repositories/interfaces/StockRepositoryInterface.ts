import StockKeepingUnitInterface from '../../interfaces/StockKeepingUnitInterface';

interface StockRepositoryInterface {
  getStock(): Promise<StockKeepingUnitInterface[]>;
  getStockForSKU(sku: string): Promise<number|null>;
}

export default StockRepositoryInterface;