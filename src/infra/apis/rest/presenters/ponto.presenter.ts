import { Ponto } from '../../../../domain/model/ponto';
import { MarcacaoPresenter } from './marcacao.presenter';
import { ApiProperty } from '@nestjs/swagger';

export class PontoPresenter {
  @ApiProperty({ example: '123' })
  id: string;
  @ApiProperty({ example: '45565' })
  funcionarioId: string;
  @ApiProperty({ example: '2024-03-21' })
  data: string;
  @ApiProperty({ example: '08:00' })
  totalHorasTrabalhadas: string;
  @ApiProperty({ type: [MarcacaoPresenter] })
  marcacoes: Array<MarcacaoPresenter>;

  constructor(ponto: Ponto) {
    this.id = ponto.id;
    this.funcionarioId = ponto.funcionarioId;
    this.data = ponto.data.toISOString().split('T')[0];
    this.totalHorasTrabalhadas = ponto.totalHorasTrabalhadas;
    this.marcacoes = ponto.marcacoes.map(
      (marcacao) => new MarcacaoPresenter(marcacao),
    );
  }
}
