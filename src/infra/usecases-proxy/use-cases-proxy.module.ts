import { Module } from '@nestjs/common';
import { PontoUseCases } from '../../usecases/ponto.use.cases';
import { PontoRepository } from '../../domain/repositories/ponto.repository';
import { RepositoriesModule } from '../repositories/repositories.module';
import { PontoRepositoryImpl } from '../repositories/ponto.repository.impl';

const createPontoUseCases = (pontoRepository: PontoRepository) => {
  return new PontoUseCases(pontoRepository);
};

@Module({
  imports: [RepositoriesModule],
  providers: [
    {
      provide: PontoUseCases,
      useFactory: createPontoUseCases,
      inject: [PontoRepositoryImpl],
    },
  ],
  exports: [PontoUseCases],
})
export class UseCasesProxyModule {}
