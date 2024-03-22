import { Ponto } from '../model/ponto';

export interface PontoRepository {
  getPonto(funcionarioId: string, data: Date): Promise<Ponto>;
  getAllPontosData(data: Date, funcionarioId: string): Promise<Array<Ponto>>;
  getAllPontosByMesAno(
    funcionarioId: string,
    mes: number,
    ano: number,
  ): Promise<Array<Ponto>>;
  save(ponto: Ponto): Promise<Ponto>;
  update(ponto: Ponto): Promise<void>;
}
