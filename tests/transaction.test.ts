import { expect } from 'chai';
import { describe, it } from 'mocha';
import JsonFileTransactionRepository from "../src/repositories/JsonFileTransactionRepository";
import JsonFileStockRepository from "../src/repositories/JsonFileStockRepository";

describe('Stock Transaction Pair Repository ', function () {

  it('Throws an error on non-existing file', function () {

    (new JsonFileTransactionRepository('data/transactions.json'))
    return (new JsonFileTransactionRepository('file-not-exists-404'))
      .getTransactionsForSKU("KED089097/68/09")
      .catch((error) => expect(error).to.equal(`Transaction file file-not-exists-404 does not exists.`));
  });

  it('Can read a file and find transactions', function () {
    return (new JsonFileTransactionRepository('data/transactions.json'))
      .getTransactionsForSKU("KED089097/68/09")
      .then(transactions => {
        expect(transactions).length.gt(0);
      })
  });
});
