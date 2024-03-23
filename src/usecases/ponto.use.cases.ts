import { Ponto } from '../domain/model/ponto';
import { PontoRepository } from '../domain/repositories/ponto.repository';
import { Evento } from '../domain/model/evento';
import { PontoInvalidoException } from '../domain/exceptions/ponto.invalido.exception';
import { RelatorioSenderService } from '../domain/services/relatorio-sender.service';
import { UserRepository } from '../domain/repositories/user.repository';
import { User } from '../domain/model/user';

export class PontoUseCases {
  constructor(
    private readonly pontoRepository: PontoRepository,
    private readonly userRepository: UserRepository,
    private readonly relatorioSenderService: RelatorioSenderService,
  ) {}

  async addPonto(userId: string, evento: Evento): Promise<Ponto> {
    let ponto = await this.getPonto(userId);
    if (ponto) {
      return await this.updatePonto(ponto, evento);
    }

    if (evento !== Evento.ENTRADA) {
      throw new PontoInvalidoException(
        'A primeira marcação do dia deve ser ENTRADA',
      );
    }
    ponto = new Ponto(userId);
    return await this.pontoRepository.save(ponto);
  }

  async updatePonto(ponto: Ponto, evento: Evento): Promise<Ponto> {
    ponto.adicionarEvento(evento);
    await this.pontoRepository.update(ponto);
    return ponto;
  }

  async getPonto(userId: string): Promise<Ponto | null> {
    return await this.pontoRepository.getPonto(
      userId,
      this.getDataComHoraFixa(),
    );
  }

  async getAllPontosByData(
    data: string,
    userId: string,
  ): Promise<Array<Ponto>> {
    return await this.pontoRepository.getAllPontosData(
      this.getDataOfString(data),
      userId,
    );
  }

  async relatorioMensal(
    userId: string,
    mes: number,
    ano: number,
  ): Promise<void> {
    const user: User = await this.userRepository.findById(userId);
    const relatorio = await this.pontoRepository.getAllPontosByMesAno(
      user.id,
      mes - 1,
      ano,
    );
    await this.relatorioSenderService.send(user, relatorio);
  }

  private getDataComHoraFixa(): Date {
    const data = new Date();
    return new Date(data.getFullYear(), data.getMonth(), data.getDate());
  }

  private getDataOfString(data: string): Date {
    const strings = data.split('-').map((s) => parseInt(s));
    return new Date(strings[0], strings[1] - 1, strings[2]);
  }
}
