import { Module } from '@nestjs/common';
import { UseCasesProxyModule } from '../../usecases-proxy/use-cases-proxy.module';
import { HomeController } from './controllers/home.controller';

@Module({
  imports: [UseCasesProxyModule],
  providers: [],
  controllers: [HomeController],
})
export class RestModule {}
