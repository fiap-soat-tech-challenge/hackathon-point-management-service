import { PontoEntity } from '../entities/ponto.entity';
import { Ponto } from '../../domain/model/ponto';
import { ObjectId } from 'mongodb';
import { MarcacaoConverter } from './marcacao.converter';

export class PontoConverter {
  public static toPonto(entity: PontoEntity): Ponto {
    return new Ponto(
      entity.id.toString(),
      entity.funcionarioId.toString(),
      entity.data,
      entity.marcacoes.map((m) => MarcacaoConverter.toMarcacao(m)),
      entity.totalHorasTrabalhadas,
    );
  }

  public static toEntity(ponto: Ponto): PontoEntity {
    return new PontoEntity(
      new ObjectId(ponto.funcionarioId),
      ponto.data,
      ponto.marcacoes.map((m) => MarcacaoConverter.toEntity(m)),
      ponto.totalHorasTrabalhadas,
    );
  }
}
