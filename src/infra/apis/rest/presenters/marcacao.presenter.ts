import { Evento } from '../../../../domain/model/evento';
import { Marcacao } from '../../../../domain/model/marcacao';
import { ApiProperty } from '@nestjs/swagger';

export class MarcacaoPresenter {
  @ApiProperty({ example: '2024-03-21' })
  readonly data: string;
  @ApiProperty({ example: '08:00' })
  readonly hora: string;
  @ApiProperty({ example: 'ENTRADA' })
  readonly evento: Evento;

  constructor(marcacao: Marcacao) {
    this.data = marcacao.dataEHora.toISOString().split('T')[0];
    this.hora = marcacao.dataEHora
      .toISOString()
      .split('T')[1]
      .split('.')[0]
      .slice(0, -3);
    this.evento = marcacao.evento;
  }
}
