import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Login')
@Controller('/api/auth')
export class AuthController {
  /*
  Autenticação de Usuário: O sistema deve permitir que os usuários se
  autentiquem usando um nome de usuário ou matrícula e senha.
  */
  @Post('/login')
  async login(req: any, res: any) {
    console.log(req.body);
    return res.status(200).send('ok');
  }
}
