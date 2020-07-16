# Task / Specification
You are given two json files:
 - stock.json: contains objects which represent the starting stock levels for given SKUS
 - transactions.json: contains an array of transactions since the stock levels were recorded in `stock.json`
The objective is to create a function which is able to return the current stock levels for a given SKU by combining the data in these two files. These are the requirements.
- The function must match the following signature: `(sku: string) => Promise<{ sku: string, qty: number }>`.
- The function must read from the `stock` and `transactions` files on each invocation (totals cannot be precomputed)
- The function must throw an error where the SKU does not exist
- All code must be adequately tested
Notes:
- Transactions may exist for SKUs which are not present in `stock.json`. It should be assumed that the starting quantity for these is 0.

## Notes

This was actually a pretty fun exercise, one thing that was not mentioned was the transactions having a type property (Order and Refund), so I have utilised that in order to increase and decrease stock accordingly. 

Hardest part of this exercise? Definitely naming things :)

If I was to do things a bit more properly I would probably use data providers in unit tests rather than hard coded strings, but in this time limit i'd say that's reasonable.

## Execution
Fairly standard node.js / typescript setup

```bash
npm install
npm run test
```
Which should return something along the lines of

```
  JSON File Stock Repository
    ✓ Throws an error on non-existing file
    ✓ Can read a file
    ✓ Can read a file and return null stock for non existing SKU

  Stock and Transaction Pair Repository Tests
    ✓ Can return a summary of transactions and stock
    ✓ Can return a summary of transactions and stock - while assuming 0 for empty stock
    ✓ Throws an error if the SKU is not defined in stock and transactions

  Stock Transaction Pair Repository 
    ✓ Throws an error on non-existing file
    ✓ Can read a file and find transactions


  8 passing (13ms)
  ```

I have also added test coverage as a runnable script

```bash
npm run coverage
```


Which should output something along the lines of (appended to result of the unit tests as seen above)
```

------------------------------------|---------|----------|---------|---------|-------------------
File                                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------------------------|---------|----------|---------|---------|-------------------
All files                           |     100 |      100 |     100 |     100 |                   
 src/enums                          |     100 |      100 |     100 |     100 |                   
  TransactionTypeEnum.ts            |     100 |      100 |     100 |     100 |                   
 src/repositories                   |     100 |      100 |     100 |     100 |                   
  JsonFileStockRepository.ts        |     100 |      100 |     100 |     100 |                   
  JsonFileTransactionRepository.ts  |     100 |      100 |     100 |     100 |                   
  StockTransactionRepositoryPair.ts |     100 |      100 |     100 |     100 |                   
 src/repositories/abstracts         |     100 |      100 |     100 |     100 |                   
  StockRepository.ts                |     100 |      100 |     100 |     100 |                   
  TransactionRepository.ts          |     100 |      100 |     100 |     100 |                   
 tests                              |     100 |      100 |     100 |     100 |                   
  stock.test.ts                     |     100 |      100 |     100 |     100 |                   
  stockTransaction.test.ts          |     100 |      100 |     100 |     100 |                   
  transaction.test.ts               |     100 |      100 |     100 |     100 |                   
------------------------------------|---------|----------|---------|---------|-------------------

```