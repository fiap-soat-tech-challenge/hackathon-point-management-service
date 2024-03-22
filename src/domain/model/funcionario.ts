export class Funcionario {
  private readonly _id: string | null;
  private readonly _nome: string;
  private readonly _username: string;
  private readonly _matricula: string;

  constructor(nome: string, username: string, matricula: string);

  constructor(
    id: string,
    nome: string,
    cpf: string,
    username: string,
    matricula: string,
  );

  public constructor(...params: any[]) {
    if (params.length === 2) {
      this._nome = params[0];
      this._username = params[1];
      this._matricula = params[2];
      return;
    }
    this._id = params[0];
    this._nome = params[1];
    this._username = params[2];
    this._matricula = params[3];
  }

  get id(): string | null {
    return this._id;
  }

  get nome(): string {
    return this._nome;
  }

  get username(): string {
    return this._username;
  }

  get matricula(): string {
    return this._matricula;
  }
}
