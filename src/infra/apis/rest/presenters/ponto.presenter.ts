import { Ponto } from '../../../../domain/model/ponto';
import { ApiProperty } from '@nestjs/swagger';
import { IntervaloPresenter } from './intervalo.presenter';
import { DateTime } from 'luxon';
import { Data } from '../../../../domain/helpers/data';
import { DataConverter } from '../../../shared/data.converter';

export class PontoPresenter {
  @ApiProperty({ example: '123' })
  id: string;
  @ApiProperty({ example: '45565' })
  userId: string;
  @ApiProperty({ example: '2024-03-21' })
  data: string;
  @ApiProperty({
    example: {
      data: '2024-03-21',
      hora: '12:00',
    },
  })
  entrada: any;
  @ApiProperty({ type: [IntervaloPresenter] })
  intervalos: Array<IntervaloPresenter>;
  @ApiProperty({
    example: {
      data: '2024-03-21',
      hora: '12:00',
    },
  })
  saida: any;
  @ApiProperty({ example: '08:00' })
  totalHorasTrabalhadas: string;

  constructor(ponto: Ponto, mostrarHorasTrabalhadas: boolean = false) {
    const data: DateTime = DataConverter.dateToISOString(ponto.data);
    const entrada: DateTime = DataConverter.dateToISOString(ponto.entrada);

    this.id = ponto.id;
    this.userId = ponto.userId;
    this.data = data.toISODate();
    this.entrada = {
      data: entrada.toISODate(),
      hora: entrada.toLocaleString(DateTime.TIME_24_SIMPLE),
    };
    this.intervalos = ponto.intervalos.map(
      (intervalo) => new IntervaloPresenter(intervalo),
    );

    if (ponto.saida) {
      const saida: DateTime = DataConverter.dateToISOString(ponto.saida);
      this.saida = {
        data: saida.toISODate(),
        hora: saida.toLocaleString(DateTime.TIME_24_SIMPLE),
      };
    } else {
      this.saida = null;
    }

    if (mostrarHorasTrabalhadas) {
      this.totalHorasTrabalhadas = ponto.totalHorasTrabalhadas;
    }
  }
}
