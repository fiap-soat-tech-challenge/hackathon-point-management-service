import { Module } from '@nestjs/common';
import { PontoUseCases } from '../../usecases/ponto.use.cases';
import { PontoRepository } from '../../domain/repositories/ponto.repository';
import { RepositoriesModule } from '../repositories/repositories.module';
import { PontoRepositoryImpl } from '../repositories/ponto.repository.impl';
import { RelatorioSenderService } from '../../domain/services/relatorio-sender.service';
import { ServicesModule } from '../services/services.module';
import { RelatorioSenderServiceImpl } from '../services/relatorio-sender.service.impl';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserUseCases } from '../../usecases/user.use.cases';
import { UserRepositoryImpl } from '../repositories/user.repository.impl';

const createUserUseCases = (userRepository: UserRepository) => {
  return new UserUseCases(userRepository);
};

const createPontoUseCases = (
  pontoRepository: PontoRepository,
  userRepository: UserRepository,
  relatorioSenderService: RelatorioSenderService,
) => {
  return new PontoUseCases(
    pontoRepository,
    userRepository,
    relatorioSenderService,
  );
};

@Module({
  imports: [RepositoriesModule, ServicesModule],
  providers: [
    {
      provide: UserUseCases,
      useFactory: createUserUseCases,
      inject: [UserRepositoryImpl],
    },
    {
      provide: PontoUseCases,
      useFactory: createPontoUseCases,
      inject: [
        PontoRepositoryImpl,
        UserRepositoryImpl,
        RelatorioSenderServiceImpl,
      ],
    },
  ],
  exports: [UserUseCases, PontoUseCases],
})
export class UseCasesProxyModule {}
