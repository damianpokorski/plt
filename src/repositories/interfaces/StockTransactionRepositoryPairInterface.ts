import StockKeepingUnitInterface from '../../interfaces/StockKeepingUnitInterface';
import StockRepositoryInterface from './StockRepositoryInterface';
import TransactionRepositoryInterface from './TransactionRepositoryInterface';

interface StockTransactionRepositoryPairInterface {
  stockRepository: StockRepositoryInterface;
  transactionRepository: TransactionRepositoryInterface;
  getStockLevel(sku: string): Promise<{sku: string, qty: number}>
}

export default StockTransactionRepositoryPairInterface;