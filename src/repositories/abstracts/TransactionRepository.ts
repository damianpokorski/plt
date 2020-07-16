import TransactionInterface from '../../interfaces/TransactionInterface';
import TransactionRepositoryInterface from './../interfaces/TransactionRepositoryInterface';
import { transcode } from 'buffer';

abstract class TransactionRepository implements TransactionRepositoryInterface {
  abstract getTransactions(): Promise<TransactionInterface[]>;
  getTransactionsForSKU(sku: string): Promise<TransactionInterface[]> {
    return this
      .getTransactions()
      .then(entries => entries.filter(entry => entry.sku == sku));
  };
  skuExists(sku: string): Promise<boolean> {
    return this
      .getTransactions()
      .then(transactions => transactions.filter(transaction => transaction.sku == sku))
      .then(transactions => transactions.length > 0);
  }
}

export default TransactionRepository;