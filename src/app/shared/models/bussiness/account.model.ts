import { Operation } from '.';

export class Account {
  constructor(
    public id: number = 0,
    public accountNumber: number = 0,
    public balance: number = 0,
    public operations: Array<Operation> = []
  ) {}

  toJSON() {
    return {
      id: this.id,
      numeroDaConta: this.accountNumber,
      saldo: this.balance,
      operacoes: this.operations,
    };
  }

  static fromObject(object: any) {
    if (object === null || object === undefined) return new Account();

    let operations = [];
    for (let operation of object.operations) {
      let r = Operation.fromObject(operation);
      operations.push(r);
    }

    return new Account(
      object.id,
      object.numeroDaConta,
      object.saldo,
      operations
    );
  }
}
