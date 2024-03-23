import { Module } from '@nestjs/common';
import { UseCasesProxyModule } from '../../usecases-proxy/use-cases-proxy.module';
import { HomeController } from './controllers/home.controller';
import { PontoController } from './controllers/ponto.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [AuthModule, UseCasesProxyModule],
  providers: [],
  controllers: [HomeController, AuthController, PontoController],
})
export class RestModule {}
