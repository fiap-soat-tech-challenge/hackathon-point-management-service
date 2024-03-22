import { Marcacao } from '../../domain/model/marcacao';
import { Evento } from '../../domain/model/evento';

export class MarcacaoConverter {
  public static toEntity(marcacao: Marcacao): {
    evento: Evento;
    dataEHora: Date;
  } {
    return {
      dataEHora: marcacao.dataEHora,
      evento: marcacao.evento,
    };
  }

  public static toMarcacao(entity: {
    evento: Evento;
    dataEHora: Date;
  }): Marcacao {
    return new Marcacao(entity.evento, entity.dataEHora);
  }
}
