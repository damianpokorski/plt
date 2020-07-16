import { expect } from 'chai';
import { describe, it } from 'mocha';
import JsonFileStockRepository from "../src/repositories/JsonFileStockRepository";

describe('JSON File Stock Repository', function () {

  it('Throws an error on non-existing file', function () {
    return (new JsonFileStockRepository('file-not-exists-404'))
      .getStockForSKU("LTV719449/39/39")
      .catch((error) => expect(error).to.equal(`Stock file file-not-exists-404 does not exists.`));
  });

  it('Can read a file', function () {
    return (new JsonFileStockRepository('data/stock.json'))
      .getStockForSKU("LTV719449/39/39")
      .then(stockAvailable => {
        expect(stockAvailable).equals(8525);
      });
  });



  it('Can read a file and return null stock for non existing SKU', function () {
    return (new JsonFileStockRepository('data/stock.json'))
      .getStockForSKU("Non-existing-SKU")
      .then(stockAvailable => {
        expect(stockAvailable).equals(null);
      });
  });
});
