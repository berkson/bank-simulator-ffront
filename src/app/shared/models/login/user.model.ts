import { Account } from '../bussiness';
import { Role } from './role.model';

export class User {

  constructor(
    public id: number = 0,
    public username: string = '',
    public age: number = 0,
    public name: string = '',
    public email: string = '',
    public account?: Account,
    public roles: Array<Role> = [],
    public auth: string = ''
  ) {}

  full(
    id: number,
    username: string,
    age: number,
    name: string,
    email: string,
    account: Account,
    roles: Array<Role>
  ): User {
    this.id = id;
    this.username = username;
    this.age = age;
    this.name = name;
    this.email = email;
    this.account = account;
    this.roles = roles;
    return this;
  }

  toJSON() {
    return {
      id: this.id,
      cpf: this.username,
      idade: this.age,
      nome: this.name,
      email: this.email,
      conta: this.account,
      permissoes: this.roles,
    };
  }

  static fromObject(object: any) {
    if (object === null || object === undefined) return new User();

    let roles = [];
    for (let role of object.permissoes) {
      let r = Role.fromObject(role);
      roles.push(r);
    }

    return new User(
      object.id,
      object.cpf,
      object.idade,
      object.nome,
      object.email,
      object.conta,
      roles
    );
  }
}
