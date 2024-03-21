export class Ponto {
  private readonly _id: string | null;
  private readonly _funcionarioId: string;
  private _registro: Date;

  constructor(funcionarioId: string, registro: Date, id?: string) {
    this._id = id || null;
    this._funcionarioId = funcionarioId;
    this._registro = registro;
  }

  get id(): string | null {
    return this._id;
  }

  get funcionarioId(): string {
    return this._funcionarioId;
  }

  get registro(): Date {
    return this._registro;
  }

  set registro(registro: Date) {
    this._registro = registro;
  }
}
