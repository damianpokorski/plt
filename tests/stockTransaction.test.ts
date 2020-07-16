import { expect } from 'chai';
import { describe, it } from 'mocha';
import JsonFileTransactionRepository from "../src/repositories/JsonFileTransactionRepository";
import JsonFileStockRepository from '../src/repositories/JsonFileStockRepository';
import StockTransactionRepositoryPair from '../src/repositories/StockTransactionRepositoryPair';

describe('Stock and Transaction Pair Repository Tests', function () {
  it('Can return a summary of transactions and stock', function () {
    return (new StockTransactionRepositoryPair(
      new JsonFileStockRepository('data/stock.json'),
      new JsonFileTransactionRepository('data/transactions.json')
    )).getStockLevel('KED089097/68/09').then(result => {
      expect(result.sku).to.equal('KED089097/68/09');
      expect(result.qty).to.equal(4842);
    });
  });

  it('Can return a summary of transactions and stock - while assuming 0 for empty stock', function () {
    return (new StockTransactionRepositoryPair(
      new JsonFileStockRepository('data/stock.json'),
      new JsonFileTransactionRepository('data/transactions.json')
    )).getStockLevel('BLW357145/52/57').then(result => {
      expect(result.sku).to.equal('BLW357145/52/57');
    });
  });

  it('Throws an error if the SKU is not defined in stock and transactions', function() {
    return (new StockTransactionRepositoryPair(
      new JsonFileStockRepository('data/stock.json'),
      new JsonFileTransactionRepository('data/transactions.json')
    )).getStockLevel('non-existend-sku')
    .catch((error) => expect(error).to.equal('SKU doesnt exist'))
  });
});
