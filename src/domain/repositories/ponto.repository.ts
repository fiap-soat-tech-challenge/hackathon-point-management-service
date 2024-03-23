import { Ponto } from '../model/ponto';

export interface PontoRepository {
  getPonto(userId: string, data: Date): Promise<Ponto>;
  getAllPontosData(data: Date, userId: string): Promise<Array<Ponto>>;
  getAllPontosByMesAno(
    userId: string,
    mes: number,
    ano: number,
  ): Promise<Array<Ponto>>;
  save(ponto: Ponto): Promise<Ponto>;
  update(ponto: Ponto): Promise<void>;
}
