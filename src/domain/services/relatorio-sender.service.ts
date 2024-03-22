import { Ponto } from '../model/ponto';
import { Funcionario } from '../model/funcionario';

export interface RelatorioSenderService {
  send(funcionario: Funcionario, relatorio: Array<Ponto>): Promise<void>;
}
