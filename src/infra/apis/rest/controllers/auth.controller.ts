import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../dtos/login.dto';
import { AuthService } from '../../../auth/auth.service';
import { RegisterDto } from '../dtos/register.dto';
import { RegisterPresenter } from '../presenters/register.presenter';

@ApiTags('Login')
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return await this.authService.login(
      loginDto.username_ou_matricula,
      loginDto.password,
    );
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<RegisterPresenter> {
    const user = await this.authService.register(registerDto);
    return new RegisterPresenter(user);
  }
}
