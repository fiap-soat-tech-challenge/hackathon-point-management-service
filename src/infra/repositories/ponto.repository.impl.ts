import { PontoRepository } from '../../domain/repositories/ponto.repository';
import { Ponto } from '../../domain/model/ponto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { PontoEntity } from '../entities/ponto.entity';
import { DataSource, Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { PontoConverter } from '../shared/ponto.converter';

export class PontoRepositoryImpl implements PontoRepository {
  constructor(
    @InjectRepository(PontoEntity)
    private readonly repository: Repository<PontoEntity>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async getPonto(userId: string, data: Date): Promise<Ponto | null> {
    const pontoEntity = await this.repository.findOne({
      where: { data: data, userId: new ObjectId(userId) },
    });

    if (pontoEntity === null) return null;
    return PontoConverter.toPonto(pontoEntity);
  }

  async getAllPontosData(
    data: Date,
    userId: string,
  ): Promise<Array<Ponto>> {
    const entities = await this.repository.find({
      where: { data: data, userId: new ObjectId(userId) },
    });
    return entities.map((entity) => PontoConverter.toPonto(entity));
  }

  async getAllPontosByMesAno(
    userId: string,
    mes: number,
    ano: number,
  ): Promise<Array<Ponto>> {
    const entities = await this.dataSource
      .getMongoRepository(PontoEntity)
      .find({
        where: {
          userId: new ObjectId(userId),
          data: {
            $gte: new Date(ano, mes, 1),
            $lt: new Date(ano, mes + 1, 1),
          },
        },
      });
    return entities.map((entity) => PontoConverter.toPonto(entity));
  }

  async save(ponto: Ponto): Promise<Ponto> {
    const pontoEntity = await this.repository.save(
      PontoConverter.toEntity(ponto),
    );
    return PontoConverter.toPonto(pontoEntity);
  }

  async update(ponto: Ponto): Promise<void> {
    await this.repository.update(ponto.id, PontoConverter.toEntity(ponto));
  }
}
