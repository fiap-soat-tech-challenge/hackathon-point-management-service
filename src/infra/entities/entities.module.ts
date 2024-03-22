import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoriesModule } from '../repositories/repositories.module';
import { PontoEntity } from './ponto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PontoEntity]), RepositoriesModule],
  exports: [TypeOrmModule],
})
export class EntitiesModule {}
