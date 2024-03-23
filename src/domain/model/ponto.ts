import { Intervalo } from './intervalo';
import { Evento } from './evento';
import { MarcacaoInvalidaException } from '../exceptions/marcacao-invalida.exception';
import { Data } from '../helpers/data';

export class Ponto {
  private readonly _id: string | null;
  private readonly _userId: string;
  private readonly _data: any;
  private _entrada: any;
  private readonly _intervalos: Array<Intervalo>;
  private _saida: any | null;
  private _totalHorasTrabalhadas: string;

  constructor(userId: string);

  constructor(
    id: string,
    userId: string,
    data: any,
    entrada: any,
    intervalos: Array<Intervalo>,
    saida: any,
    totalHorasTrabalhadas: string,
  );

  constructor(...params: any[]) {
    switch (params.length) {
      case 1:
        this._userId = params[0];
        this._data = Data.newDate();
        this._entrada = Data.newDateTime();
        this._intervalos = [];
        this._totalHorasTrabalhadas = '00:00';
        return;
      default:
        this._id = params[0];
        this._userId = params[1];
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

  get userId(): string {
    return this._userId;
  }

  get data(): any {
    return this._data;
  }

  get entrada(): any {
    return this._entrada;
  }

  get intervalos(): Array<Intervalo> {
    return this._intervalos;
  }

  get saida(): any {
    return this._saida;
  }

  get totalHorasTrabalhadas(): string {
    return this._totalHorasTrabalhadas;
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

    this._saida = Data.newDateTime();
  }

  private atualizarTotalHorasTrabalhadas(): void {
    if (!this._saida && this._intervalos.length === 0) {
      return;
    }

    let totalMinutosTrabalhados = 0;
    if (this._saida) {
      totalMinutosTrabalhados = this.atualizarTotalHorasFinal();
    } else {
      totalMinutosTrabalhados = this.atualizarTotalHorasParcial();
    }

    const horas = Math.floor(totalMinutosTrabalhados / 60);
    const minutos = Math.round(totalMinutosTrabalhados % 60);
    this._totalHorasTrabalhadas = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
  }

  private atualizarTotalHorasFinal(): number {
    let totalMinutosTrabalhados = 0;
    totalMinutosTrabalhados = this.calcularMinutos(this._saida, this._entrada);

    this._intervalos
      .filter((intervalo) => intervalo.foiFinalizado())
      .forEach((intervalo) => {
        totalMinutosTrabalhados -= this.calcularMinutos(
          intervalo.fim,
          intervalo.inicio,
        );
      });

    return totalMinutosTrabalhados;
  }

  private atualizarTotalHorasParcial(): number {
    let totalMinutosTrabalhados = 0;

    this._intervalos.forEach((intervalo, index) => {
      if (index === 0) {
        totalMinutosTrabalhados += this.calcularMinutos(
          intervalo.inicio,
          this._entrada,
        );
      } else {
        totalMinutosTrabalhados += this.calcularMinutos(
          intervalo.inicio,
          this._intervalos[index - 1].fim,
        );
      }
    });

    return totalMinutosTrabalhados;
  }

  private calcularMinutos(momentoFinal: Date, momentoInicial: Date) {
    return (momentoFinal.getTime() - momentoInicial.getTime()) / (1000 * 60);
  }
}
