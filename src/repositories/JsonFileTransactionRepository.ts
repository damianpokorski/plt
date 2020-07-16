import TransactionRepository from './abstracts/TransactionRepository';
import TransactionInterface from '../interfaces/TransactionInterface';

import * as fs from 'fs';

class JsonFileTransactionRepository extends TransactionRepository {
  protected filepath: string;

  constructor(filepath: string) {
    super();
    this.filepath = filepath;
  }

  getTransactions(): Promise<TransactionInterface[]> {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(this.filepath)) {
        return reject(`Transaction file ${this.filepath} does not exists.`);
      };

      return resolve(JSON.parse(fs.readFileSync(this.filepath).toString()));
    });
  }
}

export default JsonFileTransactionRepository;