import { Evento } from './evento';

export class Marcacao {
  private readonly _dataEHora: Date;
  private readonly _evento: Evento;

  constructor(evento: Evento);

  constructor(evento: Evento, dataEHora: Date);

  constructor(...params: any[]) {
    switch (params.length) {
      case 1:
        this._evento = params[0];
        this._dataEHora = new Date();
        break;
      default:
        this._evento = params[0];
        this._dataEHora = params[1];
    }
  }

  get dataEHora(): Date {
    return this._dataEHora;
  }

  get evento(): Evento {
    return this._evento;
  }
}
