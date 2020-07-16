import TransactionInterface from './../../interfaces/TransactionInterface';

interface TransactionRepositoryInterface {
  getTransactions(): Promise<TransactionInterface[]>;
  getTransactionsForSKU(sku: string): Promise<TransactionInterface[]>;
  skuExists(sku: string): Promise<boolean>;
}

export default TransactionRepositoryInterface;