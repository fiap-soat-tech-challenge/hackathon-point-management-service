import { Ponto } from '../model/ponto';

export interface PontoRepository {
  getPontoById(id: string): Promise<Ponto | null>;
  updatePonto(pontoId: string, ponto: Ponto): Promise<Ponto | void>;
  savePonto(ponto: Ponto): Promise<Ponto>;
}
