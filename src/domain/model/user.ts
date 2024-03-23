export class User {
  private readonly _id: string | null;
  private readonly _nome: string;
  private readonly _username: string;
  private readonly _matricula: string;
  private readonly _email: string;
  private readonly _password: string;

  constructor(
    nome: string,
    username: string,
    matricula: string,
    email: string,
    password: string,
  );

  constructor(
    id: string,
    nome: string,
    username: string,
    matricula: string,
    email: string,
    password: string,
  );

  public constructor(...params: any[]) {
    if (params.length === 5) {
      this._nome = params[0];
      this._username = params[1];
      this._matricula = params[2];
      this._email = params[3];
      this._password = params[4];
      return;
    }
    this._id = params[0];
    this._nome = params[1];
    this._username = params[2];
    this._matricula = params[3];
    this._email = params[4];
    this._password = params[5];
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

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }
}
