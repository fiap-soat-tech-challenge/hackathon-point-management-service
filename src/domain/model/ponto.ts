import { Marcacao } from './marcacao';
import { Evento } from './evento';
import { MarcacaoInvalidaException } from '../exceptions/marcacao-invalida.exception';

export class Ponto {
  private readonly _id: string | null;
  private readonly _funcionarioId: string;
  private readonly _data: Date;
  private readonly _marcacoes: Array<Marcacao>;
  private _totalHorasTrabalhadas: number = 0;

  constructor(funcionarioId: string);

  constructor(
    id: string,
    funcionarioId: string,
    data: Date,
    marcacoes: Array<Marcacao>,
    totalHorasTrabalhadas: number,
  );

  constructor(...params: any[]) {
    switch (params.length) {
      case 1:
        this._funcionarioId = params[0];
        this._data = this.getDate();
        this._marcacoes = [];
        return;
      default:
        this._id = params[0];
        this._funcionarioId = params[1];
        this._data = params[2];
        this._marcacoes = params[3];
        this._totalHorasTrabalhadas = params[4];
    }
  }

  private getDate(): Date {
    const data = new Date();
    return new Date(
      data.getFullYear(),
      data.getMonth(),
      data.getDate(),
      0,
      0,
      0,
      0,
    );
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

  get marcacoes(): Array<Marcacao> {
    return this._marcacoes;
  }

  get totalHorasTrabalhadas(): number {
    return this._totalHorasTrabalhadas;
  }

  public adicionarMarcacao(marcacao: Marcacao): void {
    // this.validarMarcacao(marcacao);
    this._marcacoes.push(marcacao);
    // this.atualizarTotalHorasTrabalhadas();
  }

  private validarMarcacao(marcacao: Marcacao): void {
    switch (marcacao.evento) {
      case Evento.ENTRADA:
      case Evento.SAIDA:
        this.verificarEntradaSaida(marcacao);
        break;
      case Evento.INTERVALO_INICIO:
      case Evento.INTERVALO_FIM:
        this.verificarIntervalo(marcacao);
        break;
    }
  }

  private verificarEntradaSaida(marcacao: Marcacao): void {
    if (this._marcacoes.length === 0 && marcacao.evento !== Evento.ENTRADA) {
      throw new MarcacaoInvalidaException(
        'A primeira marcação deve ser de entrada',
      );
    }
    if (this._marcacoes.some((m) => m.evento === marcacao.evento)) {
      throw new MarcacaoInvalidaException(
        `Marcação ${marcacao.evento} já existe`,
      );
    }
  }

  private verificarIntervalo(marcacao: Marcacao): void {
    const intervalos = this._marcacoes
      .filter(
        (m) =>
          m.evento === Evento.INTERVALO_INICIO ||
          m.evento === Evento.INTERVALO_FIM,
      )
      .sort((a, b) => a.dataEHora.getTime() - b.dataEHora.getTime());

    // TODO: Como verificar se a marcação de intervalo é válida?
    if (intervalos.length % 2 === 0) {
      throw new MarcacaoInvalidaException(
        'Marcação de intervalo sem marcação de entrada',
      );
    }

    if (marcacao.evento === Evento.INTERVALO_INICIO) {
      if (intervalos.length > 0) {
        throw new MarcacaoInvalidaException(
          'Marcação de início do intervalo antes do fim do intervalo anterior',
        );
      }
    } else {
      if (intervalos.length === 0) {
        throw new MarcacaoInvalidaException(
          'Marcação de intervalo sem marcação de início',
        );
      }
    }
  }

  private atualizarTotalHorasTrabalhadas(): void {
    if (this._marcacoes.length % 2 === 0) {
      let totalHoras = 0;
      // TODO: Como calcular o total de horas trabalhadas?
      // for (let i = 0; i < this._marcacoes.length; i += 2) {
      //   totalHoras +=
      //     (this._marcacoes[i + 1].getTime() - this._marcacoes[i].getTime()) /
      //     (1000 * 60 * 60);
      // }
      this._totalHorasTrabalhadas = totalHoras;
    }
  }
}
