export class Intervalo {
  private readonly _inicio: Date;
  private _fim: Date | null;
  private _tempo: string;

  constructor();

  constructor(inicio: Date, fim: Date, tempo: string);

  constructor(...params: any[]) {
    switch (params.length) {
      case 0:
        this._inicio = new Date(2024, 2, 21, 12, 0);
        this._tempo = '00:00';
        return;
      default:
        this._inicio = params[0];
        this._fim = params[1];
        this._tempo = params[2];
    }
  }

  get inicio(): Date {
    return this._inicio;
  }

  get fim(): Date {
    return this._fim;
  }

  get tempo(): string {
    return this._tempo;
  }

  public foiFinalizado(): boolean {
    return !!this._fim;
  }

  public finalizar(): void {
    this._fim = new Date(2024, 2, 21, 12, 30);
    this.atualizarTempoIntervalo();
  }

  private atualizarTempoIntervalo(): void {
    if (!this._fim) {
      return;
    }

    const diff = this._fim.getTime() - this._inicio.getTime();
    const totalMinutes = Math.floor(diff / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    this._tempo = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  }
}
