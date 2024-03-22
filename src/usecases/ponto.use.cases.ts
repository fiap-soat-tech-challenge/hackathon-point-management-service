import { Ponto } from '../domain/model/ponto';
import { PontoRepository } from '../domain/repositories/ponto.repository';
import { Evento } from '../domain/model/evento';
import { PontoInvalidoException } from '../domain/exceptions/ponto.invalido.exception';
import { RelatorioSenderService } from '../domain/services/relatorio-sender.service';
import { Funcionario } from '../domain/model/funcionario';

export class PontoUseCases {
  constructor(
    private readonly pontoRepository: PontoRepository,
    private readonly relatorioSenderService: RelatorioSenderService,
  ) {}

  async addPonto(funcionarioId: string, evento: Evento): Promise<Ponto> {
    let ponto = await this.getPonto(funcionarioId);
    if (ponto) {
      return await this.updatePonto(ponto, evento);
    }

    if (evento !== Evento.ENTRADA) {
      throw new PontoInvalidoException(
        'A primeira marcação do dia deve ser ENTRADA',
      );
    }
    ponto = new Ponto(funcionarioId);
    return await this.pontoRepository.save(ponto);
  }

  async updatePonto(ponto: Ponto, evento: Evento): Promise<Ponto> {
    ponto.adicionarEvento(evento);
    await this.pontoRepository.update(ponto);
    return ponto;
  }

  async getPonto(funcionarioId: string): Promise<Ponto | null> {
    return await this.pontoRepository.getPonto(
      funcionarioId,
      this.getDataComHoraFixa(),
    );
  }

  async getAllPontosByData(
    data: string,
    funcionarioId: string,
  ): Promise<Array<Ponto>> {
    return await this.pontoRepository.getAllPontosData(
      this.getDataOfString(data),
      funcionarioId,
    );
  }

  async relatorioMensal(
    funcionarioId: string,
    mes: number,
    ano: number,
  ): Promise<void> {
    const relatorio = await this.pontoRepository.getAllPontosByMesAno(
      funcionarioId,
      mes - 1,
      ano,
    );

    // TODO: Arrumar funcionario
    const funcionario = new Funcionario(
      'Ana da Silva',
      'ana.silva',
      '123',
      'ana.silva@email.com',
    );
    await this.relatorioSenderService.send(funcionario, relatorio);
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
