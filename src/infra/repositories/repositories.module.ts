import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PontoRepositoryImpl } from './ponto.repository.impl';
import { PontoEntity } from '../entities/ponto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PontoEntity])],
  exports: [PontoRepositoryImpl],
  providers: [PontoRepositoryImpl],
})
export class RepositoriesModule {}
