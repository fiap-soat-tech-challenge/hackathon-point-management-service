import { ApiProperty } from '@nestjs/swagger';
import { Evento } from '../../../../domain/model/evento';
import { IsEnum } from 'class-validator';

export class PontoDto {
  @ApiProperty({
    enum: Evento,
  })
  @IsEnum(Evento, { message: 'O Evento não é válido' })
  evento: Evento;
}
