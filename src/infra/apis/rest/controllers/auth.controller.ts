import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../dtos/login.dto';
import { AuthService } from '../../../auth/auth.service';
import { RegisterDto } from '../dtos/register.dto';
import { RegisterPresenter } from '../presenters/register.presenter';

@ApiTags('Autenticação')
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return await this.authService.login(
      loginDto.username_ou_matricula,
      loginDto.password,
    );
  }

  @Post('register')
  @ApiExcludeEndpoint()
  async register(@Body() registerDto: RegisterDto): Promise<RegisterPresenter> {
    const user = await this.authService.register(registerDto);
    return new RegisterPresenter(user);
  }
}
