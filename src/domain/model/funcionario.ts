export class Funcionario {
  private readonly _id: string | null;
  private _cpf: string;
  private _nome: string;

  constructor(cpf: string, nome: string, id?: string) {
    this._id = id || null;
    this._cpf = cpf;
    this._nome = nome;
  }

  get id(): string | null {
    return this._id;
  }

  get cpf(): string {
    return this._cpf;
  }

  get nome(): string {
    return this._nome;
  }

  set cpf(cpf: string) {
    this._cpf = cpf;
  }

  set nome(nome: string) {
    this._nome = nome;
  }
}
