import { ApiProperty } from '@nestjs/swagger';
import { Turno } from '../../../../domain/model/turno';
import { Intervalo } from '../../../../domain/model/intervalo';

export class IntervaloPresenter {
  @ApiProperty({ example: '2024-03-21 12:00' })
  readonly dataHoraInicio: string;
  @ApiProperty({ example: '2024-03-21 13:00' })
  readonly dataHoraFim: string | null;
  @ApiProperty({ example: '01:00' })
  readonly tempoDoIntervalo: string;

  constructor(intervalo: Intervalo) {
    this.dataHoraInicio = intervalo.inicio
      .toISOString()
      .split('.')[0]
      .slice(0, -3);

    this.dataHoraFim = intervalo.fim
      ? intervalo.fim.toISOString().split('.')[0].slice(0, -3)
      : null;

    this.tempoDoIntervalo = intervalo.tempo;
  }
}
