import StockKeepingUnitInterface from '../interfaces/StockKeepingUnitInterface';
import StockRepositoryInterface from './interfaces/StockRepositoryInterface';
import StockTransactionRepositoryPairInterface from './interfaces/StockTransactionRepositoryPairInterface';
import TransactionRepositoryInterface from './interfaces/TransactionRepositoryInterface';
import TransactionType from '../enums/TransactionTypeEnum';

class StockTransactionRepositoryPair implements StockTransactionRepositoryPairInterface {
  stockRepository: StockRepositoryInterface;
  transactionRepository: TransactionRepositoryInterface;

  constructor(stockRepository: StockRepositoryInterface, transactionRepository: TransactionRepositoryInterface) {
    this.stockRepository = stockRepository;
    this.transactionRepository = transactionRepository;
  }

  getStockLevel(sku: string): Promise<{ sku: string, qty: number }> {
    return Promise.all([
      this.stockRepository.getStockForSKU(sku),
      this.transactionRepository.getTransactionsForSKU(sku),
      this.transactionRepository.skuExists(sku)
    ]).then(([baseStock, transactions, skuExists]) => {

      if (baseStock == null && !skuExists) {
        return Promise.reject("SKU doesnt exist");
      }

      // Sum up the quantity, orders reduce it, refunds increase it, if base stock is null - assume 0
      const qty = transactions.reduce((accumulator, transaction) => {
        return (transaction.type == TransactionType.Order) ? accumulator - transaction.qty : accumulator + transaction.qty;
      }, baseStock == null ? 0 : baseStock);

      return Promise.resolve({ sku, qty });
    });
  }
}

export default StockTransactionRepositoryPair;