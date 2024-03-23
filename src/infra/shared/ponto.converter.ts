import { PontoEntity } from '../entities/ponto.entity';
import { Ponto } from '../../domain/model/ponto';
import { ObjectId } from 'mongodb';
import { IntervaloConverter } from './intervalo.converter';

export class PontoConverter {
  public static toPonto(entity: PontoEntity): Ponto {
    return new Ponto(
      entity.id.toString(),
      entity.userId.toString(),
      entity.data,
      entity.entrada,
      entity.intervalos.map((i) => IntervaloConverter.toIntervalo(i)),
      entity.saida,
      entity.totalHorasTrabalhadas,
    );
  }

  public static toEntity(ponto: Ponto): PontoEntity {
    return new PontoEntity(
      new ObjectId(ponto.userId),
      ponto.data,
      ponto.entrada,
      ponto.intervalos.map((i) => IntervaloConverter.toEntity(i)),
      ponto.saida,
      ponto.totalHorasTrabalhadas,
    );
  }
}
