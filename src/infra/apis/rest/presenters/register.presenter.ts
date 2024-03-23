import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../../domain/model/user';

export class RegisterPresenter {
  @ApiProperty({ example: 'Pedro da Silva' })
  nome: string;
  @ApiProperty({ example: 'pedro.silva' })
  username: string;
  @ApiProperty({ example: '12345' })
  matricula: string;
  @ApiProperty({ example: 'nome@email.com' })
  email: string;

  constructor(user: User) {
    this.nome = user.nome;
    this.username = user.username;
    this.matricula = user.matricula;
    this.email = user.email;
  }
}
