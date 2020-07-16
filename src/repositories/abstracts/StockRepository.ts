import StockKeepingUnitInterface from '../../interfaces/StockKeepingUnitInterface';
import StockRepositoryInterface from './../interfaces/StockRepositoryInterface';

abstract class StockRepository implements StockRepositoryInterface {
  abstract getStock(): Promise<StockKeepingUnitInterface[]>;
  getStockForSKU(sku: string): Promise<number|null> {
    return this
      .getStock()
      .then(entries => entries.find(entry => entry.sku == sku))
      .then(entry => entry == undefined ? null : entry.stock)
  };
}

export default StockRepository;