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
  @ApiProperty({ example: '2024-03-21 08:00' })
  entrada: string;
  @ApiProperty({ type: [IntervaloPresenter] })
  intervalos: Array<IntervaloPresenter>;
  @ApiProperty({ example: '2024-03-21 17:00' })
  saida: string;
  @ApiProperty({ example: '08:00' })
  totalHorasTrabalhadas: string;

  constructor(ponto: Ponto) {
    this.id = ponto.id;
    this.funcionarioId = ponto.funcionarioId;
    this.data = ponto.data.toISOString().split('T')[0];
    this.entrada = ponto.entrada.toISOString();
    this.intervalos = ponto.intervalos.map(
      (intervalo) => new IntervaloPresenter(intervalo),
    );
    this.saida = ponto.saida ? ponto.saida.toISOString() : null;
    this.totalHorasTrabalhadas = ponto.totalHorasTrabalhadas;
  }
}
