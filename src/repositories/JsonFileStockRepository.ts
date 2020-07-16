import StockRepository from './abstracts/StockRepository';
import StockKeepingUnitInterface from '../interfaces/StockKeepingUnitInterface';

import * as fs from 'fs';

class JsonFileStockRepository extends StockRepository {
  protected filepath: string;

  constructor(filepath: string) {
    super();
    this.filepath = filepath;
  }

  getStock(): Promise<StockKeepingUnitInterface[]> {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(this.filepath)) {
        return reject(`Stock file ${this.filepath} does not exists.`);
      };

      return resolve(JSON.parse(fs.readFileSync(this.filepath).toString()));
    });
  }
}

export default JsonFileStockRepository;