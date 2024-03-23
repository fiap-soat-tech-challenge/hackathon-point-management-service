import { Intervalo } from '../../domain/model/intervalo';

export class IntervaloConverter {
  public static toEntity(intervalo: Intervalo): {
    inicio: Date;
    fim: Date;
    tempo: string;
  } {
    return {
      inicio: intervalo.inicio,
      fim: intervalo.fim,
      tempo: intervalo.tempo,
    };
  }

  public static toIntervalo(entity: {
    inicio: Date;
    fim: Date;
    tempo: string;
  }): Intervalo {
    return new Intervalo(entity.inicio, entity.fim, entity.tempo);
  }
}
