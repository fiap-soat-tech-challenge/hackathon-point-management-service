import { Module } from '@nestjs/common';
import { PontoUseCases } from '../../usecases/ponto.use.cases';
import { PontoRepository } from '../../domain/repositories/ponto.repository';
import { RepositoriesModule } from '../repositories/repositories.module';
import { PontoRepositoryImpl } from '../repositories/ponto.repository.impl';
import { RelatorioSenderService } from '../../domain/services/relatorio-sender.service';
import { ServicesModule } from '../services/services.module';
import { RelatorioSenderServiceImpl } from '../services/relatorio-sender.service.impl';

const createPontoUseCases = (
  pontoRepository: PontoRepository,
  relatorioSenderService: RelatorioSenderService,
) => {
  return new PontoUseCases(pontoRepository, relatorioSenderService);
};

@Module({
  imports: [RepositoriesModule, ServicesModule],
  providers: [
    {
      provide: PontoUseCases,
      useFactory: createPontoUseCases,
      inject: [PontoRepositoryImpl, RelatorioSenderServiceImpl],
    },
  ],
  exports: [PontoUseCases],
})
export class UseCasesProxyModule {}
