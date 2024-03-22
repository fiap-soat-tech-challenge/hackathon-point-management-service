import { Intervalo } from './intervalo';
import { Evento } from './evento';
import { MarcacaoInvalidaException } from '../exceptions/marcacao-invalida.exception';

export class Ponto {
  private readonly _id: string | null;
  private readonly _funcionarioId: string;
  private readonly _data: Date;
  private _entrada: Date;
  private readonly _intervalos: Array<Intervalo>;
  private _saida: Date | null;
  private _totalHorasTrabalhadas: string;

  constructor(funcionarioId: string);

  constructor(
    id: string,
    funcionarioId: string,
    data: Date,
    entrada: Date,
    intervalos: Array<Intervalo>,
    saida: Date,
    totalHorasTrabalhadas: string,
  );

  constructor(...params: any[]) {
    switch (params.length) {
      case 1:
        const data = new Date();
        this._funcionarioId = params[0];
        this._data = new Date(
          data.getFullYear(),
          data.getMonth(),
          data.getDate(),
        );
        this.adicionarEntrada(data);
        this._intervalos = [];
        this._totalHorasTrabalhadas = '00:00';
        return;
      default:
        this._id = params[0];
        this._funcionarioId = params[1];
        this._data = params[2];
        this._entrada = params[3];
        this._intervalos = params[4];
        this._saida = params[5];
        this._totalHorasTrabalhadas = params[6];
    }
  }

  get id(): string | null {
    return this._id;
  }

  get funcionarioId(): string {
    return this._funcionarioId;
  }

  get data(): Date {
    return this._data;
  }

  get entrada(): Date {
    return this._entrada;
  }

  get intervalos(): Array<Intervalo> {
    return this._intervalos;
  }

  get saida(): Date {
    return this._saida;
  }

  get totalHorasTrabalhadas(): string {
    return this._totalHorasTrabalhadas;
  }

  private adicionarEntrada(data: Date): void {
    this._entrada = data;
  }

  public adicionarEvento(evento: Evento): void {
    if (this._saida) {
      throw new MarcacaoInvalidaException(
        'A Saída já foi registrada, não pode adicionar mais eventos',
      );
    }

    switch (evento) {
      case Evento.ENTRADA:
        throw new MarcacaoInvalidaException('Entrada já registrada');
      case Evento.INTERVALO:
        this.adicionarIntervalo();
        break;
      case Evento.SAIDA:
        this.adicionarSaida();
        break;
    }
    this.atualizarTotalHorasTrabalhadas();
  }

  private adicionarIntervalo(): void {
    if (this.intervalos.length === 0) {
      this._intervalos.push(new Intervalo());
      return;
    }

    const ultimoIntervalo = this._intervalos[this._intervalos.length - 1];
    if (!ultimoIntervalo.foiFinalizado()) {
      ultimoIntervalo.finalizar();
      return;
    }

    this._intervalos.push(new Intervalo());
  }

  private adicionarSaida(): void {
    if (
      this.intervalos.length !== 0 &&
      this.intervalos.filter((intervalo) => !intervalo.foiFinalizado()).length >
        0
    ) {
      throw new MarcacaoInvalidaException('Intervalo não finalizado');
    }

    if (this._saida) {
      throw new MarcacaoInvalidaException('Saída já registrada');
    }

    this._saida = new Date();
  }

  private atualizarTotalHorasTrabalhadas(): void {
    // if (!this._saida && this._intervalos.length === 0) {
    //   return;
    // }
    //
    // let totalDeIntervalos = 0;
    // this._intervalos
    //   .filter((intervalo) => intervalo.foiFinalizado())
    //   .forEach(() => {
    //     totalDeIntervalos++;
    //   });
    //
    // const diff = this._saida?.getTime() - this._entrada.getTime();
    // if (!diff) {
    //   return;
    // }
    //
    // const totalMinutes = Math.floor(diff / 60000);
    // const hours = Math.floor(totalMinutes / 60);
    // const minutes = totalMinutes % 60;
    // this._totalHorasTrabalhadas = `${hours.toString().padStart(2, '0')}:${minutes
    //   .toString()
    //   .padStart(2, '0')}`;
  }
}
