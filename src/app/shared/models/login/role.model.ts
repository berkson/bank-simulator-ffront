export class Role {
  constructor(
    public id?: string,
    public authority?: string,
    public description?: string
  ) {}

  full(id: string, authority: string, description: string): Role {
    this.id = id;
    this.authority = authority;
    this.description = description;
    return this;
  }

  toJSON() {
    return {
      id: this.id,
      codigo: this.authority,
      descricao: this.description,
    };
  }

  static fromObject(object: any) {
    return new Role(object.id, object.codigo, object.descricao);
  }
}
