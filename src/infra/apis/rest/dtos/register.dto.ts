import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Min } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  nome: string;
  @ApiProperty()
  @IsNotEmpty()
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  matricula: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @Min(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  password: string;
}
