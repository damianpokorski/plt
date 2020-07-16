import TransactionTypeEnum from './../enums/TransactionTypeEnum';

interface TransactionInterface {
  sku: string;
  type: TransactionTypeEnum;
  qty: number;
}

export default TransactionInterface;