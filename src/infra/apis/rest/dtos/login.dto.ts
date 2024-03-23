import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  username_ou_matricula: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
