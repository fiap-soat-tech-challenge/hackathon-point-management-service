import { ApiProperty } from '@nestjs/swagger';
import { Intervalo } from '../../../../domain/model/intervalo';
import { DateTime } from 'luxon';
import { DataConverter } from '../../../shared/data.converter';

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
    const inicio: DateTime = DataConverter.dateToISOString(intervalo.inicio);

    this.dataHoraInicio = {
      data: inicio.toISODate(),
      hora: inicio.toLocaleString(DateTime.TIME_24_SIMPLE),
    };

    if (intervalo.fim) {
      const fim: DateTime = DataConverter.dateToISOString(intervalo.fim);
      this.dataHoraFim = {
        data: fim.toISODate(),
        hora: fim.toLocaleString(DateTime.TIME_24_SIMPLE),
      };
    } else {
      this.dataHoraFim = null;
    }

    this.tempoDoIntervalo = intervalo.tempo;
  }
}
