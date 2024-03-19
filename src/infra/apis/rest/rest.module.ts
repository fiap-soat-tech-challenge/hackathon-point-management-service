import { Module } from '@nestjs/common';
import { UseCasesProxyModule } from '../../usecases-proxy/use-cases-proxy.module';

@Module({
  imports: [UseCasesProxyModule],
  providers: [],
  controllers: [],
})
export class RestModule {}
