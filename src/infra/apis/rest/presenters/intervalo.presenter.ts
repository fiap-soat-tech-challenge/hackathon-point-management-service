import { ApiProperty } from '@nestjs/swagger';
import { Intervalo } from '../../../../domain/model/intervalo';

export class IntervaloPresenter {
  @ApiProperty({
    example: {
      inicio: {
        data: '2024-03-21',
        hora: '12:00',
      },
    },
  })
  readonly dataHoraInicio: any;

  @ApiProperty({
    example: {
      fim: {
        data: '2024-03-21',
        hora: '13:00',
      },
    },
  })
  readonly dataHoraFim: any | null;

  @ApiProperty({ example: '01:00' })
  readonly tempoDoIntervalo: string;

  constructor(intervalo: Intervalo) {
    this.dataHoraInicio = {
      data: intervalo.inicio.toISOString().split('T')[0],
      hora: intervalo.inicio.toISOString().split('T')[1].slice(0, -8),
    };

    if (intervalo.fim) {
      this.dataHoraFim = {
        data: intervalo.fim.toISOString().split('T')[0],
        hora: intervalo.fim.toISOString().split('T')[1].slice(0, -8),
      };
    } else {
      this.dataHoraFim = null;
    }

    this.tempoDoIntervalo = intervalo.tempo;
  }
}
