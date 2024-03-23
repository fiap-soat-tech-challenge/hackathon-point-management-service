import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PontoRepositoryImpl } from './ponto.repository.impl';
import { PontoEntity } from '../entities/ponto.entity';
import { UserEntity } from '../entities/user.entity';
import { UserRepositoryImpl } from './user.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PontoEntity])],
  exports: [UserRepositoryImpl, PontoRepositoryImpl],
  providers: [UserRepositoryImpl, PontoRepositoryImpl],
})
export class RepositoriesModule {}
