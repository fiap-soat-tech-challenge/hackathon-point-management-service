import { Module } from '@nestjs/common';
import { PontoUseCases } from '../../usecases/ponto.use.cases';

const createPontoUseCases = () => {
  return new PontoUseCases();
};

@Module({
  imports: [],
  providers: [
    {
      provide: PontoUseCases,
      useFactory: createPontoUseCases,
      inject: [],
    },
  ],
  exports: [PontoUseCases],
})
export class UseCasesProxyModule {}
