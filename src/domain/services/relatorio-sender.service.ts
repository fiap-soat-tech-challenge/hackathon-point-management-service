import { Ponto } from '../model/ponto';
import { User } from '../model/user';

export interface RelatorioSenderService {
  send(user: User, relatorio: Array<Ponto>): Promise<void>;
}
