import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(t => t.type === 'income')
      .map(t => t.value)
      .reduce((old, current) => old + current, 0);
    const outcome = this.transactions
      .filter(t => t.type === 'outcome')
      .map(t => t.value)
      .reduce((old, current) => old + current, 0);
    return { income, outcome, total: income - outcome };
  }

  public create(data: TransactionDTO): Transaction {
    const transaction = new Transaction(data);

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
