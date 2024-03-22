import { ApiProperty } from '@nestjs/swagger';
import { Max, Min } from 'class-validator';

export class RelatorioDto {
  @ApiProperty({ example: 3 })
  @Min(1, { message: 'Mês deve ser maior ou igual a 1' })
  @Max(12, { message: 'Mês deve ser menor ou igual a 12' })
  mes: number;

  @ApiProperty({ example: 2024 })
  @Min(1970, { message: 'Ano deve ser maior ou igual a 1970' })
  ano: number;
}
