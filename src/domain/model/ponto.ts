import { Marcacao } from './marcacao';
import { Evento } from './evento';
import { MarcacaoInvalidaException } from '../exceptions/marcacao-invalida.exception';

export class Ponto {
  private readonly _id: string | null;
  private readonly _funcionarioId: string;
  private readonly _data: Date;
  private readonly _marcacoes: Array<Marcacao>;
  private _totalHorasTrabalhadas: string = '00:00';

  constructor(funcionarioId: string, data: Date);

  constructor(
    id: string,
    funcionarioId: string,
    data: Date,
    marcacoes: Array<Marcacao>,
    totalHorasTrabalhadas: string,
  );

  constructor(...params: any[]) {
    switch (params.length) {
      case 2:
        this._funcionarioId = params[0];
        this._data = params[1];
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

  get totalHorasTrabalhadas(): string {
    return this._totalHorasTrabalhadas;
  }

  public adicionarMarcacao(marcacao: Marcacao): void {
    this.validarMarcacao(marcacao);
    this._marcacoes.push(marcacao);
    this.atualizarTotalHorasTrabalhadas();
  }

  private validarMarcacao(marcacao: Marcacao): void {
    switch (marcacao.evento) {
      case Evento.ENTRADA:
      case Evento.SAIDA:
        this.verificarEntradaSaida(marcacao);
        break;
      case Evento.INTERVALO_INICIO:
      case Evento.INTERVALO_FIM:
        // TODO: Arrumar a validação de intervalo
        // this.verificarIntervalo(marcacao);
        break;
    }
  }

  private verificarEntradaSaida(marcacao: Marcacao): void {
    if (this._marcacoes.length === 0 && marcacao.evento !== Evento.ENTRADA) {
      throw new MarcacaoInvalidaException(
        'A primeira marcação deve ser de ENTRADA',
      );
    }
    if (this._marcacoes.some((m) => m.evento === marcacao.evento)) {
      throw new MarcacaoInvalidaException(
        `Marcação ${marcacao.evento} já existe na data atual`,
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
      for (let i = 0; i < this._marcacoes.length; i += 2) {
        totalHoras +=
          (this._marcacoes[i + 1].dataEHora.getTime() -
            this._marcacoes[i].dataEHora.getTime()) /
          (1000 * 60 * 60);
      }
      this._totalHorasTrabalhadas = this.formatarTotalHoras(totalHoras);
    }
  }

  private formatarTotalHoras(totalHoras: number): string {
    const horas = Math.floor(totalHoras);
    const minutos = Math.round((totalHoras - horas) * 60);
    const horasFormatadas = String(horas).padStart(2, '0');
    const minutosFormatados = String(minutos).padStart(2, '0');
    return `${horasFormatadas}:${minutosFormatados}`;
  }
}
