import { OperationType } from '../..';

export class Operation {
  constructor(
    public id: number = 0,
    public operationType?: OperationType,
    public value: number = 0
  ) {}

  toJSON() {
    return {
      id: this.id,
      tipoDaOperacao: this.operationType,
      valor: this.value,
    };
  }

  static fromObject(object: any) {
    if (object === null || object === undefined) return new Operation();

    return new Operation(object.id, object.tipoDaOperacao, object.valor);
  }
}
