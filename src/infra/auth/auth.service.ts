import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserUseCases } from '../../usecases/user.use.cases';
import { User } from '../../domain/model/user';
import { RegisterDto } from '../apis/rest/dtos/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userUseCases: UserUseCases,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const userByUsername = await this.userUseCases.findByUsername(username);
    if (
      userByUsername &&
      (await this.validatePassword(password, userByUsername.password))
    ) {
      return userByUsername;
    }

    const userByMatricula = await this.userUseCases.findByMatricula(username);
    if (
      userByMatricula &&
      (await this.validatePassword(password, userByMatricula.password))
    ) {
      return userByMatricula;
    }

    throw new UnauthorizedException('Username ou matricula ou senha inválidos');
  }

  async login(
    username_ou_matricula: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.validateUser(username_ou_matricula, password);
    const payload = { sub: user.id, email: user.email, nome: user.nome };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const hashedPassword = await this.hashPassword(registerDto.password);
    const user = new User(
      registerDto.nome,
      registerDto.username,
      registerDto.matricula,
      registerDto.email,
      hashedPassword,
    );
    return await this.userUseCases.addUser(user);
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
