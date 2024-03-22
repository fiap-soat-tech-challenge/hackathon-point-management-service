import { Ponto } from '../../../../domain/model/ponto';
import { ApiProperty } from '@nestjs/swagger';
import { IntervaloPresenter } from './intervalo.presenter';

export class PontoPresenter {
  @ApiProperty({ example: '123' })
  id: string;
  @ApiProperty({ example: '45565' })
  funcionarioId: string;
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
    this.id = ponto.id;
    this.funcionarioId = ponto.funcionarioId;
    this.data = ponto.data.toISOString().split('T')[0];
    this.entrada = {
      data: ponto.entrada.toISOString().split('T')[0],
      hora: ponto.entrada.toISOString().split('T')[1].slice(0, -8),
    };
    this.intervalos = ponto.intervalos.map(
      (intervalo) => new IntervaloPresenter(intervalo),
    );

    if (ponto.saida) {
      this.saida = {
        data: ponto.saida.toISOString().split('T')[0],
        hora: ponto.saida.toISOString().split('T')[1].slice(0, -8),
      };
    } else {
      this.saida = null;
    }

    if (mostrarHorasTrabalhadas) {
      this.totalHorasTrabalhadas = ponto.totalHorasTrabalhadas;
    }
  }
}
